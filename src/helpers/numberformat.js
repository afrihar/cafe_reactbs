export const numberFormat = (value) =>
  new Intl.NumberFormat('en-ID', {
    style: 'currency',
    useGrouping: true,
      currency:'IDR'
  }).format(value);
