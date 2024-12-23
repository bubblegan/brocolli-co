import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata: Metadata = {
  title: "BROCCOLI AND CO.",
  description:
    "Broccoli & Co. is an upcoming online service company. Empowering everyday life through seamless online services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentYear = new Date().getFullYear();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={"antialiased"}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <div className="relative flex flex-col h-screen">
            <header className="top-0 z-50 w-full border-b bg-background">
              <div className="container flex h-16 items-center">
                <p className="font-bold text-base">BROCCOLI AND CO.</p>
              </div>
            </header>
            {children}
            <footer className="w-full border-t bg-background bottom-0 h-[120px] items-end pt-6">
              <div className="flex items-center justify-center w-full container">
                <p> © {currentYear} Broccoli &amp; Co. All rights reserved.</p>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
