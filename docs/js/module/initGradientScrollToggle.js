export function initGradientScrollToggle(options = {}) {
  const {
    wrapperSelector = '.modal-history__wrapper',
    gradientClass = 'scrolled',
    startClass = 'scroll-start',
    endClass = 'scroll-end',
    tolerance = 1
  } = options;

  const wrapper = document.querySelector(wrapperSelector);

  if (!wrapper) {
    console.warn(`Элемент "${wrapperSelector}" не найден`);
    return () => { };
  }

  const updateGradientVisibility = () => {
    const scrollTop = wrapper.scrollTop;
    const scrollHeight = wrapper.scrollHeight;
    const clientHeight = wrapper.clientHeight;

    // Проверяем, требуется ли скролл
    const scrollRequired = scrollHeight > clientHeight + tolerance;

    if (!scrollRequired) {
      // Удаляем все классы если скролл не нужен
      wrapper.classList.remove(gradientClass, startClass, endClass, 'scroll-middle');
      return;
    }

    const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < tolerance;
    const isAtTop = scrollTop < tolerance;
    const isInMiddle = !isAtTop && !isAtBottom;

    wrapper.classList.toggle(gradientClass, !isAtBottom);
    wrapper.classList.toggle(startClass, isAtTop);
    wrapper.classList.toggle(endClass, isAtBottom);
    wrapper.classList.toggle('scroll-middle', isInMiddle);
  };

  // Храним observers локально
  let resizeObserver = null;
  let mutationObserver = null;

  const setupObservers = () => {
    // ResizeObserver для изменений размеров
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        updateGradientVisibility();
      });
      
      // Наблюдаем только за wrapper, этого обычно достаточно
      resizeObserver.observe(wrapper);
    }

    // MutationObserver для изменений содержимого
    if (typeof MutationObserver !== 'undefined') {
      mutationObserver = new MutationObserver(() => {
        updateGradientVisibility();
      });
      
      mutationObserver.observe(wrapper, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }
  };

  // Инициализация
  wrapper.addEventListener('scroll', updateGradientVisibility);
  updateGradientVisibility();
  
  // Запускаем observers
  setupObservers();

  const cleanup = () => {
    // Удаляем слушатель событий
    wrapper.removeEventListener('scroll', updateGradientVisibility);
    
    // Отключаем observers
    if (resizeObserver) {
      resizeObserver.disconnect();
    }
    
    if (mutationObserver) {
      mutationObserver.disconnect();
    }
    
    // Удаляем классы
    wrapper.classList.remove(gradientClass, startClass, endClass, 'scroll-middle');
  };

  return cleanup;
}