'use client'
const ActionButton = ({ children, ...rest }) => {
    return (
        <button
            className="outline-hidden rounded-full p-2 text-xl bg-white dark:bg-gray-500 hover:bg-gray-200 dark:hover:bg-gray-400 hover:text-gray-800 dark:text-gray-200 dark:hover:text-gray-100"
            {...rest}
        >
            {children}
        </button>
    )
}

export default ActionButton
