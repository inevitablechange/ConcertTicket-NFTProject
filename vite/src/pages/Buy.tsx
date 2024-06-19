import { FC, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout";
import { useMetamask } from "../lib";
import { SyncLoader } from "react-spinners";
import MintModal from "../components/MintModal";

const MINT_PRICE = 1000000000000000;

const Buy: FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [totalSupply, setTotalSupply] = useState<number>(0);
  const [mintCount, setMintCount] = useState<number>(0);

  const { signer, setSigner, mintContract } = useOutletContext<OutletContext>();

  const getTotalSupply = async () => {
    try {
      const response = await mintContract?.totalSupply();

      setTotalSupply(Number(response));
    } catch (error) {
      console.log(error);
    }
  };

  const getAddressMintCount = async () => {
    try {
      const response = await mintContract?.addressMintCount(signer?.address);

      setMintCount(Number(response));
    } catch (error) {
      console.log(error);
    }
  };

  const onClickMint = async () => {
    try {
      setIsLoading(true);
      const response = await mintContract?.mintTicket({
        value: MINT_PRICE,
      });

      await response.wait();

      setIsLoading(false);
      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!signer || !mintContract) return;

    getTotalSupply();
    getAddressMintCount();
  }, [signer, mintContract]);

  return (
    <>
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
                      One can buy upto maximum of 4 tickets.
                    </li>
                    <li className="mb-4">
                      # of tickets left : {100 - totalSupply}
                    </li>
                    <li className="mb-4">
                      Can purchase {4 - mintCount} more tickets
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
              <div className="h-[300px] w-full flex items-center justify-center">
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
      <MintModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default Buy;
