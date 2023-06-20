import { useState } from 'react';
import { regions, county, regionsShortName } from '../../regions';

import './map.css';
import { newRegions } from '../../newRegions';
// Math.floor(Math.random() * (max - min) + min)
export const Map = () => {
  const [scale, setScale] = useState(1);
  const updatedRegions = regions.map(region => ({
    ...region,
    score: Math.floor(Math.random() * (670 - 0) + 0)
  }))

  const getStyle = (score) => {
    if (!score) return 'default';
    if (score < 100) return 'unsatisfactory';
    if (score > 99 && score < 200) return 'satisfactory';
    if (score > 199 && score < 300) return 'good';
    return 'great';
  }
  return (
    <div className='wrapper'>
      <div className='schem-container'>
        <div className="schem" style={{transform: `scale(${scale})`}}>
          {
            county.map(county => (
              <div 
                className={`county county-${county.id}`}
                key={county.id}
              >
                <p>{county.name}</p>
              </div>
            ))
          }
          
          {
            updatedRegions.map(region => (
              <div 
                className={`region region-${region.id} region-${getStyle(region.score)}`}
                title={`${region.name} (${region.score})`}
                key={region.id}
              >
                <p>{regionsShortName[region.id]}</p>
                <p>{region.score}</p>
              </div>
            ))
          }
        </div>
      </div>
      <div className='button-group'>
        <button onClick={() => setScale(scale + 0.1)}>+</button>
        <button onClick={() => setScale(scale - 0.1)}>-</button>
      </div>
    </div>
  )
}