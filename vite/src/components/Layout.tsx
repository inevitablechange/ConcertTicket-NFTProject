import { FC, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { Contract, JsonRpcSigner } from "ethers";

export interface OutletContext {
  signer: JsonRpcSigner | null;
  mintContract: Contract | null;
  saleContract: Contract | null;
}

const Layout: FC = () => {
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null);
  const [mintContract, setMintContract] = useState<Contract | null>(null);
  const [saleContract, setSaleContract] = useState<Contract | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        signer={signer}
        setSigner={setSigner}
        setMintContract={setMintContract}
        setSaleContract={setSaleContract}
      />
      <Outlet context={{ signer, mintContract, saleContract }} />
      <Footer />
    </div>
  );
};

export default Layout;
