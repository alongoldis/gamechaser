"use client";

import { useState } from "react";

export default function PlayerRegisterPage() {
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("Submitting...");

    const form = e.currentTarget;
    const formData = new FormData(form);

    formData.append("role", "PLAYER");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: formData,
    });

    const json = await res.json();

    if (res.ok) {
      setMessage("✅ Player registered successfully");
      form.reset();
    } else {
      setMessage(`❌ ${json.error || "Registration failed"}`);
    }
  }

  return (
    <main className="page">
      <form className="card" onSubmit={handleSubmit}>
        <h1>Player Registration</h1>
        <p className="subtitle">Create your player profile</p>

        <section>
          <h3>Account</h3>
          <input name="email" placeholder="Email" required />
          <input name="password" type="password" placeholder="Password" required />
        </section>

        <section>
          <h3>Personal Details</h3>
          <input name="firstName" placeholder="First name" required />
          <input name="lastName" placeholder="Last name" required />
          <input name="birthDate" type="date" required />
          <input name="nationality" placeholder="Nationality" required />
          <input name="country" placeholder="Country of residence" required />
          <input name="city" placeholder="City" required />
        </section>

        <section>
          <h3>Sport Profile</h3>

          <select name="sport" required>
            <option value="">Select sport</option>
            <option value="FOOTBALL">Football</option>
            <option value="BASKETBALL">Basketball</option>
            <option value="VOLLEYBALL">Volleyball</option>
            <option value="TENNIS">Tennis</option>
            <option value="PADEL">Padel</option>
          </select>

          <input name="position" placeholder="Position" required />

          <select name="foot" required>
            <option value="">Handedness</option>
            <option value="RIGHT">Right</option>
            <option value="LEFT">Left</option>
            <option value="BOTH">Both</option>
          </select>

          <input name="heightCm" type="number" placeholder="Height (cm)" required />
          <input name="weightKg" type="number" placeholder="Weight (kg)" required />

          <select name="level" required>
            <option value="">Current level</option>
            <option value="Professional">Professional</option>
            <option value="Semi-professional">Semi-professional</option>
            <option value="Amateur">Amateur</option>
          </select>

          <input name="prevClubs" placeholder="Previous clubs" />
          <input name="currentClub" placeholder="Current club" />
        </section>

        <section>
          <h3>Profile Picture</h3>
          <input type="file" name="image" accept="image/*" />
        </section>

        <button type="submit">Register Player</button>

        {message && <p className="message">{message}</p>}
      </form>
    </main>
  );
}
