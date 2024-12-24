import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";

export async function fillInvitationForm({
  fullName,
  email,
  emailConfirm,
}: {
  fullName: string;
  email: string;
  emailConfirm: string;
}) {
  const fullNameInput = screen.getByTestId("fullNameInput");
  const emailInput = screen.getByTestId("emailInput");
  const emailConfirmInput = screen.getByTestId("emailConfirmInput");

  await userEvent.type(fullNameInput, fullName);
  await userEvent.type(emailInput, email);
  await userEvent.type(emailConfirmInput, emailConfirm);
}
