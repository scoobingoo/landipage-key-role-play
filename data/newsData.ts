import { Newspaper, Zap, Gift, LucideIcon } from "lucide-react";

export interface NewsItem {
  id: number;
  category: string;
  title: string;
  date: string;
  description: string;
  icon: LucideIcon;
  image: string;
  content: string; // HTML content string
}

export const newsData: NewsItem[] = [
  {
    id: 1,
    category: "TIN TỨC",
    title:
      "Ra mắt hệ thống Nổ hũ bacarat casino đầu tiên tại các sever GTA V Vietnam",
    date: "01/02/2026",
    description:
      "Hệ thống nổ hũ bacarat casino chính thức ra mắt, mang đến trải nghiệm giải trí đỉnh cao cho cộng đồng FiveM Vietnam.",
    icon: Newspaper,
    image: "luckyneko",
    content: `
      <p class="mb-4 text-lg text-gray-300">Chào mừng các cư dân của thành phố FiveM Vietnam,</p>
      <p class="mb-6 text-gray-300">Ban quản trị xin trân trọng thông báo về sự ra mắt của hệ thống <strong>Gangwar và Chiếm Đóng (Turf War)</strong> phiên bản 2.0 trong bản cập nhật Season 5.0 này. Đây là nỗ lực của đội ngũ phát triển nhằm mang lại sân chơi kịch tính và công bằng hơn cho các tổ chức.</p>
      
      <h3 class="text-2xl font-bold text-primary mt-8 mb-4">Chi tiết thay đổi quan trọng:</h3>
      
      <ul class="list-disc list-inside space-y-3 mb-8 ml-4 text-gray-300">
        <li><strong class="text-white">Cơ chế tính điểm thời gian thực:</strong> Điểm số chiếm đóng giờ đây sẽ được tính dựa trên số giây các thành viên đứng trong vòng tròn (Zone) mà không bị hạ gục.</li>
        <li><strong class="text-white">Phần thưởng độc quyền:</strong> Gang đứng đầu bảng xếp hạng tuần sẽ nhận được 01 Set vũ khí "Dragon Lore" độc quyền và quyền sở hữu khu vực Chợ Đen trong tuần tiếp theo.</li>
        <li><strong class="text-white">Cân bằng sát thương:</strong> Điều chỉnh lại dame của các loại súng lục và SMG để phù hợp hơn với meta hiện tại.</li>
        <li><strong class="text-white">Giới hạn thành viên:</strong> Mỗi trận chiếm đóng sẽ giới hạn tối đa 15 thành viên mỗi bên tham gia để đảm bảo FPS ổn định.</li>
      </ul>

      <h3 class="text-2xl font-bold text-primary mt-8 mb-4">Thời gian áp dụng:</h3>
      <p class="mb-6 text-gray-300">Hệ thống sẽ chính thức đi vào hoạt động sau đợt bảo trì định kỳ lúc <strong class="text-white">06:00 sáng ngày 25/10/2023</strong>.</p>
      
      <div class="bg-primary/10 border-l-4 border-primary p-4 my-6">
        <p class="text-sm text-gray-300 italic">Lưu ý: Các chủ Gang vui lòng đăng ký lại danh sách thành viên tham chiến tại Discord trước giờ G.</p>
      </div>

      <p class="text-gray-300">Chúc các bạn có những giờ phút chơi game vui vẻ!</p>
    `,
  },
  {
    id: 2,
    category: "CẬP NHẬT",
    title: "Update Changelog Tháng 10: Thêm 20 siêu xe",
    date: "20/10/2023",
    description:
      "Cập nhật showroom với các dòng xe JDM huyền thoại, tối ưu hóa FPS cho máy cấu hình yếu và sửa lỗi inventory.",
    icon: Zap,
    image: "https://picsum.photos/600/400?random=11",
    content: `
      <p class="mb-6 text-gray-300">Bản cập nhật tháng 10 tập trung vào việc đa dạng hóa phương tiện di chuyển và tối ưu hóa trải nghiệm người dùng.</p>

      <h3 class="text-2xl font-bold text-primary mt-8 mb-4">1. Phương tiện mới (JDM Collection):</h3>
      <p class="mb-4 text-gray-300">Đã thêm vào Showroom Luxury các mẫu xe sau:</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div class="bg-white/5 p-4 rounded border border-white/10">
            <h4 class="font-bold text-white mb-2">Nissan Skyline R34 GT-R</h4>
            <p class="text-xs text-gray-400">Giá: $500,000</p>
        </div>
        <div class="bg-white/5 p-4 rounded border border-white/10">
            <h4 class="font-bold text-white mb-2">Toyota Supra MK4</h4>
            <p class="text-xs text-gray-400">Giá: $480,000</p>
        </div>
        <div class="bg-white/5 p-4 rounded border border-white/10">
            <h4 class="font-bold text-white mb-2">Mazda RX-7 Spirit R</h4>
            <p class="text-xs text-gray-400">Giá: $450,000</p>
        </div>
        <div class="bg-white/5 p-4 rounded border border-white/10">
            <h4 class="font-bold text-white mb-2">Honda NSX Type R</h4>
            <p class="text-xs text-gray-400">Giá: $520,000</p>
        </div>
      </div>

      <h3 class="text-2xl font-bold text-primary mt-8 mb-4">2. Tối ưu hóa hệ thống (Optimization):</h3>
      <ul class="list-disc list-inside space-y-2 mb-6 ml-4 text-gray-300">
        <li>Giảm dung lượng texture của các tòa nhà không cần thiết, giúp tăng 15-20 FPS tại khu vực trung tâm.</li>
        <li>Sửa lỗi bị kẹt item khi chuyển đồ qua cốp xe.</li>
        <li>Nâng cấp hệ thống Voice chat, giảm delay và lọc tạp âm tốt hơn.</li>
      </ul>
    `,
  },
  {
    id: 3,
    category: "KHUYẾN MÃI",
    title: "Sự kiện Halloween: X2 Giá trị nạp thẻ",
    date: "15/10/2023",
    description:
      "Cơ hội duy nhất trong năm! X2 toàn bộ mệnh giá nạp, tặng kèm set trang phục Halloween giới hạn cho 100 người đầu tiên.",
    icon: Gift,
    image: "https://picsum.photos/600/400?random=12",
    content: `
      <p class="mb-6 text-gray-300">Không khí Halloween đang tràn ngập khắp thành phố Los Santos! Để hòa chung không khí lễ hội, chúng tôi xin gửi đến các bạn sự kiện khuyến mãi đặc biệt nhất trong năm.</p>

      <div class="bg-gradient-to-r from-primary/20 to-transparent border border-primary p-6 rounded-lg mb-8 text-center">
        <h2 class="text-3xl font-black text-white mb-2 uppercase italic">X2 DONATE POINTS</h2>
        <p class="text-primary font-bold">Áp dụng cho mọi hình thức nạp (Momo, Banking, Thẻ cào)</p>
      </div>

      <h3 class="text-2xl font-bold text-primary mt-8 mb-4">Thời gian sự kiện:</h3>
      <p class="mb-6 text-gray-300">Từ <strong>00:00 ngày 25/10</strong> đến hết <strong>23:59 ngày 31/10/2023</strong>.</p>

      <h3 class="text-2xl font-bold text-primary mt-8 mb-4">Quà tặng giới hạn:</h3>
      <ul class="list-disc list-inside space-y-3 mb-8 ml-4 text-gray-300">
        <li>Tặng ngay bộ trang phục <strong class="text-white">"Ghost Rider"</strong> vĩnh viễn cho hóa đơn nạp trên 500k.</li>
        <li>Tặng siêu xe <strong class="text-white">"Lurcher Halloween Edition"</strong> cho Top 1 Donate tuần sự kiện.</li>
        <li>Mở bán các vật phẩm Halloween giới hạn tại Shop Credits.</li>
      </ul>

      <p class="text-gray-300 italic text-center mt-10">Đừng bỏ lỡ cơ hội sở hữu những vật phẩm độc đáo này nhé!</p>
    `,
  },
];
