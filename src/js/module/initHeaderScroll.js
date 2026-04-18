export function initHeaderScroll() {
  const header = document.getElementById('header');
  const whiteElements = document.querySelectorAll('.header-white');

  if (!header || whiteElements.length === 0) return;

  function checkHeaderPosition() {
    const headerRect = header.getBoundingClientRect();
    const headerBottom = headerRect.bottom;

    let isOverWhite = false;

    whiteElements.forEach(element => {
      const elementRect = element.getBoundingClientRect();
      if (headerBottom > elementRect.top && headerBottom < elementRect.bottom) {
        isOverWhite = true;
      }
    });

    if (isOverWhite) {
      header.classList.add('light');
    } else {
      header.classList.remove('light');
    }
  }

  window.addEventListener('scroll', checkHeaderPosition);
  window.addEventListener('resize', checkHeaderPosition);
  checkHeaderPosition();
}