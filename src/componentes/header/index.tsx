import { memo, useEffect, useState } from "react"
import { IoMdMenu } from "react-icons/io";
import Button from "../button";

function Header(){

    const [open, setOpen] = useState(false);

    useEffect(()=>{

        if (!open){
            return
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setOpen(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };

    },[open])

    return(
        <>
            {open && (
                <span className="fixed top-0 left-0 w-full h-full bg-black opacity-20 z-40" onClick={() => setOpen(false)}/>
            )}
            <header className="fixed top-0 w-full max-w-4xl left-1/2 -translate-x-1/2 p-4 z-50">
                <div className="w-full h-full flex items-center justify-between p-4 bg-white rounded-lg shadow-md relative">
                    <div className="w-full h-full max-w-24">
                        <img src="./icon.webp" alt="logo" className="w-full object-cover"/>
                    </div>

                    <button onClick={() => setOpen(!open)} 
                    className="text-xl cursor-pointer">
                        <IoMdMenu />
                    </button>

                    {'a' == 'a'  &&
                        <nav className={`absolute -bottom-62 bg-white w-full left-1/2 -translate-x-1/2 shadow-md rounded-lg p-4 ${!open? '-translate-y-96 opacity-0' : 'translate-y-0 opacity-100'} duration-500 transition-all -z-20`}>
                            <ul className="w-full flex flex-col gap-4">
                                <li className="w-full h-full">
                                    <a href="#" 
                                    className="w-full h-full text-center hover:bg-neutral-50 flex p-2 items-center justify-center rounded-lg text-sm duration-200 transition-colors">
                                        Sobre
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="w-full h-full text-center hover:bg-neutral-50 flex p-2 items-center justify-center rounded-lg text-sm duration-200 transition-colors">
                                        Serviços</a>
                                </li>
                                <li>
                                    <a href="#"className="w-full h-full text-center hover:bg-neutral-50 flex p-2 items-center justify-center rounded-lg text-sm duration-200 transition-colors">
                                        À venda</a>
                                </li>
                                <li className="flex items-center justify-center">
                                    <Button className="mx-auto">
                                    <a
                                        href="https://wa.me/5511969205393"
                                        className="block w-full h-full text-white text-center"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Conversar
                                    </a>
                                    </Button>

                                </li>
                            </ul>
                        </nav>
                    }
                </div>
            </header>
        </>
    )
}


export default memo(Header);