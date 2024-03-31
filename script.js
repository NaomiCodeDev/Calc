document.addEventListener('DOMContentLoaded', function() {
    var amountInput = document.getElementById('amount');
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    var vatAmountInput = document.getElementById('vatAmount');
    var exclAmountInput = document.getElementById('exclAmount');
    var convertBtn = document.getElementById('convertBtn'); // Получаем кнопку "Конвертировать"

    checkboxes.forEach(function(checkbox) {
      checkbox.addEventListener('change', function() {
        if (this.checked) {
          checkboxes.forEach(function(otherCheckbox) {
            if (otherCheckbox !== checkbox) {
              otherCheckbox.checked = false;
            }
          });
        }
        calculate();
      });
    });

    amountInput.addEventListener('input', function() {
      calculate();
    });

    // Функция для конвертации и перехода на сайт
    function convertAndRedirect() {
      var exclAmount = exclAmountInput.value; // Получаем значение "exclAmount"
      var url = "https://myfin.by/converter?utm_source=myfin&utm_medium=organic&utm_campaign=menu&val_nbrb=pln-" + exclAmount; // Формируем URL
      window.location.href = url; // Переходим на сайт
    }

    // Привязываем функцию к событию клика на кнопке
    convertBtn.addEventListener('click', convertAndRedirect);

    function calculate() {
      var amount = parseFloat(amountInput.value);
      var vatPercent = 0;

      checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
          vatPercent = parseFloat(checkbox.value);
        }
      });

      var vatAmount = (amount / (100 + vatPercent)) * vatPercent;
      var exclAmount = amount - vatAmount;

      vatAmountInput.value = vatAmount.toFixed(2);
      exclAmountInput.value = exclAmount.toFixed(2);
    }
  });
