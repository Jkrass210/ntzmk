export function initDropdowns(dropdownSelector, config = {}) {
  const dropdowns = document.querySelectorAll(dropdownSelector);
  
  if (!dropdowns.length) return;

  const defaultConfig = {
    btnClass: 'drop-down-nav__btn',
    boxClass: 'drop-down-nav__box',
    activeClass: 'active',
    btnBackClass: 'drop-down-nav__btn-back',
    closeOnLinkClick: true
  };

  const { 
    btnClass, 
    boxClass, 
    activeClass, 
    btnBackClass, 
    closeOnLinkClick 
  } = { ...defaultConfig, ...config };

  const handlersMap = new WeakMap();

  dropdowns.forEach(dropdown => {
    const btn = dropdown.querySelector(`.${btnClass}`);
    const box = dropdown.querySelector(`.${boxClass}`);
    
    if (!btn || !box) return;

    const handlers = {
      handleBtnClick: null,
      handleKeyDown: null,
      handleDocClick: null,
      handleBackClick: null,
      handleLinkClick: null
    };

    handlersMap.set(dropdown, handlers);

    const closeDropdown = () => {
      btn.classList.remove(activeClass);
      removeEventListeners();
    };

    const closeAllOtherDropdowns = () => {
      document.querySelectorAll(`${dropdownSelector} .${btnClass}.${activeClass}`).forEach(otherBtn => {
        if (otherBtn !== btn) {
          otherBtn.classList.remove(activeClass);
          const otherDropdown = otherBtn.closest(dropdownSelector);
          const otherHandlers = handlersMap.get(otherDropdown);
          if (otherHandlers) {
            otherHandlers.handleKeyDown = null;
          }
        }
      });
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeDropdown();
      }
    };

    const handleDocClick = (e) => {
      if (!dropdown.contains(e.target)) {
        closeDropdown();
      }
    };

    const setupEventListeners = () => {
      handlers.handleBtnClick = (e) => {
        e.stopPropagation();
        closeAllOtherDropdowns();
        btn.classList.toggle(activeClass);
        
        if (btn.classList.contains(activeClass)) {
          document.addEventListener('keydown', handleKeyDown);
          document.addEventListener('click', handleDocClick);
        } else {
          removeEventListeners();
        }
      };

      handlers.handleBackClick = () => closeDropdown();
      handlers.handleLinkClick = () => closeDropdown();

      btn.addEventListener('click', handlers.handleBtnClick);
      
      const btnBack = dropdown.querySelector(`.${btnBackClass}`);
      if (btnBack) {
        btnBack.addEventListener('click', handlers.handleBackClick);
      }

      if (closeOnLinkClick) {
        const links = box.querySelectorAll('a');
        links.forEach(link => {
          link.addEventListener('click', handlers.handleLinkClick);
        });
      }
    };

    const removeEventListeners = () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleDocClick);
    };

    setupEventListeners();

    dropdown.cleanupDropdown = () => {
      removeEventListeners();
      btn.removeEventListener('click', handlers.handleBtnClick);
      
      const btnBack = dropdown.querySelector(`.${btnBackClass}`);
      if (btnBack) {
        btnBack.removeEventListener('click', handlers.handleBackClick);
      }

      if (closeOnLinkClick) {
        const links = box.querySelectorAll('a');
        links.forEach(link => {
          link.removeEventListener('click', handlers.handleLinkClick);
        });
      }
      
      handlersMap.delete(dropdown);
    };
  });

  return {
    destroyAll: () => {
      dropdowns.forEach(dropdown => {
        const cleanup = dropdown.cleanupDropdown;
        if (typeof cleanup === 'function') {
          cleanup();
        }
      });
    }
  };
}