"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useRouter, useParams } from "next/navigation";
import { DocumentTextIcon, PencilIcon, PhotoIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Anuncio } from "@/app/lib/definitions";

const EditAnuncioPage: React.FC = () => {
  const [formData, setFormData] = useState<Anuncio>({
    _id: "",
    nombre: "",
    descripcion: "",
    imagen: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { id } = useParams(); // Get the ID from the URL parameters

  useEffect(() => {
    // Fetch the anuncio data by ID
    const fetchAnuncio = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch anuncio");
        }
        const data: Anuncio = await response.json();
        setFormData(data);
      } catch (error) {
        console.error("Error fetching anuncio:", error);
      }
    };

    fetchAnuncio();
  }, [id]);

  const convertImageToBase64 = async (file: File) => {
    const reader = new FileReader();
    return new Promise<string>((resolve, reject) => {
      reader.onload = (event) => resolve(event.target?.result as string);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
        let imageUrl = formData.imagen; // Use existing image URL by default
  
        if (formData.imagen && typeof formData.imagen !== "string") {
          // If a new image is uploaded, convert it to base64
          const imageUrls = await convertImageToBase64(formData.imagen as unknown as File);
          imageUrl = imageUrls;
        }
  
        const dataToSend = {
          nombre: formData.nombre,
          descripcion: formData.descripcion,
          imagen: imageUrl, // Use the existing image URL or the new base64 image
        };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        console.log("Anuncio updated successfully");
        router.push("/panel/anuncios");
      } else {
        console.error("Error updating anuncio");
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
        imagen: e.target.files[0] as unknown as string,
      });
    }
  };

  return (
    <main>
      <h1 className="text-xl text-center mt-[13vh] mb-5">Editar anuncio</h1>
      <Link href="/panel/anuncios" className="flex absolute top-5 left-5 bg-primary text-white p-2 pr-3 pl-3 rounded-md hover:text-primary hover:bg-white transition ease-in-out duration-300">
        Regresar
        <ArrowUturnLeftIcon className="w-[22px] h-[22px] ml-2" />
      </Link>
      <div className="flex justify-around">
        <form className="m-5" onSubmit={handleSubmit}>
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
                placeholder="Seleccionar imagen de anuncio"
                type="file"
                className="rounded-sm"
                onChange={handleImageChange}
              />
              {formData.imagen && typeof formData.imagen === 'string' && (
                <img src={formData.imagen} alt="Current Image" className="mt-5 rounded-sm w-[50%] h-[auto] ml-[auto] mr-[auto]" />
              )}
            </div>
            {/* Botón de Enviar */}
            <div className="flex justify-center pt-5 pb-4">
              <input
                id="submit"
                name="submit"
                type="submit"
                className="flex justify-center bg-white w-[200px] h-[40px] rounded-md active:bg-primary active:text-white active:border-white"
                value={isLoading ? "Actualizando..." : "Actualizar anuncio"}
                disabled={isLoading}
              />
            </div>
          </fieldset>
        </form>
      </div>
    </main>
  );
};

export default EditAnuncioPage;
