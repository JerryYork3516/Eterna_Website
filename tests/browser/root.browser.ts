import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("redirects the root deterministically to /zh", async ({ request }) => {
  const response = await request.get("/", {
    headers: { "Accept-Language": "en" },
    maxRedirects: 0,
  });

  expect(response.status()).toBe(307);
  expect(response.headers().location).toBe("/zh");
});

test("loads the root application with its core semantics", async ({ page }) => {
  const response = await page.goto("/");

  expect(response?.status()).toBe(200);
  await expect(page).toHaveURL(/\/zh$/);
  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByRole("main")).toHaveAttribute("data-page-id", "home");
  await expect(
    page.getByRole("heading", { level: 1, name: "Eterna Website" }),
  ).toBeVisible();
});

test("finds no automated accessibility violations in the root content", async ({
  page,
}) => {
  await page.goto("/");

  const results = await new AxeBuilder({ page }).include("main").analyze();

  expect(results.violations).toEqual([]);
});

test("supports a reduced-motion browser context", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  expect(
    await page.evaluate(
      () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    ),
  ).toBe(true);
  await expect(
    page.getByRole("heading", { level: 1, name: "Eterna Website" }),
  ).toBeVisible();
});
