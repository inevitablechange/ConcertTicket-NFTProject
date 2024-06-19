import { FC, useEffect, useState } from "react";
import SaleNftCard from "../components/SaleNftCard";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout";
import axios from "axios";
import { useMetamask } from "../lib";
import MintModal from "../components/MintModal";

const PAGE = 2;
const Trade: FC = () => {
  const [tokenIds, setTokenIds] = useState<number[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [saleNftMetadataArray, setSaleNftMetadataArray] = useState<
    SaleNftMetadata[]
  >([]);

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  const { signer, setSigner, mintContract, saleContract } =
    useOutletContext<OutletContext>();

  const getSaleTokens = async () => {
    try {
      const response = await saleContract?.getOnSaleTokens();

      const temp = response.map((v: bigint) => Number(v));

      setTokenIds(temp);
    } catch (error) {
      console.log(error);
    }
  };

  const getSaleNftMetadata = async () => {
    try {
      const temp: SaleNftMetadata[] = [];

      for (let i = 0; i < PAGE; i++) {
        const index = i + currentPage * PAGE;

        if (index >= tokenIds?.length) {
          setIsEnd(true);
          break;
        }

        const tokenUri = await mintContract?.tokenURI(tokenIds[index]);
        const price = await saleContract?.getTokenPrice(tokenIds[index]);
        const tokenOwner = await mintContract?.ownerOf(tokenIds[index]);
        const axiosResponse = await axios.get(tokenUri);

        axiosResponse.data.price = price;
        axiosResponse.data.tokenOwner = tokenOwner;
        temp.push(axiosResponse.data);
      }
      setSaleNftMetadataArray([...saleNftMetadataArray, ...temp]);
      setCurrentPage(currentPage + 1);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!signer || !saleContract) return;

    getSaleTokens();
  }, [signer, saleContract]);

  useEffect(() => {
    if (tokenIds.length === 0) return;

    getSaleNftMetadata();
  }, [tokenIds]);
  return (
    <>
      <section className="flex-grow w-full">
        <div className="container-style">
          {signer ? (
            <div className="px-10 py-10 sm:px-20 md:px-40 md:py-10 flex flex-col justify-center items-center">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-20">
                {saleNftMetadataArray.map((v, i) => (
                  <SaleNftCard
                    key={i}
                    saleNftMetadata={v}
                    tokenId={tokenIds[i]}
                    setIsModalOpen={setIsModalOpen}
                  />
                ))}
              </ul>
              {!isEnd && (
                <button
                  className="mt-4 border-2 border-gray-400 hover:border-gray-600 font-medium rounded-full px-5 py-2.5 text-center inline-flex items-center"
                  onClick={getSaleNftMetadata}
                >
                  See More NFTs
                </button>
              )}
            </div>
          ) : (
            <div className="w-full mt-6 h-[300px] flex items-center justify-center">
              <button
                onClick={() => useMetamask(setSigner)}
                className="border-2 border-gray-400 font-medium rounded-full px-5 py-2.5 text-center inline-flex items-center hover:border-gray-600 hover:font-bold"
              >
                Login to buy NFTs
              </button>
            </div>
          )}
        </div>
      </section>
      <MintModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
};

export default Trade;
