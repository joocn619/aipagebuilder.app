import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ popup: null });
}

export async function PATCH() {
  return NextResponse.json({ message: "Popup updated" });
}

export async function DELETE() {
  return NextResponse.json({ message: "Popup deleted" });
}
