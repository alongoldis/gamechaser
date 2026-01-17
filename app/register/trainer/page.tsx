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

        // 🔒 ENUM-SAFE VALUE
        sport: form.sport.value,

        certificateLevel: form.certificateLevel.value,
        experience: form.experience.value,
        careerInterest: form.careerInterest.value,
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

  return (
    <main style={{ padding: 40 }}>
      <h1>Trainer Registration</h1>

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

        <label>Sport Specialization</label><br />
        <select name="sport" required>
          <option value="">Select sport</option>
          <option value="FOOTBALL">Football</option>
          <option value="BASKETBALL">Basketball</option>
          <option value="VOLLEYBALL">Volleyball</option>
          <option value="TENNIS">Tennis</option>
          <option value="PADEL">Padel</option>
        </select><br /><br />

        <input
          name="certificateLevel"
          placeholder="Coaching certificate level (if any)"
        /><br /><br />

        <textarea
          name="experience"
          placeholder="Experience (clubs / years / level)"
          rows={3}
          required
        /><br /><br />

        <textarea
          name="careerInterest"
          placeholder="Career interests (youth/senior, club level, country)"
          rows={3}
          required
        /><br /><br />

        <button type="submit">Register Trainer</button>
      </form>

      <p>{message}</p>
    </main>
  );
}