// Mảng đối tượng mô tả 4 thẻ dịch vụ nhanh trên dashboard.
// Mỗi phần tử có: title (tên hiển thị), desc (mô tả phụ),
// icon (đường dẫn SVG), search (chuỗi khoá phục vụ tìm kiếm).
const services = [
  {
    title: 'Gọi dọn phòng',
    desc: 'Dự kiến 20 phút',
    icon: './assets/ccf51.svg',
    search: 'gọi dọn phòng dự kiến 20 phút'
  },
  {
    title: 'Yêu cầu khăn',
    desc: 'Khăn tắm & tiện nghi',
    icon: './assets/f8914.svg',
    search: 'yêu cầu khăn khăn tắm tiện nghi'
  },
  {
    title: 'Đặt bữa',
    desc: 'Ẩm thực tại phòng',
    icon: './assets/9e188.svg',
    search: 'đặt bữa ẩm thực tại phòng'
  },
  {
    title: 'Báo sự cố',
    desc: 'Hỗ trợ ưu tiên',
    icon: './assets/3df7f.svg',
    search: 'báo sự cố hỗ trợ ưu tiên'
  }
];

// Lấy tham chiếu DOM tới lưới dịch vụ và dòng "không tìm thấy kết quả"
const serviceGrid = document.getElementById('service-grid');
const noResults = document.getElementById('no-results');

// Thêm số 0 phía trước cho số nhỏ hơn 10: 3 -> "03"
function formatCount(value) {
  return value < 10 ? '0' + value : String(value);
}

// Từ khoá rỗng luôn khớp, ngược lại kiểm tra chuỗi con
function matchesKey(key, term) {
  return term === '' || key.indexOf(term) !== -1;
}

// Render danh sách dịch vụ bằng vòng lặp + innerHTML
function renderServices(list) {
  let html = '';
  // Duyệt từng dịch vụ, ghép chuỗi HTML của thẻ card
  list.forEach(function (svc) {
    html +=
      '<article class="card service-card searchable" data-search="' + svc.search + '">' +
      '  <span class="service-icon"><img src="' + svc.icon + '" alt="" /></span>' +
      '  <h3>' + svc.title + '</h3>' +
      '  <p>' + svc.desc + '</p>' +
      '  <button class="service-buy" type="button" data-service="' + svc.title + '">Bắt đầu <img src="./assets/c781d.svg" alt="" /></button>' +
      '</article>';
  });
  serviceGrid.innerHTML = html;         // chèn toàn bộ card vào lưới
  noResults.style.display = 'none';      // ẩn thông báo "không có kết quả"
}

renderServices(services);  // Vẽ dịch vụ ngay khi tải trang

// Tìm kiếm card
// Ô tìm kiếm ở topbar sẽ lọc realtime mọi thẻ có class .searchable
const searchInput = document.getElementById('dashboard-search');

// Lắng nghe sự kiện gõ phím (input) để lọc ngay khi người dùng nhập
searchInput.addEventListener('input', function () {
  const term = searchInput.value.toLowerCase().trim();   // chuẩn hoá từ khoá
  const searchables = document.querySelectorAll('.searchable'); // mọi thẻ có thể lọc
  let shown = 0; // đếm số thẻ đang hiển thị

  searchables.forEach(function (card) {
    // Đọc khoá tìm kiếm từ thuộc tính data-search (lowercase)
    const key = (card.getAttribute('data-search') || '').toLowerCase();
    const match = matchesKey(key, term); // thẻ này có khớp từ khoá không?
    card.classList.toggle('is-filtered', !match); // không khớp -> ẩn (thêm class)
    if (match) shown++; // khớp -> tăng bộ đếm
  });

  // Không còn thẻ nào hiển thị -> hiện dòng "không tìm thấy"
  noResults.style.display = shown === 0 ? 'block' : 'none';
});

// Menu điện thoại (mở/đóng sidebar)
// Nút hamburger chỉ hiện trên mobile; toggle class .open cho sidebar
const menuButton = document.getElementById('menu-button');
const sidebar = document.getElementById('sidebar');

menuButton.addEventListener('click', function () {
  sidebar.classList.toggle('open');
});

// Thanh điều hướng sidebar
// Gán active cho item được bấm và cập nhật tiêu đề trang
const navItems = document.querySelectorAll('.nav-item');
const pageTitle = document.getElementById('page-title');

navItems.forEach(function (item) {
  item.addEventListener('click', function () {
    navItems.forEach(function (i) {
      i.classList.remove('active'); // xoá active khỏi mọi item
    });
    item.classList.add('active'); // đặt active cho item vừa bấm
    pageTitle.textContent = item.getAttribute('data-section'); // đổi tiêu đề
    sidebar.classList.remove('open'); // đóng lại trên mobile sau khi chọn
  });
});

