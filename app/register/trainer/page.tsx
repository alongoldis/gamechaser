"use client";

import { useState } from "react";

export default function TrainerRegisterPage() {
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("Submitting...");

    const form = e.currentTarget;

    const data = {
      email: form.email.value,
      password: form.password.value,
      role: "TRAINER",
      profile: {
        firstName: form.firstName.value,
        lastName: form.lastName.value,
        birthDate: form.birthDate.value,
        nationality: form.nationality.value,
        country: form.country.value,
        city: form.city.value,
        sport: form.sport.value,
        certificate: form.certificate.value,
        experience: form.experience.value,
        interests: form.interests.value,
      },
    };

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (res.ok) {
      setMessage("✅ Trainer registered successfully");
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
      <h1>Trainer Registration</h1>
      <p className="subtitle">
        Create your trainer profile and connect with clubs and players
      </p>

      <form onSubmit={handleSubmit}>
        {/* Account */}
        <div style={sectionStyle}>
          <h3>Account</h3>

          <label>Email</label>
          <input name="email" className="input" required />

          <label>Password</label>
          <input
            name="password"
            type="password"
            className="input"
            required
          />
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

        {/* Professional */}
        <div style={sectionStyle}>
          <h3>Professional Profile</h3>

          <label>Sport specialization</label>
          <select name="sport" required>
            <option value="">Select sport</option>
            <option value="FOOTBALL">Football</option>
            <option value="BASKETBALL">Basketball</option>
            <option value="VOLLEYBALL">Volleyball</option>
            <option value="TENNIS">Tennis</option>
            <option value="PADEL">Padel</option>
          </select>

          <label>Coaching certificate (optional)</label>
          <input name="certificate" className="input" />

          <label>Experience (clubs / years / level)</label>
          <input
            name="experience"
            className="input"
            placeholder="e.g. 5 years at amateur clubs"
            required
          />

          <label>Career interests</label>
          <input
            name="interests"
            className="input"
            placeholder="e.g. senior teams in Europe"
            required
          />
        </div>

        <button className="button">Register Trainer</button>
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
