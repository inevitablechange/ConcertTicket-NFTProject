import { FC, useState } from "react";
import { NavLink, Link } from "react-router-dom";

const pages = [
  { name: "About", path: "/" },
  { name: "Buy", path: "/buy" },
  { name: "Trade", path: "/trade" },
  { name: "My Page", path: "/mypage" },
];

const Header: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full">
      <div className="container-style bg-green-200 h-20 flex justify-between items-center p-6">
        <div>
          <image className="min-w-[150px]">
            <Link to="/">Logo</Link>
          </image>
        </div>
        <nav>
          <ul className="hidden md:flex gap-20">
            {pages.map((v, i) => (
              <li key={i} className="hover:font-bold">
                <NavLink
                  to={v.path}
                  className={({ isActive }) =>
                    isActive ? "font-bold underline" : ""
                  }
                >
                  {v.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <button className="hidden rounded-full min-w-[150px] p-[12px] bg-blue-400 shadow-lg md:flex justify-center hover:font-bold">
            Connect Wallet
          </button>
        </div>

        <button
          onClick={toggleMenu}
          className="relative border-2 border-gray-400 hover:border-gray-600 font-medium rounded-full px-5 py-2.5 text-center inline-flex items-center md:hidden "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="black"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            ></path>
          </svg>
        </button>
        {isOpen ? (
          <div className="absolute bottom-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ">
            <ul className="py-2 text-sm text-gray-700">
              {pages.map((v, i) => (
                <li key={i} className="hover:font-bold">
                  <Link to={v.path}>{v.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Header;
