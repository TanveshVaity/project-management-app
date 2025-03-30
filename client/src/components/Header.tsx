
type Props = {
    name : string;
    buttoComponent ?: any;
    isSmallText ?: boolean;
}

const Header = ({name, buttoComponent, isSmallText = false} : Props) =>{
    return(
        <div className="flex items-center justify-between mb-5 w-full">
            <h1 className={`${isSmallText ? "text-lg" : "text-2xl"} font-semibold dark:text-white`}>
                {name}
            </h1>
            {buttoComponent}
        </div>
    )
}

export default Header;