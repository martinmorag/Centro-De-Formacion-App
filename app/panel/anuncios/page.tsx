import { NewspaperIcon, PowerIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { signOut } from '@/auth';
import Actuales from '@/app/ui/actuales';
import { Anuncio } from "@/app/lib/definitions";

async function fetchAnuncios(): Promise<Anuncio[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items`);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
}

export default async function Page() {
    const anuncios = await fetchAnuncios()

    return (
      <main>
        <div className="flex p-4 mt-10 justify-center">
          <form
            className="relative group"
            action={async () => {
              'use server';
              await signOut();
            }}
          >
            <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
              <div className="absolute left-[-120px] hidden group-hover:block text-gray-700 bg-gray-100 px-2 py-1 rounded-md text-md">
                Cerrar sesión
              </div>
              <PowerIcon className="w-6" />
            </button>
          </form>
          <Link href="/panel/anuncios/crear" className="flex w-[30vw] h-[48px] ml-2 justify-center items-center bg-primary text-white rounded-md hover:bg-white hover:text-primary transition duration-300 ease-in-out">
            <span className="text-large pr-3">Crear nuevo anuncio</span>
            <NewspaperIcon className="w-[24px] h-[24px]"/>
          </Link>
        </div>
        <section>
          <h1 className="text-center text-lg mt-10 mb-8">Anuncios actuales</h1>
          <div className="flex justify-around">
            <Actuales />
          </div>
        </section>
      </main>
    );
  }