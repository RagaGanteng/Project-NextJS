// app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'public/user.json');

export async function POST(req: Request) {
  const newUser = await req.json();
  const users = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  
  const exists = users.find((u: any) => u.email === newUser.email);
  if (exists) return NextResponse.json({ error: "User already exists" }, { status: 409 });

  const id = users.length ? users[users.length - 1].id + 1 : 1;
  users.push({ id, ...newUser });

  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  return NextResponse.json({ message: "User registered" }, { status: 201 });
}
