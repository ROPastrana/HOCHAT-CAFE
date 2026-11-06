// ========== HOCHAT CAFÉ SHARED SCRIPT ==========
// Used by every page: the header, footer, login state, cart storage,
// pop-up messages, and the menu cards.

const SITE = {
    phoneDisplay: '0995 829 8402',
    phoneLink: 'tel:+639958298402',
    email: 'hochatcafe@gmail.com',
    location: 'Gerona, Tarlac',
    hours: '12:00 PM – 7:30 PM',
    mapLink: 'https://www.google.com/maps/search/?api=1&query=Hochat+Cafe+Gerona+Tarlac',
    messenger: 'https://www.facebook.com/messages/t/532700360588622',
    facebook: 'https://www.facebook.com/HochatCafe',
    instagram: 'https://www.instagram.com/hochatcafe',
    logo: 'HOTCHAT CAFE/WEB IMAGES/logo.webp'
};

const DELIVERY_FEE = 50;

// Links in the header. "userOnly" links appear only after logging in.
const NAV_LINKS = [
    { key: 'home', label: 'Home', href: 'index.html' },
    { key: 'menu', label: 'Menu', href: 'MenuPage.html' },
    { key: 'about', label: 'About Us', href: 'AboutUs.html' },
    { key: 'contact', label: 'Contact Us', href: 'ContactUs.html' },
    { key: 'history', label: 'Order History', href: 'Transactions.html', userOnly: true }
];

// ========== SMALL HELPERS ==========

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (char) => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[char]));
}

function formatPeso(amount) {
    return `₱${Number(amount).toLocaleString('en-PH')}`;
}

function readJson(key, fallback) {
    try {
        const value = JSON.parse(localStorage.getItem(key));
        return value === null ? fallback : value;
    } catch (error) {
        return fallback;
    }
}

const ICON_PATHS = {
    cart: '<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>',
    menu: '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>',
    close: '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    left: '<polyline points="15 18 9 12 15 6"/>',
    right: '<polyline points="9 18 15 12 9 6"/>',
    arrowLeft: '<line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>',
    arrowRight: '<line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>',
    plus: '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>',
    minus: '<line x1="5" y1="12" x2="19" y2="12"/>',
    trash: '<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>',
    check: '<polyline points="20 6 9 17 4 12"/>',
    lock: '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
    receipt: '<path d="M4 2v20l3-2 3 2 2-2 2 2 3-2 3 2V2l-3 2-3-2-2 2-2-2-3 2z"/><line x1="8" y1="9" x2="16" y2="9"/><line x1="8" y1="14" x2="16" y2="14"/>',
    phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    mail: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/>',
    pin: '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    chat: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
    facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>'
};

function icon(name) {
    return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON_PATHS[name]}</svg>`;
}

// ========== USER DATA ==========
// Visitors can browse without an account, so these return null or an
// empty list for guests instead of sending them to the login page.

function getCurrentUser() {
    return readJson('currentUser', null);
}

function isLoggedIn() {
    return getCurrentUser() !== null;
}

function getUserKey() {
    const user = getCurrentUser();
    return user ? `user_${user.email}` : null;
}

function getUserData() {
    const userKey = getUserKey();
    if (!userKey) return null;
    return readJson(userKey, { cart: [], orders: [], favorites: [] });
}

function saveUserData(data) {
    const userKey = getUserKey();
    if (userKey && data) {
        localStorage.setItem(userKey, JSON.stringify(data));
    }
}

function getUserCart() {
    const userData = getUserData();
    return userData ? userData.cart : [];
}

function saveUserCart(cart) {
    const userData = getUserData();
    if (userData) {
        userData.cart = cart;
        saveUserData(userData);
    }
    updateCartCount();
}

function getUserOrders() {
    const userData = getUserData();
    return userData ? userData.orders : [];
}

function saveUserOrder(order) {
    const userData = getUserData();
    if (userData) {
        userData.orders.push(order);
        saveUserData(userData);
    }
}

function generateOrderId() {
    return `HOCHAT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}

// The login link remembers the current page so customers return to it.
function getLoginUrl() {
    const page = location.pathname.split('/').pop() || 'index.html';
    return `LoginPage.html?next=${encodeURIComponent(page + location.search)}`;
}

// Only allows a page on this site, so a crafted link can't redirect elsewhere.
function getNextPage() {
    const next = new URLSearchParams(location.search).get('next') || '';
    return /^[A-Za-z]+\.html(\?[\w=&%-]*)?$/.test(next) ? next : 'index.html';
}

async function logOut() {
    const confirmed = await showDialog({
        title: 'Log out?',
        message: 'Your cart will be saved for next time.',
        confirmText: 'Log Out',
        cancelText: 'Stay Logged In'
    });
    if (!confirmed) return;
    localStorage.removeItem('currentUser');
    setFlashMessage('You have been logged out.');
    location.href = 'index.html';
}

// ========== HEADER AND FOOTER ==========

