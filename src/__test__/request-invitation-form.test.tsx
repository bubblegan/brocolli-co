// DialogForm.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { RequestInvitationForm } from "@/components/request-invitation-form";
import { invitationRequestUrl } from "@/lib/endpoints";

const mockSetIsOpen = jest.fn();
const mockOnSuccess = jest.fn();

async function fillInForm({
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

describe("RequestInvitationForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    render(
      <RequestInvitationForm
        isOpen={true}
        setIsOpen={mockSetIsOpen}
        onSuccess={mockOnSuccess}
      />
    );
  });

  it("should fill in the form and able to submit if all input are valid", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });

    const fullName = "Gan Sheng";
    const email = "ganshenghong@example.com";

    await fillInForm({
      fullName,
      email,
      emailConfirm: email,
    });

    const submitButton = screen.getByTestId("requestInvitationButton");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        invitationRequestUrl,
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: fullName,
            email: email,
          }),
        })
      );
      expect(mockOnSuccess).toHaveBeenCalled();
      expect(mockSetIsOpen).toHaveBeenCalled();
    });
  });

  it("should shows error message when the API call fails (non-OK status)", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ errorMessage: "Email already in use" }),
    });

    const fullName = "Gan Sheng";
    const email = "ganshenghong@example.com";

    await fillInForm({
      fullName,
      email,
      emailConfirm: email,
    });

    const submitButton = screen.getByTestId("requestInvitationButton");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    expect(mockSetIsOpen).not.toHaveBeenCalled();
    expect(mockOnSuccess).not.toHaveBeenCalled();

    // error message was shown
    expect(screen.getByText("Email already in use")).toBeInTheDocument();
  });

  it("should not call API when the form is invalidated", async () => {
    // full name is shorter than 2 characters
    const fullName = "g";
    const email = "ganshenghong@example.com";

    await fillInForm({
      fullName,
      email,
      emailConfirm: email,
    });

    const submitButton = screen.getByTestId("requestInvitationButton");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).not.toHaveBeenCalled();
    });

    expect(mockSetIsOpen).not.toHaveBeenCalled();
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });
});
