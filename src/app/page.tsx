import { SignUpSection } from "./_components/sign-up-section";

export default function Home() {
  return (
    <main className="max-h-screen px-4 md:px-0 md:pt-32 pt-28 flex flex-col gap-6 items-center justify-center">
      <h1 className="text-4xl font-bold text-center">
        A Better Way To Enjoy Everyday
      </h1>
      <p className="text-muted-foreground text-lg text-center max-w-[40rem]">
        Broccoli & Co. is an upcoming online service company. Empowering
        everyday life through seamless online services
      </p>
      <SignUpSection />
    </main>
  );
}
