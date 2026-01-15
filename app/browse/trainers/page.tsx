"use client";

import { useEffect, useState } from "react";

export default function BrowseTrainersPage() {
  const [trainers, setTrainers] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/browse/trainers")
      .then((res) => res.json())
      .then(setTrainers);
  }, []);

  return (
    <main style={{ padding: 40 }}>
      <h1>Browse Trainers</h1>

      {trainers.length === 0 && <p>No trainers yet.</p>}

      {trainers.map((t) => (
        <div
          key={t.id}
          style={{
            borderBottom: "1px solid #ddd",
            marginBottom: 15,
            paddingBottom: 10,
          }}
        >
          <strong>
            {t.firstName} {t.lastName}
          </strong>
          <div>Specialization: {t.specialization}</div>
          <div>Experience: {t.experience}</div>
        </div>
      ))}
    </main>
  );
}
