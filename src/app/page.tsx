import { RequestInvitationSection } from "./_components/request-invitation-section";

export default function Home() {
  return (
    <main className=" h-full px-4 md:px-0 flex flex-col gap-6 items-center justify-center container">
      <h1 className="text-4xl font-bold text-center">
        A Better Way To Enjoy Broccoli
      </h1>
      <p className="text-muted-foreground text-lg text-center max-w-[40rem]">
        Broccoli & Co. is an upcoming online service company. Deliver fresh
        broccoli to you doorstep in just 2 days.
      </p>
      <RequestInvitationSection />
    </main>
  );
}
