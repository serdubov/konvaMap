import { useEffect } from "react";
import { infoRegion } from "../../regionInfo";
import { regions } from "../../regions";

const getColors = (score) => {
  if (score < 15) return {backColor: '#EE3F58', fontColor: '#ffffff'};
  if (score > 14 && score < 35) return {backColor: '#FED13E', fontColor: '#0B1F33'};
  if (score > 34 && score < 45) return {backColor: '#FEF0CC', fontColor: '#0B1F33'};
  return {backColor: '#DDF5E7', fontColor: '#0B1F33'};
}

export const CanvasMap = () => {
  useEffect(() => {
    const canvas = document.getElementById('canvasMap');
    const ctx = canvas.getContext('2d');
    // regions
    canvas.width = 1500;
    canvas.height = 663;
  
    // фон
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  
    regions.forEach(region => {
      const {shortName, left, top} = infoRegion[region.id];
      const {backColor, fontColor} = getColors(region.id)
      ctx.fillStyle = backColor;
      ctx.beginPath();
      ctx.roundRect(left, top, 70, 48, 5);
      ctx.fill();
      
      ctx.font = '14px Arial';
      ctx.fillStyle = fontColor;
      ctx.textAlign = 'center';
      // регион
      ctx.fillText(shortName, left + 35, top + 20);
      // баллы
      ctx.fillText(region.id, left + 35, top + 40);
    });
  }, []);


  return (<canvas id="canvasMap"/>)
}