import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { Insight } from '@/lib/types';

const insightsFilePath = path.join(process.cwd(), 'src', 'data', 'insights.json');

async function readInsights(): Promise<Insight[]> {
  try {
    const fileContents = await fs.readFile(insightsFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    return [];
  }
}

async function writeInsights(data: Insight[]) {
  await fs.writeFile(insightsFilePath, JSON.stringify(data, null, 2), 'utf8');
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const insights = await readInsights();
    // Sort by date descending (newest first) and filter by userId
    const userInsights = insights
      .filter(insight => insight.userId === userId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json(userInsights);
  } catch (error) {
    console.error('Failed to get insights:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId, insight } = await request.json();
    
    if (!userId || !insight) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const insights = await readInsights();
    
    const newInsight: Insight = {
      id: `insight_${Date.now()}`,
      userId,
      date: new Date().toISOString(),
      insight
    };

    insights.push(newInsight);
    await writeInsights(insights);

    return NextResponse.json(newInsight);
  } catch (error) {
    console.error('Failed to create insight:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 