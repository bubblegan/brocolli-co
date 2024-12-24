"use client";

import { RequestInvitationForm } from "@/components/request-invitation-form";
import { SuccessDialog } from "@/components/success-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function RequestInvitationSection() {
  const [isInvitationFormOpen, setIsInvitationFormOpen] = useState(false);
  const [isSuccessAlertOpen, setIsSuccessAlertOpen] = useState(false);

  return (
    <section>
      <Button
        data-testid="requestInvitationButton"
        className="text-base"
        size={"lg"}
        onClick={() => setIsInvitationFormOpen(true)}
      >
        Request For Invitation
      </Button>
      <RequestInvitationForm
        isOpen={isInvitationFormOpen}
        setIsOpen={setIsInvitationFormOpen}
        onSuccess={() => {
          setIsSuccessAlertOpen(true);
        }}
      />
      <SuccessDialog
        isOpen={isSuccessAlertOpen}
        setIsOpen={setIsSuccessAlertOpen}
      />
    </section>
  );
}
