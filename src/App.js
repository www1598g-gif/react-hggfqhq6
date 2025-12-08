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
// 1. 圖片處理 (改為自動對應 dayX_Y.jpg)
// ============================================
const getLocationImage = (day, index) => {
  return process.env.PUBLIC_URL + `/images/day${day}_${index}.jpg`;
};

// ============================================
// 2. 初始行程資料 (V23 最終定案版)
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
        difficulty: '中 (部分階梯)',
      },
      {
        type: 'transport',
        time: '14:30',
        name: '市區採買 (Rimping)',
        note: '趁還車前買水、零食。',
        desc: '利用還車前的空檔，在市區超市買水、零食。',
        nav: 'Rimping Supermarket Nim City',
        difficulty: '低',
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
        time: '10:50',
        name: 'Jing Jai Market (二訪)',
        note: '補貨與早午餐。',
        desc: '補買昨天看上的東西，順便在舒適的環境吃早午餐。',
        nav: 'Jing Jai Market Chiang Mai',
        difficulty: '中',
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
        type: 'sight',
        time: '13:30',
        name: '超長午睡時間',
        note: '回民宿洗澡補眠。',
        desc: '回到民宿洗去泥土味，徹底補眠，為晚上米其林大餐做準備。',
        nav: 'Haiya',
        difficulty: '零',
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
        difficulty: '低',
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
        difficulty: '低',
      },
      {
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
        difficulty: '低',
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
        difficulty: '低',
      },
      {
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
      airbnbUrl: atob('aHR0cHM6Ly93d3cuYWlyYm5iLmNvbS9sLzRtNHNkN0hk'),
      guideUrl: atob(
        'aHR0cHM6Ly93d3cuYWlyYm5iLmNvbS50dy9zL2d1aWRlYm9va3M/cmVmaW5lbWVudF9wYXRocyU1QiU1RD0lMkZndWlkZWJvb2tzJTJGNjQzNjY3MCZzPTY3JnVuaXF1ZV9zaGFyZV9pZD02MDU5M2FjZi05NTJiLTQ4ZTItYTk4Ni00ZjZiZjY2MDdmZmM='
      ),
    },
  ],
  emergency: '泰國觀光警察: 1155 \n救護車: 1669 \n駐泰辦事處: +66-81-666-4006',
  notes:
    '🔥 2月為燒山季節，AQI 空氣品質較差，請隨身攜帶口罩。\n🚗 自駕注意：右駕左行，山路多彎。',
  driveUrl:
    'https://drive.google.com/drive/folders/1J7sQLshn9A1y8I9d6007SavZ5eFWs4-U?usp=sharing',
};

