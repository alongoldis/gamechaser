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

        <input name="nationality" placeholder="Nationality" required /><br /><br />
        <input name="country" placeholder="Country" required /><br /><br />
        <input name="city" placeholder="City" required /><br /><br />

        <select name="sport" required>
          <option value="">Select sport</option>
          <option value="FOOTBALL">Football</option>
          <option value="BASKETBALL">Basketball</option>
          <option value="VOLLEYBALL">Volleyball</option>
          <option value="TENNIS">Tennis</option>
          <option value="PADEL">Padel</option>
        </select>
        <br /><br />

        <input name="certificate" placeholder="Certificate (optional)" /><br /><br />

        <input name="experience" placeholder="Trainer experience" required /><br /><br />
        <input name="interests" placeholder="Trainer interests" required /><br /><br />

        <button type="submit">Register Trainer</button>
      </form>

      <p>{message}</p>
    </main>
  );
}
