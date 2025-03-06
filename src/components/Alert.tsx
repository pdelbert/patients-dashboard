
interface AlertProps {
    title: string;
    className: string
}

const errorIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

const successIcon = <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>

const Alert = ({ title, className }: AlertProps) => {
    const BASE_CLASS = `alert ${className} absolute top-0 w-full`;
    const ICON = className === 'alert-error' ? errorIcon : successIcon;

    return (
        <div role="alert" className={BASE_CLASS}>
            {ICON}
            <span>{title}</span>
        </div>
    )
}

export default Alert