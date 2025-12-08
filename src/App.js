import React, { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  Utensils,
  Car,
  CloudSun,
  Wind,
  AlertCircle,
  Phone,
  Wallet,
  Plane,
  Home,
  ChevronDown,
  ChevronUp,
  Navigation,
  Loader2,
  CloudRain,
  Sun,
  Cloud,
  Thermometer,
  Lock,
  KeyRound,
  Info,
  Camera,
  Shirt,
  Mountain,
  Sparkles,
  Signal,
  Droplets,
  Calendar,
  ArrowRight,
  Clock,
  User,
  CheckCircle,
  Gavel,
  Zap,
  HelpCircle,
} from 'lucide-react';

// ============================================
// 1.圖片XD
// ============================================
const getLocationImage = (locationName) => {
  const name = locationName.toLowerCase();

  // use Unsplash

  // Day 1: 機場
  if (name.includes('機場'))
    return 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80';
  // Day 1: Mae Kampong (山林村落)
  if (name.includes('mae kampong') || name.includes('前往'))
    return 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80';
  // Day 1: 民宿火鍋
  if (
    name.includes('portare') ||
    name.includes('涮涮鍋') ||
    name.includes('晚餐')
  )
    return 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&q=80';

  // Day 2: 日出觀景
  if (name.includes('日出') || name.includes('kew fin'))
    return 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=800&q=80';
  // Day 2: 懸崖咖啡
  if (name.includes('teddu') || name.includes('懸崖'))
    return 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&q=80';
  // Day 2: 超市
  if (name.includes('rimping') || name.includes('採買'))
    return 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800&q=80';
  // Day 2: 夜市
  if (name.includes('kad manee'))
    return 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80';

  // Day 3: Jing Jai 文青市集
  if (name.includes('jing jai'))
    return 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800&q=80';
  // Day 3: Chamcha 雨林市集
  if (name.includes('chamcha'))
    return 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=800&q=80';
  // Day 3: 稀飯熱炒
  if (name.includes('khao tom') || name.includes('稀飯'))
    return 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=800&q=80';

  // Day 4: 椰子市集
  if (name.includes('coconut market'))
    return 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&q=80';
  // Day 4: SPA
  if (name.includes('fah lanna') || name.includes('spa'))
    return 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80';
  // Day 4: 週日夜市
  if (name.includes('sunday'))
    return 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80';

  // Day 5: 大象保育園
  if (name.includes('elephant'))
    return 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=800&q=80';
  // Day 5: 米其林餐廳
  if (name.includes('huen muan'))
    return 'https://images.unsplash.com/photo-1517244683847-7456b63c5969?w=800&q=80';

  // Day 6: 茵他儂國家公園
  if (name.includes('doi inthanon'))
    return 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80';
  // Day 6: 帝王餐宴
  if (name.includes('khantoke') || name.includes('帝王'))
    return 'https://images.unsplash.com/photo-1528712306091-ed0763094c98?w=800&q=80';

  // Day 7: 料理課程
  if (name.includes('cooking'))
    return 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&q=80';
  // Day 7: 藝術村
  if (name.includes('baan kang'))
    return 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800&q=80';
  // Day 7: 悟孟寺
  if (name.includes('wat umong'))
    return 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80';
  // Day 7: 冠軍咖啡
  if (name.includes('ristr8to') || name.includes('coffee'))
    return 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&q=80';
  // Day 7: 燒烤餐廳
  if (name.includes('tong tem'))
    return 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80';

  // Day 8: 柴迪隆寺
  if (name.includes('wat chedi') || name.includes('柴迪隆'))
    return 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=800&q=80';
  // Day 8: 烤雞
  if (name.includes('sp chicken') || name.includes('烤雞'))
    return 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=800&q=80';
  // Day 8: 芒果糯米飯
  if (name.includes('kor panich') || name.includes('芒果'))
    return 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=800&q=80';
  // Day 8: Makkha SPA
  if (name.includes('makkha'))
    return 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80';
  // Day 8: 泰式料理
  if (name.includes('aroon'))
    return 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=800&q=80';
  // Day 8: 泰拳
  if (name.includes('boxing') || name.includes('泰拳'))
    return 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800&q=80';

  // Day 9: 傳統市場
  if (name.includes('warorot'))
    return 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&q=80';
  // Day 9: 甜點蛋糕
  if (name.includes('cake'))
    return 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80';
  // Day 9: 高級餐廳
  if (name.includes('ginger'))
    return 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80';

  // 萬用預設圖 - 清邁風景
  return 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80';
};

// ============================================
// 2. 初始行程資料 日期改回 2026ㄌ
// ============================================
// ============================================
// 2. 初始行程資料 (V23 最終版 - 含爛腳人挑戰)
// ============================================