// ============================================
// 3. UIUX part thai
// ============================================

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
    if (code <= 1) return <Sun size={size} className="text-amber-500" strokeWidth={2.5} />;
    if (code <= 3) return <Cloud size={size} className="text-stone-400" strokeWidth={2.5} />;
    if (code >= 50) return <CloudRain size={size} className="text-blue-400" strokeWidth={2.5} />;
    return <CloudSun size={size} className="text-amber-400" strokeWidth={2.5} />;
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
    // 修正: 移除 shadow-xl
    <div className="relative bg-[#FDFBF7] pt-6 pb-8 px-6 border-b border-stone-200 rounded-b-[2.5rem] z-10 overflow-hidden">
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
                  <div className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${getAqiColor(aqi)}`}>
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
              <div className="flex overflow-x-auto gap-4 pb-2 w-full no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {nextHours.map((h, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-1 min-w-[3.5rem] flex-shrink-0">
                    <span className="text-[10px] text-stone-400 font-bold whitespace-nowrap">{h.time}</span>
                    <div className="py-1">{getWeatherIcon(h.code, 20)}</div>
                    <span className="text-sm font-bold text-stone-700">{h.temp}°</span>
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
            <div className="font-bold text-sm truncate text-white">{nextStop.name}</div>
            <div className="text-xs text-stone-400 truncate">{nextStop.time}</div>
          </div>
        </div>
        <button
          onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(nextStop.nav)}`, '_blank')}
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
      <button onClick={() => setIsOpen(false)} className="absolute top-3 right-3 text-amber-300 hover:text-amber-500 transition-colors">
        <ChevronUp size={18} />
      </button>
      <h3 className="flex items-center gap-2 font-serif font-bold text-amber-900 text-base mb-3">
        <Shirt size={18} className="text-amber-500" /> 2月穿搭指南
      </h3>
      <div className="space-y-3 text-xs text-stone-600 leading-relaxed">
        <div className="flex items-start gap-3">
          <div className="bg-amber-100 p-1.5 rounded-full text-amber-600"><Sun size={12} /></div>
          <div><strong className="text-stone-800">白天 (30-35°C)</strong><br />棉麻材質、短袖、透氣長裙。太陽很毒，務必戴墨鏡帽。</div>
        </div>
        <div className="flex items-start gap-3">
          <div className="bg-blue-100 p-1.5 rounded-full text-blue-600"><Wind size={12} /></div>
          <div><strong className="text-stone-800">早晚/百貨 (18-20°C)</strong><br />溫差大，隨身帶一件薄襯衫或針織外套。</div>
        </div>
        <div className="bg-white p-3 rounded-xl border border-amber-100 flex items-start gap-3">
          <div className="bg-red-100 p-1.5 rounded-full text-red-600"><Mountain size={12} /></div>
          <div><strong className="text-stone-800 block mb-1">茵他儂山特別注意</strong><span className="block text-stone-500 mb-0.5">• 瀑布區: <span className="text-amber-600 font-bold">熱 (短袖)</span></span><span className="block text-stone-500">• 雙塔/山頂: <span className="text-blue-600 font-bold">極冷 (羽絨/防風)</span></span></div>
        </div>
      </div>
      
      {/* 第二部分：爛腳圖例 (新增) */}
      <div className="pt-4 border-t border-amber-200/50 mt-4">
        <h3 className="flex items-center gap-2 font-serif font-bold text-amber-900 text-base mb-3">
          <span className="text-lg">🦵</span> 爛腳指數說明
        </h3>
        <div className="grid grid-cols-1 gap-2 text-xs">
          <div className="flex items-center gap-3 bg-white p-2 rounded-lg border border-emerald-100">
             <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded font-bold whitespace-nowrap">低 / 零</span>
             <span className="text-stone-600">全程坐車、平地，有冷氣或座位。</span>
          </div>
          <div className="flex items-center gap-3 bg-white p-2 rounded-lg border border-amber-100">
             <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-bold whitespace-nowrap">中</span>
             <span className="text-stone-600">一般步行、有些微階梯或泥土路。</span>
          </div>
          <div className="flex items-center gap-3 bg-white p-2 rounded-lg border border-rose-100">
             <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded font-bold whitespace-nowrap">高 / 極高</span>
             <span className="text-stone-600">陡坡、長途步行、人潮擁擠 (如夜市)。</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// 修正: 爛腳標籤移到時間旁邊 (flex-row layout)
