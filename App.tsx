import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialBar from './components/SocialBar';
import NewsGrid from './components/NewsGrid';
import Footer from './components/Footer';
import NewsDetail from './components/NewsDetail';
import Webshop from './components/Webshop';
import Rules from './components/Rules';
import AdminPanel from './components/Admin/AdminPanel';
import AuthModal from './components/Auth/AuthModal';
import { newsData as initialNewsData } from './data/newsData';
import { shopData as initialShopData } from './data/shopData';

export type UserRole = 'admin' | 'user';

export interface User {
  username: string;
  role: UserRole;
  avatar?: string;
}

type View = 'home' | 'news-detail' | 'shop' | 'admin' | 'rules';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedNewsId, setSelectedNewsId] = useState<number | null>(null);
  
  // activeRuleTab vẫn giữ để tương thích ngược nếu component Rules cần,
  // nhưng logic chính sẽ dựa vào hash URL từ Navbar mới.
  const [activeRuleTab, setActiveRuleTab] = useState<string>('general');
  
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('current_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    if (!localStorage.getItem('news_data')) {
      localStorage.setItem('news_data', JSON.stringify(initialNewsData));
    }
    if (!localStorage.getItem('shop_data')) {
      localStorage.setItem('shop_data', JSON.stringify(initialShopData));
    }
  }, []);

  const handleNewsClick = (id: number) => {
    setSelectedNewsId(id);
    setCurrentView('news-detail');
  };

  const handleNavigate = (view: View, extra?: string) => {
    // Bảo vệ route Admin
    if (view === 'admin' && user?.role !== 'admin') {
      setIsAuthModalOpen(true);
      return;
    }
    
    // Xử lý tab luật nếu có (dành cho footer hoặc các link cũ)
    if (view === 'rules' && extra) {
      setActiveRuleTab(extra);
    }

    setCurrentView(view);
    setSelectedNewsId(null);
    
    // Chỉ cuộn lên đầu trang nếu KHÔNG PHẢI là chuyển đến một mục luật cụ thể (có hash)
    if (view !== 'rules' || !window.location.hash) {
      window.scrollTo(0, 0);
    }
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('current_user', JSON.stringify(userData));
    setIsAuthModalOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('current_user');
    setCurrentView('home');
  };

  const newsData = JSON.parse(localStorage.getItem('news_data') || '[]');
  const selectedNewsItem = selectedNewsId !== null 
    ? newsData.find((item: any) => item.id === selectedNewsId) 
    : null;

  const renderContent = () => {
    switch (currentView) {
      case 'news-detail':
        return selectedNewsItem ? (
          <NewsDetail 
            item={selectedNewsItem} 
            onBack={() => handleNavigate('home')} 
          />
        ) : null;
      case 'shop':
        return <Webshop />;
      case 'rules':
        return <Rules initialSection={activeRuleTab} />;
      case 'admin':
        return <AdminPanel user={user} onLogout={handleLogout} />;
      case 'home':
      default:
        return (
          <>
            <Hero />
            <SocialBar />
            <NewsGrid onNewsClick={handleNewsClick} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-dark text-white overflow-x-hidden font-sans">
      <Navbar 
        onNavigateHome={() => handleNavigate('home')} 
        onNavigateShop={() => handleNavigate('shop')}
        onNavigateAdmin={() => handleNavigate('admin')}
        // Navbar mới không truyền tham số tab, chỉ gọi hàm để chuyển View
        onNavigateRules={() => handleNavigate('rules')}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        user={user}
        onLogout={handleLogout}
      />
      
      <main className="flex-grow">
        {renderContent()}
      </main>
      
      <Footer 
        onNavigateRules={() => handleNavigate('rules')} 
        onNavigateShop={() => handleNavigate('shop')} 
        onNavigateHome={() => handleNavigate('home')} 
      />

      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        onLogin={handleLogin}
      />
    </div>
  );
};

export default App;