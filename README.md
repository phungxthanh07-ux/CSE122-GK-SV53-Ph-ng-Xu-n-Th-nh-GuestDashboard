# CSE122-GK-SV53-Phùng-Xuân-Thành-GuestDashboard
# 🏨 StayFlow - Bảng Điều Khiển Khách Lưu Trú (Stay Dashboard)
## 📌 1. Thông Tin Chung

- **Tên đề tài BTL:** Hệ thống quản lý & hỗ trợ dịch vụ khách sạn StayFlow
- **Tên trang thực hiện:** Trang Tổng quan kỳ lưu trú (`index.html`)
- **Đối tượng sử dụng:** Khách lưu trú tại khách sạn (Demo: Khách Thu Hà – Phòng 1208)
- **Mục đích của trang:** Cung cấp bảng điều khiển trung tâm giúp khách hàng dễ dàng theo dõi thông tin phòng, xem trạng thái yêu cầu, gửi yêu cầu dịch vụ phòng tức thì và cập nhật các ưu đãi cá nhân hóa từ khách sạn.
---
## 🚀 2. Các Chức Năng Chính

1. **Tổng quan thông tin phòng:** Hiển thị thời gian Check-in/Check-out, thanh tiến trình lưu trú và trạng thái dọn phòng.
2. **Render dữ liệu dịch vụ động:** Sử dụng mảng JavaScript (Array/Object) để render danh sách các thẻ dịch vụ nhanh.
3. **Tìm kiếm Realtime (Filter Search):** Lọc tức thì tất cả các thẻ thông tin, card dịch vụ trên Dashboard dựa theo từ khóa nhập vào ô tìm kiếm.
4. **Modal Yêu cầu dịch vụ & Form Validation:** 
   - Mở/đóng popup đăng ký dịch vụ.
   - Kiểm tra ràng buộc dữ liệu (Validation) trước khi gửi.
   - Ngăn chặn reload trang (`preventDefault`), cập nhật tự động chỉ số "Đang xử lý" và hiển thị Toast Notification thông báo kết quả.
5. **Interactive UI Dropdowns:** Bật/tắt mượt mà menu Thông báo, Menu hồ sơ cá nhân và Menu Hamburger trên giao diện Mobile.
6. **Responsive Web Design (RWD):** Tự động tối ưu layout hiển thị mượt mà trên Desktop, Tablet và Mobile.
---
## 🛠️ 3. Công Nghệ Sử Dụng

- **HTML5:** Semantic HTML (`aside`, `header`, `main`, `section`, `article`, `form`, `label`, `select`, `textarea`).
- **CSS3:** Flexbox, CSS Grid, CSS Variables (`:root`), Animations, Transitions, Media Queries (`@media`).
- **JavaScript (ES6+):** DOM Manipulation, Event Listeners (`click`, `input`, `submit`), Form Validation, Array Methods (`forEach`), Functions.
