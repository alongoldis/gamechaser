"use client";

import { useState } from "react";

export default function TrainerRegisterPage() {
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("Submitting...");

    const form = e.currentTarget;
    const file = (form.profileImage as HTMLInputElement).files?.[0];

    let imageUrl: string | null = null;

    if (file) {
      const fd = new FormData();
      fd.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: fd,
      });

      const uploadJson = await uploadRes.json();
      imageUrl = uploadJson.url;
    }

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
        profileImage: imageUrl,
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
    <div className="page-container">
      <h1>Trainer Registration</h1>
      <p className="subtitle">Create your trainer profile</p>

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
          <div className="section-title">Professional Profile</div>
          <select name="sport" required>
            <option value="">Sport</option>
            <option value="FOOTBALL">Football</option>
            <option value="BASKETBALL">Basketball</option>
            <option value="VOLLEYBALL">Volleyball</option>
            <option value="TENNIS">Tennis</option>
            <option value="PADEL">Padel</option>
          </select>

          <input name="certificate" placeholder="Coaching certificate" />
          <input name="experience" placeholder="Experience" required />
          <input name="interests" placeholder="Career interests" required />
        </div>

        <div className="section">
          <div className="section-title">Profile Picture</div>
          <input
            type="file"
            name="profileImage"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setPreview(URL.createObjectURL(file));
            }}
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              style={{ width: 120, borderRadius: "50%", marginTop: 12 }}
            />
          )}
        </div>

        <button type="submit">Register Trainer</button>
        <div className="message">{message}</div>
      </form>
    </div>
  );
}
