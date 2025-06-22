import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'memories.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const memories = JSON.parse(fileContents);
    
    // Sort by date/createdAt descending and take the 5 most recent
    const sortedMemories = memories
      .sort((a, b) => {
        const dateA = new Date(a.date || a.createdAt || '');
        const dateB = new Date(b.date || b.createdAt || '');
        return dateB.getTime() - dateA.getTime();
      })
      .slice(0, 5);

    return NextResponse.json(sortedMemories);
  } catch (error) {
    console.error('Failed to get memories:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 