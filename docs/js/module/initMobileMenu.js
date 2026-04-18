export function initMobileMenu(options = {}) {
    const {
        menuSelector = '.header__bottom',
        burgerSelector = '.btn-burger',
        closeButtonSelector = '.js-close',
        linkSelectors = ['.drop-down-type-1__item-link', '.nav-link'],
        activeClass = 'active'
    } = options;

    const menuEl = document.querySelector(menuSelector);
    const burgerBtn = document.querySelector(burgerSelector);
    const closeBtn = menuEl?.querySelector(closeButtonSelector);
    const linkEls = menuEl ? Array.from(menuEl.querySelectorAll(linkSelectors.join(','))) : [];

    if (!menuEl || !burgerBtn) {
        console.warn('Mobile menu: required elements not found');
        return;
    }

    function openMenu() {
        menuEl.classList.add(activeClass);
        burgerBtn.classList.add(activeClass);
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        menuEl.classList.remove(activeClass);
        burgerBtn.classList.remove(activeClass);
        document.body.style.overflow = '';
    }

    burgerBtn.addEventListener('click', openMenu);

    if (closeBtn) {
        closeBtn.addEventListener('click', closeMenu);
    }

    linkEls.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && menuEl.classList.contains(activeClass)) {
            closeMenu();
        }
    });

    return {
        open: openMenu,
        close: closeMenu
    };
}