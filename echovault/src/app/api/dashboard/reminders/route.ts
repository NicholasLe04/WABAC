import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'reminders.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const reminders = JSON.parse(fileContents);
    
    // Sort by date descending
    const sortedReminders = reminders.sort((a: any, b: any) => {
      const dateA = new Date(a.date || a.created_at || '');
      const dateB = new Date(b.date || b.created_at || '');
      return dateB.getTime() - dateA.getTime();
    });
    
    return NextResponse.json(sortedReminders);
  } catch (error) {
    console.error('Failed to get reminders:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 