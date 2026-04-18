export function initLocationTabs() {
  const locationBoxes = document.querySelectorAll('.box-location');
  let activeBox = null;

  // Функция для скролла к контенту с учетом хедера
  const scrollToContent = (content) => {
    const headerHeight = 180; // Высота хедера
    const contentRect = content.getBoundingClientRect();
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Вычисляем позицию для скролла
    const targetScroll = currentScroll + contentRect.top - headerHeight;
    
    // Плавный скролл
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  // Функция для проверки и корректировки позиции контента
  const adjustContentPosition = (box) => {
    const content = box.querySelector('.box-location__content');
    if (!content) return;

    const container = box.closest('.box-point') || document.body;
    const containerRect = container.getBoundingClientRect();
    const contentRect = content.getBoundingClientRect();

    // Сбрасываем класс и стили
    content.classList.remove('move');
    content.style.left = '';
    content.style.right = '';

    // Проверяем выход за левую границу
    if (contentRect.left < containerRect.left) {
      const offset = containerRect.left - contentRect.left - 90;
      content.style.left = offset + 'px';
      content.classList.add('move');
    }

    // Проверяем выход за правую границу
    if (contentRect.right > containerRect.right) {
      const offset = contentRect.right - containerRect.right - 90;
      content.style.right = offset + 'px';
      content.style.left = 'auto';
      content.classList.add('move');
    }
  };

  // Функция закрытия всех табов
  const closeAllTabs = () => {
    locationBoxes.forEach(box => {
      const btn = box.querySelector('.box-location__btn');
      const content = box.querySelector('.box-location__content');

      if (btn) btn.classList.remove('active');
      if (content) {
        content.classList.remove('active');
        content.classList.remove('move');
        content.style.left = '';
        content.style.right = '';
      }
    });
    activeBox = null;
  };

  // Функция открытия/закрытия конкретного таба
  const toggleTab = (box, isOpen) => {
    const btn = box.querySelector('.box-location__btn');
    const content = box.querySelector('.box-location__content');
    const shouldOpen = isOpen !== undefined ? isOpen : !content.classList.contains('active');

    if (shouldOpen) {
      // Закрываем все остальные
      closeAllTabs();
      // Открываем текущий
      btn.classList.add('active');
      content.classList.add('active');
      activeBox = box;

      // Корректируем позицию после открытия
      setTimeout(() => {
        adjustContentPosition(box);
        // Скроллим к контенту
        scrollToContent(content);
      }, 10);
    } else {
      closeAllTabs();
    }
  };

  // Обработчики ресайза и скролла
  const handlePositionUpdate = () => {
    if (activeBox) {
      adjustContentPosition(activeBox);
    }
  };

  locationBoxes.forEach(box => {
    // Обновляем счетчик слайдов
    const countElement = box.querySelector('.count');
    const slides = box.querySelectorAll('.swiper-slide');
    if (countElement && slides.length > 0) {
      countElement.textContent = slides.length;
    }

    // Элементы таба
    const btn = box.querySelector('.box-location__btn');
    const content = box.querySelector('.box-location__content');
    const closeBtn = content?.querySelector('.js-close');

    if (!btn || !content) return;

    // Клик по кнопке
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleTab(box);
    });

    // Клик по кнопке закрытия
    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleTab(box, false);
      });
    }
  });

  // Один общий обработчик для клика вне блоков
  document.addEventListener('click', (e) => {
    if (!activeBox) return;

    // Проверяем, был ли клик вне активного блока
    let clickedInside = false;
    locationBoxes.forEach(box => {
      if (box.contains(e.target)) {
        clickedInside = true;
      }
    });

    // Если клик был вне всех блоков локации - закрываем
    if (!clickedInside) {
      closeAllTabs();
    }
  });

  // ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && activeBox) {
      closeAllTabs();
    }
  });

  // Слушаем изменения
  window.addEventListener('resize', handlePositionUpdate);
}