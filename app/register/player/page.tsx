"use client";

import { useState } from "react";

const COUNTRIES = [
  "Netherlands",
  "Belgium",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "United Kingdom",
  "Portugal",
  "USA",
  "Brazil",
  "Argentina",
  "Other",
];

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

        // 🔒 ENUM-SAFE VALUE
        sport: form.sport.value,

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

        <label>Date of Birth</label><br />
        <input name="birthDate" type="date" required /><br /><br />

        <label>Nationality</label><br />
        <select name="nationality" required>
          <option value="">Select nationality</option>
          {COUNTRIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select><br /><br />

        <label>Country of Residence</label><br />
        <select name="country" required>
          <option value="">Select country</option>
          {COUNTRIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select><br /><br />

        <input name="city" placeholder="City" required /><br /><br />

        <label>Sport</label><br />
        <select name="sport" required>
          <option value="">Select sport</option>
          <option value="FOOTBALL">Football</option>
          <option value="BASKETBALL">Basketball</option>
          <option value="VOLLEYBALL">Volleyball</option>
          <option value="TENNIS">Tennis</option>
          <option value="PADEL">Padel</option>
        </select><br /><br />

        <input name="position" placeholder="Position" required /><br /><br />

        <label>Handedness</label><br />
        <select name="foot" required>
          <option value="">Select</option>
          <option value="RIGHT">Right</option>
          <option value="LEFT">Left</option>
          <option value="BOTH">Both</option>
        </select><br /><br />

        <input name="heightCm" type="number" placeholder="Height (cm)" required /><br /><br />
        <input name="weightKg" type="number" placeholder="Weight (kg)" required /><br /><br />

        <label>Current level</label><br />
        <select name="level" required>
          <option value="">Select level</option>
          <option value="PROFESSIONAL">Professional</option>
          <option value="SEMI_PRO">Semi-professional</option>
          <option value="AMATEUR">Amateur</option>
        </select><br /><br />

        <input name="prevClubs" placeholder="Previous clubs" /><br /><br />
        <input name="currentClub" placeholder="Current club (if any)" /><br /><br />

        <button type="submit">Register Player</button>
      </form>

      <p>{message}</p>
    </main>
  );
}
