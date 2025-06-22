import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'reminders.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const reminders = JSON.parse(fileContents);
  
  // In a real app, you would filter reminders by the logged-in user's ID.
  return NextResponse.json(reminders);
} 