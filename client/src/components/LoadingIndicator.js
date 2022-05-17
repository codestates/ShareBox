import spinner from './spinner-icon.gif'

function LoadingIndicator() {
  return (
    <center>
      <img className="loading-indicator" alt="now loading..." src={spinner} style={{ margin: '1rem' }} />
      <h2>L o a d i n g . . .</h2>
    </center>
  );
}

export default LoadingIndicator