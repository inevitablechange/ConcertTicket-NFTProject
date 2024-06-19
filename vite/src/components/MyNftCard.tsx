import { FC, useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { OutletContext } from "./Layout";
import { formatEther } from "ethers";

interface MyNftCardProps {
  nftMetadata: NftMetadata;
  tokenId: number;
}
const MyNftCard: FC<MyNftCardProps> = ({ nftMetadata, tokenId }) => {
  const [tokenPrice, setTokenPrice] = useState<bigint>();

  const { signer, saleContract } = useOutletContext<OutletContext>();

  const navigate = useNavigate();

  const getTokenPrice = async () => {
    try {
      const response = await saleContract?.getTokenPrice(tokenId);
      setTokenPrice(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!signer || !saleContract) return;

    getTokenPrice();
  }, [signer, saleContract]);

  return (
    <li className="flex flex-col max-w-2/3 md:max-w-1/3">
      <img className="w-full" src={nftMetadata.image} alt={nftMetadata.name} />
      <div className="grow pl-3 mt-2 flex justify-between items-center">
        <div className="flex flex-col">
          <p className="text-sm font-bold md:text-xl mb-1">
            {nftMetadata.name}
          </p>
          <p className="text-sm ">Owned by You</p>
        </div>
        {tokenPrice ? (
          <p className="md:font-medium  px-2 md:px-5 py-1 text-center inline-flex items-center">
            Listed for {formatEther(tokenPrice)} Eth
          </p>
        ) : (
          <button
            className="border-2 border-gray-400 md:font-medium rounded-full px-2 md:px-5 py-1 text-center inline-flex items-center hover:border-gray-600 hover:font-bold"
            onClick={() => {
              navigate(`/sell/${tokenId}`);
            }}
          >
            List For Sale
          </button>
        )}
      </div>
    </li>
  );
};

export default MyNftCard;
