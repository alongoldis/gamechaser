export default function HomePage() {
  return (
    <main>
      <h1 style={{ fontSize: 36, marginBottom: 8 }}>
        ⚽ GameChaser
      </h1>

      <p
        className="subtitle"
        style={{ fontSize: 18, marginBottom: 32 }}
      >
        Get discovered. Connect players, trainers, and clubs worldwide.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 24,
        }}
      >
        {/* Players */}
        <div
          style={{
            padding: 24,
            borderRadius: 16,
            background: "#eef2ff",
          }}
        >
          <h3>Players</h3>
          <p>
            Create your profile and let clubs and trainers find you.
          </p>
          <a href="/register/player">Register as Player →</a>
        </div>

        {/* Trainers */}
        <div
          style={{
            padding: 24,
            borderRadius: 16,
            background: "#ecfeff",
          }}
        >
          <h3>Trainers</h3>
          <p>
            Advertise your experience and connect with players and clubs.
          </p>
          <a href="/register/trainer">Register as Trainer →</a>
        </div>

        {/* Browse */}
        <div
          style={{
            padding: 24,
            borderRadius: 16,
            background: "#fefce8",
          }}
        >
          <h3>🔍 Browse</h3>
          <p>
            Explore available players and trainers from around the world.
          </p>
          <a href="/browse/players">Browse profiles →</a>
        </div>
      </div>
    </main>
  );
}
