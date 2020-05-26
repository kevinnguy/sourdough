export const TOTAL_FLOUR = 'Total flour';

export default function getBakerRatio(ingredients) {
  const { percent: totalPercent, gram: totalGram } = ingredients[TOTAL_FLOUR];

  return Object.keys(ingredients).reduce((acc, key) => {
    if (key === TOTAL_FLOUR) {
      acc[TOTAL_FLOUR] = {
        id: TOTAL_FLOUR,
        percent: totalPercent,
        gram: totalGram,
      };

      return acc;
    }

    let { percent, gram } = ingredients[key];
    // percent = Number(((gram / totalGram) * totalPercent).toFixed(1));
    gram = Number(((percent / totalPercent) * totalGram).toFixed(1));

    acc[key] = {
      id: key,
      percent,
      gram,
    };

    return acc;
  }, {});
}

export function getGramFromPercent(percent, total) {
  const { gram: totalGram, percent: totalPercent } = total;
  return Number(((percent / totalPercent) * totalGram).toFixed(1));
}

export function getPercentFromGram(gram, total) {
  const { gram: totalGram, percent: totalPercent } = total;
  return Number(((gram / totalGram) * totalPercent).toFixed(1));
}
