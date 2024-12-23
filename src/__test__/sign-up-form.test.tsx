// DialogForm.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { RequestInvitationForm } from "@/components/request-invitation-form";
import { invitationRequestUrl } from "@/lib/endpoints";

const mockSetIsOpen = jest.fn();
const mockOnSuccess = jest.fn();

describe("Sign Up Form", () => {
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

  it("it should render form when isOpen set to true", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({}),
    });

    const fullNameInput = screen.getByTestId("fullNameInput");
    const emailInput = screen.getByTestId("emailInput");
    const emailConfirmInput = screen.getByTestId("emailConfirmInput");

    await userEvent.type(fullNameInput, "Gan Sheng");
    await userEvent.type(emailInput, "ganshenghong@example.com");
    await userEvent.type(emailConfirmInput, "ganshenghong@example.com");

    const submitButton = screen.getByTestId("requestInvitationButton");
    fireEvent.click(submitButton);

    await waitFor(() => {
      // Expect fetch to have been called with correct payload
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        invitationRequestUrl,
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: "Gan Sheng",
            email: "ganshenghong@example.com",
          }),
        })
      );
    });
  });

  it("shows an error message when the API call fails (non-OK status)", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ errorMessage: "Email already in use" }),
    });

    // Render the SignUpForm with isOpen = true

    const fullNameInput = screen.getByTestId("fullNameInput");
    const emailInput = screen.getByTestId("emailInput");
    const emailConfirmInput = screen.getByTestId("emailConfirmInput");

    await userEvent.type(fullNameInput, "Gan Sheng");
    await userEvent.type(emailInput, "ganshenghong@example.com");
    await userEvent.type(emailConfirmInput, "ganshenghong@example.com");

    // Submit
    const submitButton = screen.getByTestId("requestInvitationButton");
    fireEvent.click(submitButton);

    // Check that fetch was called
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    // Because it's an error response:
    expect(mockSetIsOpen).not.toHaveBeenCalled();
    expect(mockOnSuccess).not.toHaveBeenCalled();

    // The component should display the returned error
    expect(screen.getByText("Email already in use")).toBeInTheDocument();
  });

  it("should not call API when there is error within the form and press submit", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ errorMessage: "Email already in use" }),
    });

    const fullNameInput = screen.getByTestId("fullNameInput");
    const emailInput = screen.getByTestId("emailInput");
    const emailConfirmInput = screen.getByTestId("emailConfirmInput");

    await userEvent.type(fullNameInput, "a");
    await userEvent.type(emailInput, "ganshenghong@example.com");
    await userEvent.type(emailConfirmInput, "ganshenghong@example.com");

    const submitButton = screen.getByTestId("requestInvitationButton");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(global.fetch).not.toHaveBeenCalled();
    });
  });
});
