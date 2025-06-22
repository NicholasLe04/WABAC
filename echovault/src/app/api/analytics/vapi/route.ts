import { promises as fs } from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

const analyticsFilePath = path.join(process.cwd(), 'src', 'data', 'analytics.json');

// Add a new analytics entry for a user
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, num_asked, num_missed } = body;

    if (!userId || typeof num_asked === 'undefined' || typeof num_missed === 'undefined') {
      return NextResponse.json({ error: 'User ID, num_asked, and num_missed are required' }, { status: 400 });
    }

    const fileContents = await fs.readFile(analyticsFilePath, 'utf8');
    let analytics = JSON.parse(fileContents);

    // Find the user's analytics or create a new entry
    const userAnalytics = analytics.find((a: any) => a.user_id === userId);

    if (userAnalytics) {
        // For simplicity, we'll just log each session.
        // A more complex implementation could aggregate these stats.
        if (!userAnalytics.recall_sessions) {
            userAnalytics.recall_sessions = [];
        }
        userAnalytics.recall_sessions.push({
            date: new Date().toISOString(),
            asked: num_asked,
            missed: num_missed,
        });
    } else {
        // This case is unlikely if the user exists, but good to handle.
        // The main analytics data is user-specific. We'll just log this attempt.
        console.warn(`Attempted to log analytics for non-existent user ID in analytics.json: ${userId}`);
    }


    await fs.writeFile(analyticsFilePath, JSON.stringify(analytics, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to create analytics entry:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 