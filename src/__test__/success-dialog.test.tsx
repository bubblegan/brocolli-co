import { render, screen, fireEvent } from "@testing-library/react";
import { SuccessDialog } from "@/components/success-dialog";

describe("SuccessDialog", () => {
  it("fires onClick event when button is clicked", () => {
    const setIsOpen = jest.fn();
    render(<SuccessDialog isOpen={true} setIsOpen={setIsOpen} />);

    const button = screen.getByTestId("successDialogButton");
    fireEvent.click(button);

    expect(setIsOpen).toHaveBeenCalledWith(false);
  });
});
