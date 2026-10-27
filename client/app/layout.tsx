import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bread & Light",
  description: "A Bible reader with cross-references.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="uk"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
