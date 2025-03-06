interface ButtonProps {
    text: string
    className: string
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button = ({ className, text, onClick }: ButtonProps) => {
    const BASE_CLASS = `btn ${className}`
    return (
        <button
            className={BASE_CLASS}
            onClick={onClick}>
            {text}
        </button>
    )
}

export default Button