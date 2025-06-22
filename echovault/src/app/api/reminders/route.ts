import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { Reminder } from '@/lib/types';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'reminders.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const reminders = JSON.parse(fileContents);
    return NextResponse.json(reminders);
  } catch (error) {
    console.error('Failed to get reminders:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId, title, date, notes } = await request.json();
    
    if (!userId || !title) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'src', 'data', 'reminders.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const reminders: Reminder[] = JSON.parse(fileContents);

    const newReminder: Reminder = {
      id: `reminder_${Date.now()}`,
      userId,
      title,
      date,
      notes
    };

    reminders.push(newReminder);
    await fs.writeFile(filePath, JSON.stringify(reminders, null, 2));

    return NextResponse.json(newReminder);
  } catch (error) {
    console.error('Failed to create reminder:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 