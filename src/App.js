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
  Coins,
  Banknote,
  Smile,
  FileText,
  AlertTriangle,
  Zap,
  HelpCircle,
  Settings,
  Upload,
  RefreshCw,
  Trash2,
  Coffee,
  Beer,
  Flower2,
  ShoppingBag,
  IceCream,
  UtensilsCrossed,
  Compass,
} from 'lucide-react';


// 🔥🔥🔥 加入這兩行 (開啟雲端功能) 🔥🔥🔥
import { ref, onValue, set } from "firebase/database";
import { db } from "./firebase"; // ⚠️ 前提：你要先建立 firebase.js 檔案

// 🪷 泰式蓮花 Icon (線條版 - 仿照您提供的圖片)
const LotusIcon = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"               // 內部不填色
    stroke="currentColor"     // 線條顏色跟隨文字
    strokeWidth="1.5"         // 線條粗細 (想要更細可改 1, 更粗改 2)
    strokeLinecap="round"     // 線條端點圓潤
    strokeLinejoin="round"    // 線條轉角圓潤
    className={className}
  >
    {/* 中央花瓣 */}
    <path d="M12 3C12 3 14.5 7 14.5 10C14.5 12.5 12 14 12 14C12 14 9.5 12.5 9.5 10C9.5 7 12 3 12 3Z" />
    {/* 左側花瓣 */}
    <path d="M9.5 10C9.5 10 7 9.5 5.5 11C4 12.5 5 15 8 15.5" />
    {/* 右側花瓣 */}
    <path d="M14.5 10C14.5 10 17 9.5 18.5 11C20 12.5 19 15 16 15.5" />
    {/* 底部左葉 */}
    <path d="M12 14C12 14 9 14.5 7 16.5C5 18.5 6 20.5 12 20.5" />
    {/* 底部右葉 */}
    <path d="M12 14C12 14 15 14.5 17 16.5C19 18.5 18 20.5 12 20.5" />
  </svg>
);
// ============================================
// 圖片XD
// ===========================================
// ============================================
// 圖片處理自動對應 dayX_Y.jpg
// ============================================
const getLocationImage = (imageId) => {
  // 1. 防呆：如果沒有 ID，回傳預設圖 (Unsplash)
  if (!imageId) return 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80';

  // 2. 升級邏輯：判斷是否為「網址 (http)」或「Base64 (data:)」
  // 這樣之後您在管理員模式貼網址或上傳照片，系統會直接吃，不會笨笨地去加 .jpg
  if (imageId.startsWith('http') || imageId.startsWith('data:')) {
    return imageId;
  }

  // 3. 本地圖檔邏輯：
  // 🔥 確認使用 .jpg (直接讀取 public/images 裡面的原檔)
  return process.env.PUBLIC_URL + `/images/${imageId}.jpg`;
};

// ============================================
// 初始行程資料 日期改回 2026ㄌ
// ============================================
// ============================================
// 初始行程資料 最終定案2026/02)
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
        imageId: 'day1_1',
        type: 'transport',
        time: '17:30',
        name: '機場取車 (Drive Car Rental)',
        note: '備妥護照、國際駕照、台灣駕照、信用卡。',
        desc: '取車時請仔細檢查車身刮痕並拍照錄影。',
        nav: 'Chiang Mai International Airport Drive Car Rental',
        difficulty: '低 (無障礙設施)',
      },
      {
        imageId: 'day1_2',
        type: 'transport',
        time: '17:30-19:00',
        name: '前往 Mae Kampong',
        note: '山路視線暗請小心，車程約1.5小時。',
        desc: '這是一段蜿蜒的山路，進入山區後路燈較少，請慢速行駛。',
        nav: 'Mae Kampong Village',
        difficulty: '零 (全程坐車)',
      },
      {
        imageId: 'day1_3',
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
        imageId: 'day2_1',
        type: 'sight',
        time: '06:00',
        name: '日出: Kew Fin Viewpoint',
        note: '清邁與南邦府交界，看日出雲海。',
        desc: '視野極佳，運氣好可看到壯觀雲海。路陡請小心駕駛。',
        nav: 'Kew Fin Viewpoint',
        difficulty: '高 (需步行陡坡)',
      },
      {
        imageId: 'day2_2',
        type: 'sight',
        time: '10:00',
        name: 'Mae Kampong 村落探索',
        note: '瀑布與古老木屋。',
        desc: '百年歷史的古老村落，必看「招財神廟 (Wat Khantha Pruksa)」。若不想走，建議執行「咖啡廳據點副行程」。',
        nav: 'Wat Khantha Pruksa',
        difficulty: '極高 (多陡坡階梯)',
      },
      {
        imageId: 'day2_3',
        type: 'food',
        time: '11:00',
        name: '懸崖咖啡廳 (Teddu)',
        note: '爛腳人避難所副行程。',
        desc: '擁有著名的森林吊橋，咖啡廳懸空在溪流與樹林之上。',
        nav: 'Teddu Coffee',
        highlight: '網美吊橋',
        difficulty: '中 (部分階梯)',
      },
      {
        imageId: 'day2_4',
        type: 'transport',
        time: '14:30',
        name: '市區採買 (Rimping)',
        note: '趁還車前買水、零食。',
        desc: '利用還車前的空檔，在市區超市買水、零食。',
        nav: 'Rimping Supermarket Nim City',
        difficulty: '低',
      },
      {
        imageId: 'day2_5',
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
        imageId: 'day3_1',
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
        imageId: 'day3_2',
        type: 'sight',
        time: '12:45',
        name: 'Chamcha Market (雨林市集)',
        note: '雨豆樹林下野餐氛圍。',
        desc: '氣氛像在森林野餐。攤位多為藍染、陶藝等藝術家進駐，比 Jing Jai 更悠閒一點。',
        nav: 'Chamcha Market',
        difficulty: '中 (自然地面)',
      },
      {
        imageId: 'day3_3',
        type: 'sight',
        time: '15:45',
        name: '強制回血時間',
        note: '回民宿洗澡、午睡。',
        desc: '今日步行量大，此休息至關重要。',
        nav: 'Haiya',
        difficulty: '零',
      },
      {
        imageId: 'day3_4',
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
        imageId: 'day4_1',
        type: 'sight',
        time: '09:30',
        name: 'Coconut Market',
        note: '運河拍照喝椰子水。',
        desc: '沿著運河兩岸拍照、喝椰子水。非常有熱帶風情。',
        nav: 'Coconut Market Chiang Mai',
        difficulty: '中 (河岸步道)',
      },
      {
        imageId: 'day4_2',
        type: 'sight',
        time: '10:50',
        name: 'Jing Jai Market (二訪)',
        note: '補貨與早午餐。',
        desc: '補買昨天看上的東西，順便在舒適的環境吃早午餐。',
        nav: 'Jing Jai Market Chiang Mai',
        difficulty: '中',
      },
      {
        imageId: 'day4_3',
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
        imageId: 'day4_4',
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
        imageId: 'day5_1',
        type: 'sight',
        time: '06:30',
        name: 'Elephant Nature Park',
        note: '無騎乘，觀察泥巴浴，含素食午餐。',
        desc: '體驗餵食、觀察大象泥巴浴。午餐的素食 Buffet 意外地非常好吃！',
        nav: 'Elephant Nature Park Office',
        difficulty: '中 (泥土路)',
      },
      {
        imageId: 'day5_2',
        type: 'sight',
        time: '13:30',
        name: '超長午睡時間',
        note: '回民宿洗澡補眠。',
        desc: '回到民宿洗去泥土味，徹底補眠，為晚上米其林大餐做準備。',
        nav: 'Haiya',
        difficulty: '零',
      },
      {
        imageId: 'day5_3',
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
        imageId: 'day6_1',
        type: 'sight',
        time: '07:30',
        name: 'Doi Inthanon (包車)',
        note: '泰國最高峰、雙塔、瀑布。',
        desc: '參觀國王皇后雙塔、Wachirathan 瀑布。步道需步行約 2 小時 (可選擇不走，在休息區等候)，其他景點車子可直達。',
        nav: 'Doi Inthanon National Park',
        difficulty: '中 (部分步道)',
      },
      {
        imageId: 'day6_2',
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
        imageId: 'day7_1',
        type: 'sight',
        time: '09:00',
        name: 'Yummy Tasty Thai Cooking',
        note: '含市場導覽，步行可達。',
        desc: '含市場導覽與午餐。需久站做菜。',
        nav: 'Yummy Tasty Thai Cooking School',
        difficulty: '中高 (久站)',
      },
      {
        imageId: 'day7_2',
        type: 'sight',
        time: '13:40',
        name: 'Baan Kang Wat 藝術村',
        note: '森林系文創，有階梯石板路。',
        desc: '像個圓形劇場的藝術聚落。有階梯與石板路，建議夥伴在咖啡廳駐紮。',
        nav: 'Baan Kang Wat',
        difficulty: '高 (階梯/石板)',
      },
      {
        imageId: 'day7_3',
        type: 'sight',
        time: '15:15',
        name: '悟孟寺 (Wat Umong)',
        note: '森林隧道寺廟。',
        desc: '走進森林隧道參觀佛像。自然地面不平整。',
        nav: 'Wat Umong',
        difficulty: '中高',
      },
      {
        imageId: 'day7_4',
        type: 'food',
        time: '17:00',
        name: 'Ristr8to Original',
        note: '世界拉花冠軍。',
        desc: '必點招牌「Satan Latte (撒旦拿鐵)」。',
        nav: 'Ristr8to Original',
        highlight: '必喝咖啡',
        difficulty: '低',
      },
      {
        imageId: 'day7_5',
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
        imageId: 'day8_1',
        type: 'sight',
        time: '09:30',
        name: '泰服體驗 & 古剎巡禮',
        note: '步行拍照。',
        desc: '換上泰服，步行至盼道寺與柴迪隆寺拍照。古城內步行，但距離不遠。',
        nav: 'Wat Chedi Luang',
        difficulty: '中 (步行)',
      },
      {
        imageId: 'day8_2',
        type: 'food',
        time: '12:30',
        name: 'SP Chicken',
        note: '需請房東幫忙「留雞」。',
        desc: '米其林必比登推薦。皮脆肉嫩多汁的烤小雞。',
        nav: 'SP Chicken',
        highlight: '必吃烤雞',
        difficulty: '低',
      },
      {
        imageId: 'day8_3',
        type: 'food',
        time: '13:30',
        name: 'Kor Panich 芒果糯米飯',
        note: '皇室秘方，米其林推薦。',
        desc: '80年老店，糯米口感極佳。',
        nav: 'Kor Panich Mango Sticky Rice',
        highlight: '必吃甜點',
        difficulty: '低',
      },
      {
        imageId: 'day8_4',
        type: 'sight',
        time: '15:30',
        name: 'Makkha Health & Spa',
        note: '古宅按摩，2小時療程。',
        desc: '蘭納古宅分店環境非常美。2小時療程消除走路疲勞。',
        nav: 'Makkha Health&Spa (Ancient House)',
        highlight: '重要預約',
        difficulty: '零',
      },
      {
        imageId: 'day8_5',
        type: 'food',
        time: '18:00',
        name: 'Aroon Rai',
        note: '老牌泰北菜。',
        desc: '清邁老字號，咖哩金麵與熱炒非常好吃。一般餐廳座位。',
        nav: 'Aroon Rai',
        difficulty: '低',
      },
      {
        imageId: 'day8_6',
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
        imageId: 'day9_1',
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
        imageId: 'day9_2',
        type: 'food',
        time: '12:30',
        name: 'Cake Baan Piemsuk',
        note: '必吃椰子奶油派。',
        desc: '全清邁最好吃的椰子奶油派。',
        nav: 'Cake Baan Piemsuk',
        highlight: '必吃蛋糕',
        difficulty: '低',
      },
      {
        imageId: 'day9_3',
        type: 'sight',
        time: '14:00',
        name: 'Central Airport Plaza',
        note: '機場旁百貨休息。',
        desc: '整理行李、吹冷氣。',
        nav: 'Central Chiangmai Airport',
        difficulty: '低',
      },
      {
        imageId: 'day9_4',
        type: 'sight',
        time: '16:00',
        name: "Spa 第 3 彈 (Let's Relax)",
        note: '預約3小時+盥洗。',
        desc: '為紅眼班機做準備，洗澡按摩一次滿足。',
        nav: "Let's Relax Spa - Chiang Mai Airport",
        difficulty: '零',
      },
      {
        imageId: 'day9_5',
        type: 'food',
        time: '20:00',
        name: 'The House by Ginger',
        note: '華麗復古泰菜。',
        desc: '米其林推薦。華麗復古殖民風，非常精緻。',
        nav: 'The House by Ginger',
        highlight: '米其林推薦',
        difficulty: '低',
      },
      {
        imageId: 'day9_6',
        type: 'transport',
        time: '22:30',
        name: '前往機場 (CNX)',
        note: '搭乘01:40班機返台。',
        desc: '準備回家囉！',
        nav: 'Chiang Mai International Airport',
        difficulty: '低',
      },
    ],
  },
];

// 修改原本的 UTILS_DATA (填入正確航班資訊20251201)
// 修改原本的 UTILS_DATA (含航廈資訊20251202)
// 修改原本的 UTILS_DATA (精準對應截圖20251202)
// 修改原本的 UTILS_DATA (微調備註20251205)
// 修改原本的 UTILS_DATA (加入詳細住宿資料結構20251206)
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


