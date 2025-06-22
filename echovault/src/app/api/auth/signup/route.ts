import { promises as fs } from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const filePath = path.join(process.cwd(), 'src', 'data', 'users.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const users = JSON.parse(fileContents);

  const existingUser = users.find((u: any) => u.email === email);
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 409 });
  }

  const newUser = {
    id: String(users.length + 1),
    email,
    password, // Again, never store plaintext passwords in a real app
  };

  users.push(newUser);

  // NOTE: This will only work in a local development environment.
  // In a production/serverless environment, the filesystem is often ephemeral.
  await fs.writeFile(filePath, JSON.stringify(users, null, 2));

  return NextResponse.json({ id: newUser.id, email: newUser.email }, { status: 201 });
} 