import { FC } from "react";

interface MyNftCardProps {
  nftMetadata: NftMetadata;
}
const MyNftCard: FC<MyNftCardProps> = ({ nftMetadata }) => {
  return (
    <li className="flex flex-col max-w-2/3 md:max-w-1/3">
      <img className="w-full" src={nftMetadata.image} alt={nftMetadata.name} />
      <div className="grow pl-3">
        <p className="text-center font-bold">{nftMetadata.name}</p>
      </div>
    </li>
  );
};

export default MyNftCard;
