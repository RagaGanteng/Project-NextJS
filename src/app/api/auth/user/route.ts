// app/api/user/route.ts
import { NextResponse } from 'next/server';

let users = [
  { id: 1, name: "Raga Kusnira", email: "raga@gmail.com", password: "123456" },
  { id: 2, name: "Adi Apriyanto", email: "adi@gmail.com", password: "abcdef" },
];

export async function GET() {
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const data = await req.json();
  const newUser = {
    id: users.length + 1,
    ...data,
  };
  users.push(newUser);
  return NextResponse.json(newUser, { status: 201 });
}
