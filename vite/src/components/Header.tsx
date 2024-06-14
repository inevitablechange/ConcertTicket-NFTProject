import { FC, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";

const pages = [
  { name: "About", path: "/" },
  { name: "Buy", path: "/buy" },
  { name: "Trade", path: "/trade" },
  { name: "My Page", path: "/mypage" },
];

const Header: FC = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full border-solid border-b-[0.5px] border-primary/[0.5]">
      <div className="container-style h-20 flex justify-between items-center p-6 ">
        <div>
          <image className="min-w-[150px]">
            <Link to="/">Logo</Link>
          </image>
        </div>
        <nav>
          <ul className="hidden md:flex gap-10 ">
            {pages.map((v, i) => (
              <li key={i} className="hover:font-bold w-20">
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
        <div className="w-40">
          <button className="hidden rounded-full min-w-[150px] p-[12px] border border-[#4f4c37] shadow-lg md:flex justify-center hover:font-semibold hover:border-2">
            Connect Wallet
          </button>
        </div>
        <div className="relative md:hidden">
          <button
            onClick={toggleMenu}
            className="border-2 border-gray-400 hover:border-gray-600 font-medium rounded-full px-5 py-2.5 text-center inline-flex items-center"
          >
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="black"
                className="h-6 w-6 hover:opacity-65 cursor-pointer"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="black"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                ></path>
              </svg>
            )}
          </button>
          {isOpen ? (
            <div className="absolute top-[52px] -left-[14px] z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-24 text-center">
              <ul className="py-4 text-sm text-gray-700">
                {pages.map((v, i) => (
                  <li key={i} className="hover:font-bold my-2">
                    <button
                      onClick={() => {
                        navigate(v.path);
                        setIsOpen(false);
                      }}
                    >
                      {v.name}
                    </button>
                  </li>
                ))}
                <li className="hover:font-bold my-2">🦊 Sign In</li>
              </ul>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
