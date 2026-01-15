export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav style={{ padding: 20, borderBottom: "1px solid #ddd" }}>
          <a href="/" style={{ marginRight: 15 }}>Home</a>
          <a href="/register/player" style={{ marginRight: 15 }}>Register Player</a>
          <a href="/register/trainer">Register Trainer</a>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
