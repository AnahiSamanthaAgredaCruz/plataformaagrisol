import React from "react";

import Link from "next/link";

// Para detectar páginas
import {useRouter} from "next/router";


const MenuNav = () => {
  const router = useRouter();
  console.log(router.pathname);
  return (
    //modificar el color del menu principal para la plataforma comercial de agricultores
    <aside className="bg-yellow-400 sm:w-1/3 xl:w-1/6 sh:min-h-screen p-5">
      <div>
        <p className="text-gray-800 text-3xl font-black  text-center ">AGRISOL</p>
      </div>

      <nav className="mp-5 list-none">

        <li className={router.pathname ==="/" ? "bg-indigo-700 p-2 rounded-xl " : "p-2"}>
          <Link href="/agricultor">
            <a className="text-white block font-bold  text-center">
              Agricultores
            </a>
          </Link>
        </li>

      </nav>
    </aside>
  )
}
export default MenuNav;
