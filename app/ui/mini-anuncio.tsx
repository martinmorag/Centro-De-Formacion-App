"use client"

import { MiniAnunciosProps }from "@/app/lib/definitions"
import React from 'react';
import Link from "next/link";
import { TrashIcon, PencilIcon } from "@heroicons/react/24/outline";

export const MiniAnuncios: React.FC<MiniAnunciosProps> = ({ anuncios, onDelete }) => {
    if (!anuncios || anuncios.length === 0) {
        return <p className="mt-4 text-gray-400">No hay anuncios.</p>;
    }

    else return (
        <>
        {anuncios.map((anuncio) => (
            <>
            <section key={anuncio._id} className="flex flex-col justify-between w-[18vw] h-[57vh] bg-[#EBEBEA] p-2 m-2 rounded-md">
                <div>
                    <h1 className="text-center pt-3 pb-2 pr-3 pl-3 text-md break-words font-bold">{anuncio.nombre}</h1>
                </div>
                <div className="flex justify-center items-end h-full overflow-hidden">
                    <img 
                    src={anuncio.imagen} 
                    alt={anuncio.nombre} 
                    className="max-h-[100%] max-w-[100%] object-contain rounded-md"
                    />
                </div>
                <div className="flex relative justify-around w-[60%] ml-[auto] mr-[auto] mt-3">
                    <button
                    onClick={() => onDelete(anuncio._id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md"
                    >
                    <TrashIcon className="h-[23px] w-[23px]"/>
                    </button>
                    <Link href={`/panel/anuncios/editar/${anuncio._id}`} className="bg-gray-50 hover:bg-gray-300 text-black font-bold py-2 px-4 rounded-md">
                        <PencilIcon className="h-[23px] w-[23px]" />
                    </Link>
                </div>
            </section>
            </>
            ))}
        </>
    )
}