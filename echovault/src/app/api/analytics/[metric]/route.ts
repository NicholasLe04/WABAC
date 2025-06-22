import { promises as fs } from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { metric: string } }
) {
  const { metric } = params;
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), 'src', 'data', 'analytics.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const analyticsData = JSON.parse(fileContents);

  const userData = analyticsData[userId];

  if (!userData) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const metricData = userData[metric];

  if (!metricData) {
    return NextResponse.json({ error: `Metric '${metric}' not found for this user` }, { status: 404 });
  }

  return NextResponse.json(metricData);
} 