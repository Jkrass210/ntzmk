export function initDropDownType2() {
  const dropdowns = document.querySelectorAll('.drop-down-type-2');
  if (!dropdowns.length) return;

  // Функция инициализации — создаёт обработчики
  const init = () => {
    dropdowns.forEach(drop => {
      const btn = drop.querySelector('.drop-down-type-2__btn');
      const box = drop.querySelector('.drop-down-type-2__box');
      const districtBtns = drop.querySelectorAll('.drop-down-type-2__btn-district');

      if (!btn || !box) return;

      // Сохраняем ссылки, чтобы потом удалить слушатели
      drop._handlers = {
        toggle: (e) => {
          e.stopPropagation();
          const isActive = btn.classList.contains('active');
          btn.classList.toggle('active', !isActive);
          box.classList.toggle('active', !isActive);
        },
        close: () => {
          btn.classList.remove('active');
          box.classList.remove('active');
        }
      };

      btn.addEventListener('click', drop._handlers.toggle);
      districtBtns.forEach(b => b.addEventListener('click', drop._handlers.close));
    });
  };

  // Функция удаления событий
  const destroy = () => {
    dropdowns.forEach(drop => {
      if (!drop._handlers) return;

      const btn = drop.querySelector('.drop-down-type-2__btn');
      const box = drop.querySelector('.drop-down-type-2__box');
      const districtBtns = drop.querySelectorAll('.drop-down-type-2__btn-district');

      if (btn) btn.removeEventListener('click', drop._handlers.toggle);
      districtBtns.forEach(b => b.removeEventListener('click', drop._handlers.close));

      // Очистка состояния
      if (btn) btn.classList.remove('active');
      if (box) box.classList.remove('active');

      drop._handlers = null;
    });
  };

  let isActive = false;

  // Контроллер ширины
  const check = () => {
    const w = window.innerWidth;

    if (w <= 1023 && !isActive) {
      init();
      isActive = true;
    } else if (w >= 1024 && isActive) {
      destroy();
      isActive = false;
    }
  };

  // Запуск при загрузке
  check();

  // Реакция на ресайз
  window.addEventListener('resize', check, { capture: true });
}
