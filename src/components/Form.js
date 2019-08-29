import React, {useEffect} from 'react';
import { Widget } from "@uploadcare/react-widget";
import { apiConsts, productOrientationConsts } from '../constants';

function Form({
  setUploadedImage,
  setProductOrientation,
  setUserText,
  setFont,
  setEnhance,
  setGiftWrap,
  setWrapComment,
  onSubmit,
  setPrice,
  setQuantity,
  setTotal,
  price,
  quantity,
  total
}){

    const renderOrientations = () => Object.keys(productOrientationConsts).map(orientation => <option value = {orientation}>{orientation}</option>);
    
    const decrementQuantity = () => quantity > 1 && setQuantity(--quantity);

    const incrementQuantity = () => setQuantity(++quantity);

    useEffect(() => {
      setTotal(price * quantity);
    }, [price, quantity, setTotal])

    return(
        <form id="c_form-h" className="w-75" onSubmit = {onSubmit}>
              <div className="form-group row">
                <div className="col-10">
                  <label htmlFor="exampleFormControlSelect1">Product orientation</label>
                  <select className="form-control" id="rotationPicker" onChange = {(e) => setProductOrientation(e.target.value)}>
                    {renderOrientations()}
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-10">
                  <label htmlFor="exampleFormControlSelect1">Select your favourite font</label>
                  <select className="form-control" id="font-picker" onChange = {(e) => setFont(e.target.value)}>
                    <option value="Roboto">Roboto</option>
                    <option value="Arial">Arial</option>
                    <option value="Times new roman">Times new roman</option>
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-10">
                  <label style = {{display : "block"}}>Select your picture</label>
                  <Widget 
                    publicKey={apiConsts.uploadCareKey} 
                    onChange={(uploadedImage) => setUploadedImage(uploadedImage.originalUrl)}
                    clearable
                    />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-10">
                  <label htmlFor="exampleFormControlSelect1">Your text</label>
                  <input type="text" className="form-control" id="wood-text-input" onChange = {(e) => setUserText(e.target.value)}/>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-10">
                  <input type="checkbox" id="enchance-check" onChange = {(e) => setEnhance(e.target.checked)}/> Enchance my photo ( + 15 $) </div>
              </div>
              <div className="form-group row">
                <div className="col-10">
                  <input type="checkbox" id="wrap-check" onChange = {(e) => setGiftWrap(e.target.checked)}/> Gift wrap ( + 10 $) </div>
              </div>
              <div className="form-group row" id="wrapp-comment-form-group">
                <div className="col-10">
                  <label htmlFor="exampleFormControlSelect1">Wrap comment</label>
                  <input type="text" className="form-control" id="wrap-comment-input" onChange = {(e) => setWrapComment(e.target.value)}/></div>
              </div>
              <br/>
              <div className="form-group row" id="wrapp-comment-form-group">
                <div className="col-md-6 d-flex align-items-center justify-content-start">
                  <button className="btn btn-info mx-2" onClick = {decrementQuantity} type = "button">-</button>
                  <label>{quantity}</label>
                  <button className="btn btn-info mx-2" onClick = {incrementQuantity} type = "button">+</button>
                </div>
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                  <button className="btn btn-info mx-2" type = "submit"><span>{total} $</span></button>
                </div>
              </div>
          </form>);
}

export default Form;