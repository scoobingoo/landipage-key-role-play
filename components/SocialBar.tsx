import React from 'react';
import { Youtube, Music, Facebook, Instagram } from 'lucide-react';

const SocialBar: React.FC = () => {
  const socials = [
    { name: 'Youtube', icon: Youtube, color: 'hover:text-red-500', href: '#' },
    { name: 'TikTok', icon: Music, color: 'hover:text-pink-500', href: '#' }, // Using Music icon as generic for TikTok
    { name: 'Facebook', icon: Facebook, color: 'hover:text-blue-500', href: '#' },
    { name: 'Instagram', icon: Instagram, color: 'hover:text-purple-500', href: '#' },
  ];

  return (
    <section className="bg-card border-y border-white/5 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {socials.map((social) => (
            <a 
              key={social.name}
              href={social.href}
              className={`flex items-center gap-3 group transition-all duration-300 transform hover:scale-110`}
            >
              <div className={`p-3 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors`}>
                <social.icon size={24} className={`text-gray-400 ${social.color} transition-colors`} />
              </div>
              <span className="font-bold text-gray-300 group-hover:text-white uppercase tracking-wider text-sm md:text-base hidden sm:block">
                {social.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialBar;