import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const sport = searchParams.get("sport");
  const position = searchParams.get("position");
  const level = searchParams.get("level");

  const players = await prisma.player.findMany({
    where: {
      ...(sport && { sport }),
      ...(position && { position }),
      ...(level && { level }),
    },
    include: {
      user: true,
    },
  });

  return NextResponse.json(players);
}
