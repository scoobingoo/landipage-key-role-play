import React, { useState } from 'react';
import { X, Mail, Lock, User, ShieldCheck, ArrowRight } from 'lucide-react';
import { User as UserType } from '../../App';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: UserType) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLogin }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (activeTab === 'login') {
      // Logic đăng nhập mẫu
      if (username === 'admin' && password === 'admin123') {
        onLogin({ username: 'Administrator', role: 'admin' });
      } else if (username && password) {
        onLogin({ username: username, role: 'user' });
      } else {
        setError('Vui lòng điền đầy đủ thông tin!');
      }
    } else {
      // Logic đăng ký mẫu
      if (username && password) {
        alert('Đăng ký thành công! Bạn có thể đăng nhập ngay.');
        setActiveTab('login');
      } else {
        setError('Vui lòng điền đầy đủ thông tin!');
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Modal Body */}
      <div className="relative bg-card w-full max-w-md rounded-2xl border border-white/10 shadow-2xl overflow-hidden animate-fade-in-up">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
          <X size={24} />
        </button>

        {/* Header Tabs */}
        <div className="flex border-b border-white/5">
          <button 
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-widest transition-all ${activeTab === 'login' ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Đăng nhập
          </button>
          <button 
            onClick={() => setActiveTab('register')}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-widest transition-all ${activeTab === 'register' ? 'text-primary border-b-2 border-primary bg-primary/5' : 'text-gray-500 hover:text-gray-300'}`}
          >
            Tạo tài khoản
          </button>
        </div>

        <div className="p-8">
          <div className="text-center mb-8">
            <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-4">
              <ShieldCheck size={32} />
            </div>
            <h2 className="text-2xl font-black uppercase italic">
              {activeTab === 'login' ? 'Mừng trở lại' : 'Gia nhập thành phố'}
            </h2>
            <p className="text-gray-500 text-sm mt-1">Khám phá thế giới Roleplay đỉnh cao cùng FiveM Vietnam</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1.5 ml-1">Tài khoản</label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 rounded-lg py-3 pl-10 pr-4 text-white focus:border-primary focus:outline-none transition-all placeholder:text-gray-700"
                  placeholder="Nhập username..."
                />
              </div>
            </div>

            {activeTab === 'register' && (
              <div className="relative">
                <label className="block text-[10px] font-bold uppercase text-gray-500 mb-1.5 ml-1">Email</label>
                <div className="relative">
                  <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                  <input 
                    type="email" 
                    className="w-full bg-black/40 border border-white/5 rounded-lg py-3 pl-10 pr-4 text-white focus:border-primary focus:outline-none transition-all placeholder:text-gray-700"
                    placeholder="email@example.com"
                  />
                </div>
              </div>
            )}

            <div className="relative">
              <div className="flex justify-between items-center mb-1.5 ml-1">
                <label className="text-[10px] font-bold uppercase text-gray-500">Mật khẩu</label>
                {activeTab === 'login' && (
                  <button type="button" className="text-[10px] text-primary hover:underline font-bold uppercase">Quên mật khẩu?</button>
                )}
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/40 border border-white/5 rounded-lg py-3 pl-10 pr-4 text-white focus:border-primary focus:outline-none transition-all placeholder:text-gray-700"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-xs font-bold text-center animate-shake">{error}</p>}

            <button 
              type="submit"
              className="w-full group bg-primary hover:bg-primaryHover text-white font-black py-4 rounded-lg uppercase tracking-widest shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 mt-4"
            >
              {activeTab === 'login' ? 'Đăng nhập ngay' : 'Đăng ký tham gia'}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {activeTab === 'login' && (
            <div className="mt-8 pt-6 border-t border-white/5 text-center">
              <p className="text-xs text-gray-600 uppercase font-bold tracking-widest mb-4">Hoặc đăng nhập với</p>
              <div className="flex gap-4">
                <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/5 py-2.5 rounded-lg transition-colors flex items-center justify-center font-bold text-xs uppercase">Discord</button>
                <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/5 py-2.5 rounded-lg transition-colors flex items-center justify-center font-bold text-xs uppercase">Google</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;