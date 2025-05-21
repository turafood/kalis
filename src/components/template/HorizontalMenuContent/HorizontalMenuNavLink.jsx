import Link from 'next/link'
import classNames from 'classnames'

const HorizontalMenuNavLink = ({
    path,
    children,
    isExternalLink,
    className,
    onClick,
}) => {
    return (
        <Link
            className={classNames(
                'w-full flex items-center outline-0',
                className,
            )}
            href={path}
            target={isExternalLink ? '_blank' : ''}
            onClick={onClick}
        >
            {children}
        </Link>
    )
}

export default HorizontalMenuNavLink
