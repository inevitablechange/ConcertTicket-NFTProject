## ERC 721 프로젝트

- res(이미지)

  1. layers 준비
  2. 이미지 빌드

  ```
  npm run build
  ```

  3. 이미지 업로드 (피나타)
  4. 메타데이터 업데이트

  ```
  npm run update:metadata
  ```

  5. 메타데이터 업로드 (피나타)

- contracts

  1. MintNFT - Ownable 쓸지, 말지
     Reveal 쓸지, 말지
  2. SaleNFT - 그대로 사용
  3. 리믹스 연결

  ```
  cd contracts
  ```

  ```
  remixd -s . --remix-ide https://remix.ethereum.org
  ```

  4. Connect to localhost
  5. MintNFT, SaleNFT 오픈
  6. 컴파일 확인
  7. 배포 - Injected Provider - Metamask (세폴리아 확인, 세폴이더 없으면 faucet)
  8. Mint NFT 선택
  9. name, symbol, metadatauri, unrevealeduri 입력
  10. deploy (transact)
  11. Deployed Contracts 확인
  12. 배포된 MintNFT 주소 확인
  13. SaleNFT 배포 - MintNFT 주소 입력

  - Mint, Sale 컨트랙트의 주소 및 ABI 확보

- vite

  1. Vite 설치

  ```
  npm create vite@latest vite -- --template react-ts
  ```

  2. Tailwind CSS 설치

  ```
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
  ```

  3. Tailwind CSS 셋팅 (main.tsx), 불필요한 파일 삭제
  4. React-Router-Dom 설치

  ```
  npm i react-router-dom
  ```

  5. React-Router-Dom 셋팅 & 레이아웃 셋팅 (App.tsx, Layout.tsx, Header.tsx, Home.tsx)
  6. ethers 설치

  ```
  npm i ethers
  ```

  7. 지갑 로그인 구현 - (Layout.tsx, Header.tsx)
  8. 컨트랙트 연결 (Puzzle NFT 참고, Layout.tsx, lib폴더)
  9. Home 꾸미기 (아름답게)
  10. Outlet Context 셋팅 (Laout.tsx, 각 페이지.tsx)
  11. Mint NFT 페이지

  - 페이지 구성
  - NFT 메타데이터 타입 구현 (index.d.ts)
  - onClickMint
  - Mint 완료시 모달

  12. MyNft 페이지

  - 페이지 구성 (로그인 안되었을 때 메타마스크 로그인 메세지 signer로 체크)
  - 내 NFT 보유량 확인 (getBalanceOf)
  - 메타데이터 가져오기 (getNftMetadata) & NFT 리스팅 (Grid, NftCard.tsx)
  - NFT 카드 생성
  - NFT 가격 조회 (getTokenPrice)
  - 판매 권한 확인 (getIsApprovedForAll)
  - 판매 권한 부여 (onClickSetApprovalForAll)
  - NFT 판매 등록 (NftCard.tsx, onClickSetForSaleNft)

  13. SaleNft 페이지

  - 페이지 구성
  - NFT 리스팅 (getOnSaleTokens, 판매중인 NFT 카드 조회, MyNft 페이지 리스팅이랑 비슷함)
  - Sale NFT 카드 생성
  - Sale NFT 카드에 쓰일 메타데이터 타입 구현 (index.d.ts)
  - Sale NFT 가격 조회 (getNftMetadata, getTokenPrice로 가격까지 조회)
  - NFT 구매 기능 (SaleNftCard.tsx, onClickPurchaseNft)

  - 버튼 로딩, 주인인 경우 구매 버튼 비활성화 (안 만들어도 기능이 동작함)
  - 버튼 로딩은 onClick에 붙이면됨