const INITIAL_ITINERARY_DATA = [
  {
    day: 1,
    date: '2026-02-19',
    displayDate: '2/19 (四)',
    title: '抵達日 & 直奔山林',
    weather: { temp: '28°C', icon: 'sunny', aqi: 150, realData: false },
    locations: [
      {
        type: 'transport',
        time: '17:30',
        name: '機場取車 (Drive Car Rental)',
        note: '備妥護照、國際駕照、台灣駕照、信用卡。',
        desc: '取車時請仔細檢查車身刮痕並拍照錄影。',
        nav: 'Chiang Mai International Airport Drive Car Rental',
        difficulty: '低 (無障礙設施)',
      },
      {
        type: 'transport',
        time: '17:30-19:00',
        name: '前往 Mae Kampong',
        note: '山路視線暗請小心，車程約1.5小時。',
        desc: '這是一段蜿蜒的山路，進入山區後路燈較少，請慢速行駛。',
        nav: 'Mae Kampong Village',
        difficulty: '零 (全程坐車)',
      },
      {
        type: 'food',
        time: '19:30',
        name: '晚餐: 民宿火鍋 (Portare.home)',
        note: '已預訂民宿晚餐 (Moo Krata)。',
        desc: '在 Portare.home 民宿內享用熱騰騰的涮涮鍋晚餐，不用外出，享受山林夜晚的寧靜。',
        nav: 'Portare.home Mae Kampong',
        highlight: '山中火鍋',
        difficulty: '中 (斜坡/階梯)',
      },
    ],
  },
  {
    day: 2,
    date: '2026-02-20',
    displayDate: '2/20 (五)',
    title: '山中晨光 & 返回基地',
    weather: { temp: '25°C', icon: 'cloudy', aqi: 120, realData: false },
    locations: [
      {
        type: 'sight',
        time: '06:00',
        name: '日出: Kew Fin Viewpoint',
        note: '清邁與南邦府交界，看日出雲海。',
        desc: '視野極佳，運氣好可看到壯觀雲海。路陡請小心駕駛。',
        nav: 'Kew Fin Viewpoint',
        difficulty: '高 (需步行陡坡)',
      },
      {
        type: 'sight',
        time: '10:00',
        name: 'Mae Kampong 村落探索',
        note: '瀑布與古老木屋。',
        desc: '百年歷史的古老村落，必看「招財神廟 (Wat Khantha Pruksa)」。若不想走，建議執行「咖啡廳據點副行程」。',
        nav: 'Wat Khantha Pruksa',
        difficulty: '極高 (多陡坡階梯)',
      },
      {
        type: 'food',
        time: '11:00',
        name: '懸崖咖啡廳 (Teddu)',
        note: '爛腳人避難所副行程。',
        desc: '擁有著名的森林吊橋，咖啡廳懸空在溪流與樹林之上。',
        nav: 'Teddu Coffee',
        highlight: '網美吊橋',
      },
      {
        type: 'transport',
        time: '14:30',
        name: '市區採買 (Rimping)',
        note: '趁還車前買水、零食。',
        desc: '利用還車前的空檔，在市區超市買水、零食。',
        nav: 'Rimping Supermarket Nim City',
      },
      {
        type: 'food',
        time: '19:00',
        name: '晚餐: Kad Manee Market',
        note: '在地人喜愛的大型夜市。',
        desc: '步行至家旁邊的湖畔夜市。必吃：烤魚 (Miang Pla Pao) 與陶鍋小火鍋。',
        nav: 'Kad Manee Market',
        highlight: '必吃烤魚',
        difficulty: '低 (平地/座位多)',
      },
    ],
  },
  {
    day: 3,
    date: '2026-02-21',
    displayDate: '2/21 (六)',
    title: '雙市集 & 老宅晚餐',
    weather: { temp: '33°C', icon: 'sunny', aqi: 160, realData: false },
    locations: [
      {
        type: 'sight',
        time: '09:40',
        name: 'Jing Jai Market (真心市集)',
        note: '只有週末上午有。',
        desc: '主攻手作設計區與農夫市集。午餐可在此熟食區解決。',
        nav: 'Jing Jai Market Chiang Mai',
        highlight: '必買文創',
        difficulty: '中 (範圍大)',
      },
      {
        type: 'sight',
        time: '12:45',
        name: 'Chamcha Market (雨林市集)',
        note: '雨豆樹林下野餐氛圍。',
        desc: '氣氛像在森林野餐。攤位多為藍染、陶藝等藝術家進駐，比 Jing Jai 更悠閒一點。',
        nav: 'Chamcha Market',
        difficulty: '中 (自然地面)',
      },
      {
        type: 'sight',
        time: '15:45',
        name: '強制回血時間',
        note: '回民宿洗澡、午睡。',
        desc: '今日步行量大，此休息至關重要。',
        nav: 'Haiya',
        difficulty: '零',
      },
      {
        type: 'food',
        time: '18:30',
        name: 'Dash! Restaurant and Bar',
        note: '柚木老屋泰菜，有現場樂團。',
        desc: '【古城南門人氣店】氣氛極佳，食物精緻好吃 (推薦鳳梨炒飯、羅望子魚)。建議請房東幫忙訂位。',
        nav: 'Dash! Restaurant and Bar',
        highlight: '氣氛極佳',
        difficulty: '低 (環境舒適)',
      },
    ],
  },
  {
    day: 4,
    date: '2026-02-22',
    displayDate: '2/22 (日)',
    title: '椰子+SPA+週日夜市',
    weather: { temp: '34°C', icon: 'sunny', aqi: 155, realData: false },
    locations: [
      {
        type: 'sight',
        time: '09:30',
        name: 'Coconut Market',
        note: '運河拍照喝椰子水。',
        desc: '沿著運河兩岸拍照、喝椰子水。非常有熱帶風情。',
        nav: 'Coconut Market Chiang Mai',
        difficulty: '中 (河岸步道)',
      },
      {
        type: 'sight',
        time: '13:00',
        name: 'Fah Lanna Spa (古城店)',
        note: '2小時療程，務必預訂。',
        desc: '享受 2 小時療程，修復雙腿。曾是電影《泰囧》取景地。',
        nav: 'Fah Lanna Spa - Old City',
        highlight: '敲筋按摩',
        difficulty: '零',
      },
      {
        type: 'sight',
        time: '18:30',
        name: '週日夜市 (Sunday Night Market)',
        note: '從塔佩門開始逛，人潮極多。',
        desc: '【大魔王關卡】清邁規模最大夜市。強烈建議夥伴在入口附近找餐廳或酒吧坐下休息，不要硬走。',
        nav: 'Tha Phae Gate',
        difficulty: '極高 (人潮擁擠)',
      },
    ],
  },
  {
    day: 5,
    date: '2026-02-23',
    displayDate: '2/23 (一)',
    title: '快樂大象 & 米其林',
    weather: { temp: '30°C', icon: 'cloudy', aqi: 110, realData: false },
    locations: [
      {
        type: 'sight',
        time: '06:30',
        name: 'Elephant Nature Park',
        note: '無騎乘，觀察泥巴浴，含素食午餐。',
        desc: '體驗餵食、觀察大象泥巴浴。午餐的素食 Buffet 意外地非常好吃！',
        nav: 'Elephant Nature Park Office',
        difficulty: '中 (泥土路)',
      },
      {
        type: 'food',
        time: '18:30',
        name: 'Huen Muan Jai (米其林)',
        note: '經典泰北菜。',
        desc: '必點：泰北拼盤、泰北金麵、紅咖哩豬。需爬幾階樓梯進入高腳屋。',
        nav: 'Huen Muan Jai',
        highlight: '必吃米其林',
        difficulty: '中低 (階梯)',
      },
    ],
  },
  {
    day: 6,
    date: '2026-02-24',
    displayDate: '2/24 (二)',
    title: '茵他儂國家公園',
    weather: {
      temp: '5-28°C',
      icon: 'cloudy',
      aqi: 50,
      note: '⛰️ 洋蔥式穿搭',
      realData: false,
    },
    locations: [
      {
        type: 'sight',
        time: '07:30',
        name: 'Doi Inthanon (包車)',
        note: '泰國最高峰、雙塔、瀑布。',
        desc: '參觀國王皇后雙塔、Wachirathan 瀑布。步道需步行約 2 小時 (可選擇不走，在休息區等候)，其他景點車子可直達。',
        nav: 'Doi Inthanon National Park',
        difficulty: '中 (部分步道)',
      },
      {
        type: 'food',
        time: '18:30',
        name: '帝王餐秀 (Old Chiang Mai)',
        note: 'Khantoke 晚宴，民宿斜對面。',
        desc: '全程坐著吃泰北菜吃到飽，欣賞傳統舞蹈表演。非常舒服。',
        nav: 'Old Chiang Mai Cultural Center',
        difficulty: '零',
        highlight: '傳統舞蹈',
      },
    ],
  },
  {
    day: 7,
    date: '2026-02-25',
    displayDate: '2/25 (三)',
    title: '料理課 & 冠軍咖啡',
    weather: { temp: '33°C', icon: 'sunny', aqi: 140, realData: false },
    locations: [
      {
        type: 'sight',
        time: '09:00',
        name: 'Yummy Tasty Thai Cooking',
        note: '含市場導覽，步行可達。',
        desc: '含市場導覽與午餐。需久站做菜。',
        nav: 'Yummy Tasty Thai Cooking School',
        difficulty: '中高 (久站)',
      },
      {
        type: 'sight',
        time: '13:40',
        name: 'Baan Kang Wat 藝術村',
        note: '森林系文創，有階梯石板路。',
        desc: '像個圓形劇場的藝術聚落。有階梯與石板路，建議夥伴在咖啡廳駐紮。',
        nav: 'Baan Kang Wat',
        difficulty: '高 (階梯/石板)',
      },
      {
        type: 'sight',
        time: '15:15',
        name: '悟孟寺 (Wat Umong)',
        note: '森林隧道寺廟。',
        desc: '走進森林隧道參觀佛像。自然地面不平整。',
        nav: 'Wat Umong',
        difficulty: '中高',
      },
      {
        type: 'food',
        time: '17:00',
        name: 'Ristr8to Original',
        note: '世界拉花冠軍。',
        desc: '必點招牌「Satan Latte (撒旦拿鐵)」。',
        nav: 'Ristr8to Original',
        highlight: '必喝咖啡',
      },
      {
        type: 'food',
        time: '17:45',
        name: 'Tong Tem Toh',
        note: '排隊名店，泰北燒烤。',
        desc: '必點烤豬頸肉。不能訂位，需趁早去以免久站排隊。',
        nav: 'Tong Tem Toh',
        highlight: '必吃燒烤',
        difficulty: '中高 (排隊)',
      },
    ],
  },
  {
    day: 8,
    date: '2026-02-26',
    displayDate: '2/26 (四)',
    title: '古城巡禮 & 泰拳',
    weather: { temp: '34°C', icon: 'sunny', aqi: 145, realData: false },
    locations: [
      {
        type: 'sight',
        time: '09:30',
        name: '泰服體驗 & 古剎巡禮',
        note: '步行拍照。',
        desc: '換上泰服，步行至盼道寺與柴迪隆寺拍照。古城內步行，但距離不遠。',
        nav: 'Wat Chedi Luang',
        difficulty: '中 (步行)',
      },
      {
        type: 'food',
        time: '12:30',
        name: 'SP Chicken',
        note: '需請房東幫忙「留雞」。',
        desc: '米其林必比登推薦。皮脆肉嫩多汁的烤小雞。',
        nav: 'SP Chicken',
        highlight: '必吃烤雞',
      },
      {
        type: 'food',
        time: '13:30',
        name: 'Kor Panich 芒果糯米飯',
        note: '皇室秘方，米其林推薦。',
        desc: '80年老店，糯米口感極佳。',
        nav: 'Kor Panich Mango Sticky Rice',
        highlight: '必吃甜點',
      },
      {
        type: 'sight',
        time: '15:30',
        name: 'Makkha Health & Spa',
        note: '古宅按摩，2小時療程。',
        desc: '蘭納古宅分店環境非常美。2小時療程消除走路疲勞。',
        nav: 'Makkha Health&Spa (Ancient House)',
        highlight: '重要預約',
      },
      {
        type: 'food',
        time: '18:00',
        name: 'Aroon Rai',
        note: '老牌泰北菜。',
        desc: '清邁老字號，咖哩金麵與熱炒非常好吃。一般餐廳座位。',
        nav: 'Aroon Rai',
        difficulty: '低',
      },
      {
        type: 'sight',
        time: '19:30',
        name: '泰拳 (Chiang Mai Boxing Stadium)',
        note: '有冷氣座位。',
        desc: '古城北邊的室內體育館。有舒適座位與冷氣。',
        nav: 'Chiang Mai Boxing Stadium',
        difficulty: '低',
      },
    ],
  },
  {
    day: 9,
    date: '2026-02-27',
    displayDate: '2/27 (五)',
    title: '最後採買 & 返台',
    weather: { temp: '33°C', icon: 'sunny', aqi: 150, realData: false },
    locations: [
      {
        type: 'sight',
        time: '11:00',
        name: '瓦洛洛市場 (Warorot)',
        note: '買炸豬皮、果乾。',
        desc: '伴手禮大本營。內部擁擠狹窄。',
        nav: 'Warorot Market',
        highlight: '必買伴手禮',
        difficulty: '高 (擁擠)',
      },
      {
        type: 'food',
        time: '12:30',
        name: 'Cake Baan Piemsuk',
        note: '必吃椰子奶油派。',
        desc: '全清邁最好吃的椰子奶油派。',
        nav: 'Cake Baan Piemsuk',
        highlight: '必吃蛋糕',
      },
      {
        type: 'sight',
        time: '14:00',
        name: 'Central Airport Plaza',
        note: '機場旁百貨休息。',
        desc: '整理行李、吹冷氣。',
        nav: 'Central Chiangmai Airport',
        difficulty: '低',
      },
      {
        type: 'sight',
        time: '16:00',
        name: "Spa 第 3 彈 (Let's Relax)",
        note: '預約3小時+盥洗。',
        desc: '為紅眼班機做準備，洗澡按摩一次滿足。',
        nav: "Let's Relax Spa - Chiang Mai Airport",
        difficulty: '零',
      },
      {
        type: 'food',
        time: '20:00',
        name: 'The House by Ginger',
        note: '華麗復古泰菜。',
        desc: '米其林推薦。華麗復古殖民風，非常精緻。',
        nav: 'The House by Ginger',
        highlight: '米其林推薦',
      },
      {
        type: 'transport',
        time: '22:30',
        name: '前往機場 (CNX)',
        note: '搭乘01:40班機返台。',
        desc: '準備回家囉！',
        nav: 'Chiang Mai International Airport',
      },
    ],
  },
];

