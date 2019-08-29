// import {apiConsts} from '../constants';
// import Client from 'shopify-buy';

// //appId: 6 - also availible if more shops are on the same domain
// const shopClient = Client.buildClient({
//   domain: `${apiConsts.shopName}.myshopify.com`,
//   storefrontAccessToken: apiConsts.storeFrontAccessToken
// });



// const getProductByHandle = async (handle) => {
//   return new Promise((resolve, reject) => {
//     try{
//       shopClient.product.fetchByHandle(handle).then(
//         product => resolve(product),
//         error => resolve(null)
//       )
//     }catch(err){
//       reject(err)
//     }
//   })
// }

// const createCheckout = async () => {
//   return new Promise((resolve, reject) => {
//     try{
//       shopClient.checkout.create().then((checkout) => {
//         resolve(checkout);
//       });
//     }catch(err){
//       reject(err);
//     } 
//   })
// }

// const addLineItems = async (checkoutId, lineItems) => {
//   return new Promise((resolve, reject) => {
//     try{
//       shopClient.checkout.addLineItems(checkoutId, lineItems).then((checkout) => {
//         resolve(checkout.lineItems)
//       });
//     }catch(err){
//       reject(err)
//     }
//   })
// }


// const addProductToCart = async (variantId, quantity, image) => {
//   const {id : checkoutId} = await createCheckout();
//   debugger
//   //const checkoutIdNumeric = atob(checkoutId).split('/').pop();
//   const lineItemsToAdd = [{
//       variantId : variantId,
//       quantity : parseInt(quantity),
//       customAttributes: [{image}]
//   }];
//   debugger;
//   console.log(lineItemsToAdd)
//   return await addLineItems(checkoutId, lineItemsToAdd);
// }

// const callbackTest = (variantId, quantity, image) => {
//   debugger
//   shopClient.checkout.create().then((checkout) => {
//     const checkoutId = checkout.id;

//     debugger;

//     const lineItemsToAdd = [{
//         variantId : variantId,
//         quantity : parseInt(quantity),
//         customAttributes: [{image}]
//     }];

//     debugger;

//     shopClient.checkout.addLineItems(checkoutId, lineItemsToAdd).then((checkout) => {
//       debugger
//       console.log(checkout.lineItems)
//     });


//   });
// }


import axios from "axios";
import {apiConsts} from '../constants';

const shopifyApi = axios.create({
  baseURL: `${apiConsts.shopUrl}/api/2019-07/graphql.json`
});

export default async function request({
  url,
  method,
  requestData = {},
  headers = {}
}) {
  try {
    headers = {
      ...headers,
      "Content-Type": "application/graphql",
      "X-Shopify-Storefront-Access-Token": apiConsts.storeFrontAccessToken
    }
    return await shopifyApi({ method, url, headers, data: requestData });
  } catch (error) {
    console.error(error)
  }
}

const handleQuery = (handle) => 
  `{
    productByHandle(handle:"${handle}") {
      id,
      title,
      variants {
        edges {
          node 
        }
      }
    }
  }`

const testQuery = `
{
  products(query: "handle:test-product", first: 5) {
    edges {
      node {
        title
        description
      }
    }
  }
}

`

const getProductByHandle = async (handle) => 
  await request({
    method: "POST",
    requestData: handleQuery(handle)
  });


export {
  getProductByHandle
}