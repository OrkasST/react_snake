import controlButton from './controlButton';

const Controls = (props) => {
  return (
    <div>
      <controlButton
        changeDirection={props.changeDirection}
        text='left'
      />
      <controlButton />
      <controlButton />
      <controlButton />
    </div>
  )
}

export default Controls;
