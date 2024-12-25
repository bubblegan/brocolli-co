"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { invitationSchema } from "@/schema/invitation-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { invitationRequestUrl } from "@/lib/endpoints";

export function RequestInvitationForm(props: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSuccess: () => void;
}) {
  const { isOpen, setIsOpen, onSuccess } = props;

  const [isPending, setIsPending] = useState(false);
  const [errorMsg, setErorrMsg] = useState("");

  const form = useForm<z.infer<typeof invitationSchema>>({
    resolver: zodResolver(invitationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      emailConfirmation: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof invitationSchema>> = async (
    data
  ) => {
    try {
      setIsPending(true);
      const response = await fetch(invitationRequestUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.fullName,
          email: data.email,
        }),
      });
      if (response.ok) {
        setIsOpen(false);
        setErorrMsg("");
        form.reset();
        onSuccess();
      } else {
        const errorText: { errorMessage: string } = await response.json();
        setErorrMsg(errorText?.errorMessage);
      }
    } catch {
      setErorrMsg("An error occurred. Please try again later");
    }
    setIsPending(false);
  };

  return (
    <Dialog
      data-testid="requestInvitationDialog"
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
      }}
    >
      <DialogContent aria-describedby="Request for invitation form">
        <VisuallyHidden.Root asChild>
          <DialogTitle>Request Invitation Form</DialogTitle>
        </VisuallyHidden.Root>
        <div className="py-3">
          <p className="text-center text-lg font-semibold">
            Request For Invitation
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      data-testid={"fullNameInput"}
                      placeholder="Full name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      data-testid={"emailInput"}
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emailConfirmation"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      data-testid={"emailConfirmInput"}
                      placeholder="Email Confirmation"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {errorMsg && (
              <div
                data-testid="invitationFormError"
                className="border border-destructive p-2 bg-red-100 rounded-sm"
              >
                <p className="text-destructive">{errorMsg}</p>
              </div>
            )}
            <div className="flex w-full flex-row-reverse gap-2">
              <Button
                data-testid={"requestInvitationSubmitButton"}
                disabled={isPending}
                className="w-fit"
                type="submit"
              >
                {isPending && <Loader2 className="animate-spin" />}{" "}
                {isPending ? "Requesting..." : "Request"}
              </Button>
            </div>
          </form>
        </Form>
        <VisuallyHidden.Root>
          <DialogDescription>
            Requesting invitation form for broccoli co service
          </DialogDescription>
        </VisuallyHidden.Root>
      </DialogContent>
    </Dialog>
  );
}
