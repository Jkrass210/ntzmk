export function initMobileDropdowns(options = {}) {
  const {
    dropdownSelector = '.drop-down-type-1',
    mainButtonSelector = '.drop-down-type-1__main-btn',
    boxSelector = '.drop-down-type-1__box',
    closeButtonSelector = '.js-close',
    linkSelector = '.drop-down-type-1__item-link',
    activeClass = 'active',
    breakpoint = 1100
  } = options;

  let dropdowns = [];

  function init() {
    if (window.innerWidth > breakpoint) {
      destroy();
      return;
    }

    const dropdownElements = document.querySelectorAll(dropdownSelector);

    dropdownElements.forEach(dropdownEl => {
      const mainBtn = dropdownEl.querySelector(mainButtonSelector);
      const box = dropdownEl.querySelector(boxSelector);
      const closeBtn = box?.querySelector(closeButtonSelector);
      const links = box ? Array.from(box.querySelectorAll(linkSelector)) : [];

      if (!mainBtn || !box) {
        console.warn('Mobile dropdown: required elements not found in', dropdownEl);
        return;
      }

      if (dropdowns.find(d => d.dropdownEl === dropdownEl)) {
        return;
      }

      function openDropdown(e) {
        e.preventDefault();

        // Закрываем все остальные dropdowns
        dropdowns.forEach(({ closeDropdown }) => {
          closeDropdown();
        });

        box.classList.add(activeClass);
        mainBtn.classList.add(activeClass);
      }

      function closeDropdown() {
        box.classList.remove(activeClass);
        mainBtn.classList.remove(activeClass);
      }

      function toggleDropdown(e) {
        e.preventDefault();

        if (box.classList.contains(activeClass)) {
          closeDropdown();
        } else {
          // Закрываем все остальные dropdowns перед открытием
          dropdowns.forEach(({ closeDropdown }) => {
            closeDropdown();
          });
          box.classList.add(activeClass);
          mainBtn.classList.add(activeClass);
        }
      }

      function handleClickOutside(e) {
        // Если клик вне dropdown и dropdown открыт
        if (!dropdownEl.contains(e.target) && box.classList.contains(activeClass)) {
          closeDropdown();
        }
      }

      // Обработчик клика по основной кнопке (toggle)
      mainBtn.addEventListener('click', toggleDropdown);

      // Обработчик клика по кнопке закрытия
      if (closeBtn) {
        closeBtn.addEventListener('click', closeDropdown);
      }

      // Обработчики клика по ссылкам
      links.forEach(link => {
        link.addEventListener('click', closeDropdown);
      });

      // Обработчик клика вне dropdown
      document.addEventListener('click', handleClickOutside);

      dropdowns.push({
        dropdownEl,
        mainBtn,
        box,
        closeBtn,
        links,
        openDropdown,
        closeDropdown,
        toggleDropdown,
        handleClickOutside
      });
    });
  }

  function destroy() {
    dropdowns.forEach(({ mainBtn, closeBtn, links, toggleDropdown, closeDropdown, handleClickOutside }) => {
      mainBtn.removeEventListener('click', toggleDropdown);

      if (closeBtn) {
        closeBtn.removeEventListener('click', closeDropdown);
      }

      links.forEach(link => {
        link.removeEventListener('click', closeDropdown);
      });

      document.removeEventListener('click', handleClickOutside);
    });

    dropdowns = [];
  }

  function handleResize() {
    if (window.innerWidth <= breakpoint && dropdowns.length === 0) {
      init();
    } else if (window.innerWidth > breakpoint) {
      destroy();
    }
  }

  function handleKeydown(e) {
    if (e.key === 'Escape') {
      dropdowns.forEach(({ box, closeDropdown }) => {
        if (box.classList.contains(activeClass)) {
          closeDropdown();
        }
      });
    }
  }

  // Инициализация при загрузке
  init();

  // Обработчики событий
  window.addEventListener('resize', handleResize);
  document.addEventListener('keydown', handleKeydown);

  return {
    init,
    destroy,
    getDropdowns: () => dropdowns
  };
}