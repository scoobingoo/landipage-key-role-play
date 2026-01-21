import React, { useState, useEffect } from 'react';
import { Scale, ShieldAlert, Users, Zap, MapPin, AlertCircle, MessageCircle, RotateCcw, FileText } from 'lucide-react';

interface RuleSection {
  id: string;
  title: string;
  icon: any;
  content: { title: string; detail: string }[];
}

interface RulesProps {
  initialSection?: string;
}

const Rules: React.FC<RulesProps> = ({ initialSection = 'general' }) => {
  const [activeSection, setActiveSection] = useState(initialSection);

  // Cập nhật tab khi nhận prop mới từ App
  useEffect(() => {
    setActiveSection(initialSection);
  }, [initialSection]);

  const ruleSections: RuleSection[] = [
    {
      id: 'general',
      title: 'Quy định chung',
      icon: Scale,
      content: [
        { title: 'Tôn trọng người chơi', detail: 'Nghiêm cấm mọi hành vi xúc phạm, phân biệt đối xử hoặc quấy rối người chơi khác dưới mọi hình thức.' },
        { title: 'Không sử dụng phần mềm thứ 3', detail: 'Nghiêm cấm sử dụng Cheat, Hack, Macro hoặc bất kỳ phần mềm nào can thiệp vào game để trục lợi.' },
        { title: 'Tên nhân vật (IC Name)', detail: 'Tên nhân vật phải có nghĩa, không đặt tên theo người nổi tiếng hoặc chứa các từ ngữ phản cảm.' },
        { title: 'Quảng cáo', detail: 'Nghiêm cấm quảng cáo các server khác hoặc các sản phẩm không liên quan trong thành phố.' },
      ]
    },
    {
      id: 'roleplay',
      title: 'Luật Roleplay (IC/OOC)',
      icon: Zap,
      content: [
        { title: 'OOC & IC', detail: 'Phân biệt rõ ràng giữa câu chuyện ngoài đời (OOC) và câu chuyện trong game (IC). Không mang thù hằn OOC vào IC.' },
        { title: 'Power Gaming (PG)', detail: 'Không thực hiện các hành động siêu nhiên hoặc không thể xảy ra ngoài đời thực (Ví dụ: Đâm xe 200km/h vẫn chạy bộ bình thường).' },
        { title: 'Meta Gaming (MG)', detail: 'Không sử dụng thông tin biết được từ OOC (Stream, Discord) để áp dụng vào hành động trong game.' },
        { title: 'Value Your Life', detail: 'Luôn phải quý trọng tính mạng của nhân vật. Không được có hành động liều lĩnh khi bị đe dọa bằng vũ khí.' },
      ]
    },
    {
      id: 'discord',
      title: 'Quy tắc Discord',
      icon: MessageCircle,
      content: [
        { title: 'Cư xử văn minh', detail: 'Không spam, không gửi nội dung đồi trụy, kinh dị hoặc các liên kết độc hại trong các kênh chat.' },
        { title: 'Nickname Discord', detail: 'Khuyến khích đặt nickname trùng với tên trong game để Staff dễ dàng hỗ trợ.' },
        { title: 'Kênh hỗ trợ', detail: 'Sử dụng đúng kênh ticket khi cần gặp Admin. Tránh tag vô tội vạ các Staff khi không thực sự cần thiết.' },
        { title: 'Giao dịch OOC', detail: 'Nghiêm cấm việc mua bán tài sản in-game bằng tiền thật qua Discord mà không thông qua hệ thống của Server.' },
      ]
    },
    {
      id: 'illegal',
      title: 'Luật Băng Đảng',
      icon: Users,
      content: [
        { title: 'Giới hạn thành viên', detail: 'Mỗi tổ chức/băng đảng có giới hạn số lượng thành viên tối đa tham gia các hoạt động chiếm đóng.' },
        { title: 'Tranh chấp khu vực', detail: 'Các vụ giao tranh Gangster phải có lý do RP rõ ràng và diễn ra ngoài khu vực Safezone.' },
        { title: 'Phần thưởng Gang', detail: 'Các Gang đứng đầu bảng xếp hạng sẽ được nhận các đặc quyền về vũ khí và địa bàn hoạt động.' },
      ]
    },
    {
      id: 'refund',
      title: 'Chính sách Refund',
      icon: RotateCcw,
      content: [
        { title: 'Lỗi do Server', detail: 'Chỉ thực hiện refund các vật phẩm bị mất do lỗi hệ thống (Crash server, Bug script) kèm theo bằng chứng Video.' },
        { title: 'Giao dịch nhầm', detail: 'Mọi giao dịch mua vật phẩm trên Webshop là cuối cùng. Chúng tôi không hỗ trợ refund nếu bạn chọn sai vật phẩm.' },
        { title: 'Bị ban tài khoản', detail: 'Người chơi bị cấm vĩnh viễn do vi phạm luật nghiêm trọng sẽ không được hoàn trả bất kỳ khoản đóng góp nào.' },
      ]
    }
  ];

  return (
    <div className="pt-32 pb-20 min-h-screen bg-dark">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex p-3 rounded-2xl bg-primary/10 text-primary mb-4">
            <AlertCircle size={40} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-white">
            Quy Định <span className="text-primary">Thành Phố</span>
          </h1>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto uppercase text-sm font-bold tracking-widest italic">
            Cập nhật lần cuối: 2026 - Phiên bản Season 5.0
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Navigation Sidebar */}
          <aside className="lg:w-72 shrink-0">
            <div className="bg-card rounded-2xl border border-white/5 p-4 sticky top-32 shadow-xl">
              <nav className="space-y-1.5">
                {ruleSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl font-bold uppercase text-[11px] tracking-widest transition-all ${
                      activeSection === section.id 
                        ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                        : 'text-gray-500 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <section.icon size={18} />
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Rules Content Area */}
          <main className="flex-grow">
            <div className="bg-[#161616] rounded-2xl border border-white/5 p-8 md:p-10 shadow-2xl relative overflow-hidden">
              {ruleSections.map((section) => (
                <div 
                  key={section.id} 
                  className={`space-y-8 animate-fade-in ${activeSection === section.id ? 'block' : 'hidden'}`}
                >
                  <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <section.icon size={24} />
                    </div>
                    <h2 className="text-3xl font-black uppercase italic text-white tracking-tighter">{section.title}</h2>
                  </div>

                  <div className="grid grid-cols-1 gap-5">
                    {section.content.map((rule, index) => (
                      <div key={index} className="group bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 p-6 rounded-2xl transition-all border-l-4 border-l-transparent hover:border-l-primary">
                        <div className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <span className="text-primary font-black text-xs opacity-80 uppercase">Điều</span>
                            <span className="text-2xl font-black text-white leading-none">0{index + 1}</span>
                          </div>
                          <div className="h-10 w-px bg-white/10 mt-1"></div>
                          <div>
                            <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-wide group-hover:text-primary transition-colors italic">
                              {rule.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed italic text-sm">
                              {rule.detail}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <AlertCircle className="text-primary" size={32} />
                    <p className="text-gray-300 font-bold italic text-sm">
                        Mọi thắc mắc về luật vui lòng liên hệ Ban Quản Trị qua Discord Support.
                    </p>
                </div>
                <button className="bg-primary text-white px-6 py-2.5 rounded font-black uppercase text-xs tracking-widest hover:bg-primaryHover transition-all">
                    Discord Support
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Rules;