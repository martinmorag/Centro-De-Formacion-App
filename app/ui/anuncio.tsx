import { HomePageProps }from "@/app/lib/definitions"
import React from 'react';

export const Anuncios: React.FC<HomePageProps> = ({ anuncios }) => {
    if (!anuncios || anuncios.length === 0) {
        return <p className="mt-4 text-gray-400">No hay anuncios.</p>;
    }

    else return (
        <>
        {anuncios.map((anuncio) => (
            <section key={anuncio._id} className="flex justify-between w-[90vw] h-[95vh] bg-back2 p-2 m-2 mx-6 rounded-md">
                <div className="flex flex-col justify-center items-center w-[25vw] h-full px-4">
                    <h1 className="text-center pb-5 pt-3 pr-3 pl-3 text-2xl break-words font-bold">{anuncio.nombre}</h1>
                    <p className="text-center pl-5 pr-5 pt-2 break-words font-bold">{anuncio.descripcion}</p>
                </div>
                <div className="flex justify-center items-center items-end w-[70vw] px-4 w-full overflow-hidden">
                    <img 
                    src={anuncio.imagen} 
                    alt={anuncio.nombre} 
                    className="max-h-[65vh] object-contain rounded-md"
                    />
                </div>
            </section>
            ))}
        </>
    )
}