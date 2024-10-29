import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen lg:px-8 flex items-center justify-center">
      <div className="mx-auto max-w-2xl h-full flex justify-center items-center py-12">
        <div className="text-center flex flex-col items-center justify-center w-full">
          <h1 className="font-bold tracking-tight text-gray-900 dark:text-white lg:w-[800px] space-y-4">
            <span className="lg:text-6xl text-4xl text-start">Conoce a expertos</span>
            <hr className="h-0 w-0"/>
            <span className="text-xl text-end text-orange-600 dark:text-green-500 w-full">Programando en tu idioma</span>

          </h1>
          <p className="mt-6 text-md tracking-wider leading-8 text-gray-600 dark:text-white">
            Esta Plataforma te permite conectarte con otros desarrolladores para compartir proyectos, experiencias, ayuda o desarrollar juntos
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/browse"
              className="rounded-md bg-black px-4 py-2.5 text-sm font-semibold text-white hover:bg-orange-600 hover:text-white hover:border-b-2 hover:border-r-2 hover:border-black shadow-md"
            >
              Registrate
            </Link>
          </div>
        </div>
      </div>

    </div>

  );
}