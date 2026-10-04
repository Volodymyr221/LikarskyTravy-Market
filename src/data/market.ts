// Тестові дані маркетплейсу (прототип, без бази). Імена й компанії вигадані.

export type Seller = {
  name: string;
  verified: boolean;
  company?: boolean;
  rating: number;
  deals: number;
  since: string;
};

export type Listing = {
  id: string;
  herbId: string;
  title: string;
  volumeKg: number;
  pricePerKg: number;
  minOrderKg: number;
  region: string;
  village: string;
  harvest: string;
  moisture: number;
  drying: string;
  packaging: string;
  certificate?: string;
  description: string;
  postedAgo: string;
  seller: Seller;
};

export type BuyRequest = {
  id: string;
  herbId: string;
  volumeT: number;
  collectedT: number;
  pricePerKg: number;
  deadline: string;
  regions: string[];
  requirements: string[];
  pickup: string;
  postedAgo: string;
  buyer: Seller;
};

export type Bid = { who: string; amount: number; ago: string };

export type Auction = {
  id: string;
  herbId: string;
  volumeKg: number;
  startPrice: number;
  currentBid: number;
  step: number;
  endsInHours: number; // від початку доби — див. lib/time.ts
  region: string;
  village: string;
  moisture: number;
  harvest: string;
  description: string;
  seller: Seller;
  bids: Bid[];
};

export const regions = [
  "Волинська", "Рівненська", "Житомирська", "Чернігівська", "Сумська", "Полтавська",
  "Київська", "Черкаська", "Вінницька", "Хмельницька", "Тернопільська", "Львівська",
  "Івано-Франківська", "Закарпатська", "Чернівецька",
];

const s = (name: string, rating: number, deals: number, since: string, verified = true, company = false): Seller =>
  ({ name, rating, deals, since, verified, company });

