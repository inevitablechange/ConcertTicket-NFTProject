interface Window {
  ethereum: any;
}

interface NftMetadata {
  name: string;
  description: string;
  image: string;
}

interface SaleNftMetadata extends NftMetadata {
  price: bigint;
  tokenOwner: string;
}
