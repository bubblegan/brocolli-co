"use client";

import { RequestInvitationForm } from "@/components/request-invitation-form";
import { SuccessDialog } from "@/components/success-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function SignUpSection() {
  const [isSignUpFormOpen, setIsSignUpFormOpen] = useState(false);
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);

  return (
    <div>
      <Button
        className="text-base"
        size={"lg"}
        onClick={() => setIsSignUpFormOpen(true)}
      >
        Request For Invitation
      </Button>
      <RequestInvitationForm
        isOpen={isSignUpFormOpen}
        setIsOpen={setIsSignUpFormOpen}
        onSuccess={() => {
          setIsSuccessAlertOpen(true);
        }}
      />
      <SuccessDialog
        isOpen={isSuccessAlertOpen}
        setIsOpen={setIsSuccessAlertOpen}
      />
    </div>
  );
}
