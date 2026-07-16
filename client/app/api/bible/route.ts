import { NextResponse } from "next/server";
import { promises as fs } from "fs";

export async function GET() {
  const file = await fs.readFile(process.cwd() + "../../Bible.json", "utf8");
  const data = JSON.parse(file);
  return NextResponse.json({ data: data });
}