function renderHeader(activeKey) {
    const loggedIn = isLoggedIn();
    const links = NAV_LINKS.filter((link) => !link.userOnly || loggedIn);
    const linkHtml = (className) => links.map((link) => {
        const current = link.key === activeKey;
        return `<a class="${className}${current ? ' is-current' : ''}" href="${link.href}"${current ? ' aria-current="page"' : ''}>${link.label}</a>`;
    }).join('');

    const accountDesktop = loggedIn
        ? '<button class="btn btn-outline btn-small" type="button" data-logout>Log Out</button>'
        : `<a class="btn btn-primary btn-small" href="${getLoginUrl()}">Log In</a>`;
    const accountMobile = loggedIn
        ? '<button class="btn btn-outline btn-block" type="button" data-logout>Log Out</button>'
        : `<a class="btn btn-primary btn-block" href="${getLoginUrl()}">Log In</a>`;

    document.currentScript.insertAdjacentHTML('beforebegin', `
        <a class="skip-link" href="#main">Skip to main content</a>
        <header class="site-header">
            <div class="container header-inner">
                <a class="brand" href="index.html" aria-label="Hochat Café home">
                    <img src="${SITE.logo}" alt="" width="64" height="63">
                </a>
                <nav class="nav-menu" aria-label="Main">${linkHtml('nav-link')}</nav>
                <div class="header-actions">
                    <a class="cart-link${activeKey === 'cart' ? ' is-current' : ''}" href="Cart.html" aria-label="Cart">
                        ${icon('cart')}
                        <span class="cart-count" data-cart-count hidden></span>
                    </a>
                    <div class="account-desktop">${accountDesktop}</div>
                    <button class="menu-toggle" type="button" id="menuToggle" aria-label="Open menu" aria-expanded="false" aria-controls="mobileMenu">${icon('menu')}</button>
                </div>
            </div>
        </header>
        <div class="drawer-overlay" id="drawerOverlay"></div>
        <aside class="mobile-menu" id="mobileMenu" aria-label="Menu" inert>
            <div class="drawer-top">
                <img src="${SITE.logo}" alt="Hochat Café" width="56" height="55">
                <button class="icon-btn" type="button" id="menuClose" aria-label="Close menu">${icon('close')}</button>
            </div>
            <nav class="mobile-nav" aria-label="Mobile">${linkHtml('mobile-link')}</nav>
            <div class="drawer-bottom">${accountMobile}</div>
        </aside>
    `);

    const toggle = document.getElementById('menuToggle');
    const drawer = document.getElementById('mobileMenu');
    const overlay = document.getElementById('drawerOverlay');
    const close = document.getElementById('menuClose');

    function setDrawer(open) {
        drawer.classList.toggle('is-open', open);
        overlay.classList.toggle('is-open', open);
        drawer.inert = !open;
        toggle.setAttribute('aria-expanded', String(open));
        document.body.classList.toggle('no-scroll', open);
        (open ? close : toggle).focus();
    }

    toggle.addEventListener('click', () => setDrawer(true));
    close.addEventListener('click', () => setDrawer(false));
    overlay.addEventListener('click', () => setDrawer(false));
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && drawer.classList.contains('is-open')) setDrawer(false);
    });
    document.querySelectorAll('[data-logout]').forEach((button) => {
        button.addEventListener('click', logOut);
    });
    updateCartCount();
}

function renderFooter() {
    const year = new Date().getFullYear();
    document.currentScript.insertAdjacentHTML('beforebegin', `
        <footer class="site-footer">
            <div class="container footer-grid">
                <div class="footer-brand">
                    <img src="${SITE.logo}" alt="Hochat Café" width="72" height="71" loading="lazy">
                    <p>Fresh ingredients, unforgettable flavors, and a warm place to share them.</p>
                </div>
                <div>
                    <h2 class="footer-title">Explore</h2>
                    <ul class="footer-list">
                        <li><a href="MenuPage.html">Menu</a></li>
                        <li><a href="AboutUs.html">About Us</a></li>
                        <li><a href="ContactUs.html">Contact Us</a></li>
                    </ul>
                </div>
                <div>
                    <h2 class="footer-title">Visit Us</h2>
                    <ul class="footer-list">
                        <li><a href="${SITE.mapLink}" target="_blank" rel="noopener noreferrer">${icon('pin')}${SITE.location}</a></li>
                        <li class="footer-hours">${icon('clock')}${SITE.hours}</li>
                        <li><a href="${SITE.phoneLink}">${icon('phone')}${SITE.phoneDisplay}</a></li>
                        <li><a href="mailto:${SITE.email}">${icon('mail')}${SITE.email}</a></li>
                    </ul>
                </div>
                <div>
                    <h2 class="footer-title">Follow Us</h2>
                    <div class="social-links">
                        <a href="${SITE.facebook}" target="_blank" rel="noopener noreferrer" aria-label="Facebook">${icon('facebook')}</a>
                        <a href="${SITE.instagram}" target="_blank" rel="noopener noreferrer" aria-label="Instagram">${icon('instagram')}</a>
                    </div>
                </div>
            </div>
            <div class="container footer-bottom">© ${year} Hochat Café. All rights reserved.</div>
        </footer>
    `);
}

