export function initDropDownFilter1({
  rootSelector = '.drop-down-filter-1',
  btnSelector = '.drop-down-filter-1__btn',
  boxSelector = '.drop-down-filter-1__box',
  linkSelector = '.drop-down-filter-1__link',
  textSelector = '.text',
  activeClass = 'active',
  disabledClass = 'disabled'
} = {}) {
  const dropdowns = document.querySelectorAll(rootSelector);
  if (!dropdowns.length) return;

  dropdowns.forEach(container => {
    const button = container.querySelector(btnSelector);
    const box = container.querySelector(boxSelector);
    const textSpan = container.querySelector(textSelector);
    const links = box?.querySelectorAll(linkSelector);

    if (!button || !box || !textSpan || !links?.length) return;

    const closeDropdown = () => {
      button.classList.remove(activeClass);
      box.classList.remove(activeClass);
      document.removeEventListener('click', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };

    const openDropdown = () => {
      button.classList.add(activeClass);
      box.classList.add(activeClass);
      document.addEventListener('click', handleOutsideClick);
      document.addEventListener('keydown', handleEscape);
      updateLinksState();
    };

    const handleOutsideClick = e => {
      if (!container.contains(e.target)) {
        closeDropdown();
      }
    };

    const handleEscape = e => {
      if (e.key === 'Escape') {
        closeDropdown();
      }
    };

    const updateLinksState = () => {
      const currentText = textSpan.textContent.trim();

      links.forEach(link => {
        link.classList.toggle(
          disabledClass,
          link.textContent.trim() === currentText
        );
      });
    };

    button.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      button.classList.contains(activeClass)
        ? closeDropdown()
        : openDropdown();
    });

    links.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();

        textSpan.textContent = link.textContent.trim();
        closeDropdown();
        updateLinksState();
      });
    });

    updateLinksState();
  });
}
