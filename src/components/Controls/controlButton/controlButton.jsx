import Button from "./button_style";

const ControlButton = (props) => {
  return (
    <Button 
      control
      onClick={ () => {
        props.changeDirection({code: props.code});
      }}
      text={props.text}
    >
      {props.text}
    </Button>
  )
}

export default ControlButton;
