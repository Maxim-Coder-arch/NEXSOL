import { Metadata } from "next";

export const metaData: Metadata = {
  title: "NEXSOL | Продвижение вашего бизнеса",
  description: "NEXSOL — стратегия, разработка сайтов, реклама для сферы услуг и не только. Строим системы, которые приносят клиентов",
  keywords: [
    'разработка сайтов',
    'создание сайтов',
    'реклама для бизнеса',
    'seo продвижение',
    'настройка таргета',
    'ведение соцсетей',
    'стратегия для бизнеса',
    'рост продаж',
    'сайт для салона красоты',
    'сайт для фитнеса',
    'nexsol'
  ],
  authors: [{ name: 'NEXSOL' }],
  creator: 'NEXSOL',
  publisher: 'NEXSOL',
  verification: {
    yandex: "e4850ac9ddb400c6",
    google: "7yQsWaXxXlqPgDaI5jZDYEusnU2YfWXJlNccOZ72K2E",
  },
  openGraph: {
    title: 'NEXSOL | стратегия, сайты и реклама',
    description: 'Строим системы, которые приносят клиентов. Стратегия, сайты и реклама для малого бизнеса.',
    type: 'website',
    images: ['/icons/logo.png'],
  },
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: 'any' },
      { url: '/icons/logo.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: ['/favicon/favicon.ico'],
  },
};