// ============================================
//  修正後的 WeatherHero (含手動刷新 + 全市平均 AQI) 
// ============================================
const WeatherHero = ({ isAdmin, versionText, updateVersion, onLock, showSecret }) => {
  const [data, setData] = useState(null);
  const [aqi, setAqi] = useState(50);
  const [bannerText, setBannerText] = useState('');
  const [lastUpdate, setLastUpdate] = useState('');
  const [alerts, setAlerts] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // 新增 Loading 狀態
  const [secretLinks, setSecretLinks] = useState([]);
  const [newLinkName, setNewLinkName] = useState('');
  const [newLinkUrl, setNewLinkUrl] = useState('');

  // 1. 讀取連結
  useEffect(() => {
    const savedLinks = localStorage.getItem('cm_secret_links');
    if (savedLinks) {
      setSecretLinks(JSON.parse(savedLinks));
    } else {
      setSecretLinks([
        { name: '🚀 尋找飛行指南 (Weed.th)', url: 'https://weed.th/cannabis/chiang-mai' }
      ]);
    }
  }, []);

  // 2. 新增連結
  const handleAddLink = () => {
    if (!newLinkName || !newLinkUrl) return alert("請輸入名稱和網址喔！");
    const newLinks = [...secretLinks, { name: newLinkName, url: newLinkUrl }];
    setSecretLinks(newLinks);
    localStorage.setItem('cm_secret_links', JSON.stringify(newLinks));
    setNewLinkName('');
    setNewLinkUrl('');
  };

  // 3. 刪除連結
  const handleDeleteLink = (index) => {
    if (!window.confirm("確定要刪除這個傳送門嗎？")) return;
    const newLinks = secretLinks.filter((_, i) => i !== index);
    setSecretLinks(newLinks);
    localStorage.setItem('cm_secret_links', JSON.stringify(newLinks));
  };
  // 抽離 fetch 邏輯，讓按鈕也可以呼叫
  const fetchWeather = async () => {
    setIsLoading(true); // 開始轉圈圈
    try {
      // 1. 天氣
      const res = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=18.7883&longitude=98.9853&current=temperature_2m,weather_code,relative_humidity_2m&hourly=temperature_2m,weather_code,precipitation_probability&forecast_days=2&timezone=Asia%2FBangkok'
      );
      const json = await res.json();

      // 2. AQI (改用城市名稱 chiangmai，取得全市平均)
      let currentAqi = 50;
      let aqiSource = 'default';

      try {
        const waqiRes = await fetch(
          'https://api.waqi.info/feed/chiangmai/?token=6a1feb1b93b9f182f5ace9c2ffc8fdfc0e6e61c2'
        );
        const waqiData = await waqiRes.json();

        if (waqiData.status === 'ok' && waqiData.data?.aqi) {
          currentAqi = waqiData.data.aqi;
          aqiSource = 'WAQI'; // 標記來源
        } else {
          throw new Error('WAQI API 回應異常');
        }
      } catch (waqiError) {
        console.warn('⚠️ WAQI 失敗，切換到 IQAir 備援...');
        // 備援：IQAir
        try {
          const iqairRes = await fetch(
            'https://api.airvisual.com/v2/nearest_city?lat=18.7883&lon=98.9853&key=4743d035-1b8f-4a42-9ddf-66dee64f8b8a'
          );
          const iqairData = await iqairRes.json();
          if (iqairData.status === 'success' && iqairData.data?.current?.pollution) {
            currentAqi = iqairData.data.current.pollution.aqius;
            aqiSource = 'IQAir';
          }
        } catch (iqairError) {
          console.error('❌ 全部失敗，使用預設值');
          aqiSource = 'N/A';
        }
      }

      setAqi(currentAqi);
      // 僅顯示時間，來源顯示在 Console 或 Tooltip 即可，保持介面乾淨
      setLastUpdate(
        `${new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })}`
      );

      if (json && json.current) {
        setData(json);
        const currentHour = new Date().getHours();
        const next3HoursRain = json.hourly.precipitation_probability.slice(currentHour, currentHour + 3);
        const maxRainProb = Math.max(...next3HoursRain);

        let newAlerts = [];
        if (maxRainProb > 40) {
          newAlerts.push({ type: 'rain', msg: `🌧️ 降雨機率 ${maxRainProb}%，記得帶傘！` });
        }
        if (currentAqi > 100) {
          newAlerts.push({ type: 'aqi', msg: `😷 AQI 數值偏高，戶外請戴口罩。` });
        }
        setAlerts(newAlerts);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false); // 結束轉圈圈
    }
  };

  useEffect(() => {
    // 2. 修改時間計算邏輯
    const calcTime = () => {
      // 取得現在的「泰國時間」
      const now = new Date();
      const thaiTimeStr = now.toLocaleString("en-US", { timeZone: "Asia/Bangkok" });
      const nowInThai = new Date(thaiTimeStr);

      // 設定關鍵日期
      const startDate = new Date('2026-02-19T00:00:00'); // 出發日 00:00
      const endDate = new Date('2026-02-27T23:59:59');   // 最後一天 23:59

      // A. 還沒出發 (現在時間 < 出發時間)
      if (nowInThai < startDate) {
        const diff = startDate - nowInThai;
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        setBannerText(`✈️ 距離出發還有 ${days} 天！`);
      }
      // B. 旅程已結束 (現在時間 > 結束時間)
      else if (nowInThai > endDate) {
        setBannerText('👋 旅程結束了 QQ');
      }
      // C. 旅程進行中 (介於中間)
      else {
        // 計算今天是第幾天
        const diff = nowInThai - startDate;
        const dayNum = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;

        // 如果是第 9 天 (最後一天)
        if (dayNum >= 9) {
          setBannerText('😭 旅程最後一天哭哭');
        } else {
          setBannerText(`🇹🇭 旅程第 ${dayNum} 天 (${dayNum}/9)`);
        }
      }
    };
    calcTime();
    const timer = setInterval(calcTime, 60000);

    // 初始抓取天氣
    fetchWeather();
    const weatherTimer = setInterval(fetchWeather, 20 * 60 * 1000); // 每20分自動刷

    return () => {
      clearInterval(timer);
      clearInterval(weatherTimer);
    };
  }, []);

  const getWeatherIcon = (code, size = 20) => {
    if (code <= 1) return <Sun size={size} className="text-amber-500" strokeWidth={2.5} />;
    if (code <= 3)
      return (
        <Cloud size={size} className="text-stone-400 dark:text-stone-300" strokeWidth={2.5} />
      );
    if (code >= 50) return <CloudRain size={size} className="text-blue-400" strokeWidth={2.5} />;
    return <CloudSun size={size} className="text-amber-400" strokeWidth={2.5} />;
  };

  const getAqiColor = (val) => {
    if (val <= 50)
      return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300';
    if (val <= 100)
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
    if (val <= 150)
      return 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300';
    return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
  };

  const getNext24Hours = () => {
    if (!data || !data.hourly || !data.hourly.time) return [];

    // 🔥 時區修正：取得目前泰國是「幾點」 (0-23)
    const now = new Date();
    const thaiTimeStr = now.toLocaleString("en-US", { timeZone: "Asia/Bangkok" });
    const currentHourIndex = new Date(thaiTimeStr).getHours();

    const startIndex = currentHourIndex + 1; // 從下一個小時開始預報
    const endIndex = startIndex + 24;        // 抓未來 24 小時

    return data.hourly.time.slice(startIndex, endIndex).map((t, i) => ({
      time: t.split('T')[1].slice(0, 5),
      temp: Math.round(data.hourly.temperature_2m[startIndex + i]),
      code: data.hourly.weather_code[startIndex + i],
      rain: data.hourly.precipitation_probability
        ? data.hourly.precipitation_probability[startIndex + i]
        : 0,
    }));
  };
  const nextHours = getNext24Hours();

  return (
    <div className="relative bg-[#FDFBF7] dark:bg-stone-900 pt-0 pb-8 px-6 border-b border-stone-200 dark:border-stone-800 rounded-b-[2.5rem] z-10 overflow-hidden transition-colors duration-500">
      {/* 1. 倒數計時條 */}
      {/* 1. 頂部狀態條 (改用 bannerText 控制) */}
      {bannerText && (
        <div className={`absolute top-0 left-0 right-0 py-1.5 z-20 shadow-sm text-[10px] font-bold text-center transition-colors duration-500
          ${bannerText.includes('結束')
            ? 'bg-stone-200 text-stone-500 dark:bg-stone-800 dark:text-stone-400' // 結束變灰
            : 'bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200' // 其他維持黃
          }`}
        >
          {bannerText}
        </div>
      )}

      {/* 2. 右上角鎖定按鈕 (已修正位置與透明感) */}
      <button
        onClick={onLock}
        // 🔥 修改這裡：top-0 right-0 讓它貼齊右上角，顏色調整為配合黃色背景
        className="absolute top-0 right-0 z-30 h-[28px] w-[30px] flex items-center justify-center text-amber-800/40 hover:text-amber-800 dark:text-amber-200/40 dark:hover:text-amber-200 transition-colors"
        title="鎖定畫面"
      >
        <Lock size={12} strokeWidth={2.5} />
      </button>

      {/* 背景裝飾字 */}
      <div className="absolute top-[-20px] right-[-20px] text-[8rem] font-serif text-amber-50 dark:text-stone-800 opacity-50 select-none leading-none pointer-events-none">
        Thai
      </div>

      <div className="relative z-10 mt-10">
        {/* 天氣警報 */}
        {alerts.length > 0 && (
          <div className="mb-4 space-y-2">
            {alerts.map((alert, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl flex items-center gap-2 text-xs font-bold shadow-sm animate-pulse border
                ${alert.type === 'rain'
                    ? 'bg-blue-50 text-blue-800 border-blue-100 dark:bg-blue-900/30 dark:text-blue-200 dark:border-blue-800'
                    : 'bg-red-50 text-red-800 border-red-100 dark:bg-red-900/30 dark:text-red-200 dark:border-red-800'
                  }`}
              >
                {alert.type === 'rain' ? <CloudRain size={16} /> : <AlertCircle size={16} />}
                {alert.msg}
              </div>
            ))}
          </div>
        )}

        {/* 修改：items-end 改為 items-start (頂部對齊)，解決右邊太高的問題 */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1 min-w-0 mr-4">
            {/* 3. 左側：年份 & 成員名單 */}
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 bg-amber-100 dark:bg-stone-800 text-amber-900 dark:text-amber-400 text-[10px] font-bold tracking-wider rounded-full whitespace-nowrap">
                佑任・軒寶・學弟・腳慢
              </span>

              {isAdmin ? (
                <input
                  type="text"
                  value={versionText || ''}
                  onChange={(e) => updateVersion(e.target.value)}
                  className="w-16 bg-transparent border-b border-amber-300 text-sm font-serif font-bold italic focus:outline-none text-center dark:text-stone-300"
                />
              ) : (
                <div className="flex items-center gap-1 ml-1 relative group">
                  {/* 蓮花 Icon */}
                  <LotusIcon className="w-5 h-5 text-amber-400 dark:text-amber-300 drop-shadow-[0_0_3px_rgba(251,191,36,0.5)]" />

                  {/* 2026 文字 */}
                  <span
                    className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#F3E5AB] via-[#FDB931] to-[#996515] drop-shadow-sm tracking-wide ml-1.5 mt-0.5"
                    style={{ fontFamily: '"Cinzel Decorative", serif' }}
                  >
                    {versionText || '2026'}
                  </span>
                </div>
              )}
            </div>

            <h1 className="text-4xl font-serif text-stone-800 dark:text-stone-100 tracking-tight leading-[0.9]">
              清邁
              <br />
              <span className="text-amber-600 dark:text-amber-500">探尋</span>之旅
            </h1>
          </div>

          {/* 修改：右側區塊加入 mt-2 (往下推一點)，讓它跟左邊的成員名單對齊 */}
          <div className="text-right flex-shrink-0 mt-2">
            <div
              onClick={fetchWeather}
              className="text-[10px] font-bold text-stone-400 mb-1 uppercase tracking-widest cursor-pointer"
            >
              Chiang Mai Now
            </div>

            {/* ... 下面原本的天氣顯示邏輯保持不變 ... */}
            {data ? (
              <div className="flex flex-col items-end">
                <div className="flex items-center gap-2">
                  {getWeatherIcon(data.current.weather_code, 36)}
                  <span className="text-5xl font-serif font-medium text-stone-800 dark:text-stone-100 tracking-tighter">
                    {Math.round(data.current.temperature_2m)}°
                  </span>
                </div>

                <div className="flex items-center justify-end gap-2 mt-2">
                  <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${getAqiColor(aqi)}`}>
                    <Wind size={10} /> AQI {aqi}
                  </div>
                  <div className="text-xs text-stone-500 dark:text-stone-400 font-medium bg-white/50 dark:bg-stone-800/50 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Droplets size={10} /> {data.current.relative_humidity_2m}%
                  </div>
                </div>

                {/* 更新時間 & AI 按鈕 */}
                <div className="flex flex-col items-end gap-1 mt-2">
                  <div className="group flex items-center justify-end gap-1.5 cursor-pointer" onClick={fetchWeather}>
                    {lastUpdate && (
                      <span className="text-[10px] text-stone-300 dark:text-stone-600 font-mono tracking-tighter transition-colors group-hover:text-stone-400 dark:group-hover:text-stone-500">
                        {lastUpdate}
                      </span>
                    )}
                    <button disabled={isLoading} className="text-stone-300 dark:text-stone-700 transition-all duration-300 group-hover:text-blue-500 group-hover:scale-90" title="刷新天氣">
                      <RefreshCw size={10} className={isLoading ? 'animate-spin text-blue-500 opacity-100' : ''} />
                    </button>
                  </div>


                </div>
              </div>
            ) : (
              <div className="animate-pulse flex gap-2 items-center">
                <div className="w-8 h-8 bg-stone-200 dark:bg-stone-700 rounded-full"></div>
                <div className="w-12 h-8 bg-stone-200 dark:bg-stone-700 rounded"></div>
              </div>
            )}
          </div>
        </div>

        {/* 未來24小時預報 (保持原樣) */}
        {data && nextHours.length > 0 && (
          <div className="bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm rounded-2xl p-4 border border-stone-100 dark:border-stone-700 shadow-sm">
            <div className="flex items-center">
              <div className="text-[10px] font-bold text-stone-400 writing-vertical-rl border-l pl-3 mr-3 border-stone-200 dark:border-stone-600 h-10 flex items-center justify-center tracking-widest flex-shrink-0">
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
                    <span className="text-sm font-bold text-stone-700 dark:text-stone-300">
                      {h.temp}°
                    </span>
                    {h.rain >= 0 && (
                      <span className="text-[9px] text-blue-400 font-bold">{h.rain}%</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* 🔥🔥🔥 2. 在這裡按下 Enter，貼上這段新程式碼 🔥🔥🔥 */}
        <button
          onClick={() => window.open(`https://www.perplexity.ai/search?q=${encodeURIComponent('清邁 2026 2月下旬 必吃美食與私房景點 歷史文化深度介紹')}`, '_blank')}
          className="w-full mt-3 py-3 bg-white/90 dark:bg-stone-800/90 backdrop-blur-md border border-stone-200 dark:border-stone-700 rounded-2xl flex items-center justify-center gap-2 text-sm font-bold text-stone-600 dark:text-stone-200 active:scale-95 transition-all shadow-sm hover:bg-stone-50 dark:hover:bg-stone-700 group"
        >
          <Sparkles size={16} className="text-teal-500 group-hover:rotate-12 transition-transform" />
          Ask AI (Perplexity)
        </button>
        {/* 😈 隱藏彩蛋：庫洛米大麻卡片 (只要 showSecret 是 true 就會出現) */}
        {/* 😈 隱藏彩蛋：庫洛米大麻卡片 (可編輯版) */}
        {showSecret && (
          <div className="mt-4 relative overflow-hidden rounded-2xl border-2 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.6)] animate-in fade-in zoom-in duration-500">
            {/* 背景：迷幻紫綠漸層 */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-green-900 opacity-90"></div>

            <div className="relative p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex flex-col">
                  <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-green-400 drop-shadow-sm" style={{ fontFamily: '"Cinzel Decorative", serif' }}>
                    SECRET STASH
                  </h3>
                  <p className="text-xs text-green-300 font-bold tracking-wider mt-1">
                    CHILL & RELAX IN CHIANG MAI
                  </p>
                </div>
                {/* 庫洛米酷洛米 圖片尺寸： 200 x 200 px 到 500 x 500 px 之間最剛好正方形 (1:1) 最好 */}
                <div className="w-24 h-24 mr-4">
                  <img
                    src={process.env.PUBLIC_URL + '/sanrio/kuromi.png'}
                    alt="Kuromi"
                    className="w-full h-full object-contain drop-shadow-[0_0_10px_rgba(0,255,0,0.5)] animate-bounce"
                  />
                </div>
              </div>

              {/* A. 連結列表區 */}
              <div className="space-y-3 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
                {/* 👇 重點：這裡的箭頭後面是用 小括號 ( 包住整個 div */}
                {secretLinks.map((link, idx) => (
                  <div key={idx} className="flex items-center gap-2 group">
                    {/* 1. 連結按鈕 */}
                    <button
                      onClick={() => window.open(link.url, '_blank')}
                      className="flex-1 bg-purple-600/80 hover:bg-purple-500 text-white text-xs font-bold py-2 px-4 rounded-xl shadow-lg border border-purple-400/50 transition-all active:scale-95 flex justify-between items-center backdrop-blur-sm"
                    >
                      <span className="truncate mr-2">{link.name}</span>
                      <Navigation size={12} className="opacity-70" />
                    </button>

                    {/* 2. 刪除按鈕 (權限控管) */}
                    {isAdmin && (
                      <button
                        onClick={() => handleDeleteLink(idx)}
                        className="p-2 bg-red-500/20 text-red-300 rounded-lg border border-red-500/30 hover:bg-red-500 hover:text-white transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* B. 新增連結表單區 */}
              {isAdmin && (
                <div className="mt-4 pt-3 border-t border-purple-500/30">
                  <div className="text-[10px] text-purple-300 mb-2 font-bold flex items-center gap-1">
                    <Sparkles size={10} /> 新增私房景點
                  </div>
                  <div className="flex flex-col gap-2">
                    <input
                      value={newLinkName}
                      onChange={(e) => setNewLinkName(e.target.value)}
                      placeholder="名稱 (例: 巷口好店)"
                      className="bg-black/40 border border-purple-500/30 rounded-lg px-3 py-1.5 text-xs text-purple-100 placeholder:text-purple-400/30 focus:outline-none focus:border-green-400 transition-colors"
                    />
                    <div className="flex gap-2">
                      <input
                        value={newLinkUrl}
                        onChange={(e) => setNewLinkUrl(e.target.value)}
                        placeholder="網址 (https://...)"
                        className="flex-1 bg-black/40 border border-purple-500/30 rounded-lg px-3 py-1.5 text-xs text-purple-100 placeholder:text-purple-400/30 focus:outline-none focus:border-green-400 transition-colors"
                      />
                      <button
                        onClick={handleAddLink}
                        className="bg-green-600 hover:bg-green-500 text-white rounded-lg px-4 py-1.5 font-bold text-xs shadow-lg transition-all active:scale-95"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  );
};


// ============================================
// 🔥 完整修正版：FloatingStatus（時區修正）
// ============================================

const FloatingStatus = ({ itinerary }) => {
  const [nextStop, setNextStop] = useState(null);

  useEffect(() => {
    const findNextStop = () => {
      // 1. 取得現在的「泰國時間」
      const now = new Date();
      const thaiTimeStr = now.toLocaleString("en-US", { timeZone: "Asia/Bangkok" });
      const nowInThai = new Date(thaiTimeStr);

      const allStops = [];

      itinerary.forEach((day) => {
        const dateStr = day.date; // 例如 "2026-02-19"

        day.locations.forEach((loc) => {
          const timeMatch = loc.time.match(/(\d{1,2}):(\d{2})/);

          // 🔥 修正：建立行程時間時，加上時區標記 (+07:00)
          // 這樣 new Date 就會知道這是泰國時間
          let stopTimeStr = `${dateStr}T23:59:00+07:00`; // 預設當天最後

          if (timeMatch) {
            // 補零處理 (例如 9:00 變成 09:00) 以符合 ISO 格式
            const hh = timeMatch[1].padStart(2, '0');
            const mm = timeMatch[2].padStart(2, '0');
            stopTimeStr = `${dateStr}T${hh}:${mm}:00+07:00`;
          }

          const stopTime = new Date(stopTimeStr);

          allStops.push({
            ...loc,
            fullDate: stopTime,
            dayTitle: day.title,
          });
        });
      });

      // 2. 比較：行程時間 > 泰國現在時間
      const futureStops = allStops.filter((stop) => stop.fullDate > nowInThai);

      if (futureStops.length > 0) {
        setNextStop(futureStops[0]);
      } else {
        setNextStop({
          name: '旅程圓滿結束 🎉',
          time: 'See you next time!',
          nav: '',
          finished: true,
        });
      }
    };

    // 初始執行一次
    findNextStop();

    // 每分鐘檢查一次更新
    const timer = setInterval(findNextStop, 60000);
    return () => clearInterval(timer);
  }, [itinerary]); // 當 itinerary (你編輯後) 改變時，這裡也會重算

  if (!nextStop) return null;

  return (
    <div className="fixed bottom-20 left-4 right-4 z-30">
      <div className="bg-stone-900/95 backdrop-blur-md text-stone-50 p-4 rounded-2xl shadow-2xl border border-stone-700/50 flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center text-stone-900 flex-shrink-0 ${nextStop.finished ? 'bg-green-500' : 'bg-amber-500 animate-pulse'
              }`}
          >
            {nextStop.finished ? (
              <CheckCircle size={20} />
            ) : (
              <Navigation size={20} strokeWidth={2.5} />
            )}
          </div>
          <div className="min-w-0">
            <div className="text-[10px] text-stone-400 uppercase tracking-wider font-bold mb-0.5 flex items-center gap-1">
              {nextStop.finished ? 'COMPLETED' : 'COMING UP'}{' '}
              <Clock size={10} />
            </div>
            <div className="font-bold text-sm truncate text-white">
              {nextStop.name}
            </div>
            <div className="text-xs text-stone-400 truncate">
              {nextStop.time}
            </div>
          </div>
        </div>

        {/* 如果有導航連結且旅程未結束，才顯示箭頭按鈕 */}
        {nextStop.nav && (
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
        )}
      </div>
    </div>
  );
};

// ============================================
// 智慧版 Coming Up (自動抓下一個行程)
// ============================================


// update穿搭指南 + 爛腳圖例

// ============================================
// update穿搭指南 + 爛腳圖例 (修正夜間模式)
// ============================================
const OutfitGuide = () => {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen)
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="mx-6 mt-6 bg-white dark:bg-stone-800 shadow-sm border border-stone-100 dark:border-stone-700 py-3 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 text-stone-600 dark:text-stone-300 w-[calc(100%-3rem)] active:scale-95 transition-transform"
      >
        <Info size={14} className="text-amber-500" /> 查看穿搭 & 爛腳等級說明
      </button>
    );

  return (
    <div className="mx-6 mt-6 bg-[#FFFBF0] dark:bg-stone-800 p-5 rounded-2xl border border-amber-100/50 dark:border-stone-700 shadow-sm relative animate-fadeIn transition-colors">
      <button
        onClick={() => setIsOpen(false)}
        className="absolute top-3 right-3 text-amber-300 hover:text-amber-500"
      >
        <ChevronUp size={18} />
      </button>

      {/* 第一部分 穿搭 */}
      <h3 className="flex items-center gap-2 font-serif font-bold text-amber-900 dark:text-amber-500 text-base mb-3">
        <Shirt size={18} className="text-amber-500" /> 2月穿搭指南
      </h3>
      <div className="space-y-3 text-xs text-stone-600 dark:text-stone-300 leading-relaxed mb-6">
        <div className="flex items-start gap-3">
          <div className="bg-amber-100 dark:bg-amber-900/50 p-1.5 rounded-full text-amber-600 dark:text-amber-300 flex-shrink-0">
            <Sun size={12} />
          </div>
          <div>
            <strong className="text-stone-800 dark:text-stone-100">白天 (30-35°C)</strong>
            <br />
            短袖、透氣長裙。太陽很毒，務必戴墨鏡帽。
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="bg-blue-100 dark:bg-blue-900/50 p-1.5 rounded-full text-blue-600 dark:text-blue-300 flex-shrink-0">
            <Wind size={12} />
          </div>
          <div>
            <strong className="text-stone-800 dark:text-stone-100">早晚 (18-20°C)</strong>
            <br />
            溫差大，隨身帶一件薄襯衫。
          </div>
        </div>
        <div className="bg-white dark:bg-stone-700 p-3 rounded-xl border border-amber-100 dark:border-stone-600 flex items-start gap-3">
          <div className="bg-red-100 dark:bg-red-900/50 p-1.5 rounded-full text-red-600 dark:text-red-300 flex-shrink-0">
            <Mountain size={12} />
          </div>
          <div>
            <strong className="text-stone-800 dark:text-stone-100 block mb-1">
              茵他儂山特別注意
            </strong>
            <span className="block text-stone-500 dark:text-stone-400 mb-0.5">
              • 瀑布區:{' '}
              <span className="text-amber-600 dark:text-amber-400 font-bold">熱 (短袖)</span>
            </span>
            <span className="block text-stone-500 dark:text-stone-400">
              • 山頂:{' '}
              <span className="text-blue-600 dark:text-blue-400 font-bold">極冷 (羽絨/防風)</span>
            </span>
          </div>
        </div>
      </div>

      {/* 第二部分 爛腳圖例*/}
      <div className="pt-4 border-t border-amber-200/50 dark:border-stone-600">
        <h3 className="flex items-center gap-2 font-serif font-bold text-amber-900 dark:text-amber-500 text-base mb-3">
          <span className="text-lg">🦵</span> 爛腳指數說明
        </h3>
        <div className="grid grid-cols-1 gap-2 text-xs">
          <div className="flex items-center gap-3 bg-white dark:bg-stone-700 p-2 rounded-lg border border-emerald-100 dark:border-emerald-900">
            <span className="bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded font-bold whitespace-nowrap">
              低 / 零
            </span>
            <span className="text-stone-600 dark:text-stone-300">
              全程坐車、平地，有冷氣或座位。
            </span>
          </div>
          <div className="flex items-center gap-3 bg-white dark:bg-stone-700 p-2 rounded-lg border border-amber-100 dark:border-amber-900">
            <span className="bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded font-bold whitespace-nowrap">
              中
            </span>
            <span className="text-stone-600 dark:text-stone-300">
              一般步行、有些微階梯或泥土路。
            </span>
          </div>
          <div className="flex items-center gap-3 bg-white dark:bg-stone-700 p-2 rounded-lg border border-rose-100 dark:border-rose-900">
            <span className="bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-300 px-2 py-0.5 rounded font-bold whitespace-nowrap">
              高 / 極高
            </span>
            <span className="text-stone-600 dark:text-stone-300">
              陡坡、長途步行、人潮擁擠 (如夜市)。
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
const LocationCard = ({ item, day, index, isAdmin, updateTime, updateContent, onDelete, onMoveUp, onMoveDown, isFirst, isLast }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const BACKUP_IMAGE = 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80';

  const getIcon = () => {
    switch (item.type) {
      case 'food': return <Utensils size={16} className="text-orange-600" />;
      case 'transport': return <Car size={16} className="text-blue-500" />;
      default: return <MapPin size={16} className="text-emerald-500" />;
    }
  };

  const getDifficultyColor = (diff) => {
    if (!diff) return 'bg-gray-100 text-gray-500';
    if (diff.includes('低') || diff.includes('零')) return 'bg-emerald-50 text-emerald-700 border-emerald-100';
    if (diff.includes('中')) return 'bg-amber-50 text-amber-700 border-amber-100';
    if (diff.includes('高') || diff.includes('極高')) return 'bg-rose-50 text-rose-700 border-rose-100';
    return 'bg-gray-50 text-gray-600 border-gray-100';
  };

  // 🔥 修正：標準 Google Maps 連結
  const handleNav = (e) => {
    e.stopPropagation();
    // 使用標準 Google Maps 搜尋連結
    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.nav)}`;
    window.open(mapUrl, '_blank');
  };

  const handleAskAI = (e) => {
    e.stopPropagation();
    const prompt = `我正在清邁旅遊，地點是「${item.name}」。請告訴我這裡有什麼必吃美食、必買紀念品，或是需要注意的參觀禁忌？請用繁體中文回答。`;
    window.open(`https://www.perplexity.ai/search?q=${encodeURIComponent(prompt)}`, '_blank');
  };

  // 🔥 新增：圖片上傳處理
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 限制 2MB
        alert('圖片太大囉！請小於 2MB 🐹');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        updateContent('imageId', reader.result); // 存 Base64
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className={`bg-white dark:bg-stone-800 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-stone-100 dark:border-stone-700 mb-4 overflow-hidden transition-all duration-300 cursor-pointer ${isExpanded ? 'ring-2 ring-amber-100 dark:ring-stone-600 shadow-md' : ''}`}
    >
      <div className="p-4 flex items-start gap-4">
        <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center border border-stone-100">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            {isAdmin ? (
              <div onClick={(e) => e.stopPropagation()} className="relative">
                <input
                  type="time"
                  value={item.time ? item.time.substring(0, 5) : ''}
                  onChange={(e) => updateTime(day, index - 1, e.target.value)}
                  className="bg-amber-50 border-b-2 border-amber-300 text-[14px] font-bold text-stone-800 focus:outline-none px-1 h-7 cursor-pointer font-mono rounded"
                />
              </div>
            ) : (
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wide">{item.time}</span>
            )}

            {isAdmin ? (
              <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                {/* 1. 自由輸入框 */}
                <input
                  type="text"
                  value={item.difficulty || ''}
                  onChange={(e) => updateContent('difficulty', e.target.value)}
                  className="text-[10px] bg-stone-100 dark:bg-stone-700 dark:text-stone-200 border-none rounded px-2 py-0.5 w-24 focus:ring-1 focus:ring-amber-500"
                  placeholder="自訂難度"
                />
                {/* 2. 快速樣板選單 (選了會自動帶入) */}
                <select
                  onChange={(e) => {
                    if (e.target.value) updateContent('difficulty', e.target.value);
                  }}
                  className="w-4 h-6 bg-transparent text-stone-400 dark:text-stone-500 outline-none cursor-pointer"
                  title="快速選擇"
                >
                  <option value="">☰</option>
                  <option value="低 (無障礙設施)">🟢 低</option>
                  <option value="中 (斜坡/階梯)">🟡 中</option>
                  <option value="高 (需步行陡坡)">🟠 高</option>
                  <option value="極高 (多陡坡階梯)">🔴 極高</option>
                </select>
              </div>
            ) : (
              item.difficulty && (
                <span className={`text-[9px] px-1.5 py-0.5 rounded-md border font-bold flex items-center gap-1 ${getDifficultyColor(item.difficulty)}`}>
                  {item.difficulty}
                </span>
              )
            )}


            {item.highlight && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-md border border-amber-100 bg-amber-50 text-amber-700 font-bold">★ {item.highlight}</span>
            )}
          </div>

          {isAdmin ? (
            <div onClick={(e) => e.stopPropagation()} className="mb-1">

              <input
                type="text"
                value={item.name}
                onChange={(e) => updateContent('name', e.target.value)}
                className="w-full font-bold text-lg text-stone-800 dark:text-stone-100 bg-transparent border-b border-stone-300 dark:border-stone-600 focus:border-amber-500 focus:outline-none p-0"
                placeholder="輸入地點名稱..."
              />


            </div>
          ) : (
            <h3 className="font-bold text-stone-800 dark:text-stone-200 text-lg leading-tight mb-1 pr-2">{item.name}</h3>
          )}

          {isAdmin ? (
            <div onClick={(e) => e.stopPropagation()}>
              <input
                type="text"
                value={item.note}
                onChange={(e) => updateContent('note', e.target.value)}
                className="w-full text-xs text-stone-600 bg-transparent border-b border-stone-300 focus:border-amber-500 focus:outline-none py-1"
                placeholder="輸入簡短備註..."
              />
            </div>
          ) : (
            <p className="text-xs text-stone-500 dark:text-stone-400 font-medium leading-relaxed whitespace-normal opacity-90">{item.note}</p>
          )}
        </div>
        <div className="mt-8 text-stone-300 flex-shrink-0">
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </div>
      </div>

      {isExpanded && (
        <div className="animate-fadeIn">
          <div className="w-full h-48 overflow-hidden relative bg-stone-100">
            {!isImageLoaded && !hasError && (
              <div className="absolute inset-0 flex items-center justify-center bg-stone-50"><Loader2 className="w-8 h-8 animate-spin text-amber-400" /></div>
            )}
            <img
              key={`${day}-${index}-${hasError}-${item.imageId}`} // 確保圖片更新時重繪
              src={hasError ? BACKUP_IMAGE : getLocationImage(item.imageId)}
              alt={item.name}
              loading="lazy"
              decoding="async"  // 🔥 新增這行：非同步解碼，讓滑動不卡頓
              onLoad={() => setIsImageLoaded(true)}
              onError={() => { if (!hasError) { setHasError(true); setIsImageLoaded(true); } }}
              className={`w-full h-full object-cover transition-opacity duration-700 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {/* 🔥 修正：圖片編輯區塊 */}
            <div className="absolute bottom-3 left-4 right-4 text-white/90 text-[10px] flex flex-col gap-2 font-mono">
              <div className="flex items-center gap-1">
                <Camera size={10} />
                {isAdmin ? '編輯圖片來源' : 'Image for reference'}
              </div>
              {isAdmin && (
                <div className="flex flex-col gap-1 bg-black/40 p-2 rounded-lg backdrop-blur-sm" onClick={(e) => e.stopPropagation()}>
                  <input
                    className="bg-white/90 text-stone-800 border-none text-[10px] w-full px-2 py-1 rounded focus:outline-none"
                    value={item.imageId || ''}
                    onChange={(e) => updateContent('imageId', e.target.value)}
                    placeholder="貼上網址..."
                  />
                  <div className="flex items-center gap-2 text-white/80">
                    <span className="text-[9px]">或</span>
                    <label className="bg-amber-500 hover:bg-amber-600 text-white text-[9px] px-2 py-1 rounded cursor-pointer transition-colors flex items-center gap-1">
                      <Upload size={10} /> 上傳照片
                      <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="p-5 bg-stone-50/50">
            <div className="mb-5">
              <h4 className="text-xs font-bold text-amber-700 mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                <Info size={12} /> 導遊說故事
              </h4>
              {isAdmin ? (
                <div onClick={(e) => e.stopPropagation()} className="space-y-3">
                  <textarea
                    value={item.desc}
                    onChange={(e) => updateContent('desc', e.target.value)}
                    className="w-full text-sm text-stone-600 bg-white border border-stone-200 rounded-lg p-3 focus:border-amber-500 focus:outline-none min-h-[100px]"
                    placeholder="輸入詳細介紹..."
                  />
                  <div className="flex items-center gap-2 bg-white p-2 rounded-lg border border-stone-200">
                    <span className="text-xs font-bold text-stone-400 flex-shrink-0">導航搜尋:</span>
                    <input
                      type="text"
                      value={item.nav || ''}
                      onChange={(e) => updateContent('nav', e.target.value)}
                      className="flex-1 text-xs text-stone-600 bg-transparent focus:outline-none"
                      placeholder="Google Maps 關鍵字"
                    />
                  </div>
                </div>
              ) : (
                <p className="text-sm text-stone-600 leading-relaxed text-justify whitespace-pre-line font-medium">
                  {item.desc || '暫無詳細介紹，但這裡絕對值得一去！'}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button onClick={handleNav} className="flex items-center justify-center gap-2 py-3 bg-stone-800 text-amber-50 rounded-xl active:scale-95 transition-all text-sm font-bold shadow-lg shadow-stone-200">
                <Navigation size={16} /> 導航
              </button>
              <button onClick={handleAskAI} className="flex items-center justify-center gap-2 py-3 bg-white border border-stone-200 text-stone-600 rounded-xl active:scale-95 transition-all text-sm font-bold hover:bg-stone-50 shadow-sm">
                <Sparkles size={16} className="text-teal-500" /> 問問 AI
              </button>
            </div>
            {isAdmin && (
              <div className="mt-4 pt-3 border-t border-stone-200 flex justify-between items-center">
                <div className="flex gap-2">
                  <button onClick={(e) => { e.stopPropagation(); onMoveUp(); }} disabled={isFirst} className={`p-2 rounded-lg bg-white border border-stone-200 shadow-sm transition-all ${isFirst ? 'opacity-30 cursor-not-allowed' : 'active:scale-95 hover:bg-amber-50 hover:border-amber-200'}`}>⬆️</button>
                  <button onClick={(e) => { e.stopPropagation(); onMoveDown(); }} disabled={isLast} className={`p-2 rounded-lg bg-white border border-stone-200 shadow-sm transition-all ${isLast ? 'opacity-30 cursor-not-allowed' : 'active:scale-95 hover:bg-amber-50 hover:border-amber-200'}`}>⬇️</button>
                </div>
                <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="px-3 py-2 rounded-lg bg-red-50 text-red-600 border border-red-100 font-bold text-xs flex items-center gap-1 active:scale-95 hover:bg-red-100 transition-colors">🗑️ 刪除</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

//
//
const DayCard = ({ dayData, isOpen, toggle, isAdmin, updateTime, updateContent, onAdd, onDelete, onMove }) => {
  const cardRef = useRef(null);

  const smoothScrollTo = (element, duration = 10) => {
    // 抓取卡片目前在整個網頁的絕對位置
    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset;

    // 計算偏移量：讓卡片的頂部停在「螢幕高度的一半再往上一點點」
    // 修改計算公式：直接定位到元素上方，並預留 100px 的緩衝 (避開頂部狀態列)
    // 這樣不管內容多長，標題都會乖乖停在視覺上方
    const offsetPosition = elementPosition - 120;

    const startPosition = window.pageYOffset;
    const distance = offsetPosition - startPosition;
    let startTime = null;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    // 緩動公式 (Ease Out Quart) - 一開始快，最後慢，感覺更順
    const ease = (t, b, c, d) => {
      t /= d;
      t--;
      return -c * (t * t * t * t - 1) + b;
    };

    requestAnimationFrame(animation);
  };

  useEffect(() => {
    if (isOpen && cardRef.current) {
      //
      setTimeout(() => {
        smoothScrollTo(cardRef.current, 10); // 10ms 極速
      }, 50);
    }
  }, [isOpen]);

  return (
    <div ref={cardRef} className="mb-3 px-2">
      <div
        onClick={toggle}
        className={`relative flex items-center justify-between p-5 rounded-2xl cursor-pointer transition-all duration-300 ${isOpen
          ? 'bg-stone-800 text-stone-50 shadow-xl scale-[1.02]'
          : 'bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 shadow-sm border border-stone-100 dark:border-stone-700 hover:shadow-md'
          }`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl border ${isOpen
              ? 'bg-stone-700 border-stone-600'
              : 'bg-stone-50 dark:bg-stone-700 border-stone-200 dark:border-stone-600'
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
            <LocationCard
              key={idx}
              item={loc}
              day={dayData.day}
              index={idx + 1}
              isAdmin={isAdmin}
              updateTime={(d, l, t) => updateTime(d, idx, t)}
              updateContent={(field, val) => updateContent(dayData.day, idx, field, val)}
              onDelete={() => onDelete(idx)}
              onMoveUp={() => onMove(idx, -1)}
              onMoveDown={() => onMove(idx, 1)}
              isFirst={idx === 0}
              isLast={idx === dayData.locations.length - 1}
            />
          ))}
          {/* 🔥 只有管理員看得到：新增按鈕 */}
          {isAdmin && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAdd();
              }}
              className="w-full py-3 border-2 border-dashed border-stone-300 rounded-xl text-stone-400 font-bold flex items-center justify-center gap-2 hover:bg-stone-50 hover:border-amber-400 hover:text-amber-500 transition-all"
            >
              <span className="text-xl">+</span> 新增行程
            </button>
          )}
        </div>
      )}
    </div>
  );
};

// ============================================
// 1. 修正 FlightCard (夜間模式版)
// ============================================
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
    <div className="bg-white dark:bg-stone-800 rounded-2xl p-4 border border-stone-100 dark:border-stone-700 shadow-sm mb-3 relative overflow-hidden transition-colors">
      {/* 右上角裝飾圓圈 */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-stone-50 dark:bg-stone-700/50 rounded-bl-full -mr-4 -mt-4 z-0"></div>

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-4">
          <span
            className={`px-2 py-1 rounded text-[10px] font-bold tracking-wider ${type === '去程'
              ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200'
              : 'bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300'
              }`}
          >
            {type}
          </span>
          <span className="text-xs font-bold text-stone-400">{date}</span>
        </div>

        <div className="flex justify-between items-center mb-4">
          {/* 出發地 */}
          <div className="text-center min-w-[3rem]">
            <div className="text-2xl font-bold text-stone-800 dark:text-stone-100 leading-none mb-1">
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

          {/* 飛機圖示 */}
          <div className="flex-1 px-3 flex flex-col items-center">
            <div className="text-xs font-bold text-stone-500 dark:text-stone-400 mb-2">
              {flightNo}
            </div>
            <div className="w-full h-[2px] bg-stone-200 dark:bg-stone-600 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-stone-800 p-1">
                <Plane size={14} className="text-stone-300 dark:text-stone-500 rotate-90" />
              </div>
            </div>
            <div className="text-xs font-bold text-stone-400 mt-2 whitespace-nowrap">
              {time}
            </div>
          </div>

          {/* 目的地 */}
          <div className="text-center min-w-[3rem]">
            <div className="text-2xl font-bold text-stone-800 dark:text-stone-100 leading-none mb-1">
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

        <div className="flex items-center justify-between pt-3 border-t border-stone-100 dark:border-stone-700">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
              {airline}
            </span>
          </div>

          <a
            href={searchUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-xs font-bold text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-full transition-colors"
          >
            即時動態 <ArrowRight size={12} />
          </a>
        </div>
      </div>
    </div>
  );
};
// 新增換匯計算機and推薦換匯所
// 修正CurrencySection
// 幹不想上班
// ============================================
// 2. 修正 CurrencySection (夜間模式版)
// ============================================
const CurrencySection = () => {
  const [rate, setRate] = useState(1.08);
  const [twd, setTwd] = useState('');
  const [thb, setThb] = useState('');
  const [lastUpdate, setLastUpdate] = useState('');

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const res = await fetch('https://api.exchangerate-api.com/v4/latest/TWD');
        const data = await res.json();
        if (data && data.rates && data.rates.THB) {
          setRate(data.rates.THB);
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

  const exchanges = [
    { id: 1, name: '清邁機場換匯 (Arrival)', map: 'Chiang Mai International Airport Currency Exchange', note: '🚨 抵達應急用，匯率較差，建議只換車資。', tag: '抵達第一站', tagColor: 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300' },
    { id: 2, name: 'Super Rich (清邁店)', map: 'Super Rich Chiang Mai', note: '🔥 匯率通常是全清邁最好，近古城。', tag: '匯率最優', tagColor: 'bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300' },
    { id: 3, name: 'Mr. Pierre (巫宗雄)', map: 'Mr. Pierre Money Exchange', note: '👍 古城內匯率王，老闆會說中文。', tag: '古城推薦', tagColor: 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300' },
    { id: 4, name: 'G Exchange Co.,Ltd.', map: 'G Exchange Co.,Ltd. Chiang Mai', note: 'Loi Kroh 路熱門店，評價極高 (4.7星)。', tag: '夜市區', tagColor: 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300' },
    { id: 5, name: 'S.K. Money Exchange', map: 'S.K. Money Exchange', note: '泰國常見連鎖，塔佩門附近方便。' },
  ];

  return (
    <section className="bg-white dark:bg-stone-800 p-6 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-700 mb-6 transition-colors">
      <h3 className="flex items-center gap-2 font-bold text-stone-800 dark:text-stone-100 mb-4 border-b border-stone-100 dark:border-stone-700 pb-3">
        <Wallet size={18} className="text-green-600 dark:text-green-400" /> 匯率計算機
      </h3>

      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl mb-4 border border-green-100 dark:border-green-800/30">
        <div className="text-xs text-green-600 dark:text-green-400 font-bold mb-2 flex justify-between">
          <span>即時現金匯率</span>
          <span>1 TWD ≈ {rate} THB</span>
        </div>

        <div className="flex items-center gap-2 mb-2">
          <div className="flex-1 relative">
            <span className="absolute left-3 top-2.5 text-stone-400 text-xs font-bold">TWD</span>
            <input
              type="number"
              value={twd}
              onChange={handleTwdChange}
              placeholder="台幣"
              className="w-full pl-12 pr-3 py-2 rounded-lg border border-green-200 dark:border-green-800 focus:outline-none focus:border-green-500 font-bold text-stone-700 dark:text-stone-200 bg-white dark:bg-stone-700"
            />
          </div>
          <div className="text-stone-400">=</div>
          <div className="flex-1 relative">
            <span className="absolute left-3 top-2.5 text-stone-400 text-xs font-bold">THB</span>
            <input
              type="number"
              value={thb}
              onChange={handleThbChange}
              placeholder="泰銖"
              className="w-full pl-12 pr-3 py-2 rounded-lg border border-green-200 dark:border-green-800 focus:outline-none focus:border-green-500 font-bold text-stone-700 dark:text-stone-200 bg-white dark:bg-stone-700"
            />
          </div>
        </div>
        <div className="text-[10px] text-green-400 dark:text-green-500 text-right">
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
              ? 'bg-white dark:bg-stone-700 border-stone-200 dark:border-stone-600 shadow-sm'
              : 'bg-stone-50 dark:bg-stone-800/50 border-stone-100 dark:border-stone-700 opacity-80'
              }`}
          >
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <div className="font-bold text-stone-700 dark:text-stone-200 text-sm">
                  {i + 1}. {ex.name}
                </div>
                {ex.tag && (
                  <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${ex.tagColor}`}>
                    {ex.tag}
                  </span>
                )}
              </div>
              <div className="text-[10px] text-stone-500 dark:text-stone-400">{ex.note}</div>
            </div>
            <button
              onClick={() =>
                window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ex.map)}`, '_blank')
              }
              className="w-8 h-8 bg-white dark:bg-stone-600 rounded-full flex items-center justify-center text-stone-500 dark:text-stone-300 shadow-sm border border-stone-200 dark:border-stone-500 active:scale-95 hover:text-amber-600"
            >
              <Navigation size={14} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};


// ============================================
// 新增：指南頁面 (GuidePage)
// ============================================
const GuidePage = () => {
  const guideSections = [
    {
      title: '咖啡地圖',
      icon: <Coffee className="text-amber-600" />,
      mapUrl: 'https://maps.app.goo.gl/vgKmgeXXo4Dzkad29',
      aiQuery: '咖啡廳推薦10家及特色 2026',
      desc: '蒐集清邁最具特色的工業風與老宅咖啡廳。',
      color: 'bg-amber-50 border-amber-100 dark:bg-amber-900/20 dark:border-amber-800'
    },
    {
      title: '必吃清單',
      icon: <UtensilsCrossed className="text-red-600" />,
      mapUrl: 'https://maps.app.goo.gl/4wmbvZrToa8N59Jd8', //必吃
      aiQuery: '必吃在地美食與名店推薦15家 2026',
      desc: '泰北金麵 (Khao Soy)、烤雞、泰北拼盤，沒吃到不算來過清邁！',
      color: 'bg-red-50 border-red-100 dark:bg-red-900/20 dark:border-red-800'
    },
    {
      title: '甜點清單',
      icon: <IceCream className="text-pink-600" />,
      mapUrl: 'https://maps.app.goo.gl/RQSchhVcqjjftE4x6', // 甜點
      aiQuery: '甜點下午茶店推薦15家及特色 芒果糯米飯 椰子派也要 2026',
      desc: '清邁限定椰子派、芒果糯米以及各種高顏值網美甜點。',
      color: 'bg-pink-50 border-pink-100 dark:bg-pink-900/20 dark:border-pink-800'
    },
    {
      title: '微醺酒吧',
      icon: <Beer className="text-purple-600" />,
      mapUrl: 'https://maps.app.goo.gl/xJwFHhz4zzGHND3P8', // 酒吧
      aiQuery: '酒吧推薦10家及特色 2026',
      desc: '清邁夜晚的靈魂，從尼曼路到河濱區的小酌選單。',
      color: 'bg-purple-50 border-purple-100 dark:bg-purple-900/20 dark:border-purple-800'
    },
    {
      title: '極致SPA與按摩',
      icon: <Flower2 className="text-emerald-600" />,
      mapUrl: 'https://maps.app.goo.gl/Kw3c8NTVD9ZuVXXo8', // SPA
      aiQuery: 'spa推薦10家及特色 2026',
      desc: '舒緩雙腿的爛腳救星，包含高檔 SPA 與在地按摩。',
      color: 'bg-emerald-50 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800'
    },
    {
      title: '百貨商場',
      icon: <ShoppingBag className="text-blue-600" />,
      mapUrl: 'https://maps.app.goo.gl/ehpNk2BDJHWBZTtz6', // 百貨
      aiQuery: '百貨商場推薦6家及特色 2026',
      desc: '整理行李、吹冷氣、買伴手禮與國際品牌。',
      color: 'bg-blue-50 border-blue-100 dark:bg-blue-900/20 dark:border-blue-800'
    }
  ];

  const handleAskAI = (query) => {
    // 這裡維持你希望使用的 Perplexity 查詢方式
    window.open(`https://www.perplexity.ai/search?q=${encodeURIComponent('清邁 ' + query)}`, '_blank');
  };

  return (
    <div className="p-6 space-y-4 pb-24 animate-fadeIn">
      <div className="flex items-center gap-3 mb-6">
        <Compass className="text-stone-400" size={28} />
        <h2 className="text-2xl font-serif font-bold text-stone-800 dark:text-stone-100">探索清邁</h2>
      </div>
      
      {/* 這裡改用 grid 兩欄顯示，在手機上會比較緊湊好看 */}
      <div className="grid grid-cols-1 gap-4">
        {guideSections.map((section, idx) => (
          <div key={idx} className={`p-5 rounded-3xl border ${section.color} shadow-sm transition-all active:scale-[0.98]`}>
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-white dark:bg-stone-800 rounded-2xl shadow-sm">
                {section.icon}
              </div>
              <h3 className="text-lg font-bold text-stone-800 dark:text-stone-100">{section.title}</h3>
            </div>
            
            <p className="text-[11px] text-stone-500 dark:text-stone-400 mb-5 leading-relaxed h-8 line-clamp-2">
              {section.desc}
            </p>

            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => window.open(section.mapUrl, '_blank')}
                className="flex items-center justify-center gap-2 py-2.5 bg-stone-800 dark:bg-stone-700 text-amber-50 rounded-2xl text-xs font-bold shadow-md active:scale-95 transition-all"
              >
                <MapPin size={14} /> 開啟清單
              </button>
              <button 
                onClick={() => handleAskAI(section.aiQuery)}
                className="flex items-center justify-center gap-2 py-2.5 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-600 text-stone-700 dark:text-stone-200 rounded-2xl text-xs font-bold shadow-sm active:scale-95 transition-all"
              >
                <Sparkles size={14} className="text-teal-500" /> 問問 AI
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-stone-100 dark:bg-stone-800/50 p-4 rounded-2xl text-center mt-4">
        <p className="text-[10px] text-stone-400 font-bold uppercase tracking-widest leading-loose">
          這份指南是為了 2026 四人團特別準備的<br/>
          希望大家玩得開心 🇹🇭
        </p>
      </div>
    </div>
  );
};





// 修改 UtilsPage
// ============================================
// 3. 修正 UtilsPage (完整夜間模式版)
// ============================================
const UtilsPage = ({ isAdmin, isMember, systemInfo, updateSystemInfo }) => {
  return (
    <div className="p-6 space-y-6 pb-24 animate-fade-in bg-[#FDFBF7] dark:bg-stone-900 min-h-screen transition-colors duration-500">
      <h2 className="text-2xl font-serif font-bold text-stone-800 dark:text-stone-100 mb-6">
        實用工具
      </h2>

      {/* 🔥 管理員專屬設定區 */}
      {isAdmin && (
        <section className="bg-stone-800 p-6 rounded-2xl shadow-lg border border-stone-700 mb-6 text-white relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-amber-500/20 rounded-full blur-xl"></div>
          <h3 className="flex items-center gap-2 font-bold text-amber-400 mb-4 border-b border-stone-600 pb-3 relative z-10">
            <Settings size={18} /> 管理員設定 (Admin)
          </h3>
          <div className="space-y-4 relative z-10">
            <div>
              <label className="text-xs text-stone-400 font-bold mb-1.5 block">鎖定畫面底部文字</label>
              <input
                type="text"
                value={systemInfo || ''}
                onChange={(e) => updateSystemInfo(e.target.value)}
                className="w-full bg-stone-900/50 border border-stone-600 rounded-xl px-3 py-2 text-sm text-emerald-200 focus:outline-none focus:border-amber-500 transition-colors"
                placeholder="輸入 System Ver..."
              />
              <p className="text-[10px] text-stone-500 mt-1">這裡改完，登出後的鎖定畫面就會同步更新囉！</p>
            </div>
          </div>
        </section>
      )}

      {/* 小費指南 (內部已支援 dark mode) */}
      <TippingGuide />

      {/* 航班資訊區塊 */}
      <section className="bg-white dark:bg-stone-800 p-6 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-700 transition-colors">
        <h3 className="flex items-center gap-2 font-bold text-stone-800 dark:text-stone-100 mb-4 border-b border-stone-100 dark:border-stone-700 pb-3">
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
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-100 dark:hover:bg-blue-900/50 active:scale-95 transition-all"
        >
          <Info size={16} /> 開啟電子機票存摺
        </a>
      </section>

      {/* 住宿資訊區塊 */}
      <section className="bg-white dark:bg-stone-800 p-6 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-700 transition-colors">
        <h3 className="flex items-center gap-2 font-bold text-stone-800 dark:text-stone-100 mb-4 border-b border-stone-100 dark:border-stone-700 pb-3">
          <Home size={18} className="text-orange-500" /> 住宿導航
        </h3>
        <div className="space-y-4">
          {UTILS_DATA.accommodations.map((acc, idx) => (
            <div
              key={idx}
              className="bg-stone-50 dark:bg-stone-700/50 rounded-xl p-4 border border-stone-100 dark:border-stone-600 relative overflow-hidden transition-colors"
            >
              <div className="absolute -right-4 -top-4 w-16 h-16 bg-white dark:bg-stone-600 rounded-full opacity-50 pointer-events-none"></div>
              <div className="flex justify-between items-start mb-2 relative z-10">
                <div>
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                    {acc.type}
                  </span>
                  <h4 className="font-bold text-stone-800 dark:text-stone-100 text-lg leading-tight">
                    {acc.name}
                  </h4>
                </div>
                <span className="text-xs font-bold bg-white dark:bg-stone-600 px-2 py-1 rounded border border-stone-100 dark:border-stone-500 text-stone-500 dark:text-stone-300">
                  {acc.date}
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 mb-4 flex items-center gap-1">
                <MapPin size={10} /> {acc.address}
              </p>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(acc.mapQuery)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2 bg-stone-800 dark:bg-stone-900 text-amber-50 rounded-lg text-xs font-bold active:scale-95 transition-transform shadow-sm"
                  >
                    <Navigation size={12} /> 導航
                  </a>
                  <a
                    href={`tel:${acc.phone}`}
                    className="flex items-center justify-center gap-1.5 py-2 bg-white dark:bg-stone-600 border border-stone-200 dark:border-stone-500 text-stone-600 dark:text-stone-200 rounded-lg text-xs font-bold active:scale-95 transition-transform"
                  >
                    <Phone size={12} /> 聯絡
                  </a>
                </div>
                {/* 團員專屬按鈕 */}
                {isMember && acc.airbnbUrl && (
                  <div className="grid grid-cols-2 gap-2 animate-fadeIn">
                    <a
                      href={acc.airbnbUrl}
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
                      className="flex items-center justify-center gap-1.5 py-2 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50 rounded-lg text-xs font-bold active:scale-95 transition-transform"
                    >
                      <MapPin size={12} /> 房東地圖
                    </a>
                  </div>
                )}
                {/* 非團員鎖頭 */}
                {!isMember && acc.name === 'Lucky Charm House' && (
                  <div className="text-center py-2 bg-stone-50 dark:bg-stone-700 rounded-lg text-[10px] text-stone-400 border border-stone-200 dark:border-stone-600">
                    🔒 房源連結僅供團員存取
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {(isAdmin || isMember) && (
          <a
            href={UTILS_DATA.driveUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 mt-4 rounded-xl bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-bold hover:bg-orange-100 dark:hover:bg-orange-900/50 active:scale-95 transition-all"
          >
            <Info size={16} /> 查看住宿憑證
          </a>
        )}
      </section>

      {/* 租車資訊區塊 */}
      <section className="bg-white dark:bg-stone-800 p-6 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-700 mb-6 transition-colors">
        <h3 className="flex items-center gap-2 font-bold text-stone-800 dark:text-stone-100 mb-4 border-b border-stone-100 dark:border-stone-700 pb-3">
          <Car size={18} className="text-amber-600" /> 租車資訊
        </h3>
        <div className="flex gap-4 mb-4">
          <div className="w-16 h-16 bg-[#009FE3] rounded-xl flex items-center justify-center text-xs font-bold text-white border border-blue-200 shadow-sm">
            DRIVE
          </div>
          <div className="flex-1">
            <div className="text-lg font-bold text-stone-800 dark:text-stone-100">
              Nissan Serena (7座)
            </div>
            <div className="text-sm text-stone-500 dark:text-stone-400 mb-2 flex items-center gap-1">
              <CheckCircle size={12} className="text-green-500" />{' '}
              預訂確認單已存檔
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 px-2 py-1 rounded border border-amber-100 dark:border-amber-800">
                國際線 8-9號門
              </span>
              <span className="text-[10px] bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 px-2 py-1 rounded">
                現場押金 ฿20,000
              </span>
            </div>
          </div>
        </div>
        <div className="relative pl-4 border-l-2 border-stone-200 dark:border-stone-600 space-y-6 my-4 ml-2">
          <div className="relative">
            <div className="absolute -left-[21px] top-0 w-3 h-3 rounded-full bg-green-500 ring-4 ring-white dark:ring-stone-800"></div>
            <div className="text-xs text-stone-400 font-bold">取車</div>
            <div className="font-bold text-stone-800 dark:text-stone-100">2/19 (四) 17:30</div>
            <div className="text-xs text-stone-500 dark:text-stone-400 mt-1">
              國際線入境大廳 1樓 (Gate 8-9)
            </div>
          </div>
          <div className="relative">
            <div className="absolute -left-[21px] top-0 w-3 h-3 rounded-full bg-red-400 ring-4 ring-white dark:ring-stone-800"></div>
            <div className="text-xs text-stone-400 font-bold">還車</div>
            <div className="font-bold text-stone-800 dark:text-stone-100">2/20 (五) 17:30</div>
            <div className="text-xs text-stone-500 dark:text-stone-400 mt-1">國際線入境大廳</div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4">
          <a
            href="tel:+66847004384"
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-stone-200 dark:border-stone-600 text-sm font-bold text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
          >
            <Phone size={16} /> 車行電話
          </a>
          <a
            href={UTILS_DATA.driveUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-stone-800 dark:bg-stone-700 text-amber-50 text-sm font-bold hover:bg-stone-700 dark:hover:bg-stone-600 active:scale-95 transition-all"
          >
            <Info size={16} /> 原始憑證
          </a>
        </div>
      </section>

      {/* LINE 分帳 (綠色區塊) */}
      {isMember && (
        <section className="bg-[#06C755] p-6 rounded-2xl shadow-lg shadow-green-900/10 text-white relative overflow-hidden mb-6 animate-fadeIn">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/20 rounded-full blur-2xl"></div>
          <h3 className="flex items-center gap-2 font-bold text-white mb-2 relative z-10">
            <Wallet size={18} /> 公款記帳與分帳
          </h3>
          <p className="text-green-50 text-sm mb-6 relative z-10 font-medium">
            所有公費支出請統一記錄在此，系統會自動結算每個人該付多少錢。
          </p>
          <a
            href={atob('aHR0cHM6Ly9hcHAubGlnaHRzcGxpdC5jb20vP2xpZmYuc3RhdGU9JTJGZyUyRm9tSkhaaVpDNWNya1hoNm1RdmFYZ1Q=')}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-white text-[#06C755] py-3.5 rounded-xl font-bold hover:bg-green-50 active:scale-95 transition-all shadow-sm relative z-10"
          >
            開啟 Lightsplit 分帳群組 <ArrowRight size={16} />
          </a>
        </section>
      )}

      {/* 匯率計算機 (內部已支援 dark mode) */}
      <CurrencySection />

      {/* 緊急救援 (紅色區塊) */}
      <section className="bg-white dark:bg-stone-800 p-6 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-700 mb-6 transition-colors">
        <h3 className="flex items-center gap-2 font-bold text-red-700 dark:text-red-400 mb-4 border-b border-stone-100 dark:border-stone-700 pb-3">
          <AlertCircle size={18} className="text-red-600 dark:text-red-400" /> 緊急救援中心
        </h3>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-3">
            <a
              href="tel:1155"
              className="bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 p-3 rounded-xl flex flex-col items-center justify-center gap-1 transition-colors border border-red-100 dark:border-red-900/50"
            >
              <span className="text-2xl font-black text-red-600 dark:text-red-400">1155</span>
              <span className="text-xs font-bold text-red-800 dark:text-red-300">
                觀光警察 (中文可)
              </span>
            </a>
            <a
              href="tel:1669"
              className="bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 p-3 rounded-xl flex flex-col items-center justify-center gap-1 transition-colors border border-red-100 dark:border-red-900/50"
            >
              <span className="text-2xl font-black text-red-600 dark:text-red-400">1669</span>
              <span className="text-xs font-bold text-red-800 dark:text-red-300">
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
              <div className="flex items-center justify-between p-3 bg-stone-50 dark:bg-stone-700/50 rounded-xl border border-stone-100 dark:border-stone-600">
                <div>
                  <div className="font-bold text-stone-800 dark:text-stone-100">Chiang Mai Ram</div>
                  <div className="text-xs text-stone-500 dark:text-stone-400">
                    清邁蘭醫院 (設備最好)
                  </div>
                </div>
                <a
                  href="tel:053920300"
                  className="w-8 h-8 bg-white dark:bg-stone-600 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 shadow-sm border border-stone-100 dark:border-stone-500"
                >
                  <Phone size={14} />
                </a>
              </div>
              <div className="flex items-center justify-between p-3 bg-stone-50 dark:bg-stone-700/50 rounded-xl border border-stone-100 dark:border-stone-600">
                <div>
                  <div className="font-bold text-stone-800 dark:text-stone-100">
                    Bangkok Hospital
                  </div>
                  <div className="text-xs text-stone-500 dark:text-stone-400">
                    曼谷醫院 (服務最優)
                  </div>
                </div>
                <a
                  href="tel:1719"
                  className="w-8 h-8 bg-white dark:bg-stone-600 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 shadow-sm border border-stone-100 dark:border-stone-500"
                >
                  <Phone size={14} />
                </a>
              </div>
            </div>
          </div>
          <div className="bg-stone-800 dark:bg-stone-950 rounded-xl p-4 text-stone-300 text-sm space-y-3">
            <div className="flex justify-between items-center border-b border-stone-700 pb-2">
              <span>🇹🇼 駐泰辦事處 (急難)</span>
              <a href="tel:0816664006" className="text-amber-400 font-bold hover:underline">
                081-666-4006
              </a>
            </div>
            <div className="flex justify-between items-center border-b border-stone-700 pb-2">
              <span>👮 當地報案 (Police)</span>
              <a href="tel:191" className="text-white font-bold hover:underline">
                191
              </a>
            </div>
            <div className="flex justify-between items-center pt-1">
              <span>💳 Visa 全球掛失</span>
              <a href="tel:001800115350660" className="text-stone-400 text-xs hover:text-white">
                001-800-11-535-0660
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

//
// 行李清單 &泰國需知
// =====================

const DEFAULT_ITEMS = [
  '泰服搭配的鞋子',
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
  '數位相機/傳統相機/充電器/底片',
  '隱形眼鏡/藥水/器具',
  '眼鏡/眼鏡盒',
  '墨鏡',
  '刮鬍刀/刮鬍泡',
];

const USERS = ['佑任', '軒寶', '學弟', '腳慢'];

// 更新ThaiTips加入 2026 最新規定
// ============================================
// 修正泰國需知 合併生活須知2026新規定
// ============================================

// ============================================
// 修正泰國需知 (完整夜間模式版)
// ============================================
const ThaiTips = ({ onTrigger }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mx-6 mt-6 mb-6">
      <div className="bg-amber-50 dark:bg-stone-800 rounded-2xl border border-amber-100 dark:border-stone-700 overflow-hidden shadow-sm transition-colors duration-300">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-4 bg-amber-100/50 dark:bg-stone-800 text-amber-900 dark:text-amber-100 font-bold hover:bg-amber-100 dark:hover:bg-stone-700 transition-colors"
        >
          <div className="flex items-center gap-2">
            <AlertCircle size={18} className="text-amber-600 dark:text-amber-500" />
            <span>泰國旅遊禁忌與 2026 新制</span>
          </div>
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {isOpen && (
          <div className="p-4 space-y-4 text-sm text-stone-700 dark:text-stone-300 leading-relaxed bg-amber-50 dark:bg-stone-800 transition-colors">
            {/* --- 2026 新增/重點規定 --- */}

            {/* 1. 行動電源 (最重要) - 特別框起來 */}
            <div className="flex gap-3 bg-white dark:bg-stone-700 p-3 rounded-xl border border-amber-100 dark:border-stone-600 shadow-sm transition-colors">
              <div className="min-w-[24px] text-amber-600 dark:text-amber-400 font-bold mt-1">
                <Zap size={18} />
              </div>
              <div>
                <strong className="text-stone-900 dark:text-stone-100 block mb-1">
                  行動電源 (AirAsia 鐵律)
                </strong>
                <ul className="list-disc pl-4 space-y-1 text-xs text-stone-600 dark:text-stone-400">
                  <li>
                    <span className="text-red-600 dark:text-red-400 font-bold">嚴禁託運</span>
                    ，必須隨身。
                  </li>
                  <li>
                    嚴禁放在機上
                    <span className="font-bold underline">頭頂置物櫃</span>
                    ，只能放座位下。
                  </li>
                  <li>容量不可超過 160Wh。</li>
                </ul>
              </div>
            </div>

            {/* 2. 電子入境卡 */}
            <div className="flex gap-3">
              <div className="min-w-[24px] text-blue-600 dark:text-blue-400 font-bold">
                <FileText size={18} />
              </div>
              <div>
                <strong className="text-stone-900 dark:text-stone-100 block">
                  電子入境卡 (TDAC)
                </strong>
                入境前 72 小時內需上網填寫取得 QR Code (取代紙本)。
              </div>
            </div>

            {/* 3. 大麻 (新制) */}
            <div className="flex gap-3">
              <div className="min-w-[24px] text-green-600 dark:text-green-400 font-bold">
                <AlertTriangle size={18} />
              </div>
              <div
                // 🔥 這裡就是機關！綁定觸發函式
                onClick={onTrigger}
                // 加上一點點互動效果 (滑鼠變手手、點擊縮放)
                className="cursor-pointer select-none active:scale-95 transition-transform"
              >
                <strong className="text-stone-900 dark:text-stone-100 block">大麻法規</strong>
                帶回台灣屬
                <span className="text-red-600 dark:text-red-400 font-bold">二級毒品重罪</span>
              </div>
            </div>

            {/* --- 原本的生活需知 (保留) --- */}

            {/* 4. 電子菸 (保留) */}
            <div className="flex gap-3">
              <div className="min-w-[24px] text-red-500 dark:text-red-400 font-bold">
                <Gavel size={18} />
              </div>
              <div>
                <strong className="text-red-700 dark:text-red-400 block">電子菸絕對違法</strong>
                攜帶或使用電子菸在泰國是違法的，最高可判10年監禁或高額罰款。
              </div>
            </div>

            {/* 5. 電壓 (保留) */}
            <div className="flex gap-3">
              <div className="min-w-[24px] text-orange-500 dark:text-orange-400 font-bold">
                <Zap size={18} />
              </div>
              <div>
                <strong className="text-stone-900 dark:text-stone-100 block">
                  電壓 220V (重要!)
                </strong>
                台灣電器 (110V) 如吹風機、離子夾
                <span className="text-red-600 dark:text-red-400 font-bold">不可直接插</span>
                ，會燒壞！手機充電器通常支援國際電壓則沒問題。
              </div>
            </div>

            {/* 6. 文化 (保留) */}
            <div className="flex gap-3">
              <div className="min-w-[24px] text-stone-600 dark:text-stone-400 font-bold">
                <User size={18} />
              </div>
              <div>
                <strong className="text-stone-900 dark:text-stone-100 block">文化與規矩</strong>
                1. 絕對不可批評皇室 (重罪)。
                <br />
                2. 不要摸泰國人的頭。
                <br />
                3. 寺廟需脫鞋，不可穿著暴露。
              </div>
            </div>

            {/* 7. 飲食 (保留) */}
            <div className="flex gap-3">
              <div className="min-w-[24px] text-emerald-600 dark:text-emerald-400 font-bold">
                <Droplets size={18} />
              </div>
              <div>
                <strong className="text-stone-900 dark:text-stone-100 block">飲食衛生</strong>
                生水不可飲用。路邊攤少吃生食 (如生蝦、生蟹)，避免腸胃不適。
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================
// 新增: 清邁小費對照表 (2025/2026版)
// ============================================
// 記得確認有沒有引入這些 icon

// ============================================
// 更新小費對照表
// ============================================
// ============================================
// 更新小費對照表 (修正夜間模式)
// ============================================
const TippingGuide = () => {
  const [isOpen, setIsOpen] = useState(false);

  // 🔥 這裡補上了 dark: 的配色邏輯
  const tips = [
    {
      title: '泰式按摩 / SPA',
      amount: '฿50 - ฿100 / 人',
      desc: '按人頭給。一般按摩給 50，精油/高檔 SPA 給 100。請務必「親手」拿給幫你按的那位師傅。',
      icon: <Smile size={18} className="text-pink-500" />,
      color: 'bg-pink-50 text-pink-700 border-pink-100 dark:bg-pink-900/20 dark:text-pink-300 dark:border-pink-800',
    },
    {
      title: '飯店 & 住宿清潔',
      amount: '฿20 - ฿50 / 房',
      desc: '飯店每房每天 20-50 (放枕頭上)。Airbnb 若無每日打掃，則免放，建議最後退房留 100 銖在桌上即可。',
      icon: <Home size={18} className="text-amber-500" />,
      color: 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800',
    },
    {
      title: '包車司機 (全天)',
      amount: '฿200 - ฿300 / 車',
      desc: '茵他儂山包車行程。結束時全車合資給司機，感謝他開整天山路的安全辛勞。',
      icon: <Car size={18} className="text-blue-500" />,
      color: 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800',
    },
    {
      title: '餐廳吃飯',
      amount: '฿20+ 或 零錢',
      desc: '路邊攤不用給。餐廳若帳單已含 10% 服務費則不用給，否則可留下找零的硬幣或 20 銖紙鈔。',
      icon: <Utensils size={18} className="text-orange-500" />,
      color: 'bg-orange-50 text-orange-700 border-orange-100 dark:bg-orange-900/20 dark:text-orange-300 dark:border-orange-800',
    },
  ];

  return (
    <section className="bg-white dark:bg-stone-800 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-700 mb-6 overflow-hidden transition-all">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
      >
        <div className="flex items-center gap-2 font-bold text-stone-800 dark:text-stone-100">
          <Coins size={18} className="text-amber-500" />
          <span>小費參考指南 (THB)</span>
        </div>
        {isOpen ? (
          <ChevronUp size={20} className="text-stone-300" />
        ) : (
          <ChevronDown size={20} className="text-stone-300" />
        )}
      </button>

      {isOpen && (
        <div className="p-4 pt-0 animate-fadeIn">
          <div className="grid grid-cols-1 gap-3 mt-2">
            {tips.map((tip, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border flex items-start gap-3 ${tip.color}`}
              >
                <div className="bg-white dark:bg-stone-700 p-2 rounded-full shadow-sm flex-shrink-0 mt-1">
                  {tip.icon}
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-sm">{tip.title}</span>
                    <span className="font-black text-lg">{tip.amount}</span>
                  </div>
                  <p className="text-xs opacity-90 font-medium leading-relaxed">
                    {tip.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-stone-400 mt-3 text-center">
            * 泰國小費是種心意非強制，同時也可以給佑任小費喔! Keke~ 🐹
          </p>
        </div>
      )}
    </section>
  );
};

// 修改 PackingPage 接收 isKonamiActive 來切換顯示模式
// 修改 PackingPage 加入 isAdmin 控制 訪客只能看
// 修改 PackingPage 加入 Toast 通知 以及LocalStorage 保護
// ============================================
// 修正 PackingPage (修復淺色模式文字消失 + 標題圖案放大)
// ============================================
const PackingPage = ({ isKonamiActive, isAdmin, isMember, onSecretTrigger }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [packingData, setPackingData] = useState({});
  const [newItem, setNewItem] = useState('');
  const [showToast, setShowToast] = useState(false);

  const CHARACTER_MAP = {
    佑任: process.env.PUBLIC_URL + '/sanrio/img_rank1.png',
    軒寶: process.env.PUBLIC_URL + '/sanrio/hellokitty.png',
    學弟: process.env.PUBLIC_URL + '/sanrio/img_rank2.png',
    腳慢: process.env.PUBLIC_URL + '/sanrio/mymelody2.png',
  };

  // 1. 選單按鈕的大圖設定 (保持不變)
  const STYLE_MAP = {
    佑任: 'w-16 h-16 translate-y-4',
    軒寶: 'w-14 h-14 translate-y-1',
    學弟: 'w-24 h-24 translate-y-8',
    腳慢: 'w-30 h-30 translate-y-7',
  };

  // 🔥 2. 新增：標題旁的小圖設定 (在這裡把學弟跟腳慢放大！)
  const HEADER_ICON_STYLE = {
    佑任: 'w-9 h-9',               // 正常大小
    軒寶: 'w-9 h-9',               // 正常大小
    學弟: 'w-16 h-16 -my-4 ml-1',  // 🔥 放大！並用負邊距調整位置
    腳慢: 'w-14 h-14 -my-3 ml-1',  // 🔥 放大！
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
    try {
      const dataStr = JSON.stringify(newData);
      if (dataStr.length > 4000000) {
        alert('⚠️ 行李清單太長了！請刪除一些不必要的項目');
        return;
      }
      localStorage.setItem('cm_packing_list_v2', dataStr);
      setPackingData(newData);
    } catch (e) {
      console.error('儲存失敗:', e);
      alert('❌ 儲存失敗，您的手機空間可能不足');
    }
  };

  const toggleItem = (user, index) => {
    if (!isAdmin && !isMember) {
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      return;
    }
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
    <div className="pb-24 min-h-screen bg-[#FDFBF7] dark:bg-stone-900 relative transition-colors duration-500">
      <ThaiTips onTrigger={onSecretTrigger} />

      {/* toast 通知 */}
      {showToast && (
        <div className="fixed bottom-24 left-6 right-6 z-50 animate-bounce">
          <div className="bg-stone-800/95 backdrop-blur text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-stone-700">
            <div className="bg-stone-700 p-2 rounded-full">
              <Lock size={20} className="text-amber-400" />
            </div>
            <div>
              <div className="font-bold text-sm text-amber-50">訪客模式 Read Only</div>
              <div className="text-[10px] text-stone-300 mt-0.5">請輸入團員密碼才能編輯</div>
            </div>
          </div>
        </div>
      )}

      <div className="px-6 mt-2 mb-4">
        <h2 className="text-2xl font-serif font-bold text-stone-800 dark:text-stone-100 flex items-center gap-2">
          <span className="w-1.5 h-6 bg-amber-500 rounded-full"></span>
          行李準備清單
        </h2>
        <p className="text-xs text-stone-400 mt-1 ml-3.5">請點選下方名字開始檢查</p>
      </div>

      <div className="px-6 mb-6">
        <h3 className="text-center font-serif text-stone-500 dark:text-stone-400 mb-4 text-sm italic">
          — Who are you? —
        </h3>
        <div className="grid grid-cols-4 gap-2">
          {USERS.map((user) => (
            <button
              key={user}
              onClick={() => setCurrentUser(user)}
              // 🔥 3. 修正這裡：強制文字顏色 (text-stone-100)，解決淺色模式看不到字的問題
              className={`
                relative flex flex-col items-center justify-end rounded-2xl border transition-all duration-300 h-auto py-2
                ${currentUser === user
                  ? 'bg-stone-800 border-amber-400/50 shadow-[0_0_15px_rgba(251,191,36,0.3)] text-stone-50'
                  : 'bg-stone-900/50 border-stone-800 opacity-60 hover:opacity-100 hover:bg-stone-800 text-stone-300'
                }
              `}
            >
              {isKonamiActive ? (
                <div className="flex flex-col items-center w-full animate-bounce">
                  <div className="h-[60px] w-full flex items-end justify-center">
                    <img
                      src={CHARACTER_MAP[user]}
                      alt={user}
                      className={`${STYLE_MAP[user] || 'w-12 h-12'} object-contain drop-shadow-sm transition-transform duration-300`}
                    />
                  </div>
                  <span className="text-[10px] opacity-80 mt-1">{user}</span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-end h-[60px] pb-2">
                  <span>{user}</span>
                  {packingData[user] && (
                    <span className="text-[10px] opacity-80 font-normal">
                      {getProgress(user)}%
                    </span>
                  )}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {currentUser ? (
        <div className="px-6 animate-fadeIn">
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-2xl font-serif font-bold text-stone-800 dark:text-stone-100 flex items-center gap-2 overflow-visible">
              <span className="text-amber-600 dark:text-amber-500">{currentUser}</span> 的清單
              {isKonamiActive && (
                // 🔥 4. 修正這裡：使用 HEADER_ICON_STYLE 來控制標題旁的小圖大小
                <img
                  src={CHARACTER_MAP[currentUser]}
                  className={`${HEADER_ICON_STYLE[currentUser] || 'w-9 h-9'} object-contain transition-all`}
                  alt="icon"
                />
              )}
            </h2>
            <span className="text-xs text-stone-400 font-bold">
              {packingData[currentUser]?.filter((i) => i.checked).length} /{' '}
              {packingData[currentUser]?.length} 完成
            </span>
          </div>

          <div className="h-1.5 w-full bg-stone-200 dark:bg-stone-700 rounded-full mb-6 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-amber-600 transition-all duration-500"
              style={{ width: `${getProgress(currentUser)}%` }}
            />
          </div>

          {(isAdmin || isMember) && (
            <div className="mb-6 flex gap-2">
              <input
                type="text"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                placeholder="新增個人項目..."
                className="flex-1 p-3 rounded-xl border border-stone-200 dark:border-stone-700 focus:outline-none focus:border-amber-500 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-100 shadow-sm placeholder:text-stone-400"
                onKeyPress={(e) => e.key === 'Enter' && addItem()}
              />
              <button
                onClick={addItem}
                className="bg-stone-800 dark:bg-stone-700 text-amber-50 px-5 rounded-xl font-bold active:scale-95 transition-transform shadow-md"
              >
                +
              </button>
            </div>
          )}

          {!isAdmin && !isMember && (
            <div className="mb-4 text-center">
              <span className="text-[10px] bg-stone-100 dark:bg-stone-800 text-stone-400 dark:text-stone-500 px-3 py-1 rounded-full border border-stone-200 dark:border-stone-700">
                🔒 訪客模式：點擊項目可查看權限提示
              </span>
            </div>
          )}

          <div className="space-y-3">
            {packingData[currentUser]?.map((item, index) => (
              <div
                key={index}
                onClick={() => toggleItem(currentUser, index)}
                className={`flex items-center gap-3 p-4 rounded-xl border transition-all cursor-pointer ${item.checked
                  ? 'bg-stone-100 dark:bg-stone-800/50 border-transparent opacity-60'
                  : 'bg-white dark:bg-stone-800 border-stone-100 dark:border-stone-700 shadow-sm hover:shadow-md'
                  }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors flex-shrink-0 ${item.checked
                    ? 'bg-green-500 border-green-500 text-white'
                    : 'border-stone-300 dark:border-stone-600 bg-stone-50 dark:bg-stone-700'
                    }`}
                >
                  {item.checked && <CheckCircle size={14} strokeWidth={3} />}
                </div>
                <span
                  className={`flex-1 font-medium ${item.checked
                    ? 'text-stone-400 dark:text-stone-600 line-through decoration-stone-400'
                    : 'text-stone-700 dark:text-stone-200'
                    }`}
                >
                  {item.name}
                </span>
                {(isAdmin || isMember) && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteItem(index);
                    }}
                    className="p-2 text-stone-300 hover:text-red-400 transition-colors"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="h-12" />
        </div>
      ) : (
        <div className="px-10 py-20 text-center text-stone-400 dark:text-stone-600">
          <p className="text-sm">
            👆 請先點選上方按鈕<br />開啟專屬清單<br />(此處有彩蛋喔~提示:上下左右)
          </p>
        </div>
      )}
    </div>
  );
};
// ============================================
// 新增：回到頂部按鈕 (右下角浮動)
// ============================================
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // 滑動超過 300px 才出現
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-24 right-4 z-40 p-3 bg-stone-800/80 dark:bg-stone-700/80 backdrop-blur-md text-amber-400 rounded-full shadow-lg border border-stone-600 active:scale-90 transition-all duration-300 animate-fadeIn hover:bg-stone-700"
      aria-label="Back to top"
    >
      <ArrowRight size={20} className="-rotate-90" strokeWidth={3} />
    </button>
  );
};


// ============================================
// 🔥 修正後的 TravelApp 主程式
// ============================================

// 🔥🔥🔥 修正後的 TravelApp 主程式 (含深色模式自動切換) 
export default function TravelApp() {
  const [isLocked, setIsLocked] = useState(true);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [inputPwd, setInputPwd] = useState('');

  // 權限狀態
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMember, setIsMember] = useState(false);

  // 深色模式狀態
  const [darkMode, setDarkMode] = useState(false);

  // 彩蛋與頁面狀態
  const [showHelloKitty, setShowHelloKitty] = useState(false);
  const [shakeCount, setShakeCount] = useState(0);
  const [showShakeEgg, setShowShakeEgg] = useState(false);
  const pressTimerRef = useRef(null);

  const [activeTab, setActiveTab] = useState('itinerary');
  const [openDay, setOpenDay] = useState(0);

  // Konami Code 相關
  const touchStartRef = useRef({ x: 0, y: 0 });
  const [konamiSequence, setKonamiSequence] = useState([]);
  const [isKonamiActive, setIsKonamiActive] = useState(false);

  const JUNGLE_BG = process.env.PUBLIC_URL + '/images/jungle1.jpeg';

  // 資料狀態
  const [itinerary, setItinerary] = useState(INITIAL_ITINERARY_DATA);
  const [appVersion, setAppVersion] = useState('2026');
  const [systemInfo, setSystemInfo] = useState('System Ver. 10.0 清邁4人團🧋');

  // 😈 Phase 3 彩蛋：全域狀態
  const [secretClickCount, setSecretClickCount] = useState(0); // 點幾下了？
  const [showSecret, setShowSecret] = useState(false);         // 是否顯示卡片？

  // 😈 觸發函式：綁定在法規文字上
  const handleSecretTrigger = () => {
    const newCount = secretClickCount + 1;
    setSecretClickCount(newCount);
    if (newCount === 5) {
      setShowSecret(true);
      alert("😈 禁忌解除！Kuromi Mode Activated! 🌿");
    }
  };




  // 🔥 1. 自動切換深色模式邏輯
  useEffect(() => {
    const hour = new Date().getHours();
    // 晚上 18:00 到 早上 06:00 自動開啟深色模式
    if (hour >= 18 || hour < 6) {
      setDarkMode(true);
    }
  }, []);

  // Firebase 監聽 (保持原樣)
  useEffect(() => {
    const itineraryRef = ref(db, 'itinerary');
    const unsubscribe = onValue(itineraryRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setItinerary(data);
      else set(itineraryRef, INITIAL_ITINERARY_DATA);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const versionRef = ref(db, 'appVersion');
    const unsubscribe = onValue(versionRef, (snapshot) => {
      const val = snapshot.val();
      if (val) setAppVersion(val);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const sysRef = ref(db, 'systemInfo');
    const unsubscribe = onValue(sysRef, (snapshot) => {
      const val = snapshot.val();
      if (val) setSystemInfo(val);
    });
    return () => unsubscribe();
  }, []);

  // 搖晃與滑動邏輯 (保持原樣)
  // 搖晃與滑動邏輯 (修正版：強制連續搖晃)
  useEffect(() => {
    let lastShakeTime = 0; // 上次有效搖晃的時間點

    const handleShake = (e) => {
      const acc = e.accelerationIncludingGravity || e.acceleration;
      if (!acc) return;

      const total = Math.abs(acc.x) + Math.abs(acc.y) + Math.abs(acc.z);

      // 1. 強度門檻 (維持 20，您可以視需求調高到 25 更難誤觸)
      if (total > 20) {
        const now = Date.now();

        // 🔥 新增邏輯：超時重置
        // 如果距離上次搖晃超過 1.5 秒，視為「中斷」，把這次當作第 1 次
        if (now - lastShakeTime > 1500) {
          setShakeCount(1);
          lastShakeTime = now;
          return;
        }

        // 2. 防抖 (維持原樣)
        // 如果距離上次太近 (300ms 內)，視為同一次搖晃的餘震，忽略
        if (now - lastShakeTime < 300) {
          return;
        }

        // 3. 有效的連續搖晃
        // (時間差在 300ms ~ 1500ms 之間)
        lastShakeTime = now;
        setShakeCount((prev) => {
          const newCount = prev + 1;
          // 搖滿 8 次觸發
          if (newCount >= 8) {
            setShowShakeEgg(true);
            return 0; // 觸發後歸零
          }
          return newCount;
        });
      }
    };

    window.addEventListener('devicemotion', handleShake);
    return () => window.removeEventListener('devicemotion', handleShake);
  }, []);

  // 滑動偵測 (保持原樣)
  useEffect(() => {
    const handleStart = (clientX, clientY) => { touchStartRef.current = { x: clientX, y: clientY }; };
    const handleEnd = (clientX, clientY) => {
      const diffX = clientX - touchStartRef.current.x;
      const diffY = clientY - touchStartRef.current.y;
      if (Math.abs(diffX) < 30 && Math.abs(diffY) < 30) return;
      let direction = '';
      if (Math.abs(diffX) > Math.abs(diffY)) { direction = diffX > 0 ? 'right' : 'left'; }
      else { direction = diffY > 0 ? 'down' : 'up'; }
      setKonamiSequence((prev) => [...prev, direction].slice(-4));
    };
    const onTouchStart = (e) => handleStart(e.touches[0].clientX, e.touches[0].clientY);
    const onTouchEnd = (e) => handleEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
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
      setIsKonamiActive((prev) => {
        alert(!prev ? '🌟 隱藏模式啟動！' : '關閉隱藏模式 👋');
        return !prev;
      });
      setKonamiSequence([]);
    }
  }, [konamiSequence]);

  // 更新函式 (保持原樣)
  const updateFirebase = (newItinerary) => {
    setItinerary(newItinerary);
    set(ref(db, 'itinerary'), newItinerary).catch((err) => alert("同步失敗 🛜"));
  };

  const updateSystemInfo = (newText) => { setSystemInfo(newText); set(ref(db, 'systemInfo'), newText); };
  const handleUpdateVersion = (newVal) => { setAppVersion(newVal); set(ref(db, 'appVersion'), newVal); };

  const handleContentUpdate = (dayNum, locIndex, field, value) => {
    const newItinerary = [...itinerary];
    const dayData = newItinerary.find((d) => d.day === dayNum);
    if (dayData && dayData.locations[locIndex]) {
      dayData.locations[locIndex][field] = value;
      updateFirebase(newItinerary);
    }
  };

  const handleTimeUpdate = (dayNum, locIndex, newTime) => {
    const newItinerary = [...itinerary];
    const dayData = newItinerary.find((d) => d.day === dayNum);
    if (dayData && dayData.locations[locIndex]) {
      dayData.locations[locIndex].time = newTime;
      updateFirebase(newItinerary);
    }
  };

  const handleAddLocation = (dayNum) => {
    const newItinerary = [...itinerary];
    const dayData = newItinerary.find((d) => d.day === dayNum);
    if (dayData) {
      dayData.locations.push({ imageId: '', type: 'sight', time: '00:00', name: '新行程', note: '請編輯內容', desc: '', nav: '', difficulty: '低' });
      updateFirebase(newItinerary);
    }
  };

  const handleDeleteLocation = (dayNum, locIndex) => {
    if (!window.confirm('確定要刪除這個行程嗎？')) return;
    const newItinerary = [...itinerary];
    const dayData = newItinerary.find((d) => d.day === dayNum);
    if (dayData) { dayData.locations.splice(locIndex, 1); updateFirebase(newItinerary); }
  };

  const handleMoveLocation = (dayNum, locIndex, direction) => {
    const newItinerary = [...itinerary];
    const dayData = newItinerary.find((d) => d.day === dayNum);
    if (dayData) {
      const newIndex = locIndex + direction;
      if (newIndex >= 0 && newIndex < dayData.locations.length) {
        const temp = dayData.locations[locIndex];
        dayData.locations[locIndex] = dayData.locations[newIndex];
        dayData.locations[newIndex] = temp;
        updateFirebase(newItinerary);
      }
    }
  };

  // 解鎖邏輯
  const handleUnlock = () => {
    if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
      DeviceMotionEvent.requestPermission().catch(console.error);
    }
    const encodedInput = btoa(inputPwd);
    if (encodedInput === 'ODY4Njc3MDg=') { setIsAdmin(true); setIsMember(true); setIsUnlocking(true); setTimeout(() => setIsLocked(false), 800); }
    else if (encodedInput === 'MTMxNDUyMA==') { setIsAdmin(false); setIsMember(true); setIsUnlocking(true); setTimeout(() => setIsLocked(false), 800); }
    else if (encodedInput === 'ODg4OA==') { setIsAdmin(false); setIsMember(false); setIsUnlocking(true); setTimeout(() => setIsLocked(false), 800); }
    else { alert('密碼錯誤！再試一次吧 🔒'); setInputPwd(''); }
  };

  const handlePressStart = () => { pressTimerRef.current = setTimeout(() => setShowHelloKitty(true), 2000); };
  const handlePressEnd = () => { if (pressTimerRef.current) clearTimeout(pressTimerRef.current); };

  // 背景預載
  useEffect(() => {
    if (!isLocked) {
      const preloadImages = () => { const bgImg = new Image(); bgImg.src = process.env.PUBLIC_URL + '/images/jungle1.jpeg'; };
      const timer = setTimeout(() => { preloadImages(); }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isLocked]);

  // 🔥 2. 回傳 JSX (最外層加入 darkMode class)
  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      {/* 🔥 引入泰式/奢華感字體 Cinzel Decorative */}
      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Playfair+Display:ital,wght@1,700&display=swap');`}
      </style>


      <div className={`min-h-screen font-sans text-stone-800 dark:text-stone-100 max-w-md mx-auto relative overflow-hidden overscroll-behavior-none select-none ${isLocked ? 'bg-stone-900' : 'bg-[#FDFBF7] dark:bg-stone-900'}`}>

        {/* 橫式警告 */}
        <div className="fixed inset-0 z-[9999] bg-stone-900 text-white flex-col items-center justify-center hidden landscape:flex">
          <Phone size={48} className="animate-pulse mb-4" />
          <p className="text-lg font-bold tracking-widest">請將手機轉為直向</p>
        </div>

        {/* 鎖定畫面 */}
        {isLocked && (
          <div className="fixed inset-0 z-[100] flex justify-center bg-stone-900 h-screen w-full">
            <div className="relative w-full max-w-md h-full overflow-hidden flex flex-col items-center">
              <div className={`absolute top-0 left-0 w-1/2 h-full transition-transform duration-1000 ease-in-out ${isUnlocking ? '-translate-x-full' : 'translate-x-0'}`} style={{ backgroundImage: `url(${JUNGLE_BG})`, backgroundSize: '200% 120%', backgroundPosition: 'left center', backgroundRepeat: 'no-repeat' }}><div className="absolute inset-0 bg-black/20"></div></div>
              <div className={`absolute top-0 right-0 w-1/2 h-full transition-transform duration-1000 ease-in-out ${isUnlocking ? 'translate-x-full' : 'translate-x-0'}`} style={{ backgroundImage: `url(${JUNGLE_BG})`, backgroundSize: '200% 120%', backgroundPosition: 'right center', backgroundRepeat: 'no-repeat' }}><div className="absolute inset-0 bg-black/20"></div></div>

              <div className={`relative z-10 flex flex-col items-center w-full px-8 h-full pt-40 transition-opacity duration-500 ${isUnlocking ? 'opacity-0' : 'opacity-100'}`}>
                <div onMouseDown={handlePressStart} onMouseUp={handlePressEnd} onMouseLeave={handlePressEnd} onTouchStart={handlePressStart} onTouchEnd={handlePressEnd} onContextMenu={(e) => e.preventDefault()} className="bg-white/20 p-6 rounded-full mb-6 shadow-2xl border border-white/30 backdrop-blur-md cursor-pointer active:scale-95 transition-transform animate-pulse touch-none">
                  <HelpCircle size={40} className="text-white drop-shadow-md" strokeWidth={2.5} />
                </div>
                <h2 className="text-3xl font-serif font-bold mb-1 tracking-wide text-white drop-shadow-md">Chiang Mai</h2>
                <p className="text-emerald-100 text-sm mb-2 text-center tracking-widest font-sans drop-shadow font-bold">佑任・軒寶・學弟・腳慢</p>

                <p className="text-emerald-200/60 text-[10px] tracking-widest uppercase font-bold drop-shadow-sm text-center mb-6 scale-90">
                  {systemInfo}
                </p>


                {/* 修改：右上角重整按鈕 */}
                <button
                  onClick={() => window.location.reload()}
                  className="absolute top-12 right-6 p-2 rounded-full bg-white/10 text-white/50 hover:bg-white/20 hover:text-white transition-all z-50 backdrop-blur-sm"
                >
                  <RefreshCw size={20} />
                </button>

                {/* 修改：包 Form 支援 Enter 送出 */}
                <form
                  className="w-full relative mb-6 mt-auto"
                  onSubmit={(e) => { e.preventDefault(); handleUnlock(); }}
                >
                  <div className="relative">
                    <KeyRound size={18} className="absolute left-4 top-4 text-emerald-100" />
                    <input
                      type="password"
                      value={inputPwd}
                      onChange={(e) => setInputPwd(e.target.value)}
                      placeholder="Passcode"
                      className="w-full bg-white/20 border border-white/30 rounded-2xl pl-12 pr-12 py-3.5 text-lg tracking-[0.2em] outline-none focus:bg-white/40 focus:ring-2 focus:ring-emerald-400 transition-all text-emerald-100 placeholder:text-emerald-200 text-center font-bold shadow-lg"
                    />
                  </div>
                  {/* 修改：Button type="submit" 加上 margin top */}
                  <button
                    type="submit"
                    className="w-full mt-6 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg shadow-emerald-900/40 active:scale-95 flex items-center justify-center gap-2"
                    style={{ marginBottom: 'calc(60px + env(safe-area-inset-bottom))' }}
                  >
                    Start Journey <ArrowRight size={18} />
                  </button>
                </form>



              </div>

              {showHelloKitty && (<div onClick={() => setShowHelloKitty(false)} className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 animate-fadeIn p-8 backdrop-blur-sm"><div className="bg-[#FFF0F5] p-6 rounded-3xl shadow-2xl text-center"><img src="https://shoplineimg.com/62b43a417c1950002317c6d8/689a89118af843000fdfa15a/750x.jpg" alt="Kitty" className="w-48 h-48 object-cover mx-auto rounded-2xl mb-4" /><p className="text-pink-400 font-bold">丹和你說聲 Surprise! 🎉</p></div></div>)}
            </div>
          </div>
        )}

        {/* 解鎖後的主畫面 */}
        {!isLocked && (
          <div className="bg-[#FDFBF7] dark:bg-stone-900 min-h-screen transition-colors duration-500">
            {/* 🔥 傳入 onLock 讓子元件可以呼叫鎖定 */}
            <WeatherHero
              isAdmin={isAdmin}
              versionText={appVersion}
              updateVersion={handleUpdateVersion}
              showSecret={showSecret}
              onLock={() => {
                setIsLocked(true);      // 鎖定
                setIsUnlocking(false);  // 🚪 重置開門動畫 (關鍵!)
                setInputPwd('');        // 清空密碼欄
                setIsAdmin(false);
                setIsMember(false);
              }}
            />

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
                        isAdmin={isAdmin}
                        updateTime={handleTimeUpdate}
                        updateContent={handleContentUpdate}
                        onAdd={() => handleAddLocation(day.day)}
                        onDelete={(locIdx) => handleDeleteLocation(day.day, locIdx)}
                        onMove={(locIdx, dir) => handleMoveLocation(day.day, locIdx, dir)}
                      />
                    ))}
                    <div className="text-center text-xs text-stone-400 mt-12 mb-8 font-serif italic">— Journey to Chiang Mai —</div>
                  </div>
                  <FloatingStatus itinerary={itinerary} />
                </div>
              )}

              {activeTab === 'packing' && (
                <PackingPage isKonamiActive={isKonamiActive} isAdmin={isAdmin} isMember={isMember} onSecretTrigger={handleSecretTrigger} />
              )}
              {/* 🔥🔥🔥 在這裡貼上新的 Guide 頁面判斷式 🔥🔥🔥 */}
              {activeTab === 'guide' && (
                <GuidePage />
              )}
              {activeTab === 'utils' && (
                <div className="">
                  {/* 🔥 手動切換深色模式的按鈕 - 這裡加上自己的 padding */}
                  <div className="px-6 pt-6">
                    <div className="flex items-center justify-between bg-white dark:bg-stone-800 p-4 rounded-2xl shadow-sm border border-stone-100 dark:border-stone-700 mb-6">
                      <div className="flex items-center gap-2 font-bold dark:text-white">
                        {darkMode ? <div className="p-2 bg-stone-700 rounded-full text-amber-400"><Sun size={18} /></div> : <div className="p-2 bg-stone-100 rounded-full text-stone-400"><CloudRain size={18} /></div>}
                        <span>{darkMode ? '深色模式 (On)' : '淺色模式 (Off)'}</span>
                      </div>
                      <button
                        onClick={() => setDarkMode(!darkMode)}
                        className={`w-12 h-6 rounded-full p-1 transition-colors ${darkMode ? 'bg-amber-500' : 'bg-stone-300'}`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${darkMode ? 'translate-x-6' : 'translate-x-0'}`} />
                      </button>
                    </div>
                  </div>

                  <UtilsPage isAdmin={isAdmin} isMember={isMember} systemInfo={systemInfo} updateSystemInfo={updateSystemInfo} />
                </div>
              )}
            </main>

            <BackToTop />



            {showShakeEgg && (<div onClick={() => setShowShakeEgg(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-8 backdrop-blur-sm animate-fadeIn"><div className="bg-[#FFF0F5] p-6 rounded-3xl text-center"><img src="https://i.pinimg.com/originals/24/63/40/24634090aa96299f569a8bb60c9dda14.gif" alt="Egg" className="w-full rounded-xl mb-4" /><p className="text-pink-500 font-bold">搖出驚喜! 旅途順利~</p></div></div>)}

            
              <nav className="fixed bottom-0 w-full max-w-md bg-white/90 dark:bg-stone-900/90 backdrop-blur-lg border-t border-stone-200 dark:border-stone-800 flex justify-around py-3 pb-4 z-40 transition-colors">
                {/* 行程 */}
                <button onClick={() => setActiveTab('itinerary')} className={`flex flex-col items-center gap-1.5 transition-colors ${activeTab === 'itinerary' ? 'text-stone-800 dark:text-stone-100' : 'text-stone-400 dark:text-stone-600'}`}>
                  <MapPin size={20} strokeWidth={activeTab === 'itinerary' ? 2.5 : 2} />
                  <span className="text-[10px] font-bold tracking-wide">行程</span>
                </button>

                {/* 準備 */}
                <button onClick={() => setActiveTab('packing')} className={`flex flex-col items-center gap-1.5 transition-colors ${activeTab === 'packing' ? 'text-stone-800 dark:text-stone-100' : 'text-stone-400 dark:text-stone-600'}`}>
                  <CheckCircle size={20} strokeWidth={activeTab === 'packing' ? 2.5 : 2} />
                  <span className="text-[10px] font-bold tracking-wide">準備</span>
                </button>

                {/* Guide (新增) */}
                <button onClick={() => setActiveTab('guide')} className={`flex flex-col items-center gap-1.5 transition-colors ${activeTab === 'guide' ? 'text-stone-800 dark:text-stone-100' : 'text-stone-400 dark:text-stone-600'}`}>
                  <Compass size={20} strokeWidth={activeTab === 'guide' ? 2.5 : 2} />
                  <span className="text-[10px] font-bold tracking-wide">指南</span>
                </button>

                {/* 工具 */}
                <button onClick={() => setActiveTab('utils')} className={`flex flex-col items-center gap-1.5 transition-colors ${activeTab === 'utils' ? 'text-stone-800 dark:text-stone-100' : 'text-stone-400 dark:text-stone-600'}`}>
                  <Wallet size={20} strokeWidth={activeTab === 'utils' ? 2.5 : 2} />
                  <span className="text-[10px] font-bold tracking-wide">工具</span>
                </button>
              </nav>
          </div>
        )}
      </div>
    </div>
  );
}