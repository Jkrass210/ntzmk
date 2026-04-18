export function initFormValidation() {
  console.log('Form validation module loaded');

  $('.js-phone-mask').inputmask('+7 999 999-99-99');

  let doc = $(document);

  // Валидация файлов
  doc.on('change', '.js-file', function () {
    let input = this;
    let file = input.files[0];

    if (!file) {
      $(input).removeClass('error');
      return;
    }

    let allowedTypes = ['image/jpeg', 'image/png'];

    if (!allowedTypes.includes(file.type)) {
      $(input).addClass('error');
      input.value = '';
    } else {
      $(input).removeClass('error');
    }
  });

  // Отправка формы
  doc.on('submit', '.js-form', function (e) {

    console.log('Form submit');

    let errors = 0;
    let form = $(this);
    let requireds = form.find('.required');
    let errorsInfo = form.find('.form__error-info');

    requireds.removeClass('error');
    errorsInfo.removeClass('show');

    requireds.each(function (idx, input) {
      let $input = $(input);
      let val = $input.val();
      let type = input.type;

      // Для чекбоксов проверяем состояние checked
      if (type === 'checkbox' && $input.hasClass('required-checkbox')) {
        if (!input.checked) {
          $input.addClass('error');
          errors++;
        }
        return; // Выходим из итерации для чекбоксов
      }

      // Для радиокнопок (radio) - особый случай
      if (type === 'radio' && $input.hasClass('required-radio')) {
        let name = input.name;
        // Проверяем, выбран ли хоть один radio с этим name
        let isRadioChecked = form.find(`input[name="${name}"]:checked`).length > 0;
        if (!isRadioChecked) {
          // Добавляем ошибку всем radio с этим именем
          form.find(`input[name="${name}"]`).addClass('error');
          errors++;
        }
        return;
      }

      // Стандартная проверка для остальных полей
      if (val.length == 0) {
        $input.addClass('error');
        errors++;
      }

      if ($input.hasClass('required-phone')) {
        let phone = val.replace(/\D+/g, "");
        if (phone.length < 11) {
          $input.addClass('error');
          errors++;
        }
      }

      if ($input.hasClass('required-mail')) {
        let emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailReg.test(val)) {
          $input.addClass('error');
          errors++;
        }
      }

      if ($input.hasClass('required-evaluation')) {
        if (!/^[1-5]$/.test(val)) {
          $input.addClass('error');
          errors++;
        }
      }
    });

    if (errors > 0) {
        e.preventDefault();
      errorsInfo.addClass('show');
        BX.closeWait();
    } else {

      
    }
  });

  // Обработчик для снятия ошибки с чекбокса при клике
  doc.on('change', '.required-checkbox', function () {
    if (this.checked) {
      $(this).removeClass('error');
    }
  });

  // Обработчик для снятия ошибки с радиокнопок при выборе
  doc.on('change', '.required-radio', function () {
    let name = this.name;
    $(`input[name="${name}"]`).removeClass('error');
  });
}