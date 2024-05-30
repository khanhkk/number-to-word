const numWords = require('num-words');
const VNnum2words = require('vn-num2words');

const NumberToVNWord = (number, decimalRounding = 2) => {
  let sentence = '';

  if (isNaN(number)) {
    return sentence;
  }

  number = Number(number);

  //check input is negative
  if (number < 0) {
    sentence = 'âm ';
  }

  //check input is integer or float
  if (Number.isInteger(number)) {
    sentence += VNnum2words(number);
  } else {
    sentence += VNnum2words(Math.floor(number)).trim();
    const round = Math.pow(10, decimalRounding);
    let decimalPortion = Math.round((number * round) % round);

    if (decimalPortion > 0) {
      sentence += ' phẩy ';
      let loop = decimalRounding;

      while (loop - 1 > 0) {
        const exactlyDecimal = decimalPortion / Math.pow(10, loop - 1);

        if (Math.ceil(exactlyDecimal % 1) === 0) {
          decimalPortion = exactlyDecimal;
          break;
        }

        if (decimalPortion < Math.pow(10, loop - 1)) {
          sentence += 'không ';
        }
        loop--;
      }

      let loop2 = decimalRounding;
      let decimalPortionLoop = decimalPortion;
      //sentence += VNnum2words(decimalPortion);
      while (loop2 > 0) {
        const value = Math.floor(decimalPortionLoop / Math.pow(10, loop2 - 1));

        if (value > 0 || decimalPortion > Math.pow(10, loop2 - 1)) {
          sentence += ' ' + VNnum2words(value);
          decimalPortionLoop -= value * Math.pow(10, loop2 - 1);
        }

        loop2--;
      }
    }
  }

  return sentence
    .trim()
    .replace(/muời/g, 'mười')
    .replace(/mười năm/g, 'mười lăm')
    .replace(/  /g, ' ');
};

const NumberToENWord = (number, decimalRounding = 2) => {
  let sentence = '';

  if (isNaN(number)) {
    return sentence;
  }

  number = Number(number);

  //check input is negative
  if (number < 0) {
    sentence = 'negative ';
  }

  //check input is integer or float
  if (Number.isInteger(number)) {
    sentence += numWords(number);
  } else {
    sentence += numWords(Math.floor(number)).trim();
    const round = Math.pow(10, decimalRounding);
    let decimalPortion = Math.round((number * round) % round);

    if (decimalPortion > 0) {
      sentence += ' point ';
      let loop = decimalRounding;

      while (loop - 1 > 0) {
        const exactlyDecimal = decimalPortion / Math.pow(10, loop - 1);

        if (Math.ceil(exactlyDecimal % 1) === 0) {
          decimalPortion = exactlyDecimal;
          break;
        }

        if (decimalPortion < Math.pow(10, loop - 1)) {
          sentence += 'oh ';
        }

        loop--;
      }

      let loop2 = decimalRounding;
      let decimalPortionLoop = decimalPortion;
      //sentence += numWords(decimalPortion);
      while (loop2 > 0) {
        const value = Math.floor(decimalPortionLoop / Math.pow(10, loop2 - 1));

        if (value > 0 || decimalPortion > Math.pow(10, loop2 - 1)) {
          if (value > 0) {
            sentence += ' ' + numWords(value);
          } else {
            sentence += ' oh ';
          }
          decimalPortionLoop -= value * Math.pow(10, loop2 - 1);
        }

        loop2--;
      }
    }
  }

  return sentence.trim().replace(/  /g, ' ');
};

module.exports = { NumberToVNWord, NumberToENWord };
