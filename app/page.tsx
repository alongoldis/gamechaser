export default function HomePage() {
  return (
    <main style={{ padding: 40 }}>
      <h1>GameChaser MVP</h1>

      <ul>
        <li><a href="/register/player">Register Player</a></li>
        <li><a href="/register/trainer">Register Trainer</a></li>
        <li><a href="/browse/players">Browse Players</a></li>
        <li><a href="/browse/trainers">Browse Trainers</a></li>
      </ul>
    </main>
  );
}
