// app/api/stats/route.ts
import { NextResponse } from 'next/server';
import { VisitorModel } from '@/lib/mongodb/models/visitor';

export async function GET() {
  try {
    const stats = await VisitorModel.getAllStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json(
      { error: 'Failed to get stats' },
      { status: 500 }
    );
  }
}

// Опционально: очистка старых данных (например, раз в месяц)
export async function DELETE() {
  try {
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
    
    const collection = await VisitorModel.getCollection();
    await collection.deleteMany({
      timestamp: { $lt: threeMonthsAgo }
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Cleanup failed' },
      { status: 500 }
    );
  }
}