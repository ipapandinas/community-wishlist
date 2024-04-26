import "@/styles/globals.css";
import clsx from "clsx";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "sonner";
import { Metadata, Viewport } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Link } from "@nextui-org/link";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
            <footer className="w-full flex flex-col items-center justify-center py-3 gap-2 mt-8">
              <div className="flex items-center gap-4 text-current">
                <Link
                  className="text-neutral-500"
                  isExternal
                  href="https://docs.google.com/forms/d/1EzW205Ns9GL_mKrdlj_CcRYRSKvWwDonZAni4bUzilo"
                  title="Feature request form"
                >
                  Request a feature
                </Link>
                -
                <Link
                  className="text-neutral-500"
                  isExternal
                  href="https://docs.google.com/forms/d/1dZrbYoGWfgdgOctBLliB1ATbS9UR-BlDRhfZbUv6Irs"
                  title="Report bug form"
                >
                  Report a bug
                </Link>
              </div>
              <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href="https://twitter.com/dontelmo_"
                title="dontelmo's twitter"
              >
                <span className="text-default-600">Created by</span>
                <p className="text-secondary">Don Telmo</p>
              </Link>
            </footer>
            <Toaster
              toastOptions={{
                classNames: {
                  error: "bg-danger",
                  success: "text-success",
                  warning: "text-yellow-300",
                  info: "bg-blue-400",
                },
              }}
            />
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
