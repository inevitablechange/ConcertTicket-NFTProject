import { FC } from "react";

const Home: FC = () => {
  return (
    <main className="flex-grow w-full">
      <div className="container-style">
        <section className="flex flex-col justify-center items-center gap-[32px] pt-20 md:pt-32 mb-4">
          <h2 className="font-semibold text-3xl md:text-4xl md:text-bold text-center uppercase">
            LEO Virtual Concert
          </h2>
          <p className="w-[350px] px-4 md:w-[450px] md:text-lg text-center">
            Welcome to the special virtual concert hosted by the cute lion! This
            concert will be held online and features various fun events and
            performances.
          </p>
        </section>
        <figure>
          <img
            src="/images/LeoConcert.png"
            alt="Leo Concert"
            className="mx-auto"
          />
        </figure>

        <section className="flex flex-col justify-center items-center gap-[32px] py-20 md:py-32 bg-yellow-200">
          <h2 className="font-semibold text-3xl md:text-4xl md:text-bold text-center uppercase">
            NFT Ticket Information
          </h2>
          <p className="px-4 w-[350px] md:w-[450px] md:text-lg text-center">
            The concert tickets are sold in the form of NFTs, with each ticket
            priced at 0.001 ETH. A total of 100 tickets are available, all at
            the same price.
          </p>
          <figure>
            <img
              src="/images/MosaicLeo.png"
              className="mx-auto w-[200px] md:w-[300px]"
              alt="Mosaic Leo"
            />
          </figure>
          <button
            className="md:font-medium px-2 md:px-5 py-1 text-center inline-flex items-center 
            border-2 border-gray-400 rounded-full hover:border-gray-600 hover:font-bold"
          >
            Click Here For More Information
          </button>
        </section>

        <section className="flex flex-col justify-center items-center gap-[32px] py-20 md:py-32">
          <h2 className="font-semibold text-3xl md:text-4xl md:text-bold text-center uppercase">
            NFT Ticket Rewards
          </h2>
          <p className="px-4 w-[350px] md:w-[450px] md:text-lg text-center">
            Depending on the number of stars included in the NFT ticket,
            different rewards are provided:
          </p>
          <ul>
            <li>0 stars: No prize</li>
            <li>1 star: Character stickers</li>
            <li>2 stars: Character postcards</li>
            <li>3 stars: Character keychains</li>
            <li>4 stars: Character plush toys</li>
          </ul>
        </section>
      </div>
    </main>
  );
};

export default Home;
