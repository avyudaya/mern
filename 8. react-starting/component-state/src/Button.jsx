const Button = ({status, onClick, text}) => <button disabled={status} onClick={onClick}>{text}</button>;

export default Button;