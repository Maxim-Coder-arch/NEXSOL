import { NextResponse } from 'next/server';
import { VisitorModel } from '@/lib/mongodb/models/visitor';

export const dynamic = "force-static";

export async function POST(req: Request) {
  try {
    const { visitorId, page, referrer, userAgent } = await req.json();
    
    const dateKey = new Date().toISOString().split('T')[0];
    
    await VisitorModel.track({
      visitorId,
      page,
      referrer,
      userAgent,
      dateKey
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Track error:', error);
    return NextResponse.json(
      { error: 'Failed to track visit' },
      { status: 500 }
    );
  }
}