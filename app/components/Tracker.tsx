'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const Tracker = () => {
  const pathname = usePathname();

  useEffect(() => {
    const trackVisit = async () => {
      // Получаем или создаем visitorId
      let visitorId = localStorage.getItem('visitorId');
      
      if (!visitorId) {
        visitorId = crypto.randomUUID?.() || Math.random().toString(36).substring(2);
        localStorage.setItem('visitorId', visitorId);
      }

      // Не трекаем админку (чтобы не засорять статистику)
      if (pathname.startsWith('/admin') || pathname.startsWith('/dashboard')) {
        return;
      }

      try {
        await fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            visitorId,
            page: pathname,
            referrer: document.referrer || 'direct',
            userAgent: navigator.userAgent
          })
        });
      } catch (error) {
        console.error('Track error:', error);
      }
    };

    trackVisit();
  }, [pathname]);

  return null;
};