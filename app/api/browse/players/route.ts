export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/db";
import { Sport } from "@prisma/client";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const sport = searchParams.get("sport");
  const position = searchParams.get("position");
  const level = searchParams.get("level");

  const where: any = {};

  if (sport) where.sport = sport as Sport;
  if (position) where.position = position;
  if (level) where.level = level;

  const players = await prisma.player.findMany({
    where,
  });

  return NextResponse.json(players);
}
