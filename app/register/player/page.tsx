"use client";

import { useState } from "react";

export default function PlayerRegisterPage() {
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("Submitting...");

    const form = e.currentTarget;
    const file = (form.profileImage as HTMLInputElement).files?.[0];

    let imageUrl: string | null = null;

    // Upload image first
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
        profileImage: imageUrl,
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
            <option value="">Sport</option>
            <option value="FOOTBALL">Football</option>
            <option value="BASKETBALL">Basketball</option>
            <option value="VOLLEYBALL">Volleyball</option>
            <option value="TENNIS">Tennis</option>
            <option value="PADEL">Padel</option>
          </select>

          <input name="position" placeholder="Position" />
          <select name="foot">
            <option value="">Handedness</option>
            <option>Right</option>
            <option>Left</option>
            <option>Both</option>
          </select>

          <input name="heightCm" type="number" placeholder="Height (cm)" />
          <input name="weightKg" type="number" placeholder="Weight (kg)" />

          <select name="level">
            <option value="">Current level</option>
            <option>Professional</option>
            <option>Semi-professional</option>
            <option>Amateur</option>
          </select>

          <input name="prevClubs" placeholder="Previous clubs" />
          <input name="currentClub" placeholder="Current club" />
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

        <button type="submit">Register Player</button>
        <div className="message">{message}</div>
      </form>
    </div>
  );
}
