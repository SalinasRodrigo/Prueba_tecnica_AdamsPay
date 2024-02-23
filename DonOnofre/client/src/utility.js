export const formatPrice = (value) => {
  return new Intl.NumberFormat("es-PY", {
    style: "currency",
    currency: "PYG",
    useGrouping: true,
  }).format(value);
};
