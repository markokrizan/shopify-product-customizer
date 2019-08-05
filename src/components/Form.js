import React, {useState, useEffect} from 'react';

function Form(){
    const [rotationOptions, setRotationOptions] = useState(["Horizontal", "Vertical"]);
    const [fontOptions, setFontOptions] = useState(["Roboto","Arial"]);
    const [text, setText] = useState("");
    const [enhanced, setEnhaced] = useState(false);
    const [wrapped, setWrapped] = useState(false);
    const [wrappComment, setWrappComment] = useState("");
    const [currentQuantity, setCurrentQuantity] = useState(1);


    return(
        <form id="c_form-h" className="w-75">
              <div className="form-group row">
                <div className="col-10">
                  <label htmlFor="exampleFormControlSelect1">Product orientation</label>
                  <select className="form-control" id="rotationPicker">
                    <option value="horizontal">Horizontal</option>
                    <option value="vertical">Vertical</option>
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-10">
                  <label htmlFor="exampleFormControlSelect1">Select your favourite font</label>
                  <select className="form-control" id="font-picker">
                    <option value="Roboto">Roboto</option>
                    <option value="Arial">Arial</option>
                    <option value="Times new roman">Times new roman</option>
                  </select>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-10">
                  <label htmlFor="exampleFormControlSelect1">Select your picture</label>
                  <input type="hidden" role="uploadcare-uploader" data-crop="800x600 upscale"/>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-10">
                  <label htmlFor="exampleFormControlSelect1">Your text</label>
                  <input type="text" className="form-control" id="wood-text-input"/>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-10">
                  <input type="checkbox" id="enchance-check"/> Enchance my photo ( + 15 $) </div>
              </div>
              <div className="form-group row">
                <div className="col-10">
                  <input type="checkbox" id="wrap-check"/> Gift wrap ( + 10 $) </div>
              </div>
              <div className="form-group row" id="wrapp-comment-form-group">
                <div className="col-10">
                  <label htmlFor="exampleFormControlSelect1">Wrap comment</label>
                  <input type="text" className="form-control" id="wrap-comment-input"/></div>
              </div>
              <br/>
              <div className="form-group row" id="wrapp-comment-form-group">
                <div className="col-md-6 d-flex align-items-center justify-content-start">
                  <button className="btn btn-info mx-2">-</button>
                  <label>12</label>
                  <button className="btn btn-info mx-2">+</button>
                </div>
                <div className="col-md-6 d-flex justify-content-center align-items-center">
                  <label>123$</label>
                </div>
              </div>
    </form>);
}

export default Form;