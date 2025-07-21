interface buttonProps extends React.HTMLAttributes<HTMLButtonElement> {
    text: string;
}

function Button ({text, ...rest}: buttonProps) {
    return(
        <button {...rest} className="bg-main text-white px-4 py-2 rounded-lg text-xs md:text-md font-semibold hover:bg-mainDark cursor-pointer">
            {text}
        </button>
    )
}

export default Button;