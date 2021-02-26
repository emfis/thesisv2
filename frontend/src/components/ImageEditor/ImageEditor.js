import * as React from "react";


const ImageEditor = React.forwardRef((props,ref) => {
  const [drawing, setDrawing] = React.useState();
  const [startingPosition,setStartingPosition] = React.useState({w:0,h:0})
  
  const canvasContextRef = React.useRef(null);
  const imageRef = React.useRef(null);
  
  React.useEffect(()=>{
    if(ref.current){
      const canvas = ref.current;
      const background = new Image();
      const cctx = canvas.getContext("2d");
      canvasContextRef.current = cctx;
      background.src = props.imageSrc;
      background.onload = ()=> {
        imageRef.current = background;
        canvas.height = 440;
        canvas.width = 960;
        cctx.drawImage(background,0,0,background.width,background.height,0,0,960,440);
      };
    }
  },[ref, props.imageSrc]);


  function mouseMove(e) {
    if (drawing && canvasContextRef.current) {
      const ctx = canvasContextRef.current;
      const canvas = ref.current;
      const background = imageRef.current;
      ctx.clearRect(0,0,960,440);
      canvas.getContext("2d").drawImage(background,0,0,background.width,background.height,0,0,960,440);
      ctx.beginPath();
      ctx.lineWidth = "4";
      ctx.strokeStyle = "red";
      ctx.rect(startingPosition.w, startingPosition.h, (e.pageX - e.target.offsetLeft)-startingPosition.w , (e.pageY-e.target.offsetTop) - startingPosition.h);
      ctx.stroke();
    }
}

function mouseDown(e) {
  
  setDrawing(true);
  setStartingPosition({w: e.pageX - e.target.offsetLeft, h: e.pageY-e.target.offsetTop})
}

  return (
    <canvas 
      ref={ref}
      onMouseMove={mouseMove}
      onMouseDown={mouseDown}
      onMouseUp={()=>setDrawing(false)}
    />
  )
});

export default ImageEditor;