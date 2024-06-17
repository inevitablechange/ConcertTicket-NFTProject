import { FC } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout";

const Buy: FC = () => {
  const { signer, mintContract } = useOutletContext<OutletContext>();

  const onClickMint = () => {
    console.log(signer, mintContract);
  };

  return (
    <div className="flex-grow w-full">
      <div className="container-style bg-blue-300 p-6">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="flex justify-center items-center text-center mb-20 md:w-[400px] md:h-[400px] md:mb-0">
            <ul>
              <li className="mb-4">Tickets Total : 100 </li>
              <li className="mb-4">Price: 0.001 eth per ticket</li>
              <li className="mb-4">
                One can buy upto maximum of only one ticket.
              </li>
              <li className="mb-4"># of tickets left : 100 - minted number</li>
              <li className="border-2 border-gray-400 font-medium rounded-full px-5 py-2.5 text-center inline-flex items-center">
                2024/06/17 ~ 2024/06/30
              </li>
            </ul>
          </div>
          <div className="flex justify-center items-center md:w-[400px] md:h-[400px]">
            <img src="" />
            <button onClick={onClickMint} className="bg-green-500">
              Buy Ticket for 0.001 Eth
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buy;
