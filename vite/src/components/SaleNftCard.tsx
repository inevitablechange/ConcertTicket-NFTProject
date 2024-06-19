import { formatEther } from "ethers";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "./Layout";
import { SyncLoader } from "react-spinners";

interface SaleNftCardProps {
  saleNftMetadata: SaleNftMetadata;
  tokenId: number;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const SaleNftCard: FC<SaleNftCardProps> = ({
  saleNftMetadata,
  tokenId,
  setIsModalOpen,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { signer, saleContract } = useOutletContext<OutletContext>();

  const onClickPurchase = async () => {
    try {
      setIsLoading(true);
      const response = await saleContract?.purchaseNft(tokenId, {
        value: saleNftMetadata?.price,
      });

      await response.wait();

      setIsModalOpen(true);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <li className="flex flex-col max-w-2/3 md:max-w-1/3">
      <img
        className="w-full"
        src={saleNftMetadata.image}
        alt={saleNftMetadata.name}
      />
      <div className="grow pl-3 mt-2 flex justify-between items-center">
        <div className="flex flex-col">
          <p className="text-sm font-bold md:text-xl mb-1">
            {saleNftMetadata.name}
          </p>
          <p className="text-sm ">
            {saleNftMetadata.tokenOwner === signer?.address
              ? "Owned by You"
              : `Owned by ${saleNftMetadata.tokenOwner.substring(0, 4)}...
            ${saleNftMetadata.tokenOwner.substring(
              saleNftMetadata.tokenOwner.length - 4
            )}`}
          </p>
        </div>
        {signer?.address === saleNftMetadata.tokenOwner ? (
          <p className="md:font-medium px-2 md:px-5 py-1 text-center inline-flex items-center">
            Listed for {formatEther(saleNftMetadata.price)}ETH
          </p>
        ) : (
          <button
            className="md:font-medium px-2 md:px-5 py-1 text-center inline-flex items-center 
            border-2 border-gray-400 rounded-full hover:border-gray-600 hover:font-bold"
            onClick={onClickPurchase}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex justify-center items-center">
                <SyncLoader />
              </div>
            ) : (
              `Buy for 
          ${formatEther(saleNftMetadata.price)}ETH`
            )}
          </button>
        )}
      </div>
    </li>
  );
};

export default SaleNftCard;
