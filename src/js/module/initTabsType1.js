export function initTabsType1() {
  const tabsParents = document.querySelectorAll('.js-tabs-tipe-1');
  if (!tabsParents.length) return;

  tabsParents.forEach((parent) => {
    const buttons = parent.querySelectorAll('.js-tabs-tipe-1-btn');
    const boxes = parent.querySelectorAll('.js-tabs-tipe-1-box');

    if (!buttons.length || !boxes.length) return;
    if (buttons.length !== boxes.length) return;

    // начальное состояние
    boxes.forEach((box, index) => {
      box.style.display = index === 0 ? '' : 'none';
    });

    buttons.forEach((btn, index) => {
      btn.classList.toggle('active', index === 0);

      btn.addEventListener('click', (e) => {
        e.preventDefault(); // ❗ убираем переход по ссылке

        // скрываем все блоки
        boxes.forEach((box) => {
          box.style.display = 'none';
        });

        // убираем active со всех кнопок
        buttons.forEach((button) => {
          button.classList.remove('active');
        });

        // показываем нужный блок и активируем кнопку
        boxes[index].style.display = '';
        btn.classList.add('active');
      });
    });
  });
}