const LocationCard = ({ item, day, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

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

  const handleNav = (e) => {
    e.stopPropagation();
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.nav)}`, '_blank');
  };

  const handleAskAI = (e) => {
    e.stopPropagation();
    const prompt = `我正在清邁旅遊，地點是「${item.name}」。請告訴我這裡有什麼必吃美食、必買紀念品，或是需要注意的參觀禁忌？請用繁體中文回答。`;
    window.open(`https://www.perplexity.ai/search?q=${encodeURIComponent(prompt)}`, '_blank');
  };

  return (
    <div
      onClick={() => setIsExpanded(!isExpanded)}
      className={`bg-white rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-stone-100 mb-4 overflow-hidden transition-all duration-300 cursor-pointer ${isExpanded ? 'ring-2 ring-amber-100 shadow-md' : ''}`}
    >
      <div className="p-4 flex items-start gap-4">
        <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-stone-50 flex items-center justify-center border border-stone-100">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
             <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wide">
               {item.time}
             </span>
             {item.difficulty && (
               <span className={`text-[9px] px-1.5 py-0.5 rounded-md border font-bold flex items-center gap-1 ${getDifficultyColor(item.difficulty)}`}>
                 {item.difficulty}
               </span>
             )}
             {item.highlight && (
                <span className="text-[9px] px-1.5 py-0.5 rounded-md border border-amber-100 bg-amber-50 text-amber-700 font-bold">
                  ★ {item.highlight}
                </span>
             )}
          </div>
          <h3 className="font-bold text-stone-800 text-lg leading-tight mb-1 pr-2">
            {item.name}
          </h3>
          <p className="text-xs text-stone-500 font-medium leading-relaxed whitespace-normal opacity-90">
             {item.note}
          </p>
        </div>
        <div className="mt-8 text-stone-300 flex-shrink-0">
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
              src={getLocationImage(day, index)} 
              alt={item.name} 
              onLoad={() => setIsImageLoaded(true)} 
              className={`w-full h-full object-cover transition-opacity duration-500 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`} 
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80'; }}
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
              <button onClick={handleNav} className="flex items-center justify-center gap-2 py-3 bg-stone-800 text-amber-50 rounded-xl active:scale-95 transition-all text-sm font-bold shadow-lg shadow-stone-200">
                <Navigation size={16} /> 導航
              </button>
              <button onClick={handleAskAI} className="flex items-center justify-center gap-2 py-3 bg-white border border-stone-200 text-stone-600 rounded-xl active:scale-95 transition-all text-sm font-bold hover:bg-stone-50 shadow-sm">
                <Sparkles size={16} className="text-teal-500" /> 問問 AI
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 修正: 滑動速度由 300ms 提升到 100ms
const DayCard = ({ dayData, isOpen, toggle }) => {
  const cardRef = useRef(null);

  const smoothScrollTo = (element, duration = 100) => {
    const targetPosition = element.offsetTop - 80;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    const ease = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };
    requestAnimationFrame(animation);
  };

  useEffect(() => {
    if (isOpen && cardRef.current) {
      setTimeout(() => {
        smoothScrollTo(cardRef.current, 100);
      }, 50);
    }
  }, [isOpen]);

  return (
    <div ref={cardRef} className="mb-3 px-2">
      <div onClick={toggle} className={`relative flex items-center justify-between p-5 rounded-2xl cursor-pointer transition-all duration-300 ${isOpen ? 'bg-stone-800 text-stone-50 shadow-xl scale-[1.02]' : 'bg-white text-stone-800 shadow-sm border border-stone-100 hover:shadow-md'}`}>
        <div className="flex items-center gap-4">
          <div className={`flex flex-col items-center justify-center w-12 h-12 rounded-xl border ${isOpen ? 'bg-stone-700 border-stone-600' : 'bg-stone-50 border-stone-200'}`}>
            <span className={`text-[10px] font-bold uppercase ${isOpen ? 'text-stone-400' : 'text-stone-400'}`}>Day</span>
            <span className={`text-xl font-serif font-bold ${isOpen ? 'text-amber-400' : 'text-stone-800'}`}>{dayData.day}</span>
          </div>
          <div>
            <div className={`text-xs font-bold mb-0.5 ${isOpen ? 'text-stone-400' : 'text-stone-500'}`}>{dayData.displayDate}</div>
            <div className="font-bold text-lg leading-tight">{dayData.title}</div>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center justify-end gap-1 mb-1">
            {dayData.weather.realData && <Signal size={10} className="text-green-500 animate-pulse" />}
            <span className={`text-sm font-medium ${isOpen ? 'text-stone-300' : 'text-stone-600'}`}>{dayData.weather.temp}</span>
          </div>
          {isOpen ? <ChevronUp size={20} className="text-stone-500 ml-auto" /> : <ChevronDown size={20} className="text-stone-300 ml-auto" />}
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
            />
          ))}
        </div>
      )}
    </div>
  );
};

