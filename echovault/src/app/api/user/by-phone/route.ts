import { promises as fs } from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

const usersFilePath = path.join(process.cwd(), 'src', 'data', 'users.json');

// Normalize phone numbers to a consistent format for comparison
const normalizePhoneNumber = (phone: string) => {
  return phone.replace(/[^0-9]/g, '').slice(-10); // Keep last 10 digits
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const phone = searchParams.get('phone');

    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    const fileContents = await fs.readFile(usersFilePath, 'utf8');
    const users = JSON.parse(fileContents);

    const normalizedPhoneToFind = normalizePhoneNumber(phone);

    const user = users.find((u: any) => {
      if (!u.phone) return false;
      const normalizedUserPhone = normalizePhoneNumber(u.phone);
      return normalizedUserPhone === normalizedPhoneToFind;
    });

    if (user) {
      const { password, ...userWithoutPassword } = user;
      return NextResponse.json(userWithoutPassword);
    } else {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Failed to get user by phone:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 