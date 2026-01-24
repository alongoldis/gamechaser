import { prisma } from "../../../lib/db";

export default async function BrowsePlayersPage() {
  const players = await prisma.player.findMany({
    orderBy: { lastName: "asc" },
  });

  return (
    <main>
      <section style={{ marginBottom: 32 }}>
        <h1>Browse Players</h1>
        <p className="subtitle">
          Discover players available for new opportunities
        </p>
      </section>

      {players.length === 0 && <p>No players found.</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 20,
        }}
      >
        {players.map((player) => (
          <div className="card" key={player.id}>
            <h3>
              {player.firstName} {player.lastName}
            </h3>

            <span className="badge">{player.level}</span>

            <p style={{ color: "#6b7280" }}>
              📍 {player.city}, {player.country}
            </p>

            <p>
              🏅 <strong>{player.sport}</strong> · {player.position}
            </p>

            <p style={{ fontSize: 14, color: "#6b7280" }}>
              {player.heightCm} cm · {player.weightKg} kg
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
