import Button from "./button_style";

const ControlButton = (props) => {
  return (
    <Button 
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
