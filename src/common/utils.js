export const getCodeFromBarCode = (barCode, type) => {
  const code = barCode
  if (barCode.length === 13) {
    code = barCode.slice(1,7)
  }
  return code
}
export const getProductInfoFromBarCode = (barCode, product) => {
  let value = null
  let amount = null;
  if (barCode.slice(0,1) == 2) {
    value = +(barCode.slice(8,13)*.001).toFixed(2);
    amount = (value/product.price).toFixed(3);
  }
  console.log('getProductInfoFromBarCode', value, amount)
  return { value, amount }
}
export const getProductValueFromAmount = (amount, product) => {
  console.log('getProductValueFromAmount', amount, product)
  const convertedAmount = +amount.replace(",", ".")
  const value = convertedAmount * product.price;

  return { value, amount: convertedAmount }
}

export const getCodeFromText = (code) => {
  if(code.length === 6) {
    return code
  } else {
    return `${code}00`
  }
}