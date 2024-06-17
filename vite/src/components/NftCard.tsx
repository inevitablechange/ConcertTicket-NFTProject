import { FC } from "react";

const NftCard: FC = () => {
  return (
    <section className="float-right bg-green-200 pt-28 px-4 w-full sm:w-[calc(100%-160px)] min-h-screen ">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="flex flex-col max-w-full sm:max-w-1/2 lg:max-w-1/4">
          <img className="w-full" src="/public/smile.jpg" alt="blackcat" />
          <div className="flex items-center">
            <img
              className="h-10 w-10 ml-2 rounded-full"
              src="/public/fatcat.webp"
              alt="fatcat"
            />
            <div className="grow pl-3">
              <p>영상제목</p>
              <p>게시자</p>
              <p>조회수 100회 * 1시간 전</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col max-w-full sm:max-w-1/2 lg:max-w-1/4">
          <img className="w-full" src="/public/smile.jpg" alt="blackcat" />
          <div className="flex items-center">
            <img
              className="h-10 w-10 ml-2 rounded-full"
              src="/public/fatcat.webp"
              alt="fatcat"
            />
            <div className="grow pl-3">
              <p>영상제목</p>
              <p>게시자</p>
              <p>조회수 100회 * 1시간 전</p>
            </div>
          </div>
        </div>{" "}
        <div className="flex flex-col max-w-full sm:max-w-1/2 lg:max-w-1/4">
          <img className="w-full" src="/public/smile.jpg" alt="blackcat" />
          <div className="flex items-center">
            <img
              className="h-10 w-10 ml-2 rounded-full"
              src="/public/fatcat.webp"
              alt="fatcat"
            />
            <div className="grow pl-3">
              <p>영상제목</p>
              <p>게시자</p>
              <p>조회수 100회 * 1시간 전</p>
            </div>
          </div>
        </div>{" "}
        <div className="flex flex-col max-w-full sm:max-w-1/2 lg:max-w-1/4">
          <img className="w-full" src="/public/smile.jpg" alt="blackcat" />
          <div className="flex items-center">
            <img
              className="h-10 w-10 ml-2 rounded-full"
              src="/public/fatcat.webp"
              alt="fatcat"
            />
            <div className="grow pl-3">
              <p>영상제목</p>
              <p>게시자</p>
              <p>조회수 100회 * 1시간 전</p>
            </div>
          </div>
        </div>{" "}
        <div className="flex flex-col max-w-full sm:max-w-1/2 lg:max-w-1/4">
          <img className="w-full" src="/public/smile.jpg" alt="blackcat" />
          <div className="flex items-center">
            <img
              className="h-10 w-10 ml-2 rounded-full"
              src="/public/fatcat.webp"
              alt="fatcat"
            />
            <div className="grow pl-3">
              <p>영상제목</p>
              <p>게시자</p>
              <p>조회수 100회 * 1시간 전</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NftCard;
