import React, { useEffect } from 'react';
import {createFabricCanvas, addImage, changeRotation } from '../services/CanvasService';
import debounce from '../util/debounce';

function Canvas({
    column, 
    canvas, 
    canvasBaseImage,
    canvasUserImage,
    uploadedImage, 
    userText, 
    canvasUserText,
    uploadedImagePreset, 
    userTextPreset, 
    setCanvasUserImage,
    setCanvasUserText,
    font,
    productOrientation,
    setCanvas}){
    useEffect(() => { 
        (async () => {
            if(!column.current){
                return
            }
            const fabricCanvas = await createFabricCanvas('wood-customizer-canvas');
            fabricCanvas.setWidth(getContainerSize(column.current)['parentWidth']);
            fabricCanvas.setHeight(getContainerSize(column.current)['parentHeight']);
            setCanvas(fabricCanvas);   

            const resizeCanvas = () => {
                fabricCanvas.setWidth(getContainerSize(column.current)['parentWidth']);
                fabricCanvas.setHeight(getContainerSize(column.current)['parentHeight']);
                //fabricCanvas.calcOffset();
                //fabricCanvas.setZoom(2)
                fabricCanvas.renderAll();
            }
            window.addEventListener("resize", resizeCanvas);
        })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    
    const getContainerSize = (parent) => {
        const {clientHeight : parentHeight, clientWidth: parentWidth} = parent;
        return {parentWidth, parentHeight};
    }

    //size according to base image
    // useEffect(() => {
    //     if(canvasBaseImage && canvas){
    //         canvas.setWidth(canvasBaseImage.width);
    //         canvas.setHeight(canvasBaseImage.height);
    //     }
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [canvasBaseImage])

    useEffect(() => {
        (async () => {
            if(uploadedImage && canvas && uploadedImagePreset){
                const fabricUserImage = await addImage(uploadedImage, canvas, uploadedImagePreset);
                setCanvasUserImage(fabricUserImage);
                console.log()
            }
        })();
    }, [uploadedImage, canvas, uploadedImagePreset, setCanvasUserImage])

    useEffect(() => {
        if(canvasUserText && userText && canvas && userTextPreset){        
            canvasUserText.text = userText;
            canvas.renderAll();
            
        }
    }, [userText, canvas, userTextPreset, setCanvasUserText, canvasUserText]);

    useEffect(() => {
        if(canvas && canvasUserText && font ){
            canvasUserText.fontFamily = font;
            canvas.renderAll();
        }
    }, [canvas, canvasUserText, font]);

    useEffect(() => {
        if(canvas && productOrientation && canvasBaseImage && canvasUserImage){
            changeRotation(canvasBaseImage, canvasUserImage, canvas, productOrientation, uploadedImagePreset, userTextPreset)
        }
    }, [canvas, productOrientation, canvasBaseImage, canvasUserImage, uploadedImagePreset, userTextPreset])

    return  <canvas id="wood-customizer-canvas" style = {{ border: '1px solid black'}}/>
}

export default React.memo(Canvas);