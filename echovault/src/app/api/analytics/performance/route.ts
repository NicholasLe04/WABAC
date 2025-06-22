import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';
import { PerformanceMetrics } from '@/lib/types';

const performanceFilePath = path.join(process.cwd(), 'src', 'data', 'performance.json');

async function readPerformanceData(): Promise<PerformanceMetrics[]> {
  try {
    const fileContents = await fs.readFile(performanceFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    return [];
  }
}

async function writePerformanceData(data: PerformanceMetrics[]) {
  await fs.writeFile(performanceFilePath, JSON.stringify(data, null, 2), 'utf8');
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '7'); // Default to 7 days of data
    
    const performanceData = await readPerformanceData();
    
    // Sort by date ascending (oldest to newest) and get the requested number of days
    const recentData = performanceData
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-days);

    return NextResponse.json(recentData);
  } catch (error) {
    console.error('Failed to get performance data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId, accuracyPercentage, vocabularyComplexity, forgottenMemoriesCount, totalMemoriesReviewed } = await request.json();
    
    // Check all required fields
    // const missingFields = [];
    // if (!userId) missingFields.push('userId');
    // if (accuracyPercentage === undefined) missingFields.push('accuracyPercentage');
    // if (vocabularyComplexity === undefined) missingFields.push('vocabularyComplexity');
    // if (forgottenMemoriesCount === undefined) missingFields.push('forgottenMemoriesCount');
    // if (totalMemoriesReviewed === undefined) missingFields.push('totalMemoriesReviewed');

    // if (missingFields.length > 0) {
    //   return NextResponse.json({ 
    //     error: `Missing required fields: ${missingFields.join(', ')}` 
    //   }, { status: 400 });
    // }

    const performanceData = await readPerformanceData();
    
    const metricsWithId: PerformanceMetrics = {
      id: `perf_${Date.now()}`,
      userId,
      date: new Date().toISOString(),
      accuracyPercentage,
      vocabularyComplexity,
      forgottenMemoriesCount,
      totalMemoriesReviewed
    };

    performanceData.push(metricsWithId);
    await writePerformanceData(performanceData);

    return NextResponse.json(metricsWithId, { status: 201 });
  } catch (error) {
    console.error('Failed to save performance metrics:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 