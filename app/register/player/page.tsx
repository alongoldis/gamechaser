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

    if (res.ok) {
      setMessage("✅ Player registered successfully");
      form.reset();
    } else {
      setMessage(`❌ ${json.error}`);
    }
  }

  const sectionStyle = {
    border: "1px solid #e5e7eb",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    background: "#fafafa",
  };

  return (
    <main>
      <h1>Player Registration</h1>
      <p className="subtitle">
        Create your player profile and get discovered
      </p>

      <form onSubmit={handleSubmit}>
        {/* Account */}
        <div style={sectionStyle}>
          <h3>Account</h3>

          <label>Email</label>
          <input name="email" className="input" required />

          <label>Password</label>
          <input name="password" type="password" className="input" required />
        </div>

        {/* Personal */}
        <div style={sectionStyle}>
          <h3>Personal Details</h3>

          <label>First name</label>
          <input name="firstName" className="input" required />

          <label>Last name</label>
          <input name="lastName" className="input" required />

          <label>Date of birth</label>
          <input name="birthDate" type="date" className="input" required />

          <label>Nationality</label>
          <input name="nationality" className="input" required />

          <label>Country of residence</label>
          <input name="country" className="input" required />

          <label>City</label>
          <input name="city" className="input" required />
        </div>

        {/* Sport */}
        <div style={sectionStyle}>
          <h3>Sport Profile</h3>

          <label>Sport</label>
          <select name="sport" required>
            <option value="">Select sport</option>
            <option value="FOOTBALL">Football</option>
            <option value="BASKETBALL">Basketball</option>
            <option value="VOLLEYBALL">Volleyball</option>
            <option value="TENNIS">Tennis</option>
            <option value="PADEL">Padel</option>
          </select>

          <label>Position</label>
          <input name="position" className="input" required />

          <label>Handedness</label>
          <select name="foot" required>
            <option value="">Select</option>
            <option value="Right">Right</option>
            <option value="Left">Left</option>
            <option value="Both">Both</option>
          </select>

          <label>Height (cm)</label>
          <input name="heightCm" type="number" className="input" required />

          <label>Weight (kg)</label>
          <input name="weightKg" type="number" className="input" required />

          <label>Current level</label>
          <select name="level" required>
            <option value="">Select level</option>
            <option value="Professional">Professional</option>
            <option value="Semi-professional">Semi-professional</option>
            <option value="Amateur">Amateur</option>
          </select>

          <label>Previous clubs</label>
          <input name="prevClubs" className="input" />

          <label>Current club</label>
          <input name="currentClub" className="input" />
        </div>

        <button className="button">Register Player</button>
      </form>

      {message.includes("✅") && (
        <p className="message-success">{message}</p>
      )}
      {message.includes("❌") && (
        <p className="message-error">{message}</p>
      )}
    </main>
  );
}
