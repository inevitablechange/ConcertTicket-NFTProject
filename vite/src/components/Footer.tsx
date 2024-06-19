import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="pt-[70px] min-h-[250px] border-solid border-t-[0.5px] border-primary/[0.5]">
      <div className="container-style px-10 h-full flex flex-col text-center md:flex-row md:justify-between md:text-left">
        <div className="flex flex-wrap gap-x-24 max-w-[800px] mx-auto md:mx-0 mb-4">
          <div className="flex flex-col gap-4">
            <span className="hover:font-semibold">Report</span>
            <span className="hover:font-semibold">Contact Us</span>
            <span className="hover:font-semibold">Terms of Service</span>
            <span className="hover:font-semibold">Privacy</span>
          </div>
        </div>
        <div>
          <nav className="flex gap-6 mb-8 justify-center md:justify-end">
            <img src="/images/social/discord.png" alt="discord" />
            <img src="/images/social/instagram.png" alt="instagram" />
            <img src="/images/social/twitter.png" alt="twitter" />
            <img src="/images/social/youtube.png" alt="youtube" />
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
