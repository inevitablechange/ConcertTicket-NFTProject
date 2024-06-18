import { FC } from "react";

const Home: FC = () => {
  return (
    <div className="flex-grow w-full">
      <div className="container-style flex justify-center pt-[170px]">
        <div className="text-[#d7d6ff]">
          가상 캐릭터 콘서트 티켓을 구매(민팅)하려면 0.001eth를 내야한다. 티켓은
          마이페이지에서 확인 가능하다. 티켓은 랜덤하게 제공되며 일정 확률로
          별이 들어간 nft를 제공받으면 캐릭터 관련 굿즈를 받을 수 있다 (별
          개수에 따라 받을 수 있는 굿즈가 달라진다) 2차 거래는 마켓플레이스에서
          가능
        </div>
      </div>
    </div>
  );
};

export default Home;
