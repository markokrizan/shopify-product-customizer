import { fabric } from 'fabric';
import { imagePresetConsts, textPresetConsts, productOrientationConsts } from '../constants';

const {WITH_TEXT, ENTIRE_CANVAS} = imagePresetConsts;
const {CENTER_TEXT, BOTTOM_TEXT} = textPresetConsts;
const { HORIZONTAL, VERTICAL } = productOrientationConsts;


const createFabricCanvas = (elementId) => {
    return new Promise((resolve) => {
        resolve(new fabric.Canvas(elementId));
    });
}

const createImageFromUrl = (imageUrl) => {
    return new Promise((resolve) => {
        fabric.Image.fromURL(imageUrl, (img) => {
            resolve(img);
        }, { crossOrigin: 'Anonymous' });
    })
};

const createText = (text) => {
    return new fabric.IText(text);
}

const calculateSizeWithRatio =  (cw, ch, iw, ih) => {
    let fw, fh;
    const width_ratio  = cw  / iw;
    const height_ratio = ch / ih;
    if (width_ratio > height_ratio) {
        fw = iw * width_ratio;
        fh = ih*fw/iw;
    } else {
        fh = ih * height_ratio;
        fw = iw*fh/ih;    
    }
    return {fw, fh};
}


const imagePresets = {
    [ENTIRE_CANVAS] : (fabricCanvas, fabricImage) => {
      return {
        originX: 'center',
        originY: 'center',
        scaleX: fabricCanvas.width / fabricImage.width,
        scaleY: fabricCanvas.height / fabricImage.height,
        opacity: 0.6,
        selectable: false
      }
    },
    [WITH_TEXT] : (fabricCanvas, fabricImage) => {
        const {fw, fh} = calculateSizeWithRatio(fabricCanvas.width, fabricCanvas.height, fabricImage.width, fabricImage.height);
        return {
            scaleX: (fabricCanvas.width / fabricImage.width) * 0.9,
            scaleY: (fabricCanvas.height / fabricImage.height) * 0.9,
            // left: fabricCanvas.width / 2, 
            // top: (fabricCanvas.height / 2) * 0.8,
            // selectable: false
            width: fw,
            height: fh,
            originX:  'center',
            originY: 'center',
            left: fabricCanvas.width / 2, 
            top: (fabricCanvas.height / 2) * 0.8,
            selectable: false,
            opacity: 0.6
            //scaleX: 0.7  
        }
    }
  }

const textPresets = {
    [BOTTOM_TEXT] : (fabricCanvas) => {
        return {
            originX:  'center',
            originY: 'center',
            left: fabricCanvas.width / 2, 
            top: fabricCanvas.height * 0.9,
            name: 'text' ,
            selectable: false,
            editable: true
        }
    },
    [CENTER_TEXT] : (fabricCanvas) => {
        return {
            originX:  'center',
            originY: 'center',
            left: fabricCanvas.width / 2, 
            top: fabricCanvas.height / 2
        }
    }
}


const addImage = async (url, canvas, preset) => {
    const fabricImage = await createImageFromUrl(url);
    const configObject = imagePresets[preset](canvas, fabricImage);
    fabricImage.set(configObject);
    canvas.bringToFront(fabricImage);
    canvas.add(fabricImage);
    return fabricImage;
}

const addText = (text, canvas, preset) => {
    const fabricText = createText(text);
    const configObject = textPresets[preset](canvas);
    fabricText.set(configObject);
    canvas.bringToFront(fabricText);
    canvas.add(fabricText);
    return fabricText;
}

const rotationPresets = {
    [VERTICAL] : (initialImage, uploadedImage, canvas, uploadedImagePreset, userTextPreset) => {
        initialImage.angle = 90;

        const imagePresetConfig = imagePresets[uploadedImagePreset](canvas, uploadedImage);
        const textPresetConfig = textPresets[userTextPreset](canvas);


        // //inverse
        // canvas.setWidth(initialImage.height);
        // canvas.setHeight(initialImage.width);
    
        // if(uploadedImage){
        //     uploadedImage.scaleToWidth(canvas.width * 0.9);
        //     uploadedImage.left= canvas.width / 2;
        //     uploadedImage.top = (canvas.height / 2)  * 0.8;
        //     canvas.centerObject(uploadedImage);
        // }
         
        // canvas.centerObject( initialImage);
        // // this.text.left = this.canvas.width / 2;
        // // this.text.top = this.canvas.height * 0.9;
    
        canvas.renderAll();
    },
    [HORIZONTAL] : (initialImage, uploadedImage, canvas, uploadedImagePreset, userTextPreset) => {
        initialImage.angle = 0;
    
        // canvas.setWidth(initialImage.width);
        // canvas.setHeight(initialImage.height);
    
        // if(uploadedImage){
        //     const {fw} = calculateSizeWithRatio(canvas.width, canvas.height, uploadedImage.width, uploadedImage.height);     
        //     uploadedImage.left = canvas.width / 2;
        //     uploadedImage.top = (canvas.height / 2) * 0.8;
        //     uploadedImage.scaleToWidth(fw * 0.7);
        // }
         
        // canvas.centerObject(initialImage);
        // // this.text.left = this.canvas.width / 2;
        // // this.text.top = this.canvas.height * 0.9;
        canvas.renderAll();
    }
}

const changeRotation = (initialImage, uploadedImage, canvas, rotationOption, uploadedImagePreset, userTextPreset) => {
    rotationPresets[rotationOption](initialImage, uploadedImage, canvas, uploadedImagePreset, userTextPreset);
}


export {
    createFabricCanvas,
    changeRotation,
    addImage,
    addText
}