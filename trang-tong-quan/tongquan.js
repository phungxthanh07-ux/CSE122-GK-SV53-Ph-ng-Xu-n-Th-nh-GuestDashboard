// ===== Dữ liệu dịch vụ nhanh =====
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
  list.forEach(function (svc) {
    html +=
      '<article class="card service-card searchable" data-search="' + svc.search + '">' +
      '  <span class="service-icon"><img src="' + svc.icon + '" alt="" /></span>' +
      '  <h3>' + svc.title + '</h3>' +
      '  <p>' + svc.desc + '</p>' +
      '  <button class="service-buy" type="button" data-service="' + svc.title + '">Bắt đầu <img src="./assets/c781d.svg" alt="" /></button>' +
      '</article>';
  });
  serviceGrid.innerHTML = html;
  noResults.style.display = 'none';
}

renderServices(services);

// ===== Tìm kiếm card =====
const searchInput = document.getElementById('dashboard-search');

searchInput.addEventListener('input', function () {
  const term = searchInput.value.toLowerCase().trim();
  const searchables = document.querySelectorAll('.searchable');
  let shown = 0;

  searchables.forEach(function (card) {
    const key = (card.getAttribute('data-search') || '').toLowerCase();
    const match = matchesKey(key, term);
    card.classList.toggle('is-filtered', !match);
    if (match) shown++;
  });

  noResults.style.display = shown === 0 ? 'block' : 'none';
});

// ===== Menu điện thoại (mở/đóng sidebar) =====
const menuButton = document.getElementById('menu-button');
const sidebar = document.getElementById('sidebar');

menuButton.addEventListener('click', function () {
  sidebar.classList.toggle('open');
});

// ===== Thanh điều hướng sidebar =====
const navItems = document.querySelectorAll('.nav-item');
const pageTitle = document.getElementById('page-title');

navItems.forEach(function (item) {
  item.addEventListener('click', function () {
    navItems.forEach(function (i) {
      i.classList.remove('active');
    });
    item.classList.add('active');
    pageTitle.textContent = item.getAttribute('data-section');
    sidebar.classList.remove('open');
  });
});

// ===== Modal yêu cầu dịch vụ =====
const modal = document.getElementById('request-modal');
const modalClose = modal.querySelector('.modal__close');
const requestForm = document.getElementById('request-form');
const serviceSelect = document.getElementById('service-select');
const requestNote = document.getElementById('request-note');
const formError = document.getElementById('form-error');
const processingCount = document.getElementById('processing-count');

function openModal() {
  formError.classList.remove('show');
  modal.classList.add('open');
  serviceSelect.focus();
}

function closeModal() {
  modal.classList.remove('open');
}

// Các nút mở modal: nút chính + nút ưu đãi Spa
document.querySelector('.open-request').addEventListener('click', openModal);
document.getElementById('explore-offer').addEventListener('click', openModal);

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', function (event) {
  if (event.target === modal) closeModal();
});

// Chọn dịch vụ từ card service cũng mở modal
serviceGrid.addEventListener('click', function (event) {
  const button = event.target.closest('.service-buy');
  if (!button) return;
  serviceSelect.value = button.getAttribute('data-service');
  openModal();
});

// ===== Form validation + gửi yêu cầu =====
const latestTitle = document.getElementById('latest-request-title');
const requestDescription = document.getElementById('request-description');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');
let toastTimer = null;

function showToast(message) {
  if (toastTimer) clearTimeout(toastTimer);
  toastMessage.textContent = message;
  toast.classList.add('show');
  toastTimer = setTimeout(function () {
    toast.classList.remove('show');
  }, 3200);
}

requestForm.addEventListener('submit', function (event) {
  event.preventDefault(); // chặn việc tải lại trang

  const service = serviceSelect.value;
  const note = requestNote.value.trim();

  // Xác thực dữ liệu trước khi xử lý
  if (service === '') {
    formError.classList.add('show');
    serviceSelect.focus();
    return;
  }
  formError.classList.remove('show');

  // Cập nhật UI theo dữ liệu vừa nhập
  const count = parseInt(processingCount.textContent, 10) + 1;
  processingCount.textContent = formatCount(count);

  latestTitle.textContent = service;
  requestDescription.textContent =
    note !== ''
      ? note
      : 'Đã gửi yêu cầu ' + service.toLowerCase() + ' cho đội ngũ vận hành.';

  closeModal();
  showToast('Yêu cầu "' + service + '" đã được gửi thành công.');
  requestForm.reset();
});

// ===== Nút xem chi tiết yêu cầu =====
document.getElementById('view-request').addEventListener('click', function () {
  showToast('Chi tiết yêu cầu #SF-3184 đang được mở.');
});

// ===== Kiểm tra nhanh: mở trang kèm ?selftest để xem PASS/FAIL trên Console =====
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