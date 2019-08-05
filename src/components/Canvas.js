import React, {useState, useEffect} from 'react';
import {Canvas as FabricCanvas ,Circle, Image, Path, Text} from 'react-fabricjs';


function Canvas(){

    const [canvas, setCanvas ] = useState(null);
    const [canvasWidth, setCanvasWidth] = useState(400);
    const [canvasHeigth, setCanvasHeigth] = useState(400);

    // useEffect(() => { 
    //     const c = new fabric.Canvas('c', { 
    //         width: canvasWidth,
    //         height: canvasHeigth
    //     });
    //     setCanvas(c);
    // }, []);


    return (
    <FabricCanvas
        ref="canvas"
        width="1000"
        height="1000"
    >
        <Circle
            ref="circle"
            radius={20}
            left={100}
            top={50}
            stroke="green"
        />

        <Image
            ref="image"
            imgElement={document.getElementById('my-image')}
            width={100}
            height={100}
        />

        <Image
            src="http://i.imgur.com/jZsNUCi.jpg"
            width={300}
            height={300}
            left={0}
            top={500}
        />


        <Path
            path="M 0 0 L 300 100 L 200 300 z"
            fill="red"
            stroke="green"
            strokeWidth={10}
            opacity={0.5}
        />

        <Text
            text="Click me"
            left={0}
            top={200}
            shadow="rgba(0,0,0,0.3) 5px 5px 5px"
            stroke="#ff1318"
            strokeWidth={1}
            fontStyle="italic"
            fontFamily="Hoefler Text"
        />
    </FabricCanvas>);
}

export default Canvas;