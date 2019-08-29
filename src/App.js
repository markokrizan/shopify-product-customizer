import React, {useRef, useState, useEffect} from 'react';
import Form from './components/Form';
import Canvas from './components/Canvas';
import { imagePresetConsts, textPresetConsts, productOrientationConsts } from './constants';
import { addImage, addText } from './services/CanvasService';
import { getProductByHandle, addProductToCart, callbackTest } from './services/ShopifyService';
import { apiConsts } from './constants';


function App({location}) {

  const columnRef = useRef(null);
  const [shopifyProduct, setShopifyProduct] = useState(null);

  //Canvas state
  const [canvas, setCanvas] = useState(null);
  const [canvasBaseImage, setCanvasBaseImage] = useState(null);
  const [canvasUserImage, setCanvasUserImage] = useState(null);
  const [canvasUserText, setCanvasUserText] = useState(null);
  const [uploadedImagePreset, setUploadedImagePreset] = useState(imagePresetConsts.WITH_TEXT);
  const [userTextPreset, setUserTextPreset] = useState(textPresetConsts.BOTTOM_TEXT);
  
  //Form state
  const [uploadedImage, setUploadedImage] = useState(null);
  const [productOrientation, setProductOrientation] = useState(productOrientationConsts.HORIZONTAL);
  const [font, setFont] = useState('Roboto');
  const [userText, setUserText] = useState('');
  const [enhance, setEnhance] = useState(false);
  const [giftWrap, setGiftWrap] = useState(false);
  const [wrapComment, setWrapComment] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);

  const getHandleFromUrl = () => {
    return window.location.href.split('/').pop();
  }

  //Base initialization - initial image and text
  useEffect(() => {
    (async () => {
      if(canvas){
        //Test uploaded image
        setUploadedImage('test.jpg')
        setUploadedImagePreset(imagePresetConsts.WITH_TEXT);

        //Base image
        const baseImage = await addImage('wood.jpg', canvas, imagePresetConsts.ENTIRE_CANVAS);
        setCanvasBaseImage(baseImage);

        //Base text
        const baseText = addText('This is some text', canvas, textPresetConsts.BOTTOM_TEXT);
        setCanvasUserText(baseText);

        //Set intial price and quantity - from shopify api
        setQuantity(1);
        setPrice(10);

        const {shopUrl} = apiConsts;

        //get product
        const handle = getHandleFromUrl();
        const product = await getProductByHandle(handle);
        //try not to render
        //product ? setShopifyProduct(product) : window.location.href = `${shopUrl}/${handle}`;

        console.log('product', product)
        // console.log('variant', product.variants[0])
        // console.log('variant id', product.variants[0].id)
        // console.log('decoded variant id, ', atob('Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yOTM1NTc1OTI3MTk4OQ=='))
        // console.log('numeric variant id', atob('Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yOTM1NTc1OTI3MTk4OQ==').split('/').pop())

        // console.log('graphql_api_id', product.variants[0].graphql_api_id)

        // const graphqlApiId = window.btoa(`gid://shopify/ProductVariant/${atob('Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yOTM1NTc1OTI3MTk4OQ==').split('/').pop()}`)
        // console.log(graphqlApiId)

        //const variantId = product.variants[0].id;

        //use base 64 variants!
        // console.log(variantId)
        // const variantNumeric = atob(variantId).split('/').pop();
        // const decodedVariant = atob(variantId);
        //const checkout = await addProductToCart(variantId, 1, 'http://someimage.com');
        //console.log(checkout);
        //console.log(decodedVariant)

        //callbackTest(product.variants[0].id, 1, 'http://someimage.com')
      }
    })();
  }, [canvas, location]);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("form values ======");
    console.log(productOrientation);
    console.log(font);
    console.log(userText);
    console.log(enhance);
    console.log(giftWrap);
    console.log(wrapComment);
    console.log(quantity);
    console.log(price);
    console.log(total);
  }
  
  return (
    <div className="container-fluid h-100 d-flex align-items-center justify-content-center w-100">
        <div className="row d-flex justify-content-center w-100">
          <div className="col-md-6 d-flex align-items-center justify-content-center" ref = {columnRef}>
            <Canvas 
              column = {columnRef} 
              canvas = {canvas}
              uploadedImagePreset = {uploadedImagePreset}
              uploadedImage = {uploadedImage}
              canvasUserImage = {canvasUserImage}
              userText = {userText}
              font = {font}
              userTextPreset = {userTextPreset}
              setCanvas = {setCanvas}
              canvasBaseImage = {canvasBaseImage}
              setCanvasBaseImage = {setCanvasBaseImage}
              setCanvasUserImage = {setCanvasUserImage}
              setCanvasUserText = {setCanvasUserText}
              canvasUserText = {canvasUserText}
              productOrientation = {productOrientation}
            />
          </div>
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <Form
            setUploadedImage={setUploadedImage}
            setProductOrientation={setProductOrientation}
            setFont = {setFont}
            setEnhance = {setEnhance}
            setGiftWrap = {setGiftWrap}
            setUserText = {setUserText}
            setWrapComment = {setWrapComment}
            onSubmit = {onSubmit}
            quantity = {quantity}
            price = {price}
            total = {total}
            setPrice = {setPrice}
            setQuantity = {setQuantity}
            setTotal = {setTotal}
            shopifyProduct = {shopifyProduct}
            />
          </div>
        </div>
      </div>
  );
}

export default App;
