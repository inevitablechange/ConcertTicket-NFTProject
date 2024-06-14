import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="pt-[70px] min-h-[370px] border-solid border-t-[0.5px] border-[#4f4c37]/[0.5]">
      <div className="container-style px-10 h-full flex flex-col text-center md:flex-row md:justify-between md:text-left">
        <div className="flex flex-wrap gap-x-24 max-w-[800px] mx-auto md:mx-0">
          <div className="flex flex-col mb-6">
            <span>Report</span>
            <span>Contact Us</span>
            <span>Terms of Service</span>
            <span>Privacy</span>
          </div>
        </div>
        <div>
          <nav className="flex gap-6 mb-8 justify-center md:justify-end">
            <img src="/images/discord.png" alt="discord" />
            <img src="/images/instagram.png" alt="instagram" />
            <img src="/images/twitter.png" alt="twitter" />
            <img src="/images/youtube.png" alt="youtube" />
          </nav>
          <div>
            <div>Copyright © 2024 PARTY ENT. All rights reserved.</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
