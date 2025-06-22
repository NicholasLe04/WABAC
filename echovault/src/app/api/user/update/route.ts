import { promises as fs } from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

const usersFilePath = path.join(process.cwd(), 'src', 'data', 'users.json');

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, phone } = body;

    if (!userId || typeof phone === 'undefined') {
      return NextResponse.json({ error: 'User ID and phone number are required' }, { status: 400 });
    }

    const fileContents = await fs.readFile(usersFilePath, 'utf8');
    let users = JSON.parse(fileContents);

    const userIndex = users.findIndex((u: any) => u.id === userId);

    if (userIndex === -1) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    users[userIndex].phone = phone;

    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));

    return NextResponse.json({ success: true, user: users[userIndex] });
  } catch (error) {
    console.error('Failed to update user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 