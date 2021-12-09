import ControlButton from './ControlButton/ControlButton';
import ControlsWrapper from './Controls.style';

const Controls = (props) => {
  
  return (
    <ControlsWrapper>
      <ControlButton
        changeDirection={props.changeDirection}
        code='KeyA'
        text='left'
      />
      <ControlButton
        changeDirection={props.changeDirection}
        code='KeyW'
        text='up'
      />
      <ControlButton
        changeDirection={props.changeDirection}
        code='KeyD'
        text='right'
      />
      <ControlButton
        changeDirection={props.changeDirection}
        code='KeyS'
        text='down'
      />
      <ControlButton
        changeDirection={props.changeDirection}
        code='KeyE'
        text='speedUp'
      />
      <ControlButton
        changeDirection={props.changeDirection}
        code='KeyQ'
        text='magicAtk'
      />
    </ControlsWrapper>
  )
}

export default Controls;
