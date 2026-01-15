import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { NewsItem } from '../data/newsData';

interface NewsCardProps extends NewsItem {
  onClick: () => void;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, category, date, description, icon: Icon, image, onClick }) => (
  <div 
    onClick={onClick}
    className="group bg-card rounded-xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,87,34,0.15)] flex flex-col h-full hover:-translate-y-2 cursor-pointer"
  >
    <div className="relative h-48 overflow-hidden">
      <img src={image} alt={title} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wider shadow-lg">
        {category}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-80"></div>
    </div>
    
    <div className="p-6 flex flex-col flex-grow relative">
      <div className="text-gray-500 text-xs font-mono mb-2">{date}</div>
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
        {title}
      </h3>
      <p className="text-gray-400 text-sm mb-6 flex-grow line-clamp-3">
        {description}
      </p>
      
      <button className="flex items-center text-primary text-sm font-bold uppercase tracking-wide group/btn w-max">
        Xem chi tiết 
        <ArrowRight size={16} className="ml-2 transform group-hover/btn:translate-x-1 transition-transform" />
      </button>
    </div>
  </div>
);

interface NewsGridProps {
  onNewsClick?: (id: number) => void;
}

const NewsGrid: React.FC<NewsGridProps> = ({ onNewsClick }) => {
  const [news, setNews] = useState<NewsItem[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('news_data') || '[]');
    setNews(data);
  }, []);

  return (
    <section id="news" className="py-20 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-4">
            Bảng Tin <span className="text-primary">Thành Phố</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-400">Cập nhật những thông tin mới nhất từ ban quản trị</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <NewsCard 
              key={item.id} 
              {...item} 
              onClick={() => onNewsClick && onNewsClick(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsGrid;