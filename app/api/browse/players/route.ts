import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const sport = searchParams.get("sport");
  const position = searchParams.get("position");
  const level = searchParams.get("level");

  const where: any = {};

  if (sport) where.sport = sport;
  if (position) where.position = position;
  if (level) where.level = level;

  const players = await prisma.player.findMany({ where });

  return NextResponse.json(players);
}
