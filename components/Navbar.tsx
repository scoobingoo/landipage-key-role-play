import React, { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ShoppingCart,
  Home,
  Newspaper,
  Phone,
  Settings,
  LogOut,
  User,
  ChevronDown,
  Volume2,
  VolumeX,
  Volume1,
  BookOpen,
  FileText,
} from "lucide-react";
import { User as UserType } from "../App";

interface NavbarProps {
  onNavigateHome: () => void;
  onNavigateShop: () => void;
  onNavigateAdmin: () => void;
  // QUAN TRỌNG: Hàm này nhận vào string (tên tab)
  onNavigateRules: (tab?: string) => void; 
  onOpenAuth: () => void;
  user: UserType | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  onNavigateHome,
  onNavigateShop,
  onNavigateAdmin,
  onNavigateRules,
  onOpenAuth,
  user,
  onLogout,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [rulesMenuOpen, setRulesMenuOpen] = useState(false);

  // --- LOGIC NHẠC (Giữ nguyên) ---
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.volume = volume;
        audioRef.current.play().catch((e) => console.log("Autoplay blocked", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) audioRef.current.volume = newVolume;
  };

  // --- DATA LUẬT (ID PHẢI KHỚP VỚI FILE Rules.tsx) ---
  const ruleLinks = [
    { name: "Quy định chung", id: "general" },
    { name: "Luật In-game (IC/OOC)", id: "roleplay" },
    { name: "Quy tắc Discord", id: "discord" },
    { name: "Luật Băng Đảng", id: "illegal" },
    { name: "Chính sách Refund", id: "refund" },
  ];

  // --- XỬ LÝ CLICK LINK THƯỜNG ---
  const handleLinkClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setRulesMenuOpen(false);

