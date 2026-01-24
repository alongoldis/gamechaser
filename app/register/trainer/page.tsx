"use client";

import { useState } from "react";

export default function TrainerRegisterPage() {
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("Submitting...");

    const form = e.currentTarget;
    const formData = new FormData(form);

    formData.append("role", "TRAINER");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: formData,
    });

    const json = await res.json();

    if (res.ok) {
      setMessage("✅ Trainer registered successfully");
      form.reset();
    } else {
      setMessage(`❌ ${json.error || "Registration failed"}`);
    }
  }

  return (
    <main className="page">
      <form className="card" onSubmit={handleSubmit}>
        <h1>Trainer Registration</h1>
        <p className="subtitle">Create your trainer profile</p>

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
          <h3>Professional Profile</h3>

          <select name="sport" required>
            <option value="">Select sport</option>
            <option value="FOOTBALL">Football</option>
            <option value="BASKETBALL">Basketball</option>
            <option value="VOLLEYBALL">Volleyball</option>
            <option value="TENNIS">Tennis</option>
            <option value="PADEL">Padel</option>
          </select>

          <input name="certificate" placeholder="Certificates (optional)" />
          <input name="experience" placeholder="Experience" required />
          <input name="interests" placeholder="Coaching interests" required />
        </section>

        <section>
          <h3>Profile Picture</h3>
          <input type="file" name="image" accept="image/*" />
        </section>

        <button type="submit">Register Trainer</button>

        {message && <p className="message">{message}</p>}
      </form>
    </main>
  );
}
