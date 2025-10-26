// import { ThemeChanger } from "@/Components/theme-change";
import Link from "next/link";

export const MenuHeader = () => {
  function onHamburgerMenuPress() {
    const menu = document.getElementById("navbar-hamburger");

    if (menu && menu?.className.indexOf("hidden") >= 0) {
      menu?.classList.remove("hidden");
    } else {
      menu?.classList.add("hidden");
    }
  }

  return (
    <nav className="z-10 p-6 bg-emerald-400 border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto">
        <span className="self-center flex text-4xl font-semibold whitespace-nowrap dark:text-white">
          <div className="flex text-center items-center">
            Socket Rocket Games
          </div>
        </span>
        <button
          onClick={onHamburgerMenuPress}
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div
          id="navbar-hamburger"
          className="hidden  w-full md:block md:w-auto border-b-4 border-slate-700"
        >
          <ul className="z-50 font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li className="max-md:p-2 ">
              <Link
                href="/"
                className="rounded p-0 text-3xl"
                aria-current="page"
                replace={false}
                legacyBehavior
              >
                Home
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
