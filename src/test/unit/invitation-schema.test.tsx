import { ZodError } from "zod";
import { invitationSchema } from "../../schema/invitation-schema";

// mainly test on refined schema validation
describe("invitation schema validation", () => {
  it("should fail when emails do not match", () => {
    const invalidData = {
      fullName: "gan",
      email: "gan@example.com",
      emailConfirmation: "1gan@example.com",
    };

    try {
      invitationSchema.parse(invalidData);
    } catch (error) {
      if (error instanceof ZodError) {
        expect(error.errors).toEqual(
          expect.arrayContaining([
            expect.objectContaining({
              message: "Emails do not match",
              path: ["emailConfirmation"],
            }),
          ])
        );
      } else {
        throw error;
      }
    }
  });
});
