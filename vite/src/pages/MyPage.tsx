import { FC, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { OutletContext } from "../components/Layout";
import { useMetamask } from "../lib";
import axios from "axios";

const MyPage: FC = () => {
  const [myTickets, setMyTickets] = useState<Array<number>>([]);
  const [nftMetadataArray, setNftMetadataArray] = useState<NftMetadata[]>([]);

  const { signer, setSigner, mintContract } = useOutletContext<OutletContext>();

  const getMyTickets = async () => {
    try {
      const response = await mintContract?.myTickets();
      const temp = response.map((v: bigint) => Number(v));

      setMyTickets(temp);
    } catch (error) {}
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
      console.log(temp);
    } catch (error) {}
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
            <li key={i} className="flex flex-col max-w-2/3 md:max-w-1/3">
              <img className="w-full" src={v.image} alt={v.name} />
              <div className="grow pl-3">
                <p className="text-center font-bold">{v.name}</p>
              </div>
            </li>
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
