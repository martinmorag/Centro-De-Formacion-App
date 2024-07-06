"use client";

import { DocumentTextIcon, PencilIcon, PhotoIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { useState, ChangeEvent } from "react";
import { FormData } from "@/app/lib/definitions";
import { useRouter } from "next/navigation";
import Link from "next/link";

// function onFileChange(event: any) {
//     let file = event.target.files[0];
//     let reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = function () {
//         console.log(reader.result);
//     };
//     reader.onerror = function (error) {
//         console.log('Error: ', error);
//     };
// }


  
export default function Page() {
    const [formData, setFormData] = useState<FormData>({
        nombre: "",
        descripcion: "",
        imagen: null,
    });

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter(); 

    const convertImageToBase64 = async (file: File) => {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
          reader.onload = (event) => resolve(event.target?.result as string);
          reader.onerror = (error) => reject(error);
          reader.readAsDataURL(file);
        });
    };

    const uploadImages = async (files: File[]) => {
        const imageUrls = [];
        for (const file of files) {
          const base64Image = await convertImageToBase64(file);
          imageUrls.push(base64Image);
        }
        return imageUrls;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const imageUrls = await uploadImages(formData.imagen ? [formData.imagen] : []);

            const dataToSend = {
                nombre: formData.nombre,
                descripcion: formData.descripcion,
                imagen: imageUrls[0], // Assuming a single image upload
            };

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items`, { // Adjust the API endpoint according to your project
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                console.log("Item created successfully");
                setFormData({
                    nombre: "",
                    descripcion: "",
                    imagen: null,
                });
                router.push("/panel/anuncios")
            } else {
                console.error("Error creating item");
            }
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFormData({
                ...formData,
                imagen: e.target.files[0],
            });
        }
    };
    
    return (
      <main>
        <h1 className="text-xl text-center mt-[13vh] mb-5">Crear un nuevo anuncio</h1>
        <Link href="/panel/anuncios" className="flex absolute top-5 left-5 bg-primary text-white p-2 pr-3 pl-3 rounded-md hover:text-primary hover:bg-white transition ease-in-out duration-300">
            Regresar
            <ArrowUturnLeftIcon className="w-[22px] h-[22px] ml-2" />
        </Link>
        <div className="flex justify-around">
            <form className="m-5" onSubmit={handleSubmit} >
                <fieldset className="flex flex-col w-[35vw] h-[100%] p-5 bg-primary rounded-md">
                    {/* Nombre de anuncio */}
                    <div className="flex flex-col pt-1 pb-1">
                        <label htmlFor="nombre" className="text-white flex mb-1 mt-3">
                            Nombre <PencilIcon className="w-[20px] h-[20px] ml-2" />
                        </label>
                        <input
                            id="nombre"
                            name="nombre" 
                            type="text"
                            placeholder="Ingresar nombre de anuncio" 
                            required
                            className="rounded-sm"
                            value={formData.nombre}
                            onChange={handleInputChange}
                        />
                    </div>
                    {/* Descripción de anuncio */}
                    <div className="flex flex-col pt-1 pb-1">
                        <label htmlFor="descripcion" className="text-white flex mb-1 mt-3">
                            Descripción <DocumentTextIcon className="w-[20px] h-[20px] ml-2" />
                        </label>
                        <textarea
                            id="descripcion"
                            name="descripcion" 
                            placeholder="Ingresar descripción de anuncio" 
                            required
                            className="rounded-sm"
                            value={formData.descripcion}
                            onChange={handleInputChange}
                        />
                    </div>
                    {/* Imágen de anuncio */}
                    <div className="flex flex-col pt-1 pb-1">
                        <label htmlFor="imagenes" className="text-white flex mb-1 mt-3">
                            Imágen <PhotoIcon className="w-[20px] h-[20px] ml-2" />
                        </label>
                        <input
                            id="imagen"
                            name="imagen" 
                            placeholder="Seleccionar de anuncio"
                            type="file" 
                            required
                            className="rounded-sm"
                            onChange={handleImageChange}
                        />
                    </div>
                    {/* Botón de Enviar */}
                    <div className="flex justify-center pt-5 pb-4">
                        <input
                        id="submit"
                        name="submit" 
                        type="submit"
                        className="flex justify-center bg-white w-[150px] h-[40px] rounded-md active:bg-primary active:text-white active:border-white"
                        value={isLoading ? "Subiendo..." : "Subir anuncio"}
                        disabled={isLoading}
                        />
                    </div>
                </fieldset>
            </form>
        </div>
      </main>
    );
  }