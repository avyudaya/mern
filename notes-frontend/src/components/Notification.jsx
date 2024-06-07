const Notification = ({errMessage}) => {
    if(errMessage === null){
        return null;
    }

    const errorStyle = {
        color: 'red'
    }

    return (
        <div style={errorStyle}>
            {errMessage}
        </div>
    )
 }

export default Notification;
