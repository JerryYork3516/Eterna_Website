const AIRTABLE_API_URL = 'https://api.airtable.com/v0';

const readBody = (body) => {
  if (!body) return {};
  if (typeof body === 'string') {
    try {
      return JSON.parse(body);
    } catch {
      return {};
    }
  }
  if (typeof body === 'object') return body;
  return {};
};

const missingEnv = (env) => Object.entries(env)
  .filter(([, value]) => !value)
  .map(([key]) => key);

const sendJson = (res, status, payload) => res.status(status).json(payload);

const readAirtableError = async (response) => {
  const text = await response.text();
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME;
  const nameField = process.env.AIRTABLE_NAME_FIELD;
  const emailField = process.env.AIRTABLE_EMAIL_FIELD;
  const purposeField = process.env.AIRTABLE_PURPOSE_FIELD;

  console.log('Airtable env status:', {
    hasApiKey: Boolean(apiKey),
    apiKeyLength: apiKey?.length ?? 0,
    hasBaseId: Boolean(baseId),
    tableName,
    nameField,
    emailField,
    purposeField,
  });

  const missing = missingEnv({
    AIRTABLE_API_KEY: apiKey,
    AIRTABLE_BASE_ID: baseId,
    AIRTABLE_TABLE_NAME: tableName,
    AIRTABLE_NAME_FIELD: nameField,
    AIRTABLE_EMAIL_FIELD: emailField,
    AIRTABLE_PURPOSE_FIELD: purposeField,
  });

  if (missing.length) {
    return sendJson(res, 500, {
      error: 'Airtable environment is not configured',
      detail: `Missing environment variables: ${missing.join(', ')}`,
    });
  }

  console.log('create request body:', req.body);

  const body = readBody(req.body);
  const { name, email, purpose } = body;
  const trimmedName = typeof name === 'string' ? name.trim() : '';
  const trimmedEmail = typeof email === 'string' ? email.trim() : '';
  const trimmedPurpose = typeof purpose === 'string' ? purpose.trim() : '';

  if (!trimmedName || !trimmedEmail) {
    return sendJson(res, 400, {
      error: 'Name and email are required',
      detail: {
        receivedName: Boolean(trimmedName),
        receivedEmail: Boolean(trimmedEmail),
      },
    });
  }

  try {
    const airtableResponse = await fetch(`${AIRTABLE_API_URL}/${baseId}/${encodeURIComponent(tableName)}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              [nameField]: trimmedName,
              [emailField]: trimmedEmail,
              [purposeField]: trimmedPurpose,
            },
          },
        ],
      }),
    });

    if (!airtableResponse.ok) {
      const detail = await readAirtableError(airtableResponse);
      console.log('Airtable create failed:', detail);
      return sendJson(res, airtableResponse.status, {
        error: 'Failed to create Airtable record',
        detail,
      });
    }

    const result = await airtableResponse.json().catch(() => null);
    return sendJson(res, 200, {
      ok: true,
      id: result?.records?.[0]?.id,
    });
  } catch (error) {
    console.log('Airtable request error:', error);
    return sendJson(res, 500, {
      error: 'Airtable request failed',
      detail: error instanceof Error ? error.message : String(error),
    });
  }
}
