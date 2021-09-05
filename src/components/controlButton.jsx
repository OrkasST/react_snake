const controlButton = (props) => {
  return (
    <button onClick={ () => {
      props.changeDirection({code: props.code});
 .  } } >
      {props.text}
    </button>
  )
}

export default controlButton;
