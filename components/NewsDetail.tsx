import React, { useEffect } from "react";
import { ArrowLeft, Calendar, Tag, Share2 } from "lucide-react";
import { NewsItem } from "../data/newsData";
import Button from "./Button";

interface NewsDetailProps {
  item: NewsItem;
  onBack: () => void;
}

const NewsDetail: React.FC<NewsDetailProps> = ({ item, onBack }) => {
  const Icon = item.icon;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-dark animate-fade-in-up">
      {/* Navigation Bar for Detail Page */}
      <div className="container mx-auto px-4 mb-8">
        <button
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-primary transition-colors font-bold uppercase tracking-wide group"
        >
          <div className="bg-white/5 p-2 rounded-full mr-3 group-hover:bg-primary group-hover:text-white transition-all">
            <ArrowLeft size={20} />
          </div>
          Quay lại trang chủ
        </button>
      </div>

      <article className="container mx-auto px-4 max-w-4xl">
        {/* Header Image */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-10 h-[300px] md:h-[500px]">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent"></div>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="bg-primary text-white px-3 py-1 rounded text-xs font-bold uppercase tracking-wider shadow-lg">
                {item.category}
              </span>
              <div className="flex items-center text-gray-300 text-sm font-medium bg-black/50 px-3 py-1 rounded backdrop-blur-sm">
                <Calendar size={14} className="mr-2" />
                {item.date}
              </div>
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4 drop-shadow-lg uppercase italic">
              {item.title}
            </h1>
          </div>
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Article */}
          <div className="lg:col-span-8">
            <div className="bg-card border border-white/5 rounded-2xl p-8 md:p-10 shadow-lg relative overflow-hidden">
              {/* Decorative background element */}
              <div className="absolute top-0 right-0 p-6 opacity-5">
                <Icon size={120} />
              </div>

              <div
                className="prose prose-invert prose-lg max-w-none text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: item.content }}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-card border border-white/5 rounded-xl p-6">
              <h3 className="font-bold text-white uppercase tracking-wider mb-4 border-l-4 border-primary pl-3">
                Thông tin
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm text-gray-400 border-b border-white/5 pb-2">
                  <span>Tác giả:</span>
                  <span className="text-white font-medium">Admin Team</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-400 border-b border-white/5 pb-2">
                  <span>Chuyên mục:</span>
                  <span className="text-primary font-medium">
                    {item.category}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>Lượt xem:</span>
                  <span className="text-white font-medium">1,245</span>
                </div>
              </div>
            </div>

            <div className="bg-card border border-white/5 rounded-xl p-6">
              <h3 className="font-bold text-white uppercase tracking-wider mb-4 border-l-4 border-primary pl-3">
                Chia sẻ
              </h3>
              <div className="flex gap-2">
                <button className="flex-1 bg-[#1877F2] hover:bg-[#166fe5] text-white py-2 rounded font-bold text-sm transition-colors">
                  Facebook
                </button>
                <button className="flex-1 bg-[#1DA1F2] hover:bg-[#1a91da] text-white py-2 rounded font-bold text-sm transition-colors">
                  Twitter
                </button>
                <button className="p-2 bg-white/10 hover:bg-white/20 rounded text-white transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default NewsDetail;