export const listings: Listing[] = [
  {
    id: "l-101", herbId: "air-root", title: "Корінь аїру сушений, різаний",
    volumeKg: 1200, pricePerKg: 84, minOrderKg: 100, region: "Волинська", village: "Олика",
    harvest: "вересень 2026", moisture: 11, drying: "тінь, навіс, до 35 °C", packaging: "мішки поліпропіленові по 25 кг",
    description: "Збирали з чистих водойм подалі від доріг. Кореневища очищені від корінців, розрізані вздовж і висушені в тіні. Запах насичений, без пліснявих плям.",
    postedAgo: "2 год тому", seller: s("Родина Ковальчуків", 4.9, 37, "2025"),
  },
  {
    id: "l-102", herbId: "nettle-root", title: "Корінь кропиви, 1 т, мита сировина",
    volumeKg: 1000, pricePerKg: 58, minOrderKg: 200, region: "Рівненська", village: "Клевань",
    harvest: "жовтень 2026", moisture: 12, drying: "сушарка, 45 °C", packaging: "мішки по 20 кг",
    description: "Корінь викопаний восени, промитий, порізаний на 3–5 см. Можемо допакувати під ваші вимоги.",
    postedAgo: "5 год тому", seller: s("Петро М.", 4.7, 12, "2026"),
  },
  {
    id: "l-103", herbId: "linden", title: "Липовий цвіт з приквітками, урожай 2026",
    volumeKg: 340, pricePerKg: 178, minOrderKg: 20, region: "Житомирська", village: "Іршанськ",
    harvest: "липень 2026", moisture: 10, drying: "горище, тінь", packaging: "картонні короби по 10 кг",
    description: "Зібраний у перші дні цвітіння, світлий колір, без побурілих суцвіть. Зберігається в сухому приміщенні.",
    postedAgo: "вчора", certificate: "Протокол вологості № 214/26", seller: s("Оксана Г.", 5.0, 21, "2025"),
  },
  {
    id: "l-104", herbId: "rosehip", title: "Шипшина цілі плоди, ручний збір",
    volumeKg: 650, pricePerKg: 52, minOrderKg: 50, region: "Хмельницька", village: "Летичів",
    harvest: "вересень 2026", moisture: 13, drying: "сушарка, 60 °C", packaging: "мішки по 25 кг",
    description: "Плоди стиглі, без плодоніжок, висушені до темно-червоного кольору.",
    postedAgo: "вчора", seller: s("ФГ «Подільська нива»", 4.8, 64, "2024", true, true),
  },
  {
    id: "l-105", herbId: "chamomile", title: "Ромашка лікарська, квітки",
    volumeKg: 180, pricePerKg: 69, minOrderKg: 10, region: "Полтавська", village: "Решетилівка",
    harvest: "червень 2026", moisture: 11, drying: "тінь, сітки", packaging: "мішки по 15 кг",
    description: "Тільки кошики, без стебел. Колір білий і жовтий, аромат яскравий.",
    postedAgo: "2 дні тому", seller: s("Галина Т.", 4.6, 8, "2026", false),
  },
  {
    id: "l-106", herbId: "dandelion-root", title: "Корінь кульбаби, осінній",
    volumeKg: 420, pricePerKg: 76, minOrderKg: 50, region: "Чернігівська", village: "Мена",
    harvest: "жовтень 2026", moisture: 12, drying: "сушарка, 50 °C", packaging: "мішки по 20 кг",
    description: "Осінній корінь, промитий і порізаний. Готові відвантажити Новою поштою або самовивозом.",
    postedAgo: "3 дні тому", seller: s("Іван Д.", 4.8, 15, "2025"),
  },
  {
    id: "l-107", herbId: "hypericum", title: "Звіробій, верхівки з квітками",
    volumeKg: 260, pricePerKg: 48, minOrderKg: 20, region: "Закарпатська", village: "Міжгір'я",
    harvest: "липень 2026", moisture: 12, drying: "тінь, навіс", packaging: "мішки по 15 кг",
    description: "Гірський звіробій, зрізані верхівки 20–25 см з квітками.",
    postedAgo: "4 дні тому", seller: s("Василь К.", 4.9, 29, "2025"),
  },
  {
    id: "l-108", herbId: "nettle-leaf", title: "Листя кропиви, 2 т",
    volumeKg: 2000, pricePerKg: 34, minOrderKg: 200, region: "Сумська", village: "Тростянець",
    harvest: "червень 2026", moisture: 12, drying: "тінь, навіс", packaging: "пресовані тюки по 30 кг",
    description: "Лист зелений, без стебел і домішок. Великий обсяг — знижка від 1 т.",
    postedAgo: "5 днів тому", seller: s("ТОВ «Сумська заготівля»", 4.5, 88, "2024", true, true),
  },
  {
    id: "l-109", herbId: "elderflower", title: "Цвіт бузини чорної",
    volumeKg: 90, pricePerKg: 138, minOrderKg: 10, region: "Тернопільська", village: "Заліщики",
    harvest: "травень 2026", moisture: 10, drying: "тінь, папір", packaging: "короби по 5 кг",
    description: "Суцвіття висушені цілими, кремового кольору.",
    postedAgo: "тиждень тому", seller: s("Марія Л.", 4.9, 11, "2025"),
  },
  {
    id: "l-110", herbId: "mint", title: "М'ята перцева, лист",
    volumeKg: 150, pricePerKg: 74, minOrderKg: 10, region: "Вінницька", village: "Немирів",
    harvest: "серпень 2026", moisture: 11, drying: "тінь", packaging: "мішки по 10 кг",
    description: "Культивована м'ята з власних грядок, лист без стебел.",
    postedAgo: "тиждень тому", seller: s("Сергій П.", 4.7, 6, "2026", false),
  },
];

export const requests: BuyRequest[] = [
  {
    id: "r-201", herbId: "air-root", volumeT: 5, collectedT: 2.3, pricePerKg: 88, deadline: "30 листопада",
    regions: ["Волинська", "Рівненська", "Житомирська"],
    requirements: ["вологість до 12%", "без корінців і землі", "різка вздовж"],
    pickup: "самовивіз від 300 кг, оплата одразу після зважування", postedAgo: "сьогодні",
    buyer: s("ФітоСировина Захід", 4.9, 214, "2024", true, true),
  },
  {
    id: "r-202", herbId: "nettle-root", volumeT: 3, collectedT: 0.8, pricePerKg: 62, deadline: "15 грудня",
    regions: ["вся Україна"],
    requirements: ["вологість до 13%", "мита сировина", "фракція 3–5 см"],
    pickup: "Нова пошта за рахунок покупця від 100 кг", postedAgo: "вчора",
    buyer: s("Полісся Херб", 4.8, 132, "2024", true, true),
  },
  {
    id: "r-203", herbId: "rosehip", volumeT: 10, collectedT: 6.1, pricePerKg: 55, deadline: "1 листопада",
    regions: ["Хмельницька", "Вінницька", "Тернопільська"],
    requirements: ["цілі плоди", "без плодоніжок", "вологість до 14%"],
    pickup: "приймальні пункти в обласних центрах", postedAgo: "2 дні тому",
    buyer: s("Агрофарм-Трейд", 4.7, 301, "2024", true, true),
  },
  {
    id: "r-204", herbId: "dandelion-root", volumeT: 2, collectedT: 0.4, pricePerKg: 80, deadline: "20 листопада",
    regions: ["Чернігівська", "Сумська", "Київська"],
    requirements: ["осінній збір", "вологість до 12%"],
    pickup: "самовивіз від 200 кг", postedAgo: "3 дні тому",
    buyer: s("Чайна мануфактура «Липа»", 4.9, 77, "2025", true, true),
  },
  {
    id: "r-205", herbId: "linden", volumeT: 1.5, collectedT: 1.1, pricePerKg: 190, deadline: "до наступного сезону",
    regions: ["вся Україна"],
    requirements: ["з приквітками", "світлий колір", "без побурілих суцвіть"],
    pickup: "Нова пошта, від 30 кг", postedAgo: "тиждень тому",
    buyer: s("ЕкоЕкспорт Карпати", 4.6, 58, "2025", true, true),
  },
  {
    id: "r-206", herbId: "nettle-leaf", volumeT: 8, collectedT: 1.9, pricePerKg: 36, deadline: "весна 2027",
    regions: ["вся Україна"],
    requirements: ["зелений колір", "без стебел", "вологість до 12%"],
    pickup: "попереднє замовлення, аванс 20% після перевірки зразка", postedAgo: "тиждень тому",
    buyer: s("ФітоСировина Захід", 4.9, 214, "2024", true, true),
  },
];

export const auctions: Auction[] = [
  {
    id: "a-301", herbId: "air-root", volumeKg: 2000, startPrice: 70, currentBid: 91, step: 1, endsInHours: 30,
    region: "Волинська", village: "Цумань", moisture: 11, harvest: "вересень 2026",
    description: "Дві тонни кореня аїру однієї партії. Можна оглянути на місці. Відвантаження протягом 3 днів після оплати.",
    seller: s("Родина Ковальчуків", 4.9, 37, "2025"),
    bids: [
      { who: "ФітоСировина Захід", amount: 91, ago: "12 хв тому" },
      { who: "Полісся Херб", amount: 89, ago: "40 хв тому" },
      { who: "Агрофарм-Трейд", amount: 86, ago: "2 год тому" },
      { who: "Полісся Херб", amount: 80, ago: "5 год тому" },
      { who: "ФітоСировина Захід", amount: 74, ago: "вчора" },
    ],
  },
  {
    id: "a-302", herbId: "linden", volumeKg: 400, startPrice: 150, currentBid: 186, step: 2, endsInHours: 9,
    region: "Житомирська", village: "Іршанськ", moisture: 10, harvest: "липень 2026",
    description: "Світлий липовий цвіт з приквітками, протокол вологості додається.",
    seller: s("Оксана Г.", 5.0, 21, "2025"),
    bids: [
      { who: "ЕкоЕкспорт Карпати", amount: 186, ago: "5 хв тому" },
      { who: "Чайна мануфактура «Липа»", amount: 182, ago: "1 год тому" },
      { who: "ЕкоЕкспорт Карпати", amount: 170, ago: "3 год тому" },
    ],
  },
  {
    id: "a-303", herbId: "nettle-root", volumeKg: 1500, startPrice: 45, currentBid: 57, step: 1, endsInHours: 54,
    region: "Рівненська", village: "Березне", moisture: 12, harvest: "жовтень 2026",
    description: "Мита, різана сировина. Ціна за кг з урахуванням тари.",
    seller: s("Петро М.", 4.7, 12, "2026"),
    bids: [
      { who: "Полісся Херб", amount: 57, ago: "30 хв тому" },
      { who: "Агрофарм-Трейд", amount: 54, ago: "4 год тому" },
    ],
  },
  {
    id: "a-304", herbId: "rosehip", volumeKg: 900, startPrice: 40, currentBid: 49, step: 1, endsInHours: 71,
    region: "Вінницька", village: "Тульчин", moisture: 13, harvest: "вересень 2026",
    description: "Шипшина ручного збору, сушена в сушарці.",
    seller: s("ФГ «Подільська нива»", 4.8, 64, "2024", true, true),
    bids: [{ who: "Агрофарм-Трейд", amount: 49, ago: "2 год тому" }],
  },
];

export const findListing = (id: string) => listings.find((x) => x.id === id);
export const findRequest = (id: string) => requests.find((x) => x.id === id);
export const findAuction = (id: string) => auctions.find((x) => x.id === id);
