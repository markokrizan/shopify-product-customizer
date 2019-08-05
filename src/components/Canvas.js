import React, {useState, useEffect, useRef } from 'react';
import { fabric } from 'fabric';


function Canvas(column){

    let [canvas, setCanvas ] = useState(null);
    let [baseWidth, setBaseWidth] = useState(0);
    let [baseHeigth, setBaseHeigth] = useState(0);

    canvas = useRef(null);

    useEffect(() => { 
        setCanvas(new fabric.Canvas('wood-customizer-canvas'));      
        window.addEventListener('resize', handleResize);
    }, []);

    const handleResize = () => {
        console.log("resize");
    }

    useEffect(() => {
        if(column && canvas){
            const columnParent = column.column.current;
            const {clientHeight : columnHeight, clientWidth: columnWidth} = columnParent;
            console.log(canvas.current.width);
            canvas.current.width = columnWidth;
            console.log(canvas.current.width);
            canvas.current.height = columnHeight;
        }
    }, [column, canvas]);


    const [dimensions, setDimensions] = React.useState({ 
        height: window.innerHeight,
        width: window.innerWidth
    })


    //=============================================
    //window resize listener:
    // useEffect(() => {
    //     function handleResize() {
    //         // setDimensions({
    //         //     height: window.innerHeight,
    //         //     width: window.innerWidth
    //         // })
    //         console.log(window.innerHeight);
    //         console.log(window.innerWidth);
    //     }
    //     window.addEventListener('resize', handleResize);
    // });
    //=============================================

    const addImage = (url) => {
        fabric.Image.fromURL(url, (img) => {
            img.set({
                // width: canvasWidth,
                // height: canvasHeigth,
                originX:  'center',
                originY: 'center',
                selectable: false
            });
            img.opacity = 0.7;
            canvas.add(img);
            console.log(img.height);
            console.log(img.width);
            canvas.calcOffset();
        }, { crossOrigin: 'Anonymous' });
    };

    const addBaseImage = (url) => {
        fabric.Image.fromURL(url, (img) => {
            img.set({
                // width: canvasWidth,
                // height: canvasHeigth,
                originX:  'left',
                originY: 'top',
                selectable: false
            });
            canvas.preserveObjectStacking  = true;
            canvas.add(img);
            canvas.setWidth(img.width);
            canvas.setHeight(img.height);
            canvas.calcOffset();
            canvas.sendToBack(img);
            //addText('Enter your text');
            //initialWoodImage = img;
          }, { crossOrigin: 'Anonymous' });
    };


    // useEffect(() => {
    //     const element = column.column.current;
    //     console.log(element);
    //     console.log(element.clientHeight);
    //     console.log(element.clientWidth);
    //     element.addEventListener('resize', (event) => console.log(event.detail));
    //     // function checkResize(mutations) {
    //     //     const el = mutations[0].target;
    //     //     const w = el.clientWidth;
    //     //     const h = el.clientHeight;

    //     //     const isChange = mutations
    //     //         .map((m) => `${m.oldValue}`)
    //     //         .some((prev) => prev.indexOf(`width: ${w}px`) === -1 || prev.indexOf(`height: ${h}px`) === -1);

    //     //     if (!isChange) { return; }
    //     //     const event = new CustomEvent('resize', { detail: { width: w, height: h } });
    //     //     el.dispatchEvent(event);
    //     // }
    //     // const observer = new MutationObserver(checkResize);
    //     // observer.observe(element, { attributes: true, attributeOldValue: true, attributeFilter: ['style'] });
    // }, [])



    //style={{width : '100%', heigth : '100%', border : '1px solid black'}
    //ref={canvasRef}


    const fullWidthStyle = {
        border : '1px solid black',
        width: '100%',
        height: 'auto'
    }

    return  <canvas  id="wood-customizer-canvas" style={fullWidthStyle} ref={canvas}/>
}

export default React.memo(Canvas);