import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../public/f1_logo 1.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-f1Red text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-semibold">
          <Link
            href="/"
            className="text-white hover:text-gray-300"
            onClick={() => setIsOpen(false)}
            legacyBehavior
          >
            <Image src={Logo} width={100} />
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-xl">
            &#9776;
          </button>
        </div>
        <div
          className={`absolute md:relative w-full md:w-auto bg-black md:bg-transparent transition-all duration-300 ease-in-out px-10 ${
            isOpen ? "top-16" : "top-[-490px]"
          } md:top-0 right-0 md:flex`}
        >
          <ul className="flex flex-col md:flex-row items-center md:space-x-8 text-center gap-6">
            <li>
              <Link
                href="/"
                className="block py-2 px-4 hover:bg-gray-700 md:hover:bg-transparent"
                onClick={() => setIsOpen(false)}
                legacyBehavior
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="block py-2 px-4 hover:bg-gray-700 md:hover:bg-transparent"
                onClick={() => setIsOpen(false)}
                legacyBehavior
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="block py-2 px-4 hover:bg-gray-700 md:hover:bg-transparent"
                onClick={() => setIsOpen(false)}
                legacyBehavior
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;