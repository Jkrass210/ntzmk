export function initStaticTabs() {
  // Находим все контейнеры табов
  const tabsContainers = document.querySelectorAll('.static-tabs');

  if (tabsContainers.length === 0) {
    console.warn('Контейнеры .static-tabs не найдены');
    return;
  }

  // Функция для закрытия всех табов в контейнере
  const closeAllTabsInContainer = (container) => {
    const activeBtns = container.querySelectorAll('.static-tab__btn.active');
    const activeBoxes = container.querySelectorAll('.static-tab__box.active');

    activeBtns.forEach(btn => btn.classList.remove('active'));
    activeBoxes.forEach(box => box.classList.remove('active'));
  };

  // Функция для закрытия конкретного таба
  const closeTab = (btn, box) => {
    btn.classList.remove('active');
    box.classList.remove('active');
  };

  // Функция для открытия таба
  const openTab = (btn, box) => {
    btn.classList.add('active');
    box.classList.add('active');
  };

  // Обработчик клика по кнопке таба
  const handleTabClick = (event, container) => {
    const btn = event.currentTarget;
    const tab = btn.closest('.static-tab');

    if (!tab) return;

    const box = tab.querySelector('.static-tab__box');

    if (!box) {
      console.warn('Не найден .static-tab__box для кнопки', btn);
      return;
    }

    const isActive = btn.classList.contains('active');

    // Закрываем все табы в контейнере
    closeAllTabsInContainer(container);

    // Если таб был неактивен - открываем его
    if (!isActive) {
      openTab(btn, box);
    }
  };

  // Обработчик нажатия клавиши ESC
  const handleKeyDown = (event) => {
    if (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27) {
      tabsContainers.forEach(container => {
        closeAllTabsInContainer(container);
      });
    }
  };

  // Инициализация одного контейнера табов
  const initTabsContainer = (container) => {
    // Находим все кнопки табов в контейнере
    const tabBtns = container.querySelectorAll('.static-tab__btn');
    const tabs = container.querySelectorAll('.static-tab');

    if (tabBtns.length === 0 || tabs.length === 0) {
      console.warn('Не найдены табы или кнопки в контейнере', container);
      return;
    }

    // Проверяем наличие блоков контента
    let hasAllBoxes = true;
    tabs.forEach(tab => {
      if (!tab.querySelector('.static-tab__box')) {
        hasAllBoxes = false;
        console.warn('Не найден .static-tab__box в табе', tab);
      }
    });

    if (!hasAllBoxes) return;

    // Назначаем обработчики клика для каждой кнопки
    tabBtns.forEach(btn => {
      btn.addEventListener('click', (event) => handleTabClick(event, container));
    });

    // Закрываем все табы при инициализации
    closeAllTabsInContainer(container);
  };

  // Основная функция инициализации
  const init = () => {
    tabsContainers.forEach(container => {
      initTabsContainer(container);
    });

    // Добавляем глобальный обработчик для ESC
    document.addEventListener('keydown', handleKeyDown);
  };

  // Функция для удаления обработчиков (опционально)
  const destroy = () => {
    document.removeEventListener('keydown', handleKeyDown);

    tabsContainers.forEach(container => {
      const tabBtns = container.querySelectorAll('.static-tab__btn');
      tabBtns.forEach(btn => {
        btn.removeEventListener('click', handleTabClick);
      });
    });
  };

  // Запускаем инициализацию
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Возвращаем методы для управления
  return {
    destroy,
    // Метод для ручного закрытия всех табов
    closeAllTabs: () => {
      tabsContainers.forEach(container => {
        closeAllTabsInContainer(container);
      });
    }
  };
}