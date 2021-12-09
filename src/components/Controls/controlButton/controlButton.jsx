import Button from "./ControlButton.style";

const ControlButton = (props) => {
  return (
    <Button control
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
