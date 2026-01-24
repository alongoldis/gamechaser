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
    setMessage(res.ok ? "✅ Player registered" : `❌ ${json.error}`);
  }

  return (
    <div className="page-container">
      <h1>Player Registration</h1>
      <p className="subtitle">Create your player profile</p>

      <form onSubmit={handleSubmit}>
        <div className="section">
          <div className="section-title">Account</div>
          <input name="email" placeholder="Email" required />
          <input name="password" type="password" placeholder="Password" required />
        </div>

        <div className="section">
          <div className="section-title">Personal Details</div>
          <input name="firstName" placeholder="First name" required />
          <input name="lastName" placeholder="Last name" required />
          <label>Date of birth</label>
          <input name="birthDate" type="date" required />
          <input name="nationality" placeholder="Nationality" required />
          <input name="country" placeholder="Country of residence" required />
          <input name="city" placeholder="City" required />
        </div>

        <div className="section">
          <div className="section-title">Sport Profile</div>
          <select name="sport" required>
            <option value="">Select sport</option>
            <option value="FOOTBALL">Football</option>
            <option value="BASKETBALL">Basketball</option>
            <option value="VOLLEYBALL">Volleyball</option>
            <option value="TENNIS">Tennis</option>
            <option value="PADEL">Padel</option>
          </select>

          <input name="position" placeholder="Position" />
          <select name="foot">
            <option value="">Handedness</option>
            <option value="Right">Right</option>
            <option value="Left">Left</option>
            <option value="Both">Both</option>
          </select>

          <input name="heightCm" type="number" placeholder="Height (cm)" />
          <input name="weightKg" type="number" placeholder="Weight (kg)" />

          <select name="level">
            <option value="">Current level</option>
            <option value="Professional">Professional</option>
            <option value="Semi-professional">Semi-professional</option>
            <option value="Amateur">Amateur</option>
          </select>

          <input name="prevClubs" placeholder="Previous clubs" />
          <input name="currentClub" placeholder="Current club" />
        </div>

        <button type="submit">Register Player</button>
        <div className="message">{message}</div>
      </form>
    </div>
  );
}
