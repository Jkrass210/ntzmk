export function initContactsModal(options = {}) {
  const {
    contactsSelector = '.header__contacts',
    buttonSelector = '.open-contacts',
    closeButtonSelector = '.js-close',
    bodyClass = 'active',
  } = options;

  const contactsEl = document.querySelector(contactsSelector);
  const openButton = document.querySelector(buttonSelector);
  const closeButton = contactsEl?.querySelector(closeButtonSelector);

  // Проверяем наличие всех необходимых элементов
  if (!contactsEl || !openButton) {
    console.warn('Contacts modal: required elements not found');
    return;
  }

  // Функция открытия модального окна
  function openModal() {
    contactsEl.classList.add(bodyClass);
    openButton.classList.add(bodyClass);
    document.body.style.overflow = 'hidden';
  }

  // Функция закрытия модального окна
  function closeModal() {
    contactsEl.classList.remove(bodyClass);
    openButton.classList.remove(bodyClass);
    document.body.style.overflow = '';
  }

  // Обработчик клика по кнопке открытия
  openButton.addEventListener('click', openModal);

  // Обработчик клика по кнопке закрытия (если есть)
  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }

  // Обработчик клика вне контентной области
  contactsEl.addEventListener('click', function (e) {
    if (e.target === contactsEl) {
      closeModal();
    }
  });

  // Обработчик клавиши ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && contactsEl.classList.contains(bodyClass)) {
      closeModal();
    }
  });

  // Возвращаем методы для внешнего управления
  return {
    open: openModal,
    close: closeModal
  };
}