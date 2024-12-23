"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";

export function SuccessDialog(props: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) {
  const { isOpen, setIsOpen } = props;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
      }}
    >
      <DialogContent className="gap-4">
        <VisuallyHidden.Root asChild>
          <DialogTitle>Request Succeeed</DialogTitle>
        </VisuallyHidden.Root>
        <div className="py-3">
          <p className="text-center text-lg font-semibold">Request Succeed</p>
        </div>
        <div>
          <p className="text-center">
            Your request was successfully sent to Broccoli & Co. We will get
            back to you via email once it is confirmed.
          </p>
        </div>
        <Button
          data-testid="successDialogButton"
          onClick={() => setIsOpen(false)}
        >
          Alright!
        </Button>
        <VisuallyHidden.Root>
          <DialogDescription>Requesting Success Message</DialogDescription>
        </VisuallyHidden.Root>
      </DialogContent>
    </Dialog>
  );
}
