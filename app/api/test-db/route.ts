// app/api/test-db/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('nexsol');
    
    // Пробуем создать тестовую запись
    const result = await db.collection('test').insertOne({
      message: 'Hello NEXSOL!',
      createdAt: new Date()
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Connected to MongoDB!',
      id: result.insertedId 
    });
  } catch (error) {
    console.error('DB Connection error:', error);
    return NextResponse.json({ 
      success: false, 
      error: String(error) 
    }, { status: 500 });
  }
}