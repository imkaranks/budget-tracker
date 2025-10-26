// const userLocale = navigator.language || 'en-In';

export const formatCurrency = (
  amount: number,
  currency: string = "INR",
  locale: string = "en-In"
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
};
