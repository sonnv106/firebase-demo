const formatCurrency = (price: number) => {
  if (price) return price.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  return "";
};
const checkNull = (data) => {
  if (!data || data == "undefined" || data == undefined) {
    return " ";
  }
  return data;
};
export { formatCurrency, checkNull };
