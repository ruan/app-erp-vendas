export const getCodeFromBarCode = (barCode, type) => {
  let code = barCode
  if (barCode.length === 13) {
    if(barCode.slice(0,1) === '2') {
      code = barCode.slice(1,7)
    } else {
      code = barCode.slice(-6, barCode.length)
    }
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
  return { value, amount }
}
export const getProductValueFromAmount = (amount, product) => {
  const convertedAmount = +amount.replace(",", ".")
  const value = convertedAmount * product.price;

  return { value, amount: convertedAmount }
}

export const getCodeFromText = (code) => {
  if (code.length > 6) {
    throw 'Código inválido'
  } else {
    return `${code * (10 ** (6 - code.length))}`
  }
}