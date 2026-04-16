import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ funnel: null });
}

export async function PATCH() {
  return NextResponse.json({ message: "Funnel updated" });
}

export async function DELETE() {
  return NextResponse.json({ message: "Funnel deleted" });
}
