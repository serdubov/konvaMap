import './konvaMap.css';

export const Popup = ({region, score, date}) => {
  return (
    <>
      <p class='tooltip-text'>{region}</p>
      <p class='tooltip-text'>{score}</p>
      <p className='tooltip-date'>{date}</p>
    </>
  )
}