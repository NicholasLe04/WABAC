import { promises as fs } from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  const filePath = path.join(process.cwd(), 'src', 'data', 'tags.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  const tags = JSON.parse(fileContents);

  const userTags = tags.filter((t: any) => t.user_id === userId);

  return NextResponse.json(userTags);
} 