export const formatCurrency = (number = 0) => {
  const formatNumber = number.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return formatNumber.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};
