"use client";

import { useState } from "react";

export default function TrainerRegisterPage() {
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const json = await res.json();
    if (res.ok) setImageUrl(json.url);
    else alert("Image upload failed");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

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
        imageUrl,
      },
    };

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    setMessage(res.ok ? "✅ Trainer registered" : `❌ ${json.error}`);
  }

  return (
    <main className="container">
      <h1>Register Trainer</h1>

      <form onSubmit={handleSubmit} className="card">
        <input name="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <input name="firstName" placeholder="First name" required />
        <input name="lastName" placeholder="Last name" required />
        <label>Date of birth</label>
        <input name="birthDate" type="date" required />

        <input name="nationality" placeholder="Nationality" required />
        <input name="country" placeholder="Country" required />
        <input name="city" placeholder="City" required />

        <select name="sport" required>
          <option value="">Sport</option>
          <option value="FOOTBALL">Football</option>
          <option value="BASKETBALL">Basketball</option>
          <option value="VOLLEYBALL">Volleyball</option>
          <option value="TENNIS">Tennis</option>
          <option value="PADEL">Padel</option>
        </select>

        <input name="certificate" placeholder="Certificates" />
        <textarea name="experience" placeholder="Experience" required />
        <textarea name="interests" placeholder="Interests" required />

        <label>Profile picture</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files && uploadImage(e.target.files[0])}
        />

        {imageUrl && (
          <img
            src={imageUrl}
            alt="Preview"
            style={{ width: 120, borderRadius: "50%" }}
          />
        )}

        <button type="submit">Register Trainer</button>
      </form>

      <p>{message}</p>
    </main>
  );
}
