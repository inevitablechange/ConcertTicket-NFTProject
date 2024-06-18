import { FC, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

import { OutletContext } from "../components/Layout";
import { useMetamask } from "../lib";
import MyNftCard from "../components/MyNftCard";

const MyPage: FC = () => {
  const [myTickets, setMyTickets] = useState<Array<number>>([]);
  const [nftMetadataArray, setNftMetadataArray] = useState<NftMetadata[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { signer, setSigner, mintContract } = useOutletContext<OutletContext>();

  const getMyTickets = async () => {
    try {
      setIsLoading(true);
      const response = await mintContract?.myTickets();
      const temp = response.map((v: bigint) => Number(v));

      setMyTickets(temp);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getNftMetadata = async () => {
    try {
      setIsLoading(true);

      const temp: NftMetadata[] = [];

      for (let i = 0; i < myTickets.length; i++) {
        const tokenUri = await mintContract?.tokenURI(myTickets[i]);
        const axiosResponse = await axios.get<NftMetadata>(tokenUri);

        temp.push(axiosResponse.data);
      }

      setNftMetadataArray(temp);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!signer || !mintContract) return;

    getMyTickets();
  }, [signer, mintContract]);

  useEffect(() => {
    if (myTickets.length === 0) return;

    getNftMetadata();
  }, [myTickets]);

  return (
    <section className="flex-grow w-full">
      {signer ? (
        <ul className="container-style px-40 py-20 grid grid-cols-1 md:grid-cols-2 gap-20">
          {nftMetadataArray.map((v, i) => (
            <MyNftCard key={i} nftMetadata={v} />
          ))}
        </ul>
      ) : (
        <div className="container-style h-[300px] w-[300px] flex items-center justify-center">
          <button
            onClick={() => useMetamask(setSigner)}
            className="border-2 border-gray-400 font-medium rounded-full px-5 py-2.5 text-center inline-flex items-center hover:border-gray-600 hover:font-bold"
          >
            Login to see your NFTs
          </button>
        </div>
      )}
    </section>
  );
};

export default MyPage;
