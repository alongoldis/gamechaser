import { prisma } from "../../../lib/db";

export default async function BrowseTrainersPage() {
  const trainers = await prisma.trainer.findMany({
    orderBy: { lastName: "asc" },
  });

  return (
    <main>
      <section style={{ marginBottom: 32 }}>
        <h1>Browse Trainers</h1>
        <p className="subtitle">
          Find experienced trainers looking for new challenges
        </p>
      </section>

      {trainers.length === 0 && <p>No trainers found.</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
          gap: 20,
        }}
      >
        {trainers.map((trainer) => (
          <div className="card" key={trainer.id}>
            <h3>
              {trainer.firstName} {trainer.lastName}
            </h3>

            <span className="badge">{trainer.sport}</span>

            <p style={{ color: "#6b7280" }}>
              📍 {trainer.city}, {trainer.country}
            </p>

            <p>
              <strong>Experience:</strong> {trainer.experience}
            </p>

            <p style={{ fontSize: 14, color: "#6b7280" }}>
              Interests: {trainer.interests}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
