export const formatCurrency = (price = 0): string => {
  const formatOpts = {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 3
  };

  return price.toLocaleString(window.navigator.language, formatOpts);
};

export const formatWeightKg = (weight = 0): string => {
  return Math.round(weight * 1000) / 1000 + ' Kg';
};
