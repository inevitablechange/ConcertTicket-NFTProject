import { FC, useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { OutletContext } from "../components/Layout";
import { saleContractAddress } from "../lib/contractAddress";
import axios from "axios";
import { parseEther } from "ethers";
import SellModal from "../components/SellModal";
import { SyncLoader } from "react-spinners";

const Sell: FC = () => {
  const [nftMetadata, setNftMetadata] = useState<NftMetadata>();
  const [salePrice, setSalePrice] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const { id } = useParams();
  const { signer, mintContract, saleContract } =
    useOutletContext<OutletContext>();

  const getNftMetadata = async () => {
    try {
      const tokenUri = await mintContract?.tokenURI(id);
      const axiosResponse = await axios.get<NftMetadata>(tokenUri);

      setNftMetadata(axiosResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const setApprovalForAll = async () => {
    try {
      if (!salePrice || isNaN(Number(salePrice))) return;

      const checkApproval = await mintContract?.isApprovedForAll(
        signer?.address,
        saleContractAddress
      );

      if (!checkApproval) {
        const approvalResponse = await mintContract?.setApprovalForAll(
          saleContractAddress,
          id
        );

        await approvalResponse.wait();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const setForSaleNft = async () => {
    try {
      const saleResponse = await saleContract?.setForSaleNft(
        id,
        parseEther(salePrice)
      );

      await saleResponse.wait();

      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const onClickSell = async () => {
    try {
      setIsLoading(true);
      await setApprovalForAll();
      await setForSaleNft();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getNftMetadata();
  }, [mintContract]);

  useEffect(() => {
    if (!signer || !mintContract || !saleContract) {
      navigate("/");
    }
  }, [signer, mintContract, saleContract]);

  return (
    <>
      <div className="flex-grow w-full">
        <div className="container-style p-6">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <div className="flex justify-center items-center text-center mb-20 md:w-[400px] md:h-[400px] md:mb-0">
              <form className="w-full max-w-sm">
                <label className="font-bold text-xl">Set Price</label>
                <div className="flex items-center border-b border-gray-500 py-2">
                  <input
                    className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                    type="text"
                    value={salePrice}
                    onChange={(e) => {
                      setSalePrice(e.target.value);
                    }}
                    placeholder="Amount in ETH"
                    aria-label="Price of Nft"
                  />
                  <button
                    className="flex-shrink-0 border-2 border-gray-400 hover:border-gray-600 font-medium rounded-full px-5 py-2.5 text-center inline-flex items-center"
                    type="button"
                    onClick={() => {
                      onClickSell();
                    }}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex justify-center items-center">
                        <SyncLoader />
                      </div>
                    ) : (
                      "Sell"
                    )}
                  </button>
                </div>
              </form>
            </div>
            <div className="flex flex-col justify-center items-center md:w-[400px] md:h-[400px]">
              <img
                src={nftMetadata?.image}
                alt={nftMetadata?.name}
                className="h-[300px] w-[300px] mb-4"
              />
              <p className="font-bold text-xl"> {nftMetadata?.name}</p>
            </div>
          </div>
        </div>
      </div>
      <SellModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        nftMetadata={nftMetadata}
      />
    </>
  );
};

export default Sell;
