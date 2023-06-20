import { Stage, Layer, Text, Rect, Group } from 'react-konva';
import { infoRegion } from "../../regionInfo";
import { regions } from "../../regions";
import './konvaMap.css'
import { useEffect, useRef, useState } from 'react';

const getColors = (score) => {
  if (score < 15) return {backColor: '#EE3F58', fontColor: '#ffffff'};
  if (score > 14 && score < 35) return {backColor: '#FED13E', fontColor: '#0B1F33'};
  if (score > 34 && score < 45) return {backColor: '#FEF0CC', fontColor: '#0B1F33'};
  return {backColor: '#DDF5E7', fontColor: '#0B1F33'};
}

const sklonenie = (number, txt) => {
  const cases = [2, 0, 1, 1, 1, 2];
  return txt[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
}

const mapHeight = 663;
const mapWidth = 1500;

export const KonvaMap = () => { 
  const refStage = useRef();
  const tooltipRef = useRef();
  const [scaleValue, setScaleValue] = useState(1);
  const [regionName, setRegionName] = useState('');
  const [regionScore, setRegionScore] = useState('');
  const [regionDate, setRegionDate] = useState('');
  
  const plusScale = () => {
    const newValue = scaleValue + 0.1;
    setScaleValue(newValue);
  }

  const minusScale = () => {
    const newValue = scaleValue - 0.1;
    setScaleValue(newValue);
  }

  const onDragMove = (current) => {
    const {target} = current;
    onClosePopup();
    const width = target.width();
    const height = target.height();
    const scale = target.scale();

    target.x(Math.max(current.target.x(), width / 2 - mapWidth * scale.x));
    target.y(Math.max(current.target.y(), height / 2 - mapHeight * scale.y));
    target.x(Math.min(current.target.x(), width / 2));
    target.y(Math.min(current.target.y(), height / 2));
  }

  const onMouseMove = (region) => () => {
    // console.log(region)
    const e = window.event;
    const container = document.getElementById('container_map');

    // const containerWidth = container.offsetWidth - 200;
    // const containerHeight = container.offsetHeight;

    const posX = e.offsetX;
    const posY = e.offsetY;
    tooltipRef.current.style.display = 'block';

    tooltipRef.current.style.top = `${posY + 10}px`;
    tooltipRef.current.style.left = `${posX + 10}px`;

    setRegionName(region.name);
    setRegionScore(`${region.id} ${sklonenie(region.id, ['балл', 'балла', 'баллов'])}`);
    setRegionDate('25.04.2023');
    
  }

  const onClosePopup = () => {
    tooltipRef.current.style.display = 'none';
  }

  const fitStageIntoParentContainer = () => {
    const {current} = refStage;
    const container = document.getElementById('container_map');

    const containerWidth = container.offsetWidth;
    const containerHeight = container.offsetHeight;

    current.width(containerWidth);
    current.height(containerHeight);
  }

  useEffect(() => {
    if(refStage){
      fitStageIntoParentContainer();
      window.addEventListener('resize', fitStageIntoParentContainer);
    }
    return () => {
      window.removeEventListener('resize', fitStageIntoParentContainer)
    }
  }, [])

  return (
    <div className='container-map' id='container_map'>
      <Stage 
        width={100}
        height={100}
        draggable 
        onDragMove={onDragMove}
        scale={{
          x: scaleValue,
          y: scaleValue
        }}
        ref={refStage}
      >
        <Layer>
          {regions.map((region) => {
            const {backColor, fontColor} = getColors(region.id);
            return (
              <Group
                key={region.id}
                id={`${region.id}`}
                x={infoRegion[region.id].left}
                y={infoRegion[region.id].top}
                width={70}
                height={48}
                onMouseMove={onMouseMove({
                  ...region
                })}
                onMouseLeave={onClosePopup}
              >
                <Rect
                  id={`${region.id}`}
                  width={70}
                  height={48}
                  fill={backColor}
                  cornerRadius={5}
                />
                <Text 
                  id={`${region.id}`}
                  width={70}
                  y={8}
                  text={infoRegion[region.id].shortName} 
                  fontSize={14}
                  fill={fontColor}
                  align='center'
                />
                <Text 
                  id={`${region.id}`}
                  width={70}
                  y={28}
                  text={region.id} 
                  fontSize={14}
                  fill={fontColor}
                  align='center'
                />
              </Group>
            )
          }
          )}
        </Layer>
      </Stage>
      <div className='button-group'>
        <button onClick={plusScale}>
          +
        </button>
        <button onClick={minusScale}>
          -
        </button>
      </div>
      <div className='tooltip' ref={tooltipRef}>
        <p className='tooltip-text'>{regionName}</p>
        <p className='tooltip-text'>{regionScore}</p>
        <p className='tooltip-date'>{regionDate}</p>
      </div>
    </div>
  );
};