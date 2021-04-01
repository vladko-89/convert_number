const inscriptions = [
  [
    '', 'один', 'два', 'три', 'четыре', 'пять', 'шесть',
    'семь', 'восемь', 'девять', 'десять', 'одиннадцать',
    'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать',
    'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать',
  ],
  [
    '', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят',
    'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто',
  ],
  [
    '', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот',
    'шестьсот', 'семьсот', 'восемьсот', 'девятьсот',
  ],
];

const input = document.querySelector('.input');
const button = document.querySelector('.button');
const result = document.querySelector('.result');


//Обработчик события Click
const handleClickButton = () => {

  const value = input.value;

  convertingToInscription(value);
}

const toFloat = (number) => parseFloat(number);

const plural = (num, options) => {
  if (options.length !== 3) {
    return false;
  }

  num = Math.abs(num) % 100;
  const remains = num % 10;

  if (num > 10 && num < 20) {
    return options[2];
  }

  if (remains > 1 && remains < 5) {
    return options[1];
  }

  if (remains === 1) {
    return options[0];
  }

  return options[2];
};

// Вспомогательная функция. Разбираем тройку (number) на элементы и подставляем слова из массива. Далее, если count > 0, передаем number и дополнительный массив зависимостей  в  plural(number, []), где проверяем какое склонение разрядности мы должны подставить после текущей тройки. Полученное значение возвращаем в parseNumber, а из него в convertingToInscription. Обновляем  значение numeral, обнуляем тройку parts, увеличиваем счетчик и уменьшаем длину исходного числа. Если длина числа равна 0, выводим numeral в html
const parseNumber = (number, count) => {
  let head;
  let tail;
  let numeral = '';

  if (number.length === 3) {
    head = number.substr(0, 1);
    number = number.substr(1, 3);
    numeral = `${inscriptions[2][head]} `;
  }

  if (number < 20) {
    numeral = `${numeral + inscriptions[0][number]} `;
  } else {
    head = number.substr(0, 1);
    tail = number.substr(1, 2);

    numeral = `${numeral + inscriptions[1][head]} ${inscriptions[0][tail]} `;
  }

  if (count === 1) {
    if (numeral !== '  ') {
      numeral += plural(number, ['тысяча ', 'тысячи ', 'тысяч ']);
      numeral = numeral.replace('один ', 'одна ').replace('два ', 'две ');
    }
  } else if (count === 2) {
    if (numeral !== '  ') {
      numeral += plural(number, ['миллион ', 'миллиона ', 'миллионов ']);
    }
  } else if (count === 3) {
    numeral += plural(number, ['миллиард ', 'миллиарда ', 'миллиардов ']);
  }

  return numeral;
};

//Конвертация числа
const convertingToInscription = function (number) {


  const type = typeof number;
  if (type !== 'number' && type !== 'string') {
    return false;
  }

  if (type === 'string') {
    number = toFloat(number.replace(',', '.'));
  }

  if (number <= 0) {
    return false;
  }

  let split;

  number = number.toFixed(0);
  if (number.indexOf('.') !== -1) {
    split = number.split('.');
    number = split[0];
  }

  let numeral = '';
  let length = number.length - 1;
  let parts = '';
  let count = 0;
  let digit;

  // Разбиваем исходное число на тройки
  while (length >= 0) {
    digit = number.substr(length, 1);
    parts = digit + parts;

    if ((parts.length === 3 || length === 0) && !isNaN(toFloat(parts))) {
      numeral = parseNumber(parts, count) + numeral;
      parts = '';
      count++;
    }

    length--;
  }

  result.textContent = numeral;
};

button.addEventListener('click', handleClickButton);
