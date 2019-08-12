import React from 'react'

const ErrorMessage = (props) => {


  const styles = {
    error: {
      margin: '1rem',
      padding: '1rem',
      backgroundColor: '#F48A8A',
      color: '#B41717',
      border: '0.5rem #B41717 solid'    },
    ok: {
      margin: '1rem',
      padding: '1rem',
      backgroundColor: '#8CF48A',
      color: 'green',
      border: '0.5rem green solid'
    },
    hide: {
      height: '5.35rem',
      color: 'transparent'
    }
  }

  let style = styles.hide;


  if(props.data.show) {
    if (props.data.error) {
      style = styles.error
    } else {
      style = styles.ok
    }
    setTimeout(()=>{
      props.hideError();
    }, 7000)
  }


  return(
    <div style={style}>
      {props.data.message}
    </div>
  );
}

export default ErrorMessage;