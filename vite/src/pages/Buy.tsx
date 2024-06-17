import { FC, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout";
import { useMetamask } from "../lib";
import { SyncLoader } from "react-spinners";

const MINT_PRICE = 1000000000000000;

const Buy: FC = () => {
  const { signer, setSigner, mintContract } = useOutletContext<OutletContext>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onClickMint = async () => {
    try {
      setIsLoading(true);
      const response = await mintContract?.mintTicket({
        value: MINT_PRICE,
      });

      await response.wait();

      console.log(signer, mintContract);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-grow w-full">
      <div className="container-style p-6">
        <div className="flex flex-col md:flex-row justify-center items-center">
          {signer ? (
            <>
              <div className="flex justify-center items-center text-center mb-20 md:w-[400px] md:h-[400px] md:mb-0">
                <ul>
                  <li className="mb-4">Tickets Total : 100 </li>
                  <li className="mb-4">Price: 0.001 eth per ticket</li>
                  <li className="mb-4">
                    One can buy upto maximum of only one ticket.
                  </li>
                  <li className="mb-4">
                    # of tickets left : 100 - minted number
                  </li>
                  <li className="">2024/06/17 ~ 2024/06/30</li>
                </ul>
              </div>
              <div className="flex flex-col justify-center items-center md:w-[400px] md:h-[400px]">
                <img
                  src="/images/MosaicLeo.png"
                  alt="Random Leo"
                  className="h-[300px] w-[300px] mb-4"
                />
                <button
                  onClick={onClickMint}
                  className="border-2 border-gray-400 font-medium rounded-full px-5 py-2.5 text-center inline-flex items-center hover:border-gray-600 hover:font-bold"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex justify-center items-center w-[200px]">
                      <SyncLoader />
                    </div>
                  ) : (
                    "Buy Ticket for 0.001 Eth"
                  )}
                </button>
              </div>
            </>
          ) : (
            <div className="h-[300px] w-[300px] flex items-center justify-center">
              <button
                onClick={() => useMetamask(setSigner)}
                className="border-2 border-gray-400 font-medium rounded-full px-5 py-2.5 text-center inline-flex items-center hover:border-gray-600 hover:font-bold"
              >
                Login to Buy A Ticket
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Buy;
