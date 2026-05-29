import { expect, test } from "@playwright/test";

const routes = ["/", "/login", "/signup", "/about", "/pricing", "/roadmap", "/status"];

for (const route of routes) {
  test(`loads ${route}`, async ({ page }) => {
    await page.goto(route);
    await expect(page.locator("body")).toBeVisible();
  });
}
