import { promises as fs } from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

const memoriesFilePath = path.join(process.cwd(), 'src', 'data', 'memories.json');

// Get memories for a user
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
    
    const fileContents = await fs.readFile(memoriesFilePath, 'utf8');
    const memories = JSON.parse(fileContents);

    const userMemories = memories.filter((m: any) => m.userId === userId);

    return NextResponse.json(userMemories);
  } catch (error) {
    console.error('Failed to get memories:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Add a new memory for a user
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, conversation, key_events } = body;

    if (!userId || !conversation || !key_events) {
      return NextResponse.json({ error: 'User ID, conversation, and key_events are required' }, { status: 400 });
    }

    const fileContents = await fs.readFile(memoriesFilePath, 'utf8');
    let memories = JSON.parse(fileContents);

    const newMemory = {
      id: `mem_${new Date().getTime()}`,
      userId,
      conversation,
      key_events,
      createdAt: new Date().toISOString(),
    };

    memories.push(newMemory);

    await fs.writeFile(memoriesFilePath, JSON.stringify(memories, null, 2));

    return NextResponse.json({ success: true, memory: newMemory });
  } catch (error) {
    console.error('Failed to create memory:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 