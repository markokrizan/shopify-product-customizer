const apiConsts = {
  uploadCareKey : process.env.REACT_APP_UPLOADCARE_API_KEY,
  storeFrontAccessToken: process.env.REACT_APP_STOREFRONT_ACCESS_TOKEN,
  shopName: process.env.REACT_APP_SHOPIFY_SHOP_NAME,
  shopUrl: process.env.REACT_APP_SHOP_URL
}

const imagePresetConsts = {
  ENTIRE_CANVAS : 'ENTIRE_CANVAS',
  WITH_TEXT : 'WITH_TEXT'
}

const textPresetConsts = {
  CENTER_TEXT : 'CENTER_TEXT',
  BOTTOM_TEXT : 'BOTTOM_TEXT'
}

const productOrientationConsts = {
  HORIZONTAL : 'HORIZONTAL',
  VERTICAL : 'VERTICAL'
}

export {
  imagePresetConsts,
  textPresetConsts,
  productOrientationConsts,
  apiConsts
}