    if (href === "shop") onNavigateShop();
    else if (href === "home") onNavigateHome();
    else if (href === "admin") onNavigateAdmin();
    else if (href.startsWith("#")) {
      // Xử lý scroll cho tin tức / liên hệ
      onNavigateHome();
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  // --- XỬ LÝ CLICK LUẬT (QUAN TRỌNG NHẤT) ---
  const handleRuleClick = (tabId: string, e: React.MouseEvent) => {
    e.preventDefault();
    setRulesMenuOpen(false);
    setMobileMenuOpen(false);
    // Gọi hàm từ App.tsx truyền xuống, kèm theo ID của tab
    onNavigateRules(tabId);
  };

  const navLinks = [
    { name: "Trang chủ", icon: Home, href: "home" },
    { name: "Webshop", icon: ShoppingCart, href: "shop" },
    // Luật Server xử lý riêng
    { name: "Tin tức", icon: Newspaper, href: "#news" },
    { name: "Liên hệ", icon: Phone, href: "#contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/95 backdrop-blur-md border-b border-white/10 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => handleLinkClick("home", e)}
            className="flex items-center gap-2 group"
          >
             <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center font-black text-2xl text-white transform group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(255,87,34,0.3)]">K</div>
            <span className="font-extrabold text-xl md:text-2xl tracking-tighter uppercase italic">
              KEY <span className="text-primary">ROLEPLAY</span>
            </span>
          </a>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Trang chủ & Webshop */}
            {navLinks.slice(0, 2).map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(link.href, e)}
                className="text-sm font-bold text-gray-300 hover:text-white transition-all uppercase tracking-widest hover:-translate-y-0.5"
              >
                {link.name}
              </a>
            ))}

            {/* --- DROPDOWN LUẬT SERVER --- */}
            <div
              className="relative group py-2"
              onMouseEnter={() => setRulesMenuOpen(true)}
              onMouseLeave={() => setRulesMenuOpen(false)}
            >
              <button
                className={`flex items-center gap-1 text-sm font-bold uppercase tracking-widest transition-all ${
                  rulesMenuOpen ? "text-primary" : "text-gray-300 hover:text-white"
                }`}
                onClick={() => onNavigateRules('general')} // Click vào chữ "Luật Server" thì về trang luật chung
              >
                Luật Server
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${
                    rulesMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Menu Con */}
              <div
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ${
                  rulesMenuOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible translate-y-2"
                }`}
              >
                <div className="w-64 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] overflow-hidden backdrop-blur-xl">
                  {ruleLinks.map((rule) => (
                    <a
                      key={rule.id}
                      href={`#rules-${rule.id}`}
                      onClick={(e) => handleRuleClick(rule.id, e)} // GỌI HÀM NÀY
                      className="flex items-center gap-3 px-5 py-4 text-sm text-gray-400 hover:bg-white/5 hover:text-white transition-all border-b border-white/5 last:border-0 group/item"
                    >
                      <FileText
                        size={16}
                        className="text-primary opacity-80 group-hover/item:opacity-100 group-hover/item:scale-110 transition-all"
                      />
                      <span className="font-medium">{rule.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Tin tức & Liên hệ */}
            {navLinks.slice(2).map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(link.href, e)}
                className="text-sm font-bold text-gray-300 hover:text-white transition-all uppercase tracking-widest hover:-translate-y-0.5"
              >
                {link.name}
              </a>
            ))}

            {/* User Auth Section */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 pl-2 pr-4 py-1.5 rounded-full transition-all group"
                >
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold uppercase">
                    {user.username.charAt(0)}
                  </div>
                  <div className="text-left hidden lg:block">
                    <p className="text-xs font-bold text-white leading-none">
                      {user.username}
                    </p>
                    <p className="text-[10px] text-gray-500 uppercase tracking-tighter">
                      {user.role}
                    </p>
                  </div>
                  <ChevronDown
                    size={14}
                    className={`text-gray-500 transition-transform ${
                      userMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl overflow-hidden animate-fade-in-up">
                    {user.role === "admin" && (
                      <button
                        onClick={() => {
                          onNavigateAdmin();
                          setUserMenuOpen(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-primary transition-all text-left"
                      >
                        <Settings size={16} /> Quản trị hệ thống
                      </button>
                    )}
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-all text-left border-t border-white/5">
                      <User size={16} /> Hồ sơ cá nhân
                    </button>
                    <button
                      onClick={() => {
                        onLogout();
                        setUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-500/10 transition-all text-left border-t border-white/5"
                    >
                      <LogOut size={16} /> Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="bg-primary hover:bg-primaryHover text-white px-8 py-3 rounded-md font-black text-xs uppercase tracking-widest shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5"
              >
                Đăng nhập
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* MOBILE MENU OVERLAY */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-black/98 z-40 flex flex-col items-center justify-center space-y-6 animate-fade-in px-6">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-6 right-6 text-white"
            >
              <X size={32} />
            </button>
            
            <a href="home" onClick={(e) => handleLinkClick('home', e)} className="text-xl font-bold text-white uppercase tracking-widest">Trang chủ</a>
            <a href="shop" onClick={(e) => handleLinkClick('shop', e)} className="text-xl font-bold text-white uppercase tracking-widest">Webshop</a>
            
            {/* Mobile Rules List */}
            <div className="w-full text-center space-y-4 py-4 border-y border-white/10">
               <p className="text-primary font-black uppercase tracking-tighter text-sm italic flex justify-center gap-2 items-center">
                 <BookOpen size={16} /> Luật Server
               </p>
               <div className="grid grid-cols-1 gap-3">
                  {ruleLinks.map(item => (
                     <button 
                        key={item.id} 
                        onClick={(e) => handleRuleClick(item.id, e)} // GỌI HÀM NÀY
                        className="text-gray-400 text-sm font-bold uppercase hover:text-white transition-colors"
                     >
                       {item.name}
                     </button>
                  ))}
               </div>
            </div>

            <a href="#news" onClick={(e) => handleLinkClick('#news', e)} className="text-xl font-bold text-white uppercase tracking-widest">Tin tức</a>
            
            {!user && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="bg-primary text-white px-10 py-4 rounded font-black uppercase shadow-xl shadow-primary/20 mt-4"
              >
                Đăng nhập
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Audio Player (Giữ nguyên) */}
      <audio ref={audioRef} loop>
        <source src="keyroleplay_music.mp3" type="audio/mpeg" />
      </audio>
      <div className="fixed bottom-6 left-6 z-[60] flex items-center gap-3 group">
        <button onClick={toggleMusic} className={`flex items-center justify-center w-12 h-12 rounded-full border border-white/20 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all duration-300 ${isPlaying ? "bg-primary text-white hover:scale-110" : "bg-black/60 text-gray-400 hover:text-white"}`}>
          {isPlaying ? (volume > 0.5 ? <Volume2 size={24} className="animate-pulse" /> : <Volume1 size={24} className="animate-pulse" />) : <VolumeX size={24} />}
        </button>
        <div className="bg-black/80 backdrop-blur rounded-full px-4 py-2 border border-white/10 opacity-0 -translate-x-4 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-x-0 transition-all duration-500 ease-out flex items-center shadow-xl">
          <input type="range" min="0" max="1" step="0.05" value={volume} onChange={handleVolumeChange} className="w-24 h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-primary" />
        </div>
      </div>
    </>
  );
};

export default Navbar;