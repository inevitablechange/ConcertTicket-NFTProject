import { formatEther } from "ethers";
import { Dispatch, FC, SetStateAction } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "./Layout";

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
  const { signer, saleContract } = useOutletContext<OutletContext>();

  const onClickPurchase = async () => {
    try {
      const response = await saleContract?.purchaseNft(tokenId, {
        value: saleNftMetadata?.price,
      });

      await response.wait();

      setIsModalOpen(true);
    } catch (error) {
      console.log(error);
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
        <button
          className={`md:font-medium px-2 md:px-5 py-1 text-center inline-flex items-center ${
            saleNftMetadata.tokenOwner !== signer?.address
              ? "border-2 border-gray-400 rounded-full hover:border-gray-600 hover:font-bold"
              : ""
          }`}
          onClick={onClickPurchase}
        >
          {saleNftMetadata.tokenOwner !== signer?.address
            ? "Buy for"
            : "Listed for"}{" "}
          {formatEther(saleNftMetadata.price)}ETH
        </button>
      </div>
    </li>
  );
};

export default SaleNftCard;
