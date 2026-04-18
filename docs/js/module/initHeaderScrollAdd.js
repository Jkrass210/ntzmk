export function initHeaderScrollAdd() {
  // Проверка существования необходимого элемента
  const header = document.getElementById('header');
  if (!header) {
    console.warn('Элемент header не найден');
    return;
  }

  // Флаг для оптимизации производительности
  let ticking = false;

  // Функция обработки скролла
  function handleScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 200) {
          header.classList.add('header-scroll-add');
        } else {
          header.classList.remove('header-scroll-add');
        }
        ticking = false;
      });
      ticking = true;
    }
  }

  // Обработчик события скролла с троттлингом
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Инициализация начального состояния
  handleScroll();

  // Возвращаем метод для удаления обработчика (опционально)
  return {
    destroy: () => {
      window.removeEventListener('scroll', handleScroll);
    }
  };
}