import spinner from './spinner-icon.gif'

function LoadingIndicator() {
  return (
    <center>
      <img className="loading-indicator" alt="now loading..." src={spinner} style={{ margin: '1rem' }} />
    </center>
  );
}

export default LoadingIndicator