export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/db";
export async function GET() {
  const trainers = await prisma.trainer.findMany({
    include: {
      user: true,
    },
  });

  return NextResponse.json(trainers);
}
