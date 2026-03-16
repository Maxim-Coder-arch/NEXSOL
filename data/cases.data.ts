import { CasesProps } from "@/types/cases.type.data";

export const data: CasesProps[] = [
  {
    img: "/presentations/large-minion.png",
    title: "Large Minion - монопородный питомник мейн-кунов",
    before: ["Меньше 5 клиентов в месяц", "Нету сайта", "Плохая оптимизация SEO", "Нету аналитики", "Нету рекламы"],
    after: ["Больше 15 клиентов в месяц", "Сайт с админ панелью", "Хорошая сео оптимизация для сайта", "Успешная аналитика", "Реклама в различных соц сетях"],
    revenue: "350 000 рублей",
    clientsInMonth: "17",
    link: "https://large-minion.vercel.app/"
  },
  {
    img: "/presentations/soft-byte.png",
    title: "SoftByte Learn - школа программирования",
    before: ["0 клиентов", "Нету сайта", "Нету seo оптимизации", "Плохая аналитика"],
    after: ["Больше 100 покупателей в месяц", "Онлайн образовательная платформа", "Сайт", "Хорошая сео оптимизация для сайта", "Успешная аналитика"],
    revenue: "120 000 рублей",
    clientsInMonth: "115",
    link: "https://soft-byte-learn.vercel.app/"
  },
  {
    img: "/presentations/profi-card.png",
    title: "Партнер банков ProfiCard",
    before: ["0 клиентов", "Нету сайта", "Нету seo оптимизации", "Нету аналитики"],
    after: ["Больше 50 клиентов в месяц", "Сайт", "Хорошая сео оптимизация для сайта", "Успешная аналитика"],
    revenue: "100 000 рублей",
    clientsInMonth: "60",
    link: "https://profi-card.vercel.app/"
  },
]