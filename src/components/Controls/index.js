import KEYS from '../../utils/keys';
import ControlButton from './ControlButton/ControlButton';
import ControlsWrapper from './Controls.style';

const Controls = ({ changeDirection }) => {
  
  return (
    <ControlsWrapper>
      {KEYS.map(item => <ControlButton changeDirection={changeDirection} code={item.code} text={item.text}/>)}
    </ControlsWrapper>
  )
}

export default Controls;
