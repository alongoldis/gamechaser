import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav
          style={{
            background: "white",
            padding: "16px 24px",
            borderBottom: "1px solid #e5e7eb",
            marginBottom: 24,
          }}
        >
          <a href="/" style={{ marginRight: 20 }}>Home</a>
          <a href="/register/player" style={{ marginRight: 20 }}>
            Register Player
          </a>
          <a href="/register/trainer" style={{ marginRight: 20 }}>
            Register Trainer
          </a>
          <a href="/browse/players" style={{ marginRight: 20 }}>
            Browse Players
          </a>
          <a href="/browse/trainers">
            Browse Trainers
          </a>
        </nav>

        <main>{children}</main>
      </body>
    </html>
  );
}
