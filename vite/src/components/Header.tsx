import { FC } from "react";

const Header: FC = () => {
  return (
    <div className="w-full bg-red-400">
      <div className="container-style bg-green-200 h-20 flex justify-between items-center">
        <div>
          <image>Logo</image>
          <button>About</button>
          <button>Buy</button>
          <button>Trade</button>
          <button>My Page</button>
        </div>
        <div>
          <button>Connect Wallet</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
