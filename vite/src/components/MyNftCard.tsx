import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface MyNftCardProps {
  nftMetadata: NftMetadata;
  tokenId: number;
}
const MyNftCard: FC<MyNftCardProps> = ({ nftMetadata, tokenId }) => {
  const navigate = useNavigate();

  return (
    <li className="flex flex-col max-w-2/3 md:max-w-1/3">
      <img className="w-full" src={nftMetadata.image} alt={nftMetadata.name} />
      <div className="grow pl-3 mt-2 flex justify-between items-center">
        <p className="text-sm md:font-bold md:text-xl">{nftMetadata.name}</p>
        <button
          className="text-sm md:text-xl border-2 border-gray-400 md:font-medium rounded-full px-2 md:px-5 py-1 text-center inline-flex items-center hover:border-gray-600 hover:font-bold"
          onClick={() => {
            navigate(`/sell/${tokenId}`);
          }}
        >
          List For Sale
        </button>
      </div>
    </li>
  );
};

export default MyNftCard;
