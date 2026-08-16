import { expect, test } from "@playwright/test";

import { siteRoutes } from "../../app/site-routes";

for (const { locale, pageId, pathname } of siteRoutes) {
  test(`${pathname} exposes its route identity`, async ({ page }) => {
    const response = await page.goto(pathname);

    expect(response?.status()).toBe(200);
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.getByRole("main")).toHaveAttribute(
      "data-page-id",
      pageId,
    );
    await expect(page.getByRole("main")).toHaveAttribute("data-locale", locale);
  });
}

for (const pathname of ["/fr", "/fr/about", "/zh-Hans/products"]) {
  test(`${pathname} returns a real 404`, async ({ page }) => {
    const response = await page.goto(pathname);

    expect(response?.status()).toBe(404);
  });
}
