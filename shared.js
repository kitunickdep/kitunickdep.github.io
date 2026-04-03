/* shared.js — inject nav + footer + toast vào mọi trang */

const SITE_PAGES = [
  { href: 'index.html',               label: 'Trang chủ' },
  { href: 'ki-tu-dac-biet.html',      label: 'Kí tự' },
  { href: 'nick-mau.html',            label: 'Nick mẫu' },
  { href: 'about.html',               label: 'Giới thiệu' },
  { href: 'contact.html',             label: 'Liên hệ' },
];

const LEGAL_PAGES = [
  { href: 'chinh-sach-bao-mat.html',  label: 'Chính sách bảo mật' },
  { href: 'dieu-khoan-su-dung.html',  label: 'Điều khoản' },
  { href: 'ban-quyen.html',           label: 'Bản quyền' },
  { href: 'tuyen-bo-ai.html',         label: 'Tuyên bố AI' },
];

function currentFile() {
  return location.pathname.split('/').pop() || 'index.html';
}

function injectNav() {
  const cur = currentFile();
  const allLinks = [...SITE_PAGES, ...LEGAL_PAGES];

  const desktopLinks = SITE_PAGES.map(p =>
    `<a href="${p.href}" class="${cur===p.href?'active':''}">${p.label}</a>`
  ).join('');

  const mobileLinks = allLinks.map(p =>
    `<a href="${p.href}" class="${cur===p.href?'active':''}">${p.label}</a>`
  ).join('');

  document.body.insertAdjacentHTML('afterbegin', `
    <nav class="site-nav">
      <div class="nav-inner">
        <a href="index.html" class="nav-logo">
          <span class="nav-dot"></span>Nick<span class="accent">Dep</span>.Com
        </a>
        <div class="nav-links">${desktopLinks}</div>
        <button class="nav-hamburger" onclick="toggleDrawer()" aria-label="Menu">
          <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" d="M3 6h18M3 12h18M3 18h18"/>
          </svg>
        </button>
      </div>
      <div class="mobile-drawer" id="mobileDrawer">${mobileLinks}</div>
    </nav>
    <div class="copy-toast" id="copyToast">✓ Đã sao chép!</div>
  `);
}

function injectFooter() {
  const mainLinks  = SITE_PAGES.map(p  => `<a href="${p.href}">${p.label}</a>`).join('');
  const legalLinks = LEGAL_PAGES.map(p => `<a href="${p.href}">${p.label}</a>`).join('');

  document.body.insertAdjacentHTML('beforeend', `
    <div class="dmca-strip">🛡️ Nội dung gốc 100% · DMCA Protected · © 2025 Công ty TNHH KiTuHAY</div>
    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-top">
          <div>
            <div class="footer-logo">Nick<span class="accent">Dep</span>.Com</div>
            <div class="footer-desc">Kí tự đặc biệt &amp; Nick đẹp cho game · Miễn phí · Không cần đăng ký.</div>
          </div>
          <div>
            <div class="footer-col-title">Trang</div>
            <div class="footer-links">${mainLinks}</div>
          </div>
          <div>
            <div class="footer-col-title">Pháp lý</div>
            <div class="footer-links">${legalLinks}</div>
          </div>
        </div>
        <div class="footer-bottom">
          <strong>Công ty TNHH KiTuHAY</strong> · GPDKKD: 1102132198 do Sở Tài Chính tỉnh Tây Ninh cấp ngày 24/11/2025<br>
          Số A4-57, đường BT9, Dự án Lavila Green City Tân An, P. Long An, T. Tây Ninh<br>
          Email: hotro@nickdep.com · Chịu trách nhiệm nội dung: <strong>Lê Thanh Sang</strong> ·
          <a href="https://orcid.org/0009-0006-1227-6866" target="_blank" style="color:rgba(255,255,255,.35)">ORCID</a>
        </div>
      </div>
    </footer>
  `);
}

function toggleDrawer() {
  document.getElementById('mobileDrawer').classList.toggle('open');
}

function showToast(msg) {
  msg = msg || '✓ Đã sao chép!';
  const t = document.getElementById('copyToast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(t._t); t._t = setTimeout(function(){ t.classList.remove('show'); }, 2200);
}

document.addEventListener('DOMContentLoaded', function() {
  injectNav();
  injectFooter();
});
