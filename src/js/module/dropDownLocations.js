export function dropDownLocations() {
  const MOBILE_MAX = 1023;

  function init() {
    const isMobile = window.innerWidth <= MOBILE_MAX;

    const wrapper = document.querySelector('.box-point-wrapper');
    if (!wrapper) return;

    const btns = [...wrapper.querySelectorAll('.drop-down-type-2__btn-district')];
    const boxes = [...wrapper.querySelectorAll('.box-location')];

    if (!btns.length || !boxes.length) return;

    // Очистка всех active
    function clearActive() {
      btns.forEach(btn => btn.classList.remove('active'));
      boxes.forEach(box => box.classList.remove('active'));
    }

    // Активация пары по id
    function activatePair(id) {
      clearActive();

      const btn = btns.find(b => b.dataset.idDistrict === id);
      const box = boxes.find(b => b.dataset.id === id);

      if (btn) btn.classList.add('active');
      if (box) box.classList.add('active');
    }

    // Логика для mobile
    if (isMobile) {
      // Включаем первую пару
      const firstId = btns[0].dataset.idDistrict;
      activatePair(firstId);

      // Навешиваем клики
      btns.forEach(btn => {
        btn.onclick = () => {
          const id = btn.dataset.idDistrict;
          activatePair(id);
        };
      });
    } else {
      // Если вышли из мобильного режима — всё очищаем
      clearActive();
      btns.forEach(btn => (btn.onclick = null));
    }
  }

  // Запуск при загрузке
  init();

  // Запуск при ресайзе
  window.addEventListener('resize', init);
}