// 修改原本的 UTILS_DATA (填入正確航班資訊20251201)
// 修改原本的 UTILS_DATA (含航廈資訊20251202)
// 修改原本的 UTILS_DATA (精準對應截圖20251202)
// 修改原本的 UTILS_DATA (V4.1 微調備註20251205)
// 修改原本的 UTILS_DATA (V5.0 加入詳細住宿資料結構20251206)
const UTILS_DATA = {
  flights: [
    {
      type: '去程',
      date: '2/19 (四)',
      flightNo: 'JX751',
      time: '12:55 - 15:55',
      airline: '星宇航空',
      from: '台北',
      fromCode: 'TPE',
      fromTerminal: 'T2',
      to: '清邁',
      toCode: 'CNX',
      toTerminal: '',
    },
    {
      type: '回程',
      date: '2/28 (六)',
      flightNo: 'FD242',
      time: '01:40 - 06:25',
      airline: 'AirAsia',
      from: '清邁',
      fromCode: 'CNX',
      fromTerminal: '',
      to: '台北',
      toCode: 'TPE',
      toTerminal: 'T1',
    },
  ],
  // 住宿資料結構化 方便我生成按鈕
  accommodations: [
    {
      name: 'Portare.home',
      type: '山林民宿',
      date: '2/19 (1晚)',
      address: '55 Moo 3, Mae Kampong',
      phone: '+66618241845',
      mapQuery: 'Portare.home Mae Kampong',
      note: '含早餐・晚餐吃火鍋',
    },
    {
      name: 'Lucky Charm House',
      type: '市區 Airbnb',
      date: '2/20 - 2/27 (7晚)',
      address: 'Tambon Chang Khlan',
      phone: '+66876568952',
      mapQuery: 'Lucky Charm House Chiang Mai',
      note: '近古城・房東 Dusadeewan',
      // 新增ㄌ Airbnb 專屬連結與指南
      airbnbUrl: atob('aHR0cHM6Ly93d3cuYWlyYm5iLmNvbS9sLzRtNHNkN0hk'),
      guideUrl: atob(
        'aHR0cHM6Ly93d3cuYWlyYm5iLmNvbS50dy9zL2d1aWRlYm9va3M/cmVmaW5lbWVudF9wYXRocyU1QiU1RD0lMkZndWlkZWJvb2tzJTJGNjQzNjY3MCZzPTY3JnVuaXF1ZV9zaGFyZV9pZD02MDU5M2FjZi05NTJiLTQ4ZTItYTk4Ni00ZjZiZjY2MDdmZmM='
      ),
    },
  ],
  emergency: '泰國觀光警察: 1155 \n救護車: 1669 \n駐泰辦事處: +66-81-666-4006',
  notes:
    '🔥 2月為燒山季節，AQI 空氣品質較差，請隨身攜帶口罩。\n🚗 自駕注意：右駕左行，山路多彎。',
  // 統一的雲端連結
  driveUrl:
    'https://drive.google.com/drive/folders/1J7sQLshn9A1y8I9d6007SavZ5eFWs4-U?usp=sharing',
};

// ============================================
// 3. UIUX part thai
// ============================================

// note:天氣 Widget (防當機 Crash Guard)
// note:天氣 Widget (修ㄌ跨夜問題 + 24小時預報 + 橫向捲動)
// 天氣 Widget (移除點擊彩蛋20251206)
const WeatherHero = () => {
  const [data, setData] = useState(null);
  const [aqi, setAqi] = useState(50);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=18.7883&longitude=98.9853&current=temperature_2m,weather_code,relative_humidity_2m&hourly=temperature_2m,weather_code&forecast_days=2&timezone=Asia%2FBangkok'
        );
        const json = await res.json();

        if (json && json.current) {
          setData(json);
        }

        try {
          const aqiRes = await fetch(
            'https://air-quality-api.open-meteo.com/v1/air-quality?latitude=18.7883&longitude=98.9853&current=us_aqi'
          );
          const aqiJson = await aqiRes.json();
          if (aqiJson.current) setAqi(aqiJson.current.us_aqi);
        } catch (e) {
          console.warn('AQI fetch failed, using default');
        }
      } catch (e) {
        console.error('Weather load fail', e);
      }
    };
    fetchWeather();
  }, []);

  const getWeatherIcon = (code, size = 20) => {
    if (code <= 1)
      return <Sun size={size} className="text-amber-500" strokeWidth={2.5} />;
    if (code <= 3)
      return <Cloud size={size} className="text-stone-400" strokeWidth={2.5} />;
    if (code >= 50)
      return (
        <CloudRain size={size} className="text-blue-400" strokeWidth={2.5} />
      );
    return (
      <CloudSun size={size} className="text-amber-400" strokeWidth={2.5} />
    );
  };

  const getAqiColor = (val) => {
    if (val <= 50) return 'bg-emerald-100 text-emerald-700';
    if (val <= 100) return 'bg-yellow-100 text-yellow-700';
    if (val <= 150) return 'bg-orange-100 text-orange-700';
    return 'bg-red-100 text-red-700';
  };

  const getNext24Hours = () => {
    if (!data || !data.hourly || !data.hourly.time) return [];

    const currentHourIndex = new Date().getHours();
    const startIndex = currentHourIndex + 1;
    const endIndex = startIndex + 24;

    const times = data.hourly.time.slice(startIndex, endIndex);
    const temps = data.hourly.temperature_2m.slice(startIndex, endIndex);
    const codes = data.hourly.weather_code.slice(startIndex, endIndex);

    return times.map((t, i) => ({
      time: t.split('T')[1].slice(0, 5),
      temp: Math.round(temps[i]),
      code: codes[i],
    }));
  };

  const nextHours = getNext24Hours();

  return (
    <div className="relative bg-[#FDFBF7] pt-6 pb-8 px-6 border-b border-stone-200 rounded-b-[2.5rem] shadow-xl shadow-stone-200/50 z-10 overflow-hidden">
      <div className="absolute top-[-20px] right-[-20px] text-[8rem] font-serif text-amber-50 opacity-50 select-none leading-none pointer-events-none">
        Thai
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-end mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 bg-amber-100 text-amber-900 text-[10px] font-bold tracking-wider rounded-full">
                佑任・軒寶・學弟・腳慢
              </span>
              <span className="text-[10px] text-stone-400 font-bold tracking-widest">
                2026
              </span>
            </div>
            <h1 className="text-4xl font-serif text-stone-800 tracking-tight leading-[0.9]">
              清邁
              <br />
              <span className="text-amber-600">探尋</span>之旅
            </h1>
          </div>

          <div className="text-right">
            <div className="text-[10px] font-bold text-stone-400 mb-1 uppercase tracking-widest">
              Chiang Mai Now
            </div>
            {data ? (
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2">
                  {getWeatherIcon(data.current.weather_code, 36)}
                  <span className="text-5xl font-serif font-medium text-stone-800 tracking-tighter">
                    {Math.round(data.current.temperature_2m)}°
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${getAqiColor(
                      aqi
                    )}`}
                  >
                    <Wind size={10} /> AQI {aqi}
                  </div>
                  <div className="text-xs text-stone-500 font-medium bg-white/50 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Droplets size={10} /> {data.current.relative_humidity_2m}%
                  </div>
                </div>
              </div>
            ) : (
              <div className="animate-pulse flex gap-2 items-center">
                <div className="w-8 h-8 bg-stone-200 rounded-full"></div>
                <div className="w-12 h-8 bg-stone-200 rounded"></div>
              </div>
            )}
          </div>
        </div>

        {data && nextHours.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 border border-stone-100 shadow-sm">
            <div className="flex items-center">
              <div className="text-[10px] font-bold text-stone-400 writing-vertical-rl rotate-180 border-l pl-3 mr-3 border-stone-200 h-10 flex items-center justify-center tracking-widest flex-shrink-0">
                FUTURE 24H
              </div>

              <div
                className="flex overflow-x-auto gap-4 pb-2 w-full no-scrollbar"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {nextHours.map((h, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col items-center gap-1 min-w-[3.5rem] flex-shrink-0"
                  >
                    <span className="text-[10px] text-stone-400 font-bold whitespace-nowrap">
                      {h.time}
                    </span>
                    <div className="py-1">{getWeatherIcon(h.code, 20)}</div>
                    <span className="text-sm font-bold text-stone-700">
                      {h.temp}°
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const FloatingStatus = ({ itinerary }) => {
  const nextStop = itinerary[0].locations[0];

  return (
    <div className="fixed bottom-20 left-4 right-4 z-30">
      <div className="bg-stone-900/95 backdrop-blur-md text-stone-50 p-4 rounded-2xl shadow-2xl border border-stone-700/50 flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-stone-900 flex-shrink-0 animate-pulse">
            <Navigation size={20} strokeWidth={2.5} />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] text-stone-400 uppercase tracking-wider font-bold mb-0.5 flex items-center gap-1">
              Coming Up <Clock size={10} />
            </div>
            <div className="font-bold text-sm truncate text-white">
              {nextStop.name}
            </div>
            <div className="text-xs text-stone-400 truncate">
              {nextStop.time}
            </div>
          </div>
        </div>
        <button
          onClick={() =>
            window.open(
              `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                nextStop.nav
              )}`,
              '_blank'
            )
          }
          className="bg-stone-800 p-2 rounded-full text-stone-400 hover:text-white hover:bg-stone-700 transition-colors ml-2 flex-shrink-0"
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

const OutfitGuide = () => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen)
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="mx-6 mt-6 bg-white shadow-sm border border-stone-100 py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 text-stone-600 w-[calc(100%-3rem)] active:scale-95 transition-transform"
      >
        <Shirt size={14} className="text-amber-500" /> 查看穿衣建議
      </button>
    );

  return (
    <div className="mx-6 mt-6 bg-[#FFFBF0] p-5 rounded-2xl border border-amber-100/50 shadow-sm relative">
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-3 right-3 text-amber-300 hover:text-amber-500 transition-colors"
      >
        <ChevronUp size={18} />
      </button>
      <h3 className="flex items-center gap-2 font-serif font-bold text-amber-900 text-base mb-3">
        <Shirt size={18} className="text-amber-500" />
        2月穿搭指南
      </h3>
      <div className="space-y-3 text-xs text-stone-600 leading-relaxed">
        <div className="flex items-start gap-3">
          <div className="bg-amber-100 p-1.5 rounded-full text-amber-600">
            <Sun size={12} />
          </div>
          <div>
            <strong className="text-stone-800">白天 (30-35°C)</strong>
            <br />
            棉麻材質、短袖、透氣長裙。太陽很毒，務必戴墨鏡帽。
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="bg-blue-100 p-1.5 rounded-full text-blue-600">
            <Wind size={12} />
          </div>
          <div>
            <strong className="text-stone-800">早晚/百貨 (18-20°C)</strong>
            <br />
            溫差大，隨身帶一件薄襯衫或針織外套。
          </div>
        </div>
        <div className="bg-white p-3 rounded-xl border border-amber-100 flex items-start gap-3">
          <div className="bg-red-100 p-1.5 rounded-full text-red-600">
            <Mountain size={12} />
          </div>
          <div>
            <strong className="text-stone-800 block mb-1">
              茵他儂山特別注意
            </strong>
            <span className="block text-stone-500 mb-0.5">
              • 瀑布區:{' '}
              <span className="text-amber-600 font-bold">熱 (短袖)</span>
            </span>
            <span className="block text-stone-500">
              • 雙塔/山頂:{' '}
              <span className="text-blue-600 font-bold">極冷 (羽絨/防風)</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// update: 地點卡片 (+ㄌ Perplexity 導遊版本 )
const LocationCard = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const getIcon = () => {
    switch (item.type) {
      case 'food':
        return <Utensils size={16} className="text-orange-600" />;
      case 'transport':
        return <Car size={16} className="text-blue-500" />;
      default:
        return <MapPin size={16} className="text-emerald-500" />;
    }
  };

  const handleNav = (e) => {
    e.stopPropagation();
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        item.nav
      )}`,
      '_blank'
    );
  };

  // 新增Perplexity 導遊功能
  const handleAskAI = (e) => {
    e.stopPropagation();
    // 組合提示詞~ 專注於旅遊實用資訊
    const prompt = `我正在清邁旅遊，地點是「${item.name}」。請告訴我這裡有什麼必吃美食、必買紀念品，或是需要注意的參觀禁忌？請用繁體中文回答。`;

    // 開啟 PP 搜尋
    window.open(
      `https://www.perplexity.ai/search?q=${encodeURIComponent(prompt)}`,
      '_blank'
    );
  };

  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className={`bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-stone-100 mb-4 overflow-hidden transition-all duration-300 cursor-pointer ${isExpanded ? 'ring-2 ring-amber-100 shadow-md' : ''
        }`}
    >
      <div className="p-4 flex items-start gap-4">
        <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center border border-stone-100">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start">
            <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wide mb-0.5">
              {item.time}
            </div>
            {item.highlight && (
              <span className="inline-block px-2 py-0.5 bg-amber-50 text-amber-700 text-[10px] font-bold rounded-full border border-amber-100">
                ★ {item.highlight}
              </span>
            )}
          </div>
          <h3 className="font-bold text-stone-800 text-lg leading-tight mb-1 truncate pr-2">
            {item.name}
          </h3>
          <p className="text-sm text-stone-500 leading-relaxed line-clamp-1">
            {item.note}
          </p>
        </div>
        <div className="mt-8 text-stone-300">
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      {isExpanded && (
        <div className="animate-fadeIn">
          <div className="w-full h-48 overflow-hidden relative bg-stone-100">
            {!isImageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
              </div>
            )}
            <img
              src={getLocationImage(item.name)}
              alt={item.name}
              onLoad={() => setIsImageLoaded(true)}
              className={`w-full h-full object-cover transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-4 right-4 text-white/90 text-[10px] flex items-center gap-1">
              <Camera size={10} /> Image for reference
            </div>
          </div>

          <div className="p-5 bg-stone-50/50">
            <div className="mb-5">
              <h4 className="text-xs font-bold text-amber-700 mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                <Info size={12} /> 導遊說故事
              </h4>
              <p className="text-sm text-stone-600 leading-relaxed text-justify whitespace-pre-line font-medium">
                {item.desc || '暫無詳細介紹，但這裡絕對值得一去！'}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleNav}
                className="flex items-center justify-center gap-2 py-3 bg-stone-800 text-amber-50 rounded-xl active:scale-95 transition-all text-sm font-bold shadow-lg shadow-stone-200"
              >
                <Navigation size={16} /> 導航
              </button>

              {/* Perplexity AI 按鈕 */}
              <button
                onClick={handleAskAI}
                className="flex items-center justify-center gap-2 py-3 bg-white border border-stone-200 text-stone-600 rounded-xl active:scale-95 transition-all text-sm font-bold hover:bg-stone-50 shadow-sm"
              >
                <Sparkles size={16} className="text-teal-500" /> 問問 AI
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DayCard = ({ dayData, isOpen, toggle }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    if (isOpen && cardRef.current) {
      setTimeout(() => {
        cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 20);
    }
  }, [isOpen]);

  return (
    <div ref={cardRef} className="mb-3 px-2 scroll-mt-32">
      <div
        onClick={toggle}
        className={`relative flex items-center justify-between p-5 rounded-2xl cursor-pointer transition-all duration-300 ${isOpen
            ? 'bg-stone-800 text-stone-50 shadow-xl scale-[1.02]'
            : 'bg-white text-stone-800 shadow-sm border border-stone-100 hover:shadow-md'
          }`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl border ${isOpen
                ? 'bg-stone-700 border-stone-600'
                : 'bg-stone-50 border-stone-200'
              }`}
          >
            <span
              className={`text-[10px] font-bold uppercase ${isOpen ? 'text-stone-400' : 'text-stone-400'
                }`}
            >
              Day
            </span>
            <span
              className={`text-xl font-serif font-bold ${isOpen ? 'text-amber-400' : 'text-stone-800'
                }`}
            >
              {dayData.day}
            </span>
          </div>
          <div>
            <div
              className={`text-xs font-bold mb-0.5 ${isOpen ? 'text-stone-400' : 'text-stone-500'
                }`}
            >
              {dayData.displayDate}
            </div>
            <div className="font-bold text-lg leading-tight">
              {dayData.title}
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-center justify-end gap-1 mb-1">
            {dayData.weather.realData && (
              <Signal size={10} className="text-green-500 animate-pulse" />
            )}
            <span
              className={`text-sm font-medium ${isOpen ? 'text-stone-300' : 'text-stone-600'
                }`}
            >
              {dayData.weather.temp}
            </span>
          </div>
          {isOpen ? (
            <ChevronUp size={20} className="text-stone-500 ml-auto" />
          ) : (
            <ChevronDown size={20} className="text-stone-300 ml-auto" />
          )}
        </div>
      </div>

      {isOpen && (
        <div className="mt-4 pl-4 border-l-2 border-stone-200/50 space-y-4 pb-4 animate-fadeIn">
          {dayData.locations.map((loc, idx) => (
            <LocationCard key={idx} item={loc} />
          ))}
        </div>
      )}
    </div>
  );
};
// update 航班卡片組件
// 新增 航廈顯示版
// update 航班卡片組件 (修正間距 避免飛機擋住文字20251206)
const FlightCard = ({
  type,
  date,
  flightNo,
  time,
  airline,
  from,
  to,
  fromCode,
  toCode,
  fromTerminal,
  toTerminal,
}) => {
  const searchUrl = `https://www.google.com/search?q=${flightNo}+flight+status`;

  return (
    <div className="bg-white rounded-2xl p-4 border border-stone-100 shadow-sm mb-3 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-stone-50 rounded-bl-full -mr-4 -mt-4 z-0"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-4">
          <span
            className={`px-2 py-1 rounded text-[10px] font-bold tracking-wider ${type === '去程'
                ? 'bg-amber-100 text-amber-800'
                : 'bg-stone-100 text-stone-600'
              }`}
          >
            {type}
          </span>
          <span className="text-xs font-bold text-stone-400">{date}</span>
        </div>

        <div className="flex justify-between items-center mb-4">
          {/* 出發地 */}
          <div className="text-center min-w-[3rem]">
            <div className="text-2xl font-bold text-stone-800 leading-none mb-1">
              {from}
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-stone-400 font-bold tracking-widest">
                {fromCode}
              </span>
              {fromTerminal && (
                <span className="mt-1 text-[10px] font-bold text-white bg-amber-500 px-1.5 py-0.5 rounded shadow-sm">
                  {fromTerminal}
                </span>
              )}
            </div>
          </div>

          {/* 飛機圖示 (修正：加大上下間距 mb-2 mt-2) */}
          <div className="flex-1 px-3 flex flex-col items-center">
            <div className="text-xs font-bold text-stone-500 mb-2">
              {flightNo}
            </div>
            <div className="w-full h-[2px] bg-stone-200 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-1">
                <Plane size={14} className="text-stone-300 rotate-90" />
              </div>
            </div>
            <div className="text-xs font-bold text-stone-400 mt-2 whitespace-nowrap">
              {time}
            </div>
          </div>

          {/* 目的地 */}
          <div className="text-center min-w-[3rem]">
            <div className="text-2xl font-bold text-stone-800 leading-none mb-1">
              {to}
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-stone-400 font-bold tracking-widest">
                {toCode}
              </span>
              {toTerminal && (
                <span className="mt-1 text-[10px] font-bold text-white bg-stone-400 px-1.5 py-0.5 rounded shadow-sm">
                  {toTerminal}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-stone-100">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs text-stone-500 font-medium">
              {airline}
            </span>
          </div>

          <a
            href={searchUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-xs font-bold text-blue-500 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full transition-colors"
          >
            即時動態 <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </div>
  );
};
// 新增 換匯計算機and推薦換匯所
// ============================================
// 修正後的 CurrencySection
// ============================================
// ============================================
// 修正後的 CurrencySection (補回遺失的 thb 變數)
// ============================================
const CurrencySection = () => {
  const [rate, setRate] = useState(1.08);
  const [twd, setTwd] = useState('');
  // 👇👇👇 就是補上這一行！ 👇👇👇
  const [thb, setThb] = useState('');
  const [lastUpdate, setLastUpdate] = useState('');

  // 抓取即時匯率
  useEffect(() => {
    const fetchRate = async () => {
      try {
        // 使用免費匯率 API (以 TWD 為基準)
        const res = await fetch(
          'https://api.exchangerate-api.com/v4/latest/TWD'
        );
        const data = await res.json();
        if (data && data.rates && data.rates.THB) {
          setRate(data.rates.THB); // 1 TWD = ? THB
          setLastUpdate(new Date().toLocaleDateString());
        }
      } catch (e) {
        console.error('匯率抓取失敗', e);
      }
    };
    fetchRate();
  }, []);

  const handleTwdChange = (e) => {
    const val = e.target.value;
    setTwd(val);
    if (val) setThb((parseFloat(val) * rate).toFixed(2));
    else setThb('');
  };

  const handleThbChange = (e) => {
    const val = e.target.value;
    setThb(val);
    if (val) setTwd((parseFloat(val) / rate).toFixed(2));
    else setTwd('');
  };

  //  修正後的換匯所清單 
  const exchanges = [
    {
      id: 1,
      name: '清邁機場換匯 (Arrival)',
      map: 'Chiang Mai International Airport Currency Exchange',
      note: '🚨 抵達應急用，匯率較差，建議只換車資。',
      tag: '抵達第一站',
      tagColor: 'bg-red-100 text-red-700',
    },
    {
      id: 2,
      name: 'Super Rich (清邁店)',
      map: 'Super Rich Chiang Mai',
      note: '🔥 匯率通常是全清邁最好，近古城。',
      tag: '匯率最優',
      tagColor: 'bg-amber-100 text-amber-700',
    },
    {
      id: 3,
      name: 'Mr. Pierre (巫宗雄)',
      map: 'Mr. Pierre Money Exchange',
      note: '👍 古城內匯率王，老闆會說中文。',
      tag: '古城推薦',
      tagColor: 'bg-green-100 text-green-700',
    },
    {
      id: 4,
      name: 'G Exchange Co.,Ltd.',
      map: 'G Exchange Co.,Ltd. Chiang Mai',
      note: 'Loi Kroh 路熱門店，評價極高 (4.7星)。',
      tag: '夜市區',
      tagColor: 'bg-blue-100 text-blue-700',
    },
    {
      id: 5,
      name: 'S.K. Money Exchange',
      map: 'S.K. Money Exchange',
      note: '泰國常見連鎖，塔佩門附近方便。',
    },
  ];

  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 mb-6">
      <h3 className="flex items-center gap-2 font-bold text-stone-800 mb-4 border-b border-stone-100 pb-3">
        <Wallet size={18} className="text-green-600" /> 匯率計算機
      </h3>

      <div className="bg-green-50 p-4 rounded-xl mb-4 border border-green-100">
        <div className="text-xs text-green-600 font-bold mb-2 flex justify-between">
          <span>即時現金匯率</span>
          <span>1 TWD ≈ {rate} THB</span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-2.5 text-stone-400 text-xs font-bold">
              TWD
            </span>
            <input
              type="number"
              value={twd}
              onChange={handleTwdChange}
              placeholder="台幣"
              className="w-full pl-12 pr-3 py-2 rounded-lg border border-green-200 focus:outline-none focus:border-green-500 font-bold text-stone-700"
            />
          </div>
          <div className="text-stone-400">=</div>
          <div className="flex-1 relative">
            <span className="absolute left-3 top-2.5 text-stone-400 text-xs font-bold">
              THB
            </span>
            <input
              type="number"
              value={thb}
              onChange={handleThbChange}
              placeholder="泰銖"
              className="w-full pl-12 pr-3 py-2 rounded-lg border border-green-200 focus:outline-none focus:border-green-500 font-bold text-stone-700 bg-white"
            />
          </div>
        </div>
        <div className="text-[10px] text-green-400 text-right">
          更新: {lastUpdate || '載入中...'}
        </div>
      </div>

      <h4 className="text-xs font-bold text-stone-400 mb-3 uppercase tracking-widest">
        推薦換匯所
      </h4>
      <div className="space-y-2">
        {exchanges.map((ex, i) => (
          <div
            key={i}
            className={`flex justify-between items-center p-3 rounded-xl border transition-all ${i < 3
                ? 'bg-white border-stone-200 shadow-sm'
                : 'bg-stone-50 border-stone-100 opacity-80'
              }`}
          >
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <div className="font-bold text-stone-700 text-sm">
                  {i + 1}. {ex.name}
                </div>
                {ex.tag && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${ex.tagColor}`}
                  >
                    {ex.tag}
                  </span>
                )}
              </div>
              <div className="text-[10px] text-stone-500">{ex.note}</div>
            </div>
            <button
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    ex.map
                  )}`,
                  '_blank'
                )
              }
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-stone-500 shadow-sm border border-stone-200 active:scale-95 hover:text-amber-600 hover:border-amber-200"
            >
              <Navigation size={14} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

// 修改 UtilsPage 的 return 部分：
const UtilsPage = ({ isAdmin }) => {
  return (
    <div className="p-6 space-y-6 pb-24 animate-fade-in bg-[#FDFBF7] min-h-screen">
      <h2 className="text-2xl font-serif font-bold text-stone-800 mb-6">
        實用工具
      </h2>

      {/* 1. 航班資訊區塊 */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
        <h3 className="flex items-center gap-2 font-bold text-stone-800 mb-4 border-b border-stone-100 pb-3">
          <Plane size={18} className="text-blue-500" /> 航班資訊
        </h3>
        <div className="space-y-2 mb-4">
          {UTILS_DATA.flights.map((f, i) => (
            <FlightCard key={i} {...f} />
          ))}
        </div>
        <a
          href={UTILS_DATA.driveUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-blue-50 text-blue-600 font-bold hover:bg-blue-100 active:scale-95 transition-all"
        >
          <Info size={16} /> 開啟電子機票存摺
        </a>
      </section>

      {/* 2. 住宿資訊區塊 */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
        <h3 className="flex items-center gap-2 font-bold text-stone-800 mb-4 border-b border-stone-100 pb-3">
          <Home size={18} className="text-orange-500" /> 住宿導航
        </h3>
        <div className="space-y-4">
          {UTILS_DATA.accommodations.map((acc, idx) => (
            <div
              key={idx}
              className="bg-stone-50 rounded-xl p-4 border border-stone-100 relative overflow-hidden"
            >
              <div className="absolute -right-4 -top-4 w-16 h-16 bg-white rounded-full opacity-50 pointer-events-none"></div>
              <div className="flex justify-between items-start mb-2 relative z-10">
                <div>
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                    {acc.type}
                  </span>
                  <h4 className="font-bold text-stone-800 text-lg leading-tight">
                    {acc.name}
                  </h4>
                </div>
                <span className="text-xs font-bold bg-white px-2 py-1 rounded border border-stone-100 text-stone-500">
                  {acc.date}
                </span>
              </div>
              <p className="text-xs text-stone-500 mb-4 flex items-center gap-1">
                <MapPin size={10} /> {acc.address}
              </p>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      acc.mapQuery
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2 bg-stone-800 text-amber-50 rounded-lg text-xs font-bold active:scale-95 transition-transform shadow-sm"
                  >
                    <Navigation size={12} /> 導航
                  </a>
                  <a
                    href={`tel:${acc.phone}`}
                    className="flex items-center justify-center gap-1.5 py-2 bg-white border border-stone-200 text-stone-600 rounded-lg text-xs font-bold active:scale-95 transition-transform"
                  >
                    <Phone size={12} /> 聯絡
                  </a>
                </div>
                {/* 只有當 isAdmin 為 true (輸入 1314520) 時 ，偶才會顯示 Airbnb 按鈕 */}
                {isAdmin && acc.airbnbUrl && (
                  <div className="grid grid-cols-2 gap-2 animate-fadeIn">
                    <a
                      href={acc.airbnbUrl} // 這裡是 Base64 解碼後的連結
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2 bg-[#FF385C] text-white rounded-lg text-xs font-bold active:scale-95 transition-transform shadow-sm"
                    >
                      <Home size={12} /> 開啟房源
                    </a>
                    <a
                      href={acc.guideUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2 bg-amber-100 text-amber-700 border border-amber-200 rounded-lg text-xs font-bold active:scale-95 transition-transform"
                    >
                      <MapPin size={12} /> 房東地圖
                    </a>
                  </div>
                )}
                {/* 如果不是 Admin 顯示這行字給朋友看 */}
                {!isAdmin && acc.name === 'Lucky Charm House' && (
                  <div className="text-center py-2 bg-stone-50 rounded-lg text-[10px] text-stone-400">
                    🔒 房源連結僅供團員存取
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* 下面的憑證按鈕加入 isAdmin 保護 */}
        {isAdmin && (
          <a
            href={UTILS_DATA.driveUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 mt-4 rounded-xl bg-orange-50 text-orange-600 font-bold hover:bg-orange-100 active:scale-95 transition-all"
          >
            <Info size={16} /> 查看住宿憑證
          </a>
        )}
      </section>

      {/* 3. 租車資訊區塊 */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 mb-6">
        <h3 className="flex items-center gap-2 font-bold text-stone-800 mb-4 border-b border-stone-100 pb-3">
          <Car size={18} className="text-amber-600" /> 租車資訊
        </h3>
        <div className="flex gap-4 mb-4">
          <div className="w-16 h-16 bg-[#009FE3] rounded-xl flex items-center justify-center text-xs font-bold text-white border border-blue-200 shadow-sm">
            DRIVE
          </div>
          <div className="flex-1">
            <div className="text-lg font-bold text-stone-800">
              Nissan Serena (7座)
            </div>
            <div className="text-sm text-stone-500 mb-2 flex items-center gap-1">
              <CheckCircle size={12} className="text-green-500" />{' '}
              預訂確認單已存檔
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-1 rounded border border-amber-100">
                國際線 8-9號門
              </span>
              <span className="text-[10px] bg-stone-100 text-stone-600 px-2 py-1 rounded">
                現場押金 ฿20,000
              </span>
            </div>
          </div>
        </div>
        <div className="relative pl-4 border-l-2 border-stone-200 space-y-6 my-4 ml-2">
          <div className="relative">
            <div className="absolute -left-[21px] top-0 w-3 h-3 rounded-full bg-green-500 ring-4 ring-white"></div>
            <div className="text-xs text-stone-400 font-bold">取車</div>
            <div className="font-bold text-stone-800">2/19 (四) 17:30</div>
            <div className="text-xs text-stone-500 mt-1">
              國際線入境大廳 1樓 (Gate 8-9)
            </div>
          </div>
          <div className="relative">
            <div className="absolute -left-[21px] top-0 w-3 h-3 rounded-full bg-red-400 ring-4 ring-white"></div>
            <div className="text-xs text-stone-400 font-bold">還車</div>
            <div className="font-bold text-stone-800">2/20 (五) 17:30</div>
            <div className="text-xs text-stone-500 mt-1">國際線入境大廳</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4">
          <a
            href="tel:+66847004384"
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-stone-200 text-sm font-bold text-stone-600 hover:bg-stone-50 transition-colors"
          >
            <Phone size={16} /> 車行電話
          </a>
          <a
            href={UTILS_DATA.driveUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-stone-800 text-amber-50 text-sm font-bold hover:bg-stone-700 active:scale-95 transition-all"
          >
            <Info size={16} /> 原始憑證
          </a>
        </div>
      </section>

      {/* 4. LINE 分帳 (綠色區塊) */}
      <section className="bg-[#06C755] p-6 rounded-2xl shadow-lg shadow-green-900/10 text-white relative overflow-hidden mb-6">
        <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
        <h3 className="flex items-center gap-2 font-bold text-white mb-2 relative z-10">
          <Wallet size={18} /> 公款記帳與分帳
        </h3>
        <p className="text-green-50 text-sm mb-6 relative z-10 font-medium">
          所有公費支出請統一記錄在此，系統會自動結算每個人該付多少錢。
        </p>
        <a
          href="https://liff.line.me/1655320992-Y8GowEpw/g/omJHZiZC5crkXh6mQvaXgT"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-white text-[#06C755] py-3.5 rounded-xl font-bold hover:bg-green-50 active:scale-95 transition-all shadow-sm relative z-10"
        >
          開啟 Lightsplit 分帳群組 <ArrowRight size={16} />
        </a>
      </section>

      {/*  5. 匯率計算機 */}
      <CurrencySection />

      {/* 6. 緊急救援 (紅色區塊) */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 mb-6">
        <h3 className="flex items-center gap-2 font-bold text-red-700 mb-4 border-b border-stone-100 pb-3">
          <AlertCircle size={18} className="text-red-600" /> 緊急救援中心
        </h3>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3">
            <a
              href="tel:1155"
              className="bg-red-50 hover:bg-red-100 p-3 rounded-xl flex flex-col items-center justify-center gap-1 transition-colors border border-red-100"
            >
              <span className="text-2xl font-black text-red-600">1155</span>
              <span className="text-xs font-bold text-red-800">
                觀光警察 (中文可)
              </span>
            </a>
            <a
              href="tel:1669"
              className="bg-red-50 hover:bg-red-100 p-3 rounded-xl flex flex-col items-center justify-center gap-1 transition-colors border border-red-100"
            >
              <span className="text-2xl font-black text-red-600">1669</span>
              <span className="text-xs font-bold text-red-800">
                救護車 (24hr)
              </span>
            </a>
          </div>
          <div>
            <h4 className="text-xs font-bold text-stone-400 mb-3 uppercase tracking-widest flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>{' '}
              推薦醫院 (24hr 急診)
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-100">
                <div>
                  <div className="font-bold text-stone-800">Chiang Mai Ram</div>
                  <div className="text-xs text-stone-500">
                    清邁蘭醫院 (設備最好)
                  </div>
                </div>
                <a
                  href="tel:053920300"
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-green-600 shadow-sm border border-stone-100"
                >
                  <Phone size={14} />
                </a>
              </div>
              <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl border border-stone-100">
                <div>
                  <div className="font-bold text-stone-800">
                    Bangkok Hospital
                  </div>
                  <div className="text-xs text-stone-500">
                    曼谷醫院 (服務最優)
                  </div>
                </div>
                <a
                  href="tel:1719"
                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-green-600 shadow-sm border border-stone-100"
                >
                  <Phone size={14} />
                </a>
              </div>
            </div>
          </div>
          <div className="bg-stone-800 rounded-xl p-4 text-stone-300 text-sm space-y-3">
            <div className="flex justify-between items-center border-b border-stone-700 pb-2">
              <span>🇹🇼 駐泰辦事處 (急難)</span>
              <a
                href="tel:0816664006"
                className="text-amber-400 font-bold hover:underline"
              >
                081-666-4006
              </a>
            </div>
            <div className="flex justify-between items-center border-b border-stone-700 pb-2">
              <span>👮 當地報案 (Police)</span>
              <a
                href="tel:191"
                className="text-white font-bold hover:underline"
              >
                191
              </a>
            </div>
            <div className="flex justify-between items-center pt-1">
              <span>💳 Visa 全球掛失</span>
              <a
                href="tel:001800115350660"
                className="text-stone-400 text-xs hover:text-white"
              >
                001-800-11-535-0660
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ============================================
// 4.行李清單 &泰國需知
// ============================================

const DEFAULT_ITEMS = [
  '乳液、凡士林',
  '防曬乳',
  '化妝品',
  '衣服、褲子',
  '睡衣',
  '內衣褲、襪子',
  '護照',
  'eSIM / 網卡',
  '提款卡 (開國外提款)',
  '信用卡',
  '現金 (泰銖/台幣)',
  '牙膏、牙刷',
  '行李箱 (確認密碼)',
  '一般出門鞋子',
  '手機 & 充電器',
  '行動電源',
  '衛生紙/濕紙巾',
  '吹風機 (確認電壓)',
  '梳子',
  '旅行電熱壺',
  '暈車藥',
  '防蚊液',
  '國際轉接插座 (220V)',
  '身分證/健保卡',
  '國際駕照',
  '個人藥品',
  '雨傘/便利雨衣',
  '汽車導航架',
  '泳衣',
  '塑膠袋 (髒衣物用)',
  '沐浴乳/洗髮精',
  '西裝',
  '數位相機/充電器/記憶卡',
  '隱形眼鏡/藥水/器具',
  '眼鏡/眼鏡盒',
  '墨鏡',
  '刮鬍刀/刮鬍泡',
];

const USERS = ['佑任', '軒寶', '學弟', '腳慢'];

const ThaiTips = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mx-6 mt-6 mb-6">
      <div className="bg-amber-50 rounded-2xl border border-amber-100 overflow-hidden shadow-sm">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-4 bg-amber-100/50 text-amber-900 font-bold"
        >
          <div className="flex items-center gap-2">
            <AlertCircle size={18} className="text-amber-600" />
            <span>泰國旅遊禁忌與需知</span>
          </div>
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {isOpen && (
          <div className="p-4 space-y-4 text-sm text-stone-700 leading-relaxed">
            <div className="flex gap-3">
              <div className="min-w-[24px] text-red-500 font-bold">
                <Gavel size={18} />
              </div>
              <div>
                <strong className="text-red-700 block">電子菸絕對違法</strong>
                攜帶或使用電子菸在泰國是違法的，最高可判10年監禁或高額罰款。
              </div>
            </div>
            <div className="flex gap-3">
              <div className="min-w-[24px] text-amber-600 font-bold">
                <Zap size={18} />
              </div>
              <div>
                <strong className="text-stone-900 block">電壓 220V</strong>
                台灣電器(110V)如吹風機、離子夾
                <span className="font-bold text-red-600">不可直接插</span>
                ，會燒壞！手機充電器通常支援100-240V則沒問題。
              </div>
            </div>
            <div className="flex gap-3">
              <div className="min-w-[24px] text-stone-600 font-bold">
                <User size={18} />
              </div>
              <div>
                <strong className="text-stone-900 block">文化與規矩</strong>
                1. 絕對不可批評皇室 (重罪)。
                <br />
                2. 不要摸泰國人的頭。
                <br />
                3. 寺廟需脫鞋，不可穿著暴露。
              </div>
            </div>
            <div className="flex gap-3">
              <div className="min-w-[24px] text-green-600 font-bold">
                <Utensils size={18} />
              </div>
              <div>
                <strong className="text-stone-900 block">飲食衛生</strong>
                生水不可飲用。路邊攤少吃生食 (如生蝦、生蟹)，避免腸胃不適。
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// 修改 PackingPage: 接收 isKonamiActive 來切換顯示模式
const PackingPage = ({ isKonamiActive }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [packingData, setPackingData] = useState({});
  const [newItem, setNewItem] = useState('');

  // 角色圖片對照表
  const CHARACTER_MAP = {
    佑任: 'https://www.sanrio.co.jp/special/characterranking/2025/assets/img/results/img_rank1.png', // 布丁狗
    軒寶: 'https://www.sanrio.co.jp/special/characterranking/2025/assets/img/characters/hellokitty.png', // Kitty
    學弟: 'https://www.sanrio.co.jp/special/characterranking/2025/assets/img/results/img_rank2.png', // 大耳狗
    腳慢: 'https://www.sanrio.co.jp/special/characterranking/2025/assets/img/characters/mymelody.png', // 美樂蒂
  };

  useEffect(() => {
    const saved = localStorage.getItem('cm_packing_list_v2');
    if (saved) {
      setPackingData(JSON.parse(saved));
    } else {
      const initialData = {};
      USERS.forEach((user) => {
        initialData[user] = DEFAULT_ITEMS.map((item) => ({
          name: item,
          checked: false,
        }));
      });
      setPackingData(initialData);
      localStorage.setItem('cm_packing_list_v2', JSON.stringify(initialData));
    }
  }, []);

  const saveToStorage = (newData) => {
    setPackingData(newData);
    localStorage.setItem('cm_packing_list_v2', JSON.stringify(newData));
  };

  const toggleItem = (user, index) => {
    const newData = { ...packingData };
    newData[user][index].checked = !newData[user][index].checked;
    saveToStorage(newData);

    const allChecked = newData[user].every((item) => item.checked);
    if (allChecked && newData[user].length > 0) {
      setTimeout(() => {
        alert('🎉 完美! 所有行李都準備好了!\n準備出發清邁囉~');
      }, 300);
    }
  };

  const addItem = () => {
    if (!newItem.trim() || !currentUser) return;
    const newData = { ...packingData };
    newData[currentUser] = [
      { name: newItem, checked: false },
      ...newData[currentUser],
    ];
    saveToStorage(newData);
    setNewItem('');
  };

  const deleteItem = (index) => {
    if (!window.confirm('確定刪除此項目？')) return;
    const newData = { ...packingData };
    newData[currentUser].splice(index, 1);
    saveToStorage(newData);
  };

  const getProgress = (user) => {
    if (!packingData[user]) return 0;
    const total = packingData[user].length;
    const checked = packingData[user].filter((i) => i.checked).length;
    return total === 0 ? 0 : Math.round((checked / total) * 100);
  };

  return (
    <div className="pb-24 min-h-screen bg-[#FDFBF7]">
      <ThaiTips />

      <div className="px-6 mt-2 mb-4">
        <h2 className="text-2xl font-serif font-bold text-stone-800 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-amber-500 rounded-full"></span>
          行李準備清單
        </h2>
        <p className="text-xs text-stone-400 mt-1 ml-3.5">
          請點選下方名字開始檢查
        </p>
      </div>

      <div className="px-6 mb-6">
        <h3 className="text-center font-serif text-stone-500 mb-4 text-sm italic">
          — Who are you? —
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {USERS.map((user) => (
            <button
              key={user}
              onClick={() => setCurrentUser(user)}
              className={`py-3 rounded-xl text-sm font-bold transition-all shadow-sm flex flex-col items-center justify-center gap-1 h-20 ${currentUser === user
                  ? 'bg-amber-500 text-white ring-2 ring-amber-200 ring-offset-2 transform scale-105'
                  : 'bg-white text-stone-600 border border-stone-200 hover:bg-stone-50'
                }`}
            >
              {/* 判斷：如果有觸發彩蛋，就顯示圖片；否則顯示文字 */}
              {isKonamiActive ? (
                <div className="flex flex-col items-center animate-bounce">
                  {/* 針對學弟(大耳狗)做特別放大處理 scale-125 */}
                  <img
                    src={CHARACTER_MAP[user]}
                    alt={user}
                    className={`w-12 h-12 object-contain mb-1 drop-shadow-sm ${user === '學弟' ? 'scale-125' : ''
                      }`}
                  />
                  <span className="text-[10px] opacity-80">{user}</span>
                </div>
              ) : (
                <>
                  <span>{user}</span>
                  {packingData[user] && (
                    <span className="text-[10px] opacity-80 font-normal">
                      {getProgress(user)}%
                    </span>
                  )}
                </>
              )}
            </button>
          ))}
        </div>
      </div>

      {currentUser ? (
        <div className="px-6 animate-fadeIn">
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-2xl font-serif font-bold text-stone-800 flex items-center gap-2">
              <span className="text-amber-600">{currentUser}</span> 的清單
              {/* 如果觸發彩蛋，標題旁也顯示小圖 */}
              {isKonamiActive && (
                <img
                  src={CHARACTER_MAP[currentUser]}
                  className="w-8 h-8 -mb-1"
                />
              )}
            </h2>
            <span className="text-xs text-stone-400 font-bold">
              {packingData[currentUser]?.filter((i) => i.checked).length} /{' '}
              {packingData[currentUser]?.length} 完成
            </span>
          </div>

          <div className="h-1.5 w-full bg-stone-200 rounded-full mb-6 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-500"
              style={{ width: `${getProgress(currentUser)}%` }}
            />
          </div>

          <div className="mb-6 flex gap-2">
            <input
              type="text"
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              placeholder="新增個人項目..."
              className="flex-1 p-3 rounded-xl border border-stone-200 focus:outline-none focus:border-amber-500 bg-white shadow-sm"
              onKeyPress={(e) => e.key === 'Enter' && addItem()}
            />
            <button
              onClick={addItem}
              className="bg-stone-800 text-amber-50 px-5 rounded-xl font-bold active:scale-95 transition-transform shadow-md"
            >
              +
            </button>
          </div>

          <div className="space-y-3">
            {packingData[currentUser]?.map((item, index) => (
              <div
                key={index}
                onClick={() => toggleItem(currentUser, index)}
                className={`flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer ${item.checked
                    ? 'bg-stone-100 border-transparent opacity-60'
                    : 'bg-white border-stone-100 shadow-sm hover:shadow-md'
                  }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors flex-shrink-0 ${item.checked
                      ? 'bg-green-500 border-green-500 text-white'
                      : 'border-stone-300 bg-stone-50'
                    }`}
                >
                  {item.checked && <CheckCircle size={14} strokeWidth={3} />}
                </div>
                <span
                  className={`flex-1 font-medium ${item.checked
                      ? 'text-stone-400 line-through decoration-stone-400'
                      : 'text-stone-700'
                    }`}
                >
                  {item.name}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteItem(index);
                  }}
                  className="p-2 text-stone-300 hover:text-red-400 transition-colors"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="h-12" />
        </div>
      ) : (
        <div className="px-10 py-20 text-center text-stone-400">
          <p className="text-sm">
            👆 請先點選上方按鈕
            <br />
            開啟專屬清單
            <br />
            (此處有彩蛋喔~提示:上下左右)
          </p>
        </div>
      )}
    </div>
  );
};


// Main App (20261208 卡通叢林 + 防誤觸 + 名單回歸)
export default function TravelApp() {
  const [isLocked, setIsLocked] = useState(true);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [inputPwd, setInputPwd] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [showHelloKitty, setShowHelloKitty] = useState(false);
  const pressTimerRef = useRef(null);

  const [activeTab, setActiveTab] = useState('itinerary');
  const [openDay, setOpenDay] = useState(0);
  const [itinerary, setItinerary] = useState(INITIAL_ITINERARY_DATA);

  // 彩蛋狀態
  const [shakeCount, setShakeCount] = useState(0);
  const [showShakeEgg, setShowShakeEgg] = useState(false);

  // 滑動彩蛋
  const touchStartRef = useRef({ x: 0, y: 0 });
  const [konamiSequence, setKonamiSequence] = useState([]);
  const [isKonamiActive, setIsKonamiActive] = useState(false);

  const MY_PASSWORD = '1314520';

  // 使用俯視的熱帶叢林 之後再來改圖源
  const JUNGLE_BG =
    process.env.PUBLIC_URL + '/images/jungle1.jpeg';

  // 1. 搖晃彩蛋邏輯
  useEffect(() => {
    let lastShakeTime = 0;
    const handleShake = (e) => {
      const acc = e.accelerationIncludingGravity || e.acceleration;
      if (!acc) return;
      const total = Math.abs(acc.x) + Math.abs(acc.y) + Math.abs(acc.z);
      if (total > 20 && Date.now() - lastShakeTime > 300) {
        lastShakeTime = Date.now();
        setShakeCount((prev) => {
          const newCount = prev + 1;
          if (newCount >= 8) {
            setShowShakeEgg(true);
            return 0;
          }
          return newCount;
        });
      }
    };
    window.addEventListener('devicemotion', handleShake);
    return () => window.removeEventListener('devicemotion', handleShake);
  }, []);

  const requestMotionPermission = async () => {
    if (
      typeof DeviceMotionEvent !== 'undefined' &&
      typeof DeviceMotionEvent.requestPermission === 'function'
    ) {
      try {
        await DeviceMotionEvent.requestPermission();
      } catch (e) {
        console.error(e);
      }
    }
  };

  // 2. 滑動彩蛋邏輯
  useEffect(() => {
    const handleStart = (clientX, clientY) => {
      touchStartRef.current = { x: clientX, y: clientY };
    };
    const handleEnd = (clientX, clientY) => {
      const diffX = clientX - touchStartRef.current.x;
      const diffY = clientY - touchStartRef.current.y;
      if (Math.abs(diffX) < 30 && Math.abs(diffY) < 30) return;
      let direction = '';
      if (Math.abs(diffX) > Math.abs(diffY)) {
        direction = diffX > 0 ? 'right' : 'left';
      } else {
        direction = diffY > 0 ? 'down' : 'up';
      }
      setKonamiSequence((prev) => [...prev, direction].slice(-4));
    };

    const onTouchStart = (e) =>
      handleStart(e.touches[0].clientX, e.touches[0].clientY);
    const onTouchEnd = (e) =>
      handleEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    const onMouseDown = (e) => handleStart(e.clientX, e.clientY);
    const onMouseUp = (e) => handleEnd(e.clientX, e.clientY);

    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  useEffect(() => {
    if (konamiSequence.join(' ') === 'up down left right') {
      setIsKonamiActive((prev) => !prev);
      setKonamiSequence([]);
    }
  }, [konamiSequence]);

  // 3. 氣象更新
  useEffect(() => {
    const updateWeatherForecast = async () => {
      const today = new Date();
      // 防呆：需確保 itinerary 有資料
      if (!itinerary || itinerary.length === 0) return;

      const firstDayStr = itinerary[0].date;
      const lastDayStr = itinerary[itinerary.length - 1].date;
      const tripStart = new Date(firstDayStr);
      const diffTime = tripStart - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 14) return;

      try {
        const cityRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=18.7883&longitude=98.9853&daily=weather_code,temperature_2m_max,temperature_2m_min&start_date=${firstDayStr}&end_date=${lastDayStr}`
        );
        const cityData = await cityRes.json();
        const mountainRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=18.58&longitude=98.48&daily=weather_code,temperature_2m_max,temperature_2m_min&start_date=${firstDayStr}&end_date=${lastDayStr}`
        );
        const mountainData = await mountainRes.json();

        setItinerary((prevItinerary) => {
          return prevItinerary.map((dayItem, index) => {
            if (!cityData.daily || !cityData.daily.time[index]) return dayItem;
            let maxTemp, minTemp, code;
            if (
              dayItem.day === 6 &&
              mountainData.daily &&
              mountainData.daily.time[index]
            ) {
              maxTemp = Math.round(
                mountainData.daily.temperature_2m_max[index]
              );
              minTemp = Math.round(
                mountainData.daily.temperature_2m_min[index]
              );
              code = mountainData.daily.weather_code[index];
            } else {
              maxTemp = Math.round(cityData.daily.temperature_2m_max[index]);
              minTemp = Math.round(cityData.daily.temperature_2m_min[index]);
              code = cityData.daily.weather_code[index];
            }
            return {
              ...dayItem,
              weather: {
                ...dayItem.weather,
                temp: `${minTemp}-${maxTemp}°C`,
                icon: code <= 3 ? 'sunny' : 'cloudy',
                realData: true,
              },
            };
          });
        });
      } catch (e) {
        console.error('氣象同步失敗:', e);
      }
    };
    updateWeatherForecast();
  }, []);

  const handleUnlock = () => {
    requestMotionPermission();

    if (inputPwd === '1314520') {
      // 情況 A: 自己人 (團員) : Admin 模式
      setIsAdmin(true);
      setIsUnlocking(true);
      setTimeout(() => setIsLocked(false), 800);
    } else if (inputPwd === '8888') {
      // 情況 B: IG 朋友 (訪客) : 關閉 Admin 模式
      setIsAdmin(false);
      setIsUnlocking(true);
      setTimeout(() => setIsLocked(false), 800);
    } else {
      alert('密碼錯誤！再試一次吧 🔒');
      setInputPwd('');
    }
  };

  const handlePressStart = () => {
    pressTimerRef.current = setTimeout(() => setShowHelloKitty(true), 2000);
  };
  const handlePressEnd = () => {
    if (pressTimerRef.current) clearTimeout(pressTimerRef.current);
  };

  return (
    // 優化加入 overscroll-behavior-none 防止手機下拉重整 加入 select-none 防止選取文字
    <div className="min-h-screen bg-[#FDFBF7] font-sans text-stone-800 max-w-md mx-auto relative shadow-2xl overflow-hidden overscroll-behavior-none select-none">
      {/* 鎖定畫面 */}
      {isLocked && (
       <div className="fixed inset-0 z-[100] flex items-start justify-center pt-90 overflow-hidden bg-stone-900">
          {/* 左半邊葉子門 */}
          <div
            className={`absolute top-0 left-0 w-1/2 h-full transition-transform duration-1000 ease-in-out ${isUnlocking ? '-translate-x-full' : 'translate-x-0'
              }`}
            style={{
              backgroundImage: `url(${JUNGLE_BG})`,
              backgroundSize: '200% 110%',
              backgroundPosition: 'left center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          {/* 右半邊葉子門 */}
          <div
            className={`absolute top-0 right-0 w-1/2 h-full transition-transform duration-1000 ease-in-out ${isUnlocking ? 'translate-x-full' : 'translate-x-0'
              }`}
            style={{
              backgroundImage: `url(${JUNGLE_BG})`,
              backgroundSize: '200% 110%',
              backgroundPosition: 'right center',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className="absolute inset-0 bg-black/20"></div>
          </div>

          {/* 中央內容區 */}
          <div
            className={`relative z-10 flex flex-col items-center w-full px-8 transition-opacity duration-500 ${isUnlocking ? 'opacity-0' : 'opacity-100'
              }`}
          >
            {/* 優化加入問號按鈕加上 touch-none 和禁止右鍵 防止長按選取 */}
            <div
              onMouseDown={handlePressStart}
              onMouseUp={handlePressEnd}
              onMouseLeave={handlePressEnd}
              onTouchStart={handlePressStart}
              onTouchEnd={handlePressEnd}
              onContextMenu={(e) => e.preventDefault()}
              className="bg-white/20 p-6 rounded-full mb-6 shadow-2xl border border-white/30 backdrop-blur-md cursor-pointer active:scale-95 transition-transform animate-pulse touch-none"
              style={{ WebkitUserSelect: 'none', userSelect: 'none' }}
            >
              <HelpCircle
                size={40}
                className="text-white drop-shadow-md"
                strokeWidth={2.5}
              />
            </div>

            <h2 className="text-3xl font-serif font-bold mb-1 tracking-wide text-white drop-shadow-md">
              Chiang Mai
            </h2>

            <p className="text-emerald-100 text-sm mb-2 text-center tracking-widest font-sans drop-shadow font-bold">
              佑任・軒寶・學弟・腳慢
            </p>
            <p className="text-white/80 text-xs mb-8 text-center tracking-wider font-sans drop-shadow">
              Jungle Adventure
            </p>

            <div className="w-full relative mb-6">
              <KeyRound
                size={18}
                className="absolute left-4 top-4 text-emerald-700"
              />
              <input
                type="password"
                value={inputPwd}
                onChange={(e) => setInputPwd(e.target.value)}
                placeholder="Passcode"
                className="w-full bg-white/80 border border-white/50 rounded-2xl pl-12 pr-4 py-3.5 text-lg tracking-[0.2em] outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 transition-all text-emerald-900 placeholder:text-emerald-700/50 text-center font-bold shadow-lg"
              />
            </div>

            <button
              onClick={handleUnlock}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg shadow-emerald-900/40 active:scale-95 flex items-center justify-center gap-2"
            >
              Start Journey <ArrowRight size={18} />
            </button>

            <div className="mt-8 text-white/60 text-[10px] tracking-widest uppercase font-bold drop-shadow-sm">
              System Ver. 9.3 清邁4人團🧋
            </div>
          </div>

          {/* Hello Kitty 彩蛋彈窗 */}
          {showHelloKitty && (
            <div
              onClick={() => setShowHelloKitty(false)}
              className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 animate-fadeIn p-8 backdrop-blur-sm"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="bg-[#FFF0F5] p-6 rounded-3xl shadow-2xl max-w-sm relative border-4 border-pink-200 text-center"
              >
                <button
                  onClick={() => setShowHelloKitty(false)}
                  className="absolute top-2 right-4 text-pink-400 hover:text-pink-600 text-2xl font-bold"
                >
                  ×
                </button>
                <img
                  src="https://shoplineimg.com/62b43a417c1950002317c6d8/689a89118af843000fdfa15a/750x.jpg"
                  alt="Hello Kitty Surprise"
                  className="w-48 h-48 object-cover mx-auto rounded-2xl mb-4 border-2 border-pink-100 shadow-md"
                />
                <h3 className="text-2xl font-bold text-pink-500 mb-2 font-serif">
                  Surprise!
                </h3>
                <p className="text-pink-400 text-sm font-bold">
                  發現隱藏彩蛋 🎉
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 主程式 (unlock後) */}
      <WeatherHero />

      <main className="pb-28">
        {activeTab === 'itinerary' && (
          <div className="pb-4">
            <OutfitGuide />
            <div className="p-4 mt-2">
              {itinerary.map((day, idx) => (
                <DayCard
                  key={day.day}
                  dayData={day}
                  isOpen={openDay === idx}
                  toggle={() => setOpenDay(openDay === idx ? -1 : idx)}
                />
              ))}
              <div className="text-center text-xs text-stone-400 mt-12 mb-8 font-serif italic">
                — Journey to Chiang Mai —
              </div>
            </div>
            <FloatingStatus itinerary={itinerary} />
          </div>
        )}

        {activeTab === 'packing' && (
          <PackingPage isKonamiActive={isKonamiActive} />
        )}

        {activeTab === 'utils' && <UtilsPage isAdmin={isAdmin} />}
      </main>

      {/* 搖晃彩蛋 */}
      {showShakeEgg && (
        <div
          onClick={() => setShowShakeEgg(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-8 backdrop-blur-sm animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#FFF0F5] p-6 rounded-3xl shadow-2xl max-w-sm relative border-4 border-pink-200 text-center"
          >
            <button
              onClick={() => setShowShakeEgg(false)}
              className="absolute top-2 right-4 text-pink-400 hover:text-pink-600 text-2xl font-bold z-10"
            >
              ×
            </button>
            <img
              src="https://i.pinimg.com/originals/24/63/40/24634090aa96299f569a8bb60c9dda14.gif"
              alt="Shake Surprise"
              className="w-full rounded-xl mb-4"
            />
            <h3 className="text-2xl font-bold text-pink-600 mb-2 font-serif">
              搖出驚喜!
            </h3>
            <p className="text-pink-500 mb-2">大家的旅途一定會超順利~</p>
          </div>
        </div>
      )}

      {/* 底部導覽列 */}
      <nav className="fixed bottom-0 w-full max-w-md bg-white/90 backdrop-blur-lg border-t border-stone-200 flex justify-around py-4 pb-8 z-40 shadow-[0_-4px_20px_-4px_rgba(0,0,0,0.05)]">
        <button
          onClick={() => setActiveTab('itinerary')}
          className={`flex flex-col items-center gap-1.5 transition-colors ${activeTab === 'itinerary' ? 'text-stone-800' : 'text-stone-400'
            }`}
        >
          <MapPin size={22} strokeWidth={activeTab === 'itinerary' ? 2.5 : 2} />
          <span className="text-[10px] font-bold tracking-wide">行程</span>
        </button>
        <button
          onClick={() => setActiveTab('packing')}
          className={`flex flex-col items-center gap-1.5 transition-colors ${activeTab === 'packing' ? 'text-stone-800' : 'text-stone-400'
            }`}
        >
          <CheckCircle
            size={22}
            strokeWidth={activeTab === 'packing' ? 2.5 : 2}
          />
          <span className="text-[10px] font-bold tracking-wide">準備</span>
        </button>
        <button
          onClick={() => setActiveTab('utils')}
          className={`flex flex-col items-center gap-1.5 transition-colors ${activeTab === 'utils' ? 'text-stone-800' : 'text-stone-400'
            }`}
        >
          <Wallet size={22} strokeWidth={activeTab === 'utils' ? 2.5 : 2} />
          <span className="text-[10px] font-bold tracking-wide">工具</span>
        </button>
      </nav>
    </div>
  );
}