function updateCartCount() {
    const count = getUserCart().reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('[data-cart-count]').forEach((badge) => {
        badge.textContent = count;
        badge.hidden = count === 0;
        badge.parentElement.setAttribute('aria-label', count ? `Cart, ${count} item${count === 1 ? '' : 's'}` : 'Cart');
    });
}

// ========== MENU CARDS ==========

function findMenuItem(itemId) {
    for (const category of MENU) {
        const item = category.items.find((entry) => entry.id === itemId);
        if (item) return { item, category };
    }
    return null;
}

function categoryTilesHtml() {
    return MENU.map((category) => `
        <a class="category-tile" href="${category.page}">
            <img src="${category.image}" alt="" loading="lazy">
            <span class="category-tile-text">
                <span class="category-tile-title">${escapeHtml(category.title)}</span>
                <span class="category-tile-count">${category.items.length} items</span>
            </span>
        </a>
    `).join('');
}

function categoryTabsHtml(activeId) {
    return `
        <nav class="category-tabs" aria-label="Menu categories">
            ${MENU.map((category) => `<a class="category-tab${category.id === activeId ? ' is-current' : ''}" href="${category.page}"${category.id === activeId ? ' aria-current="page"' : ''}>${escapeHtml(category.title)}</a>`).join('')}
        </nav>
    `;
}

function renderCategoryTiles() {
    document.currentScript.insertAdjacentHTML('beforebegin', `<div class="category-grid">${categoryTilesHtml()}</div>`);
}

function renderCategoryPage(categoryId) {
    const category = MENU.find((entry) => entry.id === categoryId);
    document.currentScript.insertAdjacentHTML('beforebegin', `
        <section class="page-hero">
            <div class="container">
                <a class="back-link" href="MenuPage.html">${icon('arrowLeft')}All categories</a>
                <h1 class="page-title">${escapeHtml(category.title)}</h1>
            </div>
        </section>
        <div class="container">
            ${categoryTabsHtml(categoryId)}
            <div class="food-grid">
                ${category.items.map((item) => `
                    <a class="food-card" href="AddToCart.html?item=${item.id}">
                        <span class="food-photo"><img src="${item.image}" alt="${escapeHtml(item.name)}" loading="lazy"></span>
                        <span class="food-body">
                            <span class="food-name">${escapeHtml(item.name)}</span>
                            <span class="food-row">
                                <span class="food-price">${formatPeso(item.price)}</span>
                                <span class="food-go">${icon('arrowRight')}</span>
                            </span>
                        </span>
                    </a>
                `).join('')}
            </div>
        </div>
    `);
}

// ========== MESSAGES ==========

function showToast(message, action) {
    let region = document.getElementById('toastRegion');
    if (!region) {
        region = document.createElement('div');
        region.id = 'toastRegion';
        region.className = 'toast-region';
        region.setAttribute('role', 'status');
        document.body.appendChild(region);
    }
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `${icon('check')}<span>${escapeHtml(message)}</span>`;
    if (action) {
        toast.insertAdjacentHTML('beforeend', `<a href="${action.href}">${escapeHtml(action.label)}</a>`);
    }
    region.appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
}

// Shows a message on the next page, such as after logging in.
function setFlashMessage(message) {
    sessionStorage.setItem('flashMessage', message);
}

// Replaces the browser's confirm() box. Resolves true if confirmed.
function showDialog({ title, message, confirmText = 'OK', cancelText = 'Cancel', danger = false }) {
    return new Promise((resolve) => {
        const dialog = document.createElement('dialog');
        dialog.className = 'dialog';
        dialog.innerHTML = `
            <h2 class="dialog-title">${escapeHtml(title)}</h2>
            <p class="dialog-text">${escapeHtml(message)}</p>
            <div class="dialog-actions">
                <button class="btn btn-outline" type="button" data-cancel>${escapeHtml(cancelText)}</button>
                <button class="btn ${danger ? 'btn-danger' : 'btn-primary'}" type="button" data-confirm>${escapeHtml(confirmText)}</button>
            </div>
        `;
        document.body.appendChild(dialog);
        let result = false;
        dialog.querySelector('[data-cancel]').addEventListener('click', () => dialog.close());
        dialog.querySelector('[data-confirm]').addEventListener('click', () => {
            result = true;
            dialog.close();
        });
        dialog.addEventListener('close', () => {
            dialog.remove();
            resolve(result);
        });
        dialog.showModal();
    });
}

// Shown when a guest tries to order.
async function promptLogin() {
    const goToLogin = await showDialog({
        title: 'Log in to order',
        message: 'You can browse everything without an account. To place an order, please log in or create a free account.',
        confirmText: 'Log In',
        cancelText: 'Keep Browsing'
    });
    if (goToLogin) location.href = getLoginUrl();
}

document.addEventListener('DOMContentLoaded', () => {
    const flash = sessionStorage.getItem('flashMessage');
    if (flash) {
        sessionStorage.removeItem('flashMessage');
        showToast(flash);
    }
});
