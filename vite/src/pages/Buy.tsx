import { FC } from "react";

const Buy: FC = () => {
  return (
    <div className="flex-grow w-full">
      <div className="container-style bg-blue-300 p-6">
        <ul>
          <li>Tickets Total : 400 </li>
          <li>Price: 0.001 eth per ticket</li>
          <li>One can buy upto maximum of 4 tickets.</li>
          <li># of tickets left : 400 - minted number</li>
        </ul>

        {/* should be randomly distributed when the button below is clicked */}
        <button>Buy Ticket for 0.001 Eth</button>
      </div>
    </div>
  );
};

export default Buy;
