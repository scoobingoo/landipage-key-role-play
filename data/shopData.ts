import { Car, Sword, Shield, Package, Crown, Zap } from 'lucide-react';

export interface ShopItem {
  id: number;
  name: string;
  category: 'vehicles' | 'weapons' | 'items' | 'packs';
  price: number;
  image: string;
  description: string;
  isHot?: boolean;
}

export const shopData: ShopItem[] = [
  {
    id: 1,
    name: "Lamborghini Terzo Millennio",
    category: 'vehicles',
    price: 5000,
    image: "https://picsum.photos/600/400?random=101",
    description: "Siêu xe điện đến từ tương lai với tốc độ bàn thờ và khả năng bám đường cực tốt.",
    isHot: true
  },
  {
    id: 2,
    name: "Gói VIP Kim Cương (30 Ngày)",
    category: 'packs',
    price: 2000,
    image: "https://picsum.photos/600/400?random=102",
    description: "Hưởng mọi đặc quyền: Slot ưu tiên, lương x2, set trang phục VIP và tag Discord đặc biệt.",
    isHot: true
  },
  {
    id: 3,
    name: "AK-47 Gold Edition",
    category: 'weapons',
    price: 1500,
    image: "https://picsum.photos/600/400?random=103",
    description: "Phiên bản mạ vàng đặc biệt, tăng độ bền và sát thương ổn định trong mọi trận đấu súng.",
  },
  {
    id: 4,
    name: "Rolls-Royce Cullinan 2024",
    category: 'vehicles',
    price: 4500,
    image: "https://picsum.photos/600/400?random=104",
    description: "Biểu tượng của sự sang trọng. Phù hợp cho các chủ tịch và ông trùm Mafia.",
  },
  {
    id: 5,
    name: "Hộp Quà May Mắn",
    category: 'items',
    price: 200,
    image: "https://picsum.photos/600/400?random=105",
    description: "Mở ra cơ hội nhận được các vật phẩm hiếm, tiền in-game hoặc siêu xe vĩnh viễn.",
  },
  {
    id: 6,
    name: "Phòng Thủ Giáp Cấp 3",
    category: 'items',
    price: 150,
    image: "https://picsum.photos/600/400?random=106",
    description: "Tăng khả năng chống chịu sát thương từ súng trường lên đến 50%.",
  },
  {
    id: 7,
    name: "M4A1-S Hyper Beast",
    category: 'weapons',
    price: 1800,
    image: "https://picsum.photos/600/400?random=107",
    description: "Khẩu súng huyền thoại với độ giật cực thấp và tốc độ xả đạn đáng kinh ngạc.",
  },
  {
    id: 8,
    name: "Gói Khởi Đầu (Starter Pack)",
    category: 'packs',
    price: 300,
    image: "https://picsum.photos/600/400?random=108",
    description: "Bao gồm 1 chiếc xe máy, bộ sửa chữa và 100,000$ tiền mặt trong game.",
  }
];