const FlightCard = ({ type, date, flightNo, time, airline, from, to, fromCode, toCode, fromTerminal, toTerminal }) => {
  const searchUrl = `https://www.google.com/search?q=${flightNo}+flight+status`;
  return (
    <div className="bg-white rounded-2xl p-4 border border-stone-100 shadow-sm mb-3 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 bg-stone-50 rounded-bl-full -mr-4 -mt-4 z-0"></div>
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-4">
          <span className={`px-2 py-1 rounded text-[10px] font-bold tracking-wider ${type === '去程' ? 'bg-amber-100 text-amber-800' : 'bg-stone-100 text-stone-600'}`}>{type}</span>
          <span className="text-xs font-bold text-stone-400">{date}</span>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="text-center min-w-[3rem]">
            <div className="text-2xl font-bold text-stone-800 leading-none mb-1">{from}</div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-stone-400 font-bold tracking-widest">{fromCode}</span>
              {fromTerminal && <span className="mt-1 text-[10px] font-bold text-white bg-amber-500 px-1.5 py-0.5 rounded shadow-sm">{fromTerminal}</span>}
            </div>
          </div>
          <div className="flex-1 px-3 flex flex-col items-center">
            <div className="text-xs font-bold text-stone-500 mb-2">{flightNo}</div>
            <div className="w-full h-[2px] bg-stone-200 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-1"><Plane size={14} className="text-stone-300 rotate-90" /></div>
            </div>
            <div className="text-xs font-bold text-stone-400 mt-2 whitespace-nowrap">{time}</div>
          </div>
          <div className="text-center min-w-[3rem]">
            <div className="text-2xl font-bold text-stone-800 leading-none mb-1">{to}</div>
            <div className="flex flex-col items-center">
              <span className="text-[10px] text-stone-400 font-bold tracking-widest">{toCode}</span>
              {toTerminal && <span className="mt-1 text-[10px] font-bold text-white bg-stone-400 px-1.5 py-0.5 rounded shadow-sm">{toTerminal}</span>}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-stone-100">
          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div><span className="text-xs text-stone-500 font-medium">{airline}</span></div>
          <a href={searchUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-xs font-bold text-blue-500 hover:text-blue-700 bg-blue-50 px-3 py-1.5 rounded-full transition-colors">即時動態 <ArrowRight size={12} /></a>
        </div>
      </div>
    </div>
  );
};

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
    if (val) setThb((parseFloat(val) * rate).toFixed(2)); else setThb('');
  };

  const handleThbChange = (e) => {
    const val = e.target.value;
    setThb(val);
    if (val) setTwd((parseFloat(val) / rate).toFixed(2)); else setTwd('');
  };

  const exchanges = [
    { id: 1, name: '清邁機場換匯 (Arrival)', map: 'Chiang Mai International Airport Currency Exchange', note: '🚨 抵達應急用，匯率較差，建議只換車資。', tag: '抵達第一站', tagColor: 'bg-red-100 text-red-700' },
    { id: 2, name: 'Super Rich (清邁店)', map: 'Super Rich Chiang Mai', note: '🔥 匯率通常是全清邁最好，近古城。', tag: '匯率最優', tagColor: 'bg-amber-100 text-amber-700' },
    { id: 3, name: 'Mr. Pierre (巫宗雄)', map: 'Mr. Pierre Money Exchange', note: '👍 古城內匯率王，老闆會說中文。', tag: '古城推薦', tagColor: 'bg-green-100 text-green-700' },
    { id: 4, name: 'G Exchange Co.,Ltd.', map: 'G Exchange Co.,Ltd. Chiang Mai', note: 'Loi Kroh 路熱門店，評價極高 (4.7星)。', tag: '夜市區', tagColor: 'bg-blue-100 text-blue-700' },
    { id: 5, name: 'S.K. Money Exchange', map: 'S.K. Money Exchange', note: '泰國常見連鎖，塔佩門附近方便。' },
  ];

  return (
    <section className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 mb-6">
      <h3 className="flex items-center gap-2 font-bold text-stone-800 mb-4 border-b border-stone-100 pb-3"><Wallet size={18} className="text-green-600" /> 匯率計算機</h3>
      <div className="bg-green-50 p-4 rounded-xl mb-4 border border-green-100">
        <div className="text-xs text-green-600 font-bold mb-2 flex justify-between"><span>即時現金匯率</span><span>1 TWD ≈ {rate} THB</span></div>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex-1 relative"><span className="absolute left-3 top-2.5 text-stone-400 text-xs font-bold">TWD</span><input type="number" value={twd} onChange={handleTwdChange} placeholder="台幣" className="w-full pl-12 pr-3 py-2 rounded-lg border border-green-200 focus:outline-none focus:border-green-500 font-bold text-stone-700" /></div>
          <div className="text-stone-400">=</div>
          <div className="flex-1 relative"><span className="absolute left-3 top-2.5 text-stone-400 text-xs font-bold">THB</span><input type="number" value={thb} onChange={handleThbChange} placeholder="泰銖" className="w-full pl-12 pr-3 py-2 rounded-lg border border-green-200 focus:outline-none focus:border-green-500 font-bold text-stone-700 bg-white" /></div>
        </div>
        <div className="text-[10px] text-green-400 text-right">更新: {lastUpdate || '載入中...'}</div>
      </div>
      <h4 className="text-xs font-bold text-stone-400 mb-3 uppercase tracking-widest">推薦換匯所</h4>
      <div className="space-y-2">
        {exchanges.map((ex, i) => (
          <div key={i} className={`flex justify-between items-center p-3 rounded-xl border transition-all ${i < 3 ? 'bg-white border-stone-200 shadow-sm' : 'bg-stone-50 border-stone-100 opacity-80'}`}>
            <div>
              <div className="flex items-center gap-2 mb-0.5"><div className="font-bold text-stone-700 text-sm">{i + 1}. {ex.name}</div>{ex.tag && <span className={`text-[9px] px-1.5 py-0.5 rounded font-bold ${ex.tagColor}`}>{ex.tag}</span>}</div>
              <div className="text-[10px] text-stone-500">{ex.note}</div>
            </div>
            <button onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ex.map)}`, '_blank')} className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-stone-500 shadow-sm border border-stone-200 active:scale-95 hover:text-amber-600 hover:border-amber-200"><Navigation size={14} /></button>
          </div>
        ))}
      </div>
    </section>
  );
};

// Main App (V8 - 最終回退修復版：移除陰影、降低選單、修復白底)
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

  // 使用俯視的熱帶叢林
  const JUNGLE_BG = process.env.PUBLIC_URL + '/images/jungle1.jpeg';

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
      setIsAdmin(true);
      setIsUnlocking(true);
      setTimeout(() => setIsLocked(false), 800);
    } else if (inputPwd === '8888') {
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

  // 👇👇👇 新增這段：背景預載圖片邏輯 (解決點擊卡片轉圈圈問題) 👇👇👇
  useEffect(() => {
    if (!isLocked) {
      const preloadImages = () => {
        // 1. 先預載背景圖
        const bgImg = new Image();
        bgImg.src = process.env.PUBLIC_URL + '/images/jungle1.jpeg';

        // 2. 預載所有行程圖片
        itinerary.forEach((day) => {
          day.locations.forEach((_, idx) => {
            const img = new Image();
            img.src = process.env.PUBLIC_URL + `/images/day${day.day}_${idx + 1}.jpg`;
          });
        });
      };

      // 延遲 1 秒再開始載，讓主介面動畫先跑完
      const timer = setTimeout(() => {
        preloadImages();
        console.log('🖼️ 背景預載圖片啟動...');
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isLocked, itinerary]);
  // 👆👆👆 新增結束 👆👆👆

  return (
    // 修正1: 拿掉了 shadow-2xl (解決頂部陰影)
    // 修正2: 加上了 bg-stone-900 (解決輸入密碼時透出白底，現在會透出黑底，看不出來)
    <div className={`min-h-screen font-sans text-stone-800 max-w-md mx-auto relative overflow-hidden overscroll-behavior-none select-none ${isLocked ? 'bg-stone-900' : 'bg-[#FDFBF7]'}`}>
      
      {/* 橫向模式遮罩 */}
      <div className="fixed inset-0 z-[9999] bg-stone-900 text-white flex-col items-center justify-center hidden landscape:flex">
        <Phone size={48} className="animate-pulse mb-4" />
        <p className="text-lg font-bold tracking-widest">請將手機轉為直向</p>
        <p className="text-xs text-stone-500 mt-2">Please rotate your phone</p>
      </div>

      {/* 鎖定畫面 - 回歸你最喜歡的佈局 */}
      {isLocked && (
        <div className="fixed inset-0 z-[100] flex justify-center bg-stone-900 h-screen w-full">
          
          {/* 內層容器 */}
          <div className="relative w-full max-w-md h-full overflow-hidden flex flex-col items-center">
            
            {/* 左半邊葉子門 - 回歸 200% 120% 完美拼接 (保留你改的 120%) */}
            <div
              className={`absolute top-0 left-0 w-1/2 h-full transition-transform duration-1000 ease-in-out ${
                isUnlocking ? '-translate-x-full' : 'translate-x-0'
              }`}
              style={{
                backgroundImage: `url(${JUNGLE_BG})`,
                backgroundSize: '200% 120%',
                backgroundPosition: 'left center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <div className="absolute inset-0 bg-black/20"></div>
            </div>

            {/* 右半邊葉子門 */}
            <div
              className={`absolute top-0 right-0 w-1/2 h-full transition-transform duration-1000 ease-in-out ${
                isUnlocking ? 'translate-x-full' : 'translate-x-0'
              }`}
              style={{
                backgroundImage: `url(${JUNGLE_BG})`,
                backgroundSize: '200% 120%',
                backgroundPosition: 'right center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <div className="absolute inset-0 bg-black/20"></div>
            </div>

            {/* 中央內容區 - 恢復原本的高度結構 */}
            <div
              className={`relative z-10 flex flex-col items-center w-full px-8 h-full pt-40 transition-opacity duration-500 ${
                isUnlocking ? 'opacity-0' : 'opacity-100'
              }`}
            >
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

              {/* mt-auto: 確保輸入框沉在下面 */}
              <div className="w-full relative mb-6 mt-auto">
                <KeyRound
                  size={18}
                  className="absolute left-4 top-4 text-emerald-100"
                />
                <input
                  type="password"
                  value={inputPwd}
                  onChange={(e) => setInputPwd(e.target.value)}
                  placeholder="Passcode"
                  className="w-full bg-white/20 border border-white/30 rounded-2xl pl-12 pr-12 py-3.5 text-lg tracking-[0.2em] outline-none focus:bg-white/40 focus:ring-2 focus:ring-emerald-400 transition-all text-emerald-100 placeholder:text-emerald-200 text-center font-bold shadow-lg"
                />
              </div>

              <button
                onClick={handleUnlock}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-2xl transition-all shadow-lg shadow-emerald-900/40 active:scale-95 flex items-center justify-center gap-2 mb-10" 
              >
                Start Journey <ArrowRight size={18} />
              </button>

              <div className="absolute bottom-3 text-white/60 text-[10px] tracking-widest uppercase font-bold drop-shadow-sm">
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
        </div>
      )}

      {/* 主程式內容 (背景色 bg-[#FDFBF7] 只加在這裡面，避免影響鎖定畫面) */}
      {!isLocked && (
        <div className="bg-[#FDFBF7] min-h-screen">
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
        </div>
      )}

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
      {/* 修正3: py-3 pb-4 (原本是 pb-8，這裡改回 pb-4 降低高度) */}
      {!isLocked && (
        <nav className="fixed bottom-0 w-full max-w-md bg-white/90 backdrop-blur-lg border-t border-stone-200 flex justify-around py-3 pb-4 z-40">
          <button
            onClick={() => setActiveTab('itinerary')}
            className={`flex flex-col items-center gap-1.5 transition-colors ${
              activeTab === 'itinerary' ? 'text-stone-800' : 'text-stone-400'
            }`}
          >
            <MapPin size={22} strokeWidth={activeTab === 'itinerary' ? 2.5 : 2} />
            <span className="text-[10px] font-bold tracking-wide">行程</span>
          </button>
          <button
            onClick={() => setActiveTab('packing')}
            className={`flex flex-col items-center gap-1.5 transition-colors ${
              activeTab === 'packing' ? 'text-stone-800' : 'text-stone-400'
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
            className={`flex flex-col items-center gap-1.5 transition-colors ${
              activeTab === 'utils' ? 'text-stone-800' : 'text-stone-400'
            }`}
          >
            <Wallet size={22} strokeWidth={activeTab === 'utils' ? 2.5 : 2} />
            <span className="text-[10px] font-bold tracking-wide">工具</span>
          </button>
        </nav>
      )}
    </div>
  );
}