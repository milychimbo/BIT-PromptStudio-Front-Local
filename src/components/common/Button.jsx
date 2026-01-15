import { Link } from 'react-router-dom';

const Button = ({
    children,
    variant = 'primary',
    className = '',
    onClick,
    to,
    ...props
}) => {
    const classes = `btn btn-${variant} ${className}`;

    if (to) {
        return (
            <Link to={to} className={classes} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button
            className={classes}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
