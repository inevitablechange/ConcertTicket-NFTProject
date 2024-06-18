import { FC, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

import { OutletContext } from "../components/Layout";
import { useMetamask } from "../lib";
import MyNftCard from "../components/MyNftCard";

const MyPage: FC = () => {
  const [myTickets, setMyTickets] = useState<Array<number>>([]);
  const [nftMetadataArray, setNftMetadataArray] = useState<NftMetadata[]>([]);

  const { signer, setSigner, mintContract } = useOutletContext<OutletContext>();

  const getMyTickets = async () => {
    try {
      const response = await mintContract?.myTickets();
      const temp = response.map((v: bigint) => Number(v));

      setMyTickets(temp);
    } catch (error) {
      console.log(error);
    }
  };

  const getNftMetadata = async () => {
    try {
      const temp: NftMetadata[] = [];

      for (let i = 0; i < myTickets.length; i++) {
        const tokenUri = await mintContract?.tokenURI(myTickets[i]);
        const axiosResponse = await axios.get<NftMetadata>(tokenUri);

        temp.push(axiosResponse.data);
      }

      setNftMetadataArray(temp);
    } catch (error) {
      console.log(error);
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
      <div className="container-style">
        {signer ? (
          <>
            <ul className="px-10 py-10 sm:px-20 md:px-40 md:py-10 grid grid-cols-1 md:grid-cols-2 gap-20">
              {nftMetadataArray.map((v, i) => (
                <MyNftCard key={i} nftMetadata={v} tokenId={myTickets[i]} />
              ))}
            </ul>
          </>
        ) : (
          <div className="w-full mt-6 h-[300px] flex items-center justify-center">
            <button
              onClick={() => useMetamask(setSigner)}
              className="border-2 border-gray-400 font-medium rounded-full px-5 py-2.5 text-center inline-flex items-center hover:border-gray-600 hover:font-bold"
            >
              Login to see your NFTs
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyPage;
