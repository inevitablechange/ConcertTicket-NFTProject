import { FC } from "react";
import { NavLink } from "react-router-dom";

const Header: FC = () => {
  return (
    <div className="w-full bg-red-400">
      <div className="container-style bg-green-200 h-20 flex justify-between items-center p-6">
        <div>
          <image className="min-w-[150px]">Logo</image>
        </div>
        <div className="flex gap-20">
          <button>
            <NavLink to="/">About</NavLink>
          </button>
          <button>
            <NavLink to="/buy">Buy</NavLink>
          </button>
          <button>
            <NavLink to="/trade">Trade</NavLink>
          </button>
          <button>
            <NavLink to="/mypage">My Page</NavLink>
          </button>
        </div>
        <div>
          <button className="hidden rounded-full min-w-[150px] p-[12px] bg-blue-400 shadow-lg lg:flex justify-center">
            Connect Wallet
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