// Yêu cầu dịch vụ
// Lấy tham chiếu các phần tử liên quan tới popup gửi yêu cầu
const modal = document.getElementById('request-modal');
const modalClose = modal.querySelector('.modal__close');
const requestForm = document.getElementById('request-form');
const serviceSelect = document.getElementById('service-select');
const requestNote = document.getElementById('request-note');
const formError = document.getElementById('form-error');
const processingCount = document.getElementById('processing-count');

// Mở modal: ẩn lỗi, thêm class .open, focus vào ô chọn dịch vụ
function openModal() {
  formError.classList.remove('show');
  modal.classList.add('open');
  serviceSelect.focus();
}

// Đóng modal: gỡ class .open
function closeModal() {
  modal.classList.remove('open');
}

// Các nút mở modal: nút chính + nút ưu đãi Spa
document.querySelector('.open-request').addEventListener('click', openModal);
document.getElementById('explore-offer').addEventListener('click', openModal);

modalClose.addEventListener('click', closeModal);
// Bấm ra vùng nền tối (backdrop) cũng đóng modal
modal.addEventListener('click', function (event) {
  if (event.target === modal) closeModal();
});

// Chọn dịch vụ từ card service cũng mở modal
serviceGrid.addEventListener('click', function (event) {
  // event delegation: bắt mọi cú click trong lưới dịch vụ
  const button = event.target.closest('.service-buy');
  if (!button) return; // không bấm vào nút "Bắt đầu" thì bỏ qua
  serviceSelect.value = button.getAttribute('data-service'); // pre-chọn dịch vụ
  openModal();
});

// Validation + gửi yêu cầu
// Tham chiếu UI sẽ được cập nhật sau khi gửi thành công
const latestTitle = document.getElementById('latest-request-title');
const requestDescription = document.getElementById('request-description');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');
let toastTimer = null; // lưu id của timer để huỷ nếu toast bắn lại liên tiếp

// Hiển thị thông báo toast tự ẩn sau 3.2 giây
function showToast(message) {
  if (toastTimer) clearTimeout(toastTimer); // huỷ hẹn giờ cũ nếu có
  toastMessage.textContent = message;
  toast.classList.add('show');
  toastTimer = setTimeout(function () {
    toast.classList.remove('show');
  }, 3200);
}

// Xử lý khi submit form yêu cầu
requestForm.addEventListener('submit', function (event) {
  event.preventDefault(); // chặn việc tải lại trang

  const service = serviceSelect.value;   // loại dịch vụ đã chọn
  const note = requestNote.value.trim(); // ghi chú người dùng nhập

  // Xác thực dữ liệu trước khi xử lý: bắt buộc chọn loại dịch vụ
  if (service === '') {
    formError.classList.add('show'); // hiện dòng lỗi
    serviceSelect.focus();
    return;                          // dừng, không gửi
  }
  formError.classList.remove('show');

  // Cập nhật UI theo dữ liệu vừa nhập: tăng chỉ số "Đang xử lý" (+1)
  const count = parseInt(processingCount.textContent, 10) + 1;
  processingCount.textContent = formatCount(count);

  // Đồng bộ thẻ "yêu cầu gần nhất" với dịch vụ vừa gửi
  latestTitle.textContent = service;
  requestDescription.textContent =
    note !== ''
      ? note
      : 'Đã gửi yêu cầu ' + service.toLowerCase() + ' cho đội ngũ vận hành.';

  closeModal();  // đóng popup
  showToast('Yêu cầu "' + service + '" đã được gửi thành công.'); // báo result
  requestForm.reset(); // xoá trắng form để lần gửi sau
});

// Nút xem chi tiết yêu cầu
document.getElementById('view-request').addEventListener('click', function () {
  showToast('Chi tiết yêu cầu #SF-3184 đang được mở.');
});

// Kiểm tra nhanh: mở trang kèm ?selftest để xem PASS/FAIL trên Console
if (window.location.search.indexOf('selftest') !== -1) {
  const check = function (label, ok) {
    console.log((ok ? 'PASS' : 'FAIL') + ' · ' + label);
  };
  check('formatCount(3) = "03"', formatCount(3) === '03');
  check('formatCount(12) = "12"', formatCount(12) === '12');
  check('matchesKey khớp "khăn"', matchesKey('yêu cầu khăn khăn tắm', 'khăn'));
  check('matchesKey không khớp "spa"', !matchesKey('báo sự cố', 'spa'));
  check('matchesKey rỗng luôn khớp', matchesKey('bất kỳ', ''));
}