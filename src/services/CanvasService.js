import { fabric } from 'fabric';


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

   
export {
    createFabricCanvas,
    createImageFromUrl,
    createText
}