import { promises as fs } from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // In a real app, never store passwords in plaintext!
  const filePath = path.join(process.cwd(), 'src', 'data', 'users.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const users = JSON.parse(fileContents);

  const user = users.find((u: any) => u.email === email && u.password === password);

  if (user) {
    // In a real app, you'd create a JWT here.
    // For this example, we'll just return the user object.
    return NextResponse.json({ id: user.id, email: user.email });
  } else {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
} 