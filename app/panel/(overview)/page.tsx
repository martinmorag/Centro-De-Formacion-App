import { ArrowLeftEndOnRectangleIcon, NewspaperIcon } from '@heroicons/react/24/solid';
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <main className={`flex h-screen`}>
       <div className="flex flex-1 justify-around items-center flex-col bg-white">
        <Image
          src="/Logo.png"
          alt="Picture of Logo"
          width={250}
          height={117.20}
          className="h-117"
        ></Image>
        <div>
          <p className='text-lg italic pb-5'>"El aprendizaje es experiencia, todo lo demás es información."</p>
          <p className='text-lg text-right'>- Albert Einstein</p>
        </div>
        <Link
          href="/"
          className="flex border border-primary rounded px-7 py-2 transition duration-300 ease-in-out hover:bg-primary hover:text-white hover:border-white"
        >
          <NewspaperIcon className="w-5 md:w-6"/> 
          <span className="px-3">¿Te gustaría ver nuestras últimas noticias?</span>
        </Link>
       </div>
       <div className="flex flex-1 items-center justify-center bg-primary">
        <Link
          href="/ingreso"
          className="flex border border-white rounded px-7 py-2 text-white transition duration-300 ease-in-out hover:bg-white hover:text-primary hover:border-primary"
        >
          <ArrowLeftEndOnRectangleIcon className="w-5 md:w-6"/> 
          <span className="px-3">Ingresar</span> 
        </Link>
       </div>
    </main>
  );
}