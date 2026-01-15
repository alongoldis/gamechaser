"use client";

import { useState } from "react";

export default function PlayerRegisterPage() {
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("Submitting...");

    const form = e.currentTarget;

    const data = {
      email: form.email.value,
      password: form.password.value,
      role: "PLAYER",
      profile: {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        birthDate: form.birthDate.value,
        nationality: form.nationality.value,
        country: form.country.value,
        city: form.city.value,
        sport: "FOOTBALL",
        position: form.position.value,
        foot: form.foot.value,
        heightCm: Number(form.heightCm.value),
        weightKg: Number(form.weightKg.value),
        level: form.level.value,
        prevClubs: form.prevClubs.value,
        currentClub: form.currentClub.value,
      },
    };

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (res.ok) {
      setMessage("✅ Player registered successfully");
      form.reset();
    } else {
      setMessage(`❌ ${json.error}`);
    }
  }

  return (
    <main style={{ padding: 40 }}>
      <h1>Player Registration</h1>

      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" required /><br /><br />
        <input name="password" type="password" placeholder="Password" required /><br /><br />
        <input name="firstName" placeholder="First name" required /><br /><br />
        <input name="lastName" placeholder="Last name" required /><br /><br />
        <input name="birthDate" type="date" required /><br /><br />
        <input name="nationality" placeholder="Nationality" required /><br /><br />
        <input name="country" placeholder="Country" required /><br /><br />
        <input name="city" placeholder="City" required /><br /><br />
        <input name="position" placeholder="Position" required /><br /><br />
        <input name="foot" placeholder="Preferred foot" required /><br /><br />
        <input name="heightCm" type="number" placeholder="Height (cm)" required /><br /><br />
        <input name="weightKg" type="number" placeholder="Weight (kg)" required /><br /><br />
        <input name="level" placeholder="Level" required /><br /><br />
        <input name="prevClubs" placeholder="Previous clubs" /><br /><br />
        <input name="currentClub" placeholder="Current club" /><br /><br />

        <button type="submit">Register Player</button>
      </form>

      <p>{message}</p>
    </main>
  );
}
