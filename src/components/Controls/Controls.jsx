import ControlButton from './controlButton/controlButton';
import ControlsWrapper from './controls_style';

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
    </ControlsWrapper>
  )
}

export default Controls;
