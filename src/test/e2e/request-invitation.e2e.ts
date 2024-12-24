import { test, expect } from "@playwright/test";

test("user request invitation successfully", async ({ page }) => {
  await page.route("**/fake-auth", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
    });
  });
  await page.goto("http://localhost:3000");

  const requestInvitationButton = page.locator(
    '[data-testid="requestInvitationButton"]'
  );
  await requestInvitationButton.click();

  const requestInvitationDialog = page.locator("role=dialog");
  await expect(requestInvitationDialog).toBeVisible();

  await page.fill('[data-testid="fullNameInput"]', "gan sheng hong");
  await page.fill('[data-testid="emailInput"]', "gan@example.com");
  await page.fill('[data-testid="emailConfirmInput"]', "gan@example.com");

  const requestInvitationSubmitButton = page.locator(
    '[data-testid="requestInvitationSubmitButton"]'
  );
  await requestInvitationSubmitButton.click();
  const successButton = page.locator('[data-testid="successDialogButton"]');

  await expect(successButton).toBeVisible();
  await successButton.click();

  await expect(successButton).toBeHidden();
});

test("user request invitation fail", async ({ page }) => {
  await page.route("**/fake-auth", async (route) => {
    await route.fulfill({
      status: 400,
      contentType: "application/json",
    });
  });
  await page.goto("http://localhost:3000");

  const requestInvitationButton = page.locator(
    '[data-testid="requestInvitationButton"]'
  );
  await requestInvitationButton.click();

  const requestInvitationDialog = page.locator("role=dialog");
  await expect(requestInvitationDialog).toBeVisible();

  await page.fill('[data-testid="fullNameInput"]', "gan sheng hong");
  await page.fill('[data-testid="emailInput"]', "gan@example.com");
  await page.fill('[data-testid="emailConfirmInput"]', "gan@example.com");

  const requestInvitationSubmitButton = page.locator(
    '[data-testid="requestInvitationSubmitButton"]'
  );
  await requestInvitationSubmitButton.click();

  const invitationFormError = page.locator(
    '[data-testid="invitationFormError"]'
  );
  await expect(invitationFormError).toBeVisible();
});
