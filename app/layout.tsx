import "./globals.css";

export const metadata = { title: "FISG Companion v2" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="container pb-24">{children}</div>
      </body>
    </html>
  );
}
