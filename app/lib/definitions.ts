export type User = {
    id: string;
    name: string;
    level: string;
    email: string;
    password: string;
};
export interface FormData {
    nombre: string;
    descripcion: string;
    imagen: File | null;
}

export type Item = {
    nombre: string;
    descripcion: string;
    imagen: File;
}

export type Anuncio = {
    _id: string;
    nombre: string;
    descripcion: string;
    imagen: string;
}

export interface HomePageProps {
    anuncios: Anuncio[];
}

export interface MiniAnunciosProps {
    anuncios: Anuncio[];
    onDelete: (id: string) => void; // Function to handle delete action
}