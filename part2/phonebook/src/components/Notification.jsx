const Notification = ({ message, messageType}) => {
  
  const ErrorStyle = {    
      color: '#C91B00',
      background: '#ffffff',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 10,
      borderWidth: 1,
      padding: 10,
      marginBottom: 10,
      width: '50%',
    }
    const MessageStyle = {    
      color: '#50C878',
       background: '#ffffff',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 10,
      borderWidth: 1,
      padding: 10,
      marginBottom: 10,
      width: '50%',
    }
    const WarningStyle = {    
      color: '#d1d22e',
      background: '#ffffff',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 10,
      borderWidth: 1,
      padding: 10,
      marginBottom: 10,
      width: '50%',
    }
  
  
  let NotifiStyle

  switch (messageType) {
    case "error":
      NotifiStyle = ErrorStyle;
      break;
    case "message":
      NotifiStyle = MessageStyle;
      break;
    case "warning":
      NotifiStyle = WarningStyle;
      break;
    default:
      NotifiStyle = MessageStyle;
  }

  if (message === null) {
    return null
  }

  return (
    <div style={NotifiStyle}>
      {message}
    </div>
  )
}

export default Notification