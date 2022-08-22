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
const isVietnamesePhoneNumber= (number: string) =>{
  return /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(number);
}
export { formatCurrency, checkNull, isVietnamesePhoneNumber };
