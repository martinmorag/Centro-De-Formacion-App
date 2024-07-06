import LoginForm from "@/app/ui/login-form";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/24/outline";


export default function Page() {
  return (
    <main className="flex items-center justify-center md:h-screen bg-primary">
      <Link href="/panel" className="flex w-[8vw] h-[19vh] m-4 flex-col justify-center items-center bg-white text-primary rounded-md absolute left-1 top-1">
            <span className="text-large">Ir al Inicio</span>
            <HomeIcon className="w-[50px] h-[50px]"/>
      </Link>
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <LoginForm />
      </div>
    </main>
  );
}