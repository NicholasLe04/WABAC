import { promises as fs } from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, email, and password are required' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'src', 'data', 'users.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const users = JSON.parse(fileContents);

    const userExists = users.some((u: any) => u.email === email);
    if (userExists) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 });
    }

    const newUser = {
      id: String(users.length + 1),
      name,
      email,
      password, // In a real app, hash this password!
      phone: ""
    };

    users.push(newUser);

    // NOTE: This will only work in a local development environment.
    // In a production/serverless environment, the filesystem is often ephemeral.
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));

    return NextResponse.json({ success: true, message: 'User created successfully.' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'An error occurred while processing the request' }, { status: 500 });
  }
} 