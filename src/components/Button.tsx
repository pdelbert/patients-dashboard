import Loading from "./Loading"

interface ButtonProps {
    text: string
    className: string
    disabled?: boolean
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button = ({ className, text, disabled, onClick }: ButtonProps) => {
    const BASE_CLASS = `btn ${className}`
    return (
        <button
            disabled={disabled}
            className={BASE_CLASS}
            onClick={onClick}>
            {disabled ? <Loading /> : text}
        </button>
    )
}

export default Button