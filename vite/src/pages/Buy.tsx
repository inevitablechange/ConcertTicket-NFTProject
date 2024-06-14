import { FC } from "react";

const Buy: FC = () => {
  return (
    <>
      <div className="bg-blue-100 grow">Buy(Mint) Ticket</div>
      <ul>
        <li>Tickets Total : 400 </li>
        <li>Price: 0.001 eth per ticket</li>
        <li>One can buy upto maximum of 4 tickets.</li>
        <li># of tickets left : 400 - minted number</li>
      </ul>

      {/* should be randomly distributed when the button below is clicked */}
      <button>Buy Ticket for 0.001 Eth</button>
    </>
  );
};

export default Buy;
