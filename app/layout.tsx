import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav>
          <a href="/">Home</a>
          <a href="/register/player">Register Player</a>
          <a href="/register/trainer">Register Trainer</a>
          <a href="/browse/players">Browse Players</a>
          <a href="/browse/trainers">Browse Trainers</a>
        </nav>
        {children}
      </body>
    </html>
  );
}
