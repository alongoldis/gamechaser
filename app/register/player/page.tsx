"use client";

import { useState } from "react";

export default function PlayerRegisterPage() {
  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("Submitting...");

    const form = e.currentTarget;
    const file = (form.profileImage as HTMLInputElement).files?.[0];

    let imageUrl: string | null = null;

    // 1️⃣ Upload image first (if selected)
    if (file) {
      const uploadData = new FormData();
      uploadData.append("file", file);

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const uploadJson = await uploadRes.json();
      imageUrl = uploadJson.url;
    }

    // 2️⃣ Register player
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
        imageUrl,
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
      setImagePreview(null);
    } else {
      setMessage(`❌ ${json.error}`);
    }
  }

  return (
    <main className="form-card">
      <h1>Player Registration</h1>
      <p className="subtitle">Create your player profile and get discovered</p>

      <form onSubmit={handleSubmit} className="form">
        {/* ACCOUNT */}
        <section>
          <h3>Account</h3>
          <input name="email" placeholder="Email" required />
          <input name="password" type="password" placeholder="Password" required />
        </section>

        {/* PERSONAL */}
        <section>
          <h3>Personal Details</h3>
          <input name="firstName" placeholder="First name" required />
          <input name="lastName" placeholder="Last name" required />
          <input name="birthDate" type="date" required />
          <input name="nationality" placeholder="Nationality" required />
          <input name="country" placeholder="Country of residence" required />
          <input name="city" placeholder="City" required />
        </section>

        {/* SPORT */}
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

        {/* IMAGE UPLOAD */}
        <section>
          <h3>Profile Picture</h3>

          <input
            type="file"
            name="profileImage"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setImagePreview(URL.createObjectURL(file));
              }
            }}
          />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="image-preview"
            />
          )}
        </section>

        <button type="submit">Register Player</button>
        <p>{message}</p>
      </form>
    </main>
  );
}
