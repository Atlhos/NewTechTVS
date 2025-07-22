import Header from "@/componentes/header";
import json from "../../services/ptbr.json";
import Button from "@/componentes/button";
import { FaCheck } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { FaInstagram, FaWhatsapp, FaPhone  } from "react-icons/fa";
import axios from "axios";
import Carousel from "react-multi-carousel";
import convertDriveLink from "@/utils/convertDriveLink";


interface productsProps{
    name: string;
    image: string;
    price: string;
}
function Home(){

    const scrollRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(true);
    const data = json || null;
    const [products, setProducts] = useState<productsProps[]>([]); 
    const [direction, setDirection] = useState(1);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        const speed = 1.5;
        const interval = setInterval(() => {
        scrollContainer.scrollLeft += direction * speed;

        const atEnd =
            scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth;
        const atStart = scrollContainer.scrollLeft <= 0;

        if (atEnd) setDirection(-1); 
        if (atStart) setDirection(1); 
        }, 10); 

        return () => clearInterval(interval);
    }, [direction]);

    async function getProducts() {
        const sheetID = import.meta.env.VITE_SHEETID;
        const apiKey = import.meta.env.VITE_APIKEY;
        const aba = import.meta.env.VITE_SHEETABA;
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${aba}?key=${apiKey}`;

        try {
            const response = await axios.get(url);
            
            const rows = response.data.values;
            if (!rows || rows.length === 0) {
                console.log("Sem dados retornados da planilha");
                return;
            }

            const produtosData = rows.slice(1).map((row: string[]) => ({
                name: row[0],
                price: row[1],
                image: row[2],
            }));

            setProducts(produtosData);
        } catch (error) {
            console.error("Erro ao carregar os dados", error);
        }
    }

    useEffect(() => {
        getProducts();
        if (data){
            setLoading(false);
        }
    }, []); 

    const responsive = {
        desktop: {
            breakpoint: { max: 999999999999, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 640 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 640, min: 0 },
            items: 1
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return(
        <>
            <Header />
            {data && (
                <>
                    <main className="flex flex-col gap-24">


                        <section className="w-full h-screen">
                            <div className="w-full h-full flex flex-col justify-center items-center gap-16 p-8 max-w-7xl mx-auto">
                                <article className="flex flex-col gap-6 text-center">
                                    <h1 className="text-5xl">{data.part1.title}</h1>
                                    <p className="text-xl tex">{data.part1.subtitle}</p>
                                    
                                    <Button text={data.part1.button} className="scale-125 w-fit mx-auto"/>
                                    
                                </article>

                                <article className="flex gap-4 items-center flex-col-reverse">
                                    {data.part1.list.length > 0 && data.part1.list.map((item, index) => (
                                        <span key={index} style={{ width: `calc(200px + ${10 * index}px)` }} 
                                        className="bg-white p-2 rounded-lg flex items-center gap-4 justify-center text-xs">
                                            <FaCheck className="text-main"/>
                                            <p>{item}</p>
                                        </span>
                                    ))}
                                </article>
                                
                            </div>
                        </section>

                        <section className="w-full">
                            <div className="p-8 max-w-7xl mx-auto flex flex-col gap-8 text-center">

                                <div className="flex flex-col gap-2">
                                    <h1 className="title">{data.part2.title}</h1>
                                    <p>{data.part2.description}</p>
                                </div>

                                
                                <div className="w-full material aspect-square p-4 rounded-lg">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.867249697327!2d-46.644036988099344!3d-23.537276578727973!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce595c8fdd717d%3A0x818cf3f53103434f!2sNewTech%20TVs!5e0!3m2!1spt-BR!2sbr!4v1753126427191!5m2!1spt-BR!2sbr" width="100%" height="100%"></iframe>
                                </div>
                            </div>

                        </section>

                        <section className="w-full">
                            <div className="p-8 max-w-7xl mx-auto flex flex-col gap-8">
                                <h1 className="title">{data.part3.title}</h1>
                                <div className="material flex flex-col gap-12 rounded-lg p-8">
                                    {data.part3.list.length > 0 && data.part3.list.map((item, index) => (
                                        <div key={index} className="p-4 border-l-2 border-main">
                                            <div className="flex items-center gap-4">
                                                <div dangerouslySetInnerHTML={{ __html: item.icon }} />
                                                <h3 className="text-xl text-main">{item.title}</h3>
                                            </div>
                                            
                                            <p className="text-sm">{item.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <section className="w-full">
                            <div className="p-8 max-w-7xl mx-auto flex flex-col gap-8">
                                <h1 className="title">{data.part4.title}</h1>
                                <div className="material p-8 text-center text-xl flex flex-col gap-12 rounded-lg">
                                    <img src='./icon.webp' alt='logo' className="w-full max-w-32 self-center"/>
                                    <p>{data.part4.title2}</p>
                                    <div className="flex overflow-x-auto gap-4 p-4 border-2 border-white rounded-lg hide-scrollbar w-full mx-auto" ref={scrollRef}>
                                        {data.part4.list.length > 0 && data.part4.list.map((item, index) => (
                                            <article key={index} className="min-w-16">
                                                <img src={item} alt="logo" className="w-full" />
                                            </article>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="w-full">
                            <div className="p-8 max-w-7xl mx-auto flex flex-col gap-8">
                                <h1 className="title">{data.part5.title}</h1>
                                <div className="flex flex-col gap-8">
                                    {data.part5.list.length > 0 && data.part5.list.map((item, index) => (
                                        <article key={index} className="p-3 max-w-7xl mx-auto flex flex-col gap-2 border-2 border-white rounded-lg">
                                            <div className="aspect-video w-full bg-black overflow-hidden rounded-lg">
                                                <img src={item.image} alt="logo" className="w-full object-cover h-full" />
                                            </div>

                                            <div className="bg-white p-4 rounded-lg">
                                                <h3>{item.title}</h3>
                                                <p className="text-xs">{item.description}</p>
                                            </div>

                                        </article>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <section className="w-full">
                            <div className="p-8 max-w-7xl mx-auto flex flex-col gap-8">
                                <h1 className="title">{data.part6.title}</h1>
                                <div className="w-full items-stretch">
                                    <Carousel
                                        responsive={responsive}>
                                            {products.map((item, index) => (
                                                <article key={index} className="p-2 ">

                                                    <div className="flex flex-col gap-4 border-4 border-white p-4 rounded-lg">
                                                        <div className="w-full bg-white p-2 text-center rounded-xl">
                                                            <h3>{item.name}</h3>
                                                        </div>
                                                        <h2 className="text-xl text-end">{item.price}</h2>
                                                        <div className="w-full aspect-video bg-white rounded-lg relative overflow-hidden ">
                                                            <img
                                                                src={convertDriveLink(item.image)}
                                                                alt="logo"
                                                                className="absolute inset-0 w-full h-full object-contain object-center"
                                                            />
                                                        </div>

                                                        <Button text="Comprar"/>
                                                    </div>
                                                    
                                                    

                                                </article>
                                            ))}

                                        </Carousel>
                                </div>
                            </div>
                        </section>

                    <footer className=" w-full flex-col pt-6 flex gap-8 shadow-lg border-t-2 border-white text-neutral-600">
                        <div className="p-4 py-6 w-full m-auto max-w-7xl">
                            <ul className="flex gap-6 text-2xl">
                                <li className="hover:scale-125 duration-200">
                                    <a
                                    href={data.instagram && data.instagram} target="_blank">
                                        < FaInstagram/>
                                    </a>
                                </li>
                                <li className="hover:scale-125 duration-200">
                                    <a target="_blank"
                                    href={`https://api.whatsapp.com/send?phone=${data && data.phone && data.phone}`}>
                                        < FaWhatsapp/>
                                    </a>
                                </li>
                                <li className="hover:scale-125 duration-200">
                                    <a href={data.phone &&  `tel:${data.phone}` } target="_blank"
                                    >
                                        < FaPhone />
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="flex items-start justify-between p-4 w-full m-auto max-w-7xl">

                            <div className="flex flex-col gap-4 lg:flex-row lg:gap-16">
                                <div className="flex flex-col gap-2">
                                    <b className="relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-1/2 after:h-[2px] after:bg-neutral-600">
                                        {data.footer && data.footer.list1title && data.footer.list1title}
                                    </b>
                                    <ul>
                                        {data.footer && data.footer.list1.length > 0 && data.footer.list1.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <b className="relative inline-block after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-1/2 after:h-[2px] after:bg-neutral-600">
                                        {data.footer && data.footer.list2title && data.footer.list2title}
                                    </b>
                                    <ul>
                                        {data.footer && data.footer.list2.length > 0 && data.footer.list2.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="text-end clear-start flex flex-col gap-4">
                                <b>{data.footer && data.footer.list3title && data.footer.list3title}</b>
                                <ul className="flex flex-col gap-2">
                                    {data.footer && data.footer.list3.length > 0 && data.footer.list3.map((item, index) => (
                                        <li key={index}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="p-4 py-8 md:px-16  flex flex-col gap-4 ">
                            <div className="w-full pb-4">
                                <p><b>Endereço: </b>{data.address && data.address}</p>
                            </div>
                            
                            <p>&copy; 2025 New Tech - Todos os direitos reservados</p>
                        </div>
                    </footer>

                    </main>
                </>
            )}

        </>
    )
}

export default Home;