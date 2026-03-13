// lib/mongodb/models/visitor.ts
import clientPromise from '../index';

export interface VisitorData {
  visitorId: string;      // уникальный ID из localStorage
  page: string;           // какая страница
  referrer: string;       // откуда пришел
  userAgent: string;      // браузер/устройство
  timestamp: Date;        // когда
  dateKey: string;        // YYYY-MM-DD для быстрых запросов
}

export class VisitorModel {
  static async getCollection() {
    const client = await clientPromise;
    const db = client.db('nexsol'); // твоя база
    const collection = db.collection<VisitorData>('visitors');
    
    // Индексы для скорости
    await collection.createIndexes([
      { key: { visitorId: 1 } },
      { key: { timestamp: 1 } },
      { key: { dateKey: 1 } },
      { 
        key: { dateKey: 1, visitorId: 1 }, 
        unique: true // один посетитель — одна запись в день
      }
    ]);
    
    return collection;
  }

  // Добавить или обновить визит
  static async track(data: Omit<VisitorData, 'timestamp'>) {
    const collection = await this.getCollection();
    
    const existing = await collection.findOne({
      dateKey: data.dateKey,
      visitorId: data.visitorId
    });
    
    if (existing) {
      // Уже был сегодня — обновляем время
      await collection.updateOne(
        { _id: existing._id },
        { $set: { timestamp: new Date() } }
      );
      return existing;
    }
    
    // Новый посетитель сегодня
    const newVisit = {
      ...data,
      timestamp: new Date()
    };
    
    await collection.insertOne(newVisit);
    return newVisit;
  }

  // Уникальные посетители за период
  static async getUniqueCount(startDate: Date) {
    const collection = await this.getCollection();
    
    const pipeline = [
      { $match: { timestamp: { $gte: startDate } } },
      { $group: { _id: '$visitorId' } },
      { $count: 'total' }
    ];
    
    const result = await collection.aggregate(pipeline).toArray();
    return result[0]?.total || 0;
  }

  // Все визиты (с повторами) за период
  static async getTotalCount(startDate: Date) {
    const collection = await this.getCollection();
    return collection.countDocuments({ timestamp: { $gte: startDate } });
  }

  // Вся статистика разом
  static async getAllStats() {
    const now = new Date();
    
    // Начало дня
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);
    
    // Начало недели (понедельник)
    const startOfWeek = new Date(now);
    const day = now.getDay();
    const diff = day === 0 ? 6 : day - 1; // воскресенье → понедельник
    startOfWeek.setDate(now.getDate() - diff);
    startOfWeek.setHours(0, 0, 0, 0);
    
    // Начало месяца
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    
    // Всё параллельно
    const [uniqueToday, uniqueWeek, uniqueMonth, totalToday, totalWeek, totalMonth] = await Promise.all([
      this.getUniqueCount(startOfDay),
      this.getUniqueCount(startOfWeek),
      this.getUniqueCount(startOfMonth),
      this.getTotalCount(startOfDay),
      this.getTotalCount(startOfWeek),
      this.getTotalCount(startOfMonth)
    ]);
    
    return {
      unique: {
        today: uniqueToday,
        week: uniqueWeek,
        month: uniqueMonth
      },
      total: {
        today: totalToday,
        week: totalWeek,
        month: totalMonth
      }
    };
  }
}