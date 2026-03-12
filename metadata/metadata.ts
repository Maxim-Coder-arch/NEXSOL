import { Metadata } from "next";

export const metaData: Metadata = {
  title: "NEXSOL | стратегия, сайты и реклама для бизнеса",
  description: "NEXSOL — стратегия, разработка сайтов и реклама для сферы услуг. Строим системы, которые приносят клиентов",
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
    google: "",
  },
  openGraph: {
    title: 'NEXSOL | стратегия, сайты и реклама',
    description: 'Строим системы, которые приносят клиентов. Стратегия, сайты и реклама для малого бизнеса.',
    type: 'website',
    images: ['/icons/logo.png'],     
  },
  icons: {
    icon: '/icons/logo.png',
    apple: '/icons/logo.png',
  }
};