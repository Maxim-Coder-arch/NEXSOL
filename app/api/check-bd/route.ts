// app/api/check-db/route.ts (обновленная версия)
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('CRM_System');
    
    // Получаем список коллекций
    const collections = await db.listCollections().toArray();
    
    // Получаем информацию о базе данных
    const dbInfo = await db.command({ dbStats: 1 });
    
    return NextResponse.json({ 
      success: true,
      databaseName: db.databaseName,
      collections: collections.map(c => c.name),
      dbStats: {
        collections: dbInfo.collections,
        objects: dbInfo.objects,
        dataSize: dbInfo.dataSize
      },
      // Проверяем, есть ли конкретные коллекции
      hasReviews: collections.some(c => c.name === 'reviews'),
      hasLeads: collections.some(c => c.name === 'leads')
    });
  } catch (error) {
    console.error('DB Check Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: String(error) 
    }, { status: 500 });
  }
}