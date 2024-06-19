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
          <div className="flex flex-col justify-center items-center">
            {signer ? (
              <>
                <div className="flex flex-col justify-center items-center md:w-[400px] md:h-[400px]">
                  <img
                    src="/images/MosaicLeo.png"
                    alt="Random Leo"
                    className="w-[300px] md:w-[400px] mt-10 mb-4"
                  />
                </div>
                <div className="flex flex-col mt-10 w-[300px] md:w-[400px] md:h-[400px] md:mb-0">
                  <h3 className="mb-4 text-2xl font-bold">
                    LEO Concert Ticket
                  </h3>
                  <div className="flex justify-between mb-4">
                    <p className="font-semibold">Price</p>
                    <p className="font-bold">0.001 ETH</p>
                  </div>
                  <div className="flex justify-between mb-4">
                    <p className="text-[12px] font-semibold">Date</p>
                    <p className="text-[12px] font-semibold">
                      2024.06.17 12:00 ~ 2024.06.30 12:00
                    </p>
                  </div>
                  <div className="flex flex-col mb-4 text-sm">
                    <div className="border rounded-t-lg border-gray-400 p-1 flex justify-between">
                      <p>Blockchain</p>
                      <p className="text-gray-600">Ethereum</p>
                    </div>
                    <div className="border-l border-r border-gray-400 p-1 flex justify-between">
                      <p>Total/Released</p>
                      <p className="text-gray-600">100 / {totalSupply}</p>
                    </div>
                    <div className="border rounded-b-lg border-gray-400 p-1 flex justify-between">
                      <p>Max tickets per account / Available</p>
                      <p className="text-gray-600">4 / {4 - mintCount}</p>
                    </div>
                  </div>
                  <button
                    onClick={onClickMint}
                    className="border-2 border-gray-400 font-medium rounded-full px-5 py-2.5 inline-flex justify-center items-center hover:border-gray-600 hover:font-bold"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex justify-center items-center w-[200px]">
                        <SyncLoader />
                      </div>
                    ) : (
                      "Click Here to Buy A Ticket"
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
