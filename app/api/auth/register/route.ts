import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "../../../../lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, role, profile } = body;

    if (!email || !password || !role || !profile) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          role,
          premium: false,
        },
      });

      if (role === "PLAYER") {
        await tx.player.create({
          data: {
            userId: user.id,
            firstName: profile.firstName,
            lastName: profile.lastName,
            birthDate: new Date(profile.birthDate),
            nationality: profile.nationality,
            country: profile.country,
            city: profile.city,
            sport: profile.sport,
            position: profile.position,
            foot: profile.foot,
            heightCm: Number(profile.heightCm),
            weightKg: Number(profile.weightKg),
            level: profile.level,
            prevClubs: profile.prevClubs || "",
            currentClub: profile.currentClub || null,
          },
        });
      }

      if (role === "TRAINER") {
        await tx.trainer.create({
          data: {
            userId: user.id,
            firstName: profile.firstName,
            lastName: profile.lastName,
            birthDate: new Date(profile.birthDate),
            nationality: profile.nationality,
            country: profile.country,
            city: profile.city,

            // 🔒 ENUM-SAFE
            sport: profile.sport as any,

            certificate: profile.certificateLevel || null,
            experience: profile.experience,
            interests: profile.careerInterest,
          },
        });
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
