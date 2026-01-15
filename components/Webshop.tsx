import React, { useState, useMemo, useEffect } from 'react';
import { Search, Filter, ShoppingCart, Tag, Star, CreditCard } from 'lucide-react';
import { ShopItem } from '../data/shopData';
import Button from './Button';

const Webshop: React.FC = () => {
  const [shopItems, setShopItems] = useState<ShopItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [purchasingId, setPurchasingId] = useState<number | null>(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('shop_data') || '[]');
    setShopItems(data);
  }, []);

  const categories = [
    { id: 'all', name: 'Tất cả', icon: Tag },
    { id: 'vehicles', name: 'Phương tiện', icon: Star },
    { id: 'weapons', name: 'Vũ khí', icon: Star },
    { id: 'packs', name: 'Gói VIP', icon: Star },
    { id: 'items', name: 'Vật phẩm', icon: Star },
  ];

  const filteredItems = useMemo(() => {
    return shopItems.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, shopItems]);

  const handleBuy = (item: ShopItem) => {
    setPurchasingId(item.id);
    setTimeout(() => {
      alert(`Đã thêm "${item.name}" vào yêu cầu thanh toán của bạn! Vui lòng kiểm tra Discord để hoàn tất.`);
      setPurchasingId(null);
    }, 1000);
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-dark animate-fade-in">
      <div className="container mx-auto px-4">
        {/* Shop Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white">
              Web <span className="text-primary">Shop</span>
            </h1>
            <p className="text-gray-400 mt-2">Trang bị những vật phẩm tốt nhất cho nhân vật của bạn</p>
          </div>
          
          <div className="flex items-center gap-4 bg-card p-3 rounded-xl border border-white/5 shadow-inner">
            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase font-bold">Số dư tài khoản</p>
              <p className="text-xl font-black text-primary">0 <span className="text-sm font-normal text-gray-400">Credits</span></p>
            </div>
            <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">
              <CreditCard size={20} />
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col lg:flex-row gap-6 mb-10">
          <div className="flex flex-wrap gap-2 flex-grow">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-2.5 rounded-lg font-bold text-sm uppercase tracking-wider transition-all duration-300 border ${
                  activeCategory === cat.id 
                    ? 'bg-primary border-primary text-white shadow-[0_0_15px_rgba(255,87,34,0.3)]' 
                    : 'bg-card border-white/5 text-gray-400 hover:border-primary/50 hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          
          <div className="relative w-full lg:w-80">
            <input 
              type="text"
              placeholder="Tìm tên vật phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card border border-white/5 rounded-lg py-3 pl-12 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
          </div>
        </div>

        {/* Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div 
                key={item.id}
                className="group bg-card border border-white/5 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 flex flex-col"
              >
                <div className="relative h-48 overflow-hidden bg-black/40">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  {item.isHot && (
                    <div className="absolute top-3 right-3 bg-red-600 text-white text-[10px] font-black px-2 py-1 rounded-sm uppercase tracking-tighter animate-pulse shadow-lg">
                      HOT ITEM
                    </div>
                  )}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    <span className="text-primary font-black text-sm">{item.price.toLocaleString()}</span>
                    <span className="text-gray-300 text-[10px] font-bold uppercase">Credits</span>
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-1 uppercase italic">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed italic">
                    "{item.description}"
                  </p>
                  
                  <div className="mt-auto">
                    <Button 
                      className="w-full py-3" 
                      onClick={() => handleBuy(item)}
                      size="sm"
                      variant={purchasingId === item.id ? 'outline' : 'primary'}
                    >
                      {purchasingId === item.id ? 'Đang xử lý...' : 'Mua Ngay'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-card rounded-2xl border border-dashed border-white/10">
            <Search size={48} className="mx-auto text-gray-700 mb-4" />
            <h3 className="text-xl font-bold text-gray-500">Không tìm thấy vật phẩm nào</h3>
            <p className="text-gray-600 mt-2">Hãy thử thay đổi từ khóa hoặc bộ lọc của bạn.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Webshop;