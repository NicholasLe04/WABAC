import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', 'insights.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    const insights = JSON.parse(fileContents);
    
    // Filter for userId 2 and sort by date descending
    const userInsights = insights
      .filter((i: any) => i.userId === "2")
      .sort((a: any, b: any) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    
    // Return the most recent insight
    return NextResponse.json(userInsights[0] || null);
  } catch (error) {
    console.error('Failed to get insights:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 