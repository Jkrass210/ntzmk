export function initTabs(options = {}) {
  const defaultOptions = {
    triggerClass: 'js-open-tab',
    contentClass: 'js-tab',
    activeClass: 'active'
  };

  const config = { ...defaultOptions, ...options };

  const triggers = document.querySelectorAll(`.${config.triggerClass}`);
  const contents = document.querySelectorAll(`.${config.contentClass}`);

  // Проверяем наличие необходимых элементов
  if (triggers.length === 0 || contents.length === 0) {
    console.warn('Tabs: Не найдены элементы для инициализации');
    return;
  }

  // Закрытие всех табов кроме указанного
  const closeAllTabs = (exceptTrigger = null) => {
    triggers.forEach(trigger => {
      if (trigger !== exceptTrigger) {
        trigger.classList.remove(config.activeClass);
      }
    });

    contents.forEach(content => {
      if (!exceptTrigger ||
        !exceptTrigger.closest('.section-contacts-requisites')?.querySelector(`.${config.contentClass}`)?.contains(content)) {
        content.classList.remove(config.activeClass);
      }
    });
  };

  // Обработчик клика по триггеру
  const handleTriggerClick = (event) => {
    const trigger = event.currentTarget;
    const parent = trigger.closest('.section-contacts-requisites');

    if (!parent) return;

    const content = parent.querySelector(`.${config.contentClass}`);
    if (!content) return;

    const isActive = trigger.classList.contains(config.activeClass);

    // Если нужно закрывать другие табы при открытии нового, раскомментируйте:
    // if (!isActive) {
    //   closeAllTabs(trigger);
    // }

    // Переключаем состояние текущего таба
    trigger.classList.toggle(config.activeClass);
    content.classList.toggle(config.activeClass);
  };

  // Обработчик нажатия клавиши ESC
  const handleEscapeKey = (event) => {
    if (event.key === 'Escape') {
      closeAllTabs();
    }
  };

  // Инициализация
  triggers.forEach(trigger => {
    trigger.addEventListener('click', handleTriggerClick);
  });

  document.addEventListener('keydown', handleEscapeKey);

  // Возвращаем метод для ручного закрытия всех табов
  return {
    closeAll: () => closeAllTabs()
  };
}