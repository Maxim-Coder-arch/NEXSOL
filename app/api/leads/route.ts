import { NextResponse } from 'next/server';
import { LeadModel } from '@/lib/mongodb/models/lead';

export async function POST(request: Request) {
  try {
    const { name, email, contact, message } = await request.json();
    
    if (!name || !email || !contact) {
      return NextResponse.json(
        { error: 'Name, email and contact are required' },
        { status: 400 }
      );
    }
    
    const lead = await LeadModel.create({
      name,
      email,
      contact,
      message,
      source: 'website'
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Заявка отправлена! Мы свяжемся с вами в ближайшее время.' 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to submit lead' },
      { status: 500 }
    );
  }
}