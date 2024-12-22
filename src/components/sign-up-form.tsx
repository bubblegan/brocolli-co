"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signUpSchema } from "@/schema/sign-up-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export function SignUpForm(props: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onSuccess: () => void;
}) {
  const { isOpen, setIsOpen, onSuccess } = props;

  const [isPending, setIsPending] = useState(false);
  const [errorMsg, setErorrMsg] = useState("");

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      emailConfirmation: "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof signUpSchema>> = async (
    data
  ) => {
    try {
      setIsPending(true);
      const response = await fetch(
        "https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.fullName,
            email: data.email,
          }),
        }
      );

      if (response.ok) {
        setIsOpen(false);
        form.reset();
        onSuccess();
      } else {
        const errorText = await response.json();
        setErorrMsg(errorText?.errorMessage);
      }
    } catch (e) {
      // catching other error like network error, timeout error
      console.log(e);
      setErorrMsg("An error occurred. Please try again later");
    }
    setIsPending(false);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
      }}
    >
      <DialogContent>
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
                    <Input placeholder="Full name" {...field} />
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
                    <Input placeholder="Email" {...field} />
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
                    <Input placeholder="Email Confirmation" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {errorMsg && (
              <div className="border border-destructive p-2 bg-red-100 rounded-sm">
                <p className="text-destructive">{errorMsg}</p>
              </div>
            )}
            <div className="flex w-full flex-row-reverse gap-2">
              <Button disabled={isPending} className="w-fit" type="submit">
                {isPending && <Loader2 className="animate-spin" />}{" "}
                {isPending ? "Requesting..." : "Request"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
