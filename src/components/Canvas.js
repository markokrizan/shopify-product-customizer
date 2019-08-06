import React, {useState, useEffect } from 'react';
import {createFabricCanvas, createImageFromUrl} from '../services/CanvasService';

function Canvas(column){

    const [canvas, setCanvas] = useState(null);
    const [columnRef, setColumnRef] = useState(null);
    const [woodImage, setWoodImage] = useState(null);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [userText, setUserText] = useState(null);


    //Component did mount inits:
    useEffect(() => { 
        (async () => {
            const fabricCanvas = await createFabricCanvas('wood-customizer-canvas');
            const columnParent = column.column.current;
            const {clientHeight : columnHeight, clientWidth: columnWidth} = columnParent;
            fabricCanvas.setWidth(columnWidth);
            fabricCanvas.setHeight(columnHeight);
            const initialImage = await createImageFromUrl('wood.jpg');
            fabricCanvas.add(initialImage);

            setWoodImage(initialImage);
            setCanvas(fabricCanvas);   
        })();
    }, []);

    return  <canvas id="wood-customizer-canvas" style = {{ border: '1px solid black'}}/>
}

export default React.memo(Canvas);