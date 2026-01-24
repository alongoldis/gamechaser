import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav style={{ padding: 20, background: "#fff", borderBottom: "1px solid #ddd" }}>
          <a href="/" style={{ marginRight: 15 }}>Home</a>
          <a href="/register/player" style={{ marginRight: 15 }}>Register Player</a>
          <a href="/register/trainer" style={{ marginRight: 15 }}>Register Trainer</a>
          <a href="/browse/players" style={{ marginRight: 15 }}>Browse Players</a>
          <a href="/browse/trainers">Browse Trainers</a>
        </nav>
        {children}
      </body>
    </html>
  );
}
