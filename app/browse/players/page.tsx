"use client";

import { useEffect, useState } from "react";

export default function BrowsePlayersPage() {
  const [players, setPlayers] = useState<any[]>([]);
  const [sport, setSport] = useState("");
  const [position, setPosition] = useState("");
  const [level, setLevel] = useState("");

  async function loadPlayers() {
    const params = new URLSearchParams();
    if (sport) params.append("sport", sport);
    if (position) params.append("position", position);
    if (level) params.append("level", level);

    const res = await fetch(`/api/browse/players?${params.toString()}`);
    const data = await res.json();
    setPlayers(data);
  }

  useEffect(() => {
    loadPlayers();
  }, []);

  return (
    <main style={{ padding: 40 }}>
      <h1>Browse Players</h1>

      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Sport"
          value={sport}
          onChange={(e) => setSport(e.target.value)}
        />{" "}
        <input
          placeholder="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />{" "}
        <input
          placeholder="Level"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        />{" "}
        <button onClick={loadPlayers}>Search</button>
      </div>

      {players.length === 0 && <p>No players found.</p>}

      {players.map((p) => (
        <div
          key={p.id}
          style={{
            borderBottom: "1px solid #ddd",
            marginBottom: 15,
            paddingBottom: 10,
          }}
        >
          <strong>
            {p.firstName} {p.lastName}
          </strong>
          <div>Sport: {p.sport}</div>
          <div>Position: {p.position}</div>
          <div>Level: {p.level}</div>
        </div>
      ))}
    </main>
  );
}
