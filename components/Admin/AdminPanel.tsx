import React, { useState, useEffect } from 'react';
import { Newspaper, ShoppingBag, LogOut, Plus, Trash2, Edit2, ShieldCheck, AlertTriangle } from 'lucide-react';
import Button from '../Button';
import { User } from '../../App';

interface AdminPanelProps {
  user: User | null;
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState<'news' | 'shop'>('news');
  const [news, setNews] = useState(() => JSON.parse(localStorage.getItem('news_data') || '[]'));
  const [shop, setShop] = useState(() => JSON.parse(localStorage.getItem('shop_data') || '[]'));

  // Kiểm tra quyền truy cập
  if (!user || user.role !== 'admin') {
    return (
      <div className="pt-32 pb-20 flex items-center justify-center px-4">
        <div className="bg-card w-full max-w-md p-10 rounded-2xl border border-white/5 text-center shadow-2xl">
          <div className="inline-flex p-4 rounded-full bg-red-500/10 text-red-500 mb-6">
            <AlertTriangle size={48} />
          </div>
          <h2 className="text-2xl font-black uppercase italic mb-2">Truy cập bị từ chối</h2>
          <p className="text-gray-500 text-sm mb-8">Bạn không có quyền quản trị để truy cập khu vực này. Vui lòng đăng nhập bằng tài khoản có thẩm quyền.</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-3 rounded-lg uppercase transition-all"
          >
            Quay lại trang chủ
          </button>
        </div>
      </div>
    );
  }

  const deleteNews = (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      const updated = news.filter((n: any) => n.id !== id);
      setNews(updated);
      localStorage.setItem('news_data', JSON.stringify(updated));
    }
  };

  const deleteShopItem = (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa vật phẩm này?')) {
      const updated = shop.filter((s: any) => s.id !== id);
      setShop(updated);
      localStorage.setItem('shop_data', JSON.stringify(updated));
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-dark">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="bg-card rounded-2xl border border-white/5 p-6 sticky top-28 shadow-xl">
              <div className="flex items-center gap-3 mb-8 px-2">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h2 className="text-sm font-black uppercase italic text-white leading-none">Admin Area</h2>
                  <p className="text-[10px] text-gray-600 font-bold uppercase mt-1">Authorized</p>
                </div>
              </div>
              
              <nav className="space-y-2">
                <button 
                  onClick={() => setActiveTab('news')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all ${activeTab === 'news' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                >
                  <Newspaper size={18} /> Quản lý Tin tức
                </button>
                <button 
                  onClick={() => setActiveTab('shop')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all ${activeTab === 'shop' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                >
                  <ShoppingBag size={18} /> Quản lý Webshop
                </button>
                <div className="pt-6 mt-6 border-t border-white/5">
                  <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg font-bold text-red-500 hover:bg-red-500/10 transition-all">
                    <LogOut size={18} /> Thoát Admin
                  </button>
                </div>
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-grow">
            <div className="bg-card rounded-2xl border border-white/5 p-8 shadow-xl">
              <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/5">
                <div>
                  <h1 className="text-2xl font-black uppercase italic text-white">
                    {activeTab === 'news' ? 'Tất cả tin tức' : 'Kho vật phẩm Webshop'}
                  </h1>
                  <p className="text-gray-500 text-sm italic">Quản lý nội dung hiển thị trên website</p>
                </div>
                <Button size="sm" icon={Plus}>Thêm mới</Button>
              </div>

              {/* Table List View */}
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                      <th className="pb-4 px-4">Hình ảnh</th>
                      <th className="pb-4 px-4">Thông tin</th>
                      <th className="pb-4 px-4">Danh mục</th>
                      {activeTab === 'shop' && <th className="pb-4 px-4">Giá</th>}
                      <th className="pb-4 px-4 text-right">Hành động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {activeTab === 'news' ? (
                      news.map((item: any) => (
                        <tr key={item.id} className="group hover:bg-white/[0.02] transition-colors">
                          <td className="py-4 px-4"><div className="w-16 h-12 rounded overflow-hidden bg-black/40"><img src={item.image} className="w-full h-full object-cover" /></div></td>
                          <td className="py-4 px-4 max-w-xs"><h4 className="font-bold text-white line-clamp-1">{item.title}</h4><p className="text-xs text-gray-500">{item.date}</p></td>
                          <td className="py-4 px-4"><span className="text-[10px] font-bold bg-white/5 text-gray-400 px-2 py-1 rounded uppercase">{item.category}</span></td>
                          <td className="py-4 px-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button className="p-2 text-gray-400 hover:text-primary transition-colors"><Edit2 size={16} /></button>
                              <button onClick={() => deleteNews(item.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      shop.map((item: any) => (
                        <tr key={item.id} className="group hover:bg-white/[0.02] transition-colors">
                          <td className="py-4 px-4"><div className="w-16 h-12 rounded overflow-hidden bg-black/40"><img src={item.image} className="w-full h-full object-cover" /></div></td>
                          <td className="py-4 px-4 max-w-xs"><h4 className="font-bold text-white line-clamp-1 italic uppercase tracking-tighter">{item.name}</h4>{item.isHot && <span className="text-[8px] bg-red-600 text-white px-1 font-black rounded ml-1">HOT</span>}</td>
                          <td className="py-4 px-4"><span className="text-[10px] font-bold bg-white/5 text-gray-400 px-2 py-1 rounded uppercase">{item.category}</span></td>
                          <td className="py-4 px-4"><span className="text-primary font-black">{item.price.toLocaleString()}</span></td>
                          <td className="py-4 px-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button className="p-2 text-gray-400 hover:text-primary transition-colors"><Edit2 size={16} /></button>
                              <button onClick={() => deleteShopItem(item.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;