import { ErrorIcon, SuccessIcon } from "./";

interface AlertProps {
    title: string;
    className: string
}

const Alert = ({ title, className }: AlertProps) => {
    const BASE_CLASS = `alert ${className} absolute top-0 w-full`;
    const AlertIcon = className === 'alert-error' ? ErrorIcon : SuccessIcon;

    return (
        <div role="alert" className={BASE_CLASS}>
            <AlertIcon />
            <span>{title}</span>
        </div>
    )
}

export default Alert