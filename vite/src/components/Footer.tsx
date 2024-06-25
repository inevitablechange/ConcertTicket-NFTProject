import { FC } from "react";

const navList = ["Report", "Contact Us", "Terms of Service", "Privacy"];
const social = ["discord", "instagram", "twitter", "youtube"];

const Footer: FC = () => {
  return (
    <footer className="pt-[70px] min-h-[250px] border-solid border-t-[0.5px] border-primary/[0.5]">
      <div className="container-style px-10 h-full flex flex-col text-center md:flex-row md:justify-between md:text-left">
        <section className="flex flex-wrap gap-x-24 max-w-[800px] mx-auto md:mx-0 mb-4">
          <div className="flex flex-col gap-4">
            {navList.map((v, i) => (
              <span key={i} className="hover:font-semibold">
                {v}
              </span>
            ))}
          </div>
        </section>
        <section>
          <nav className="flex gap-6 mb-8 justify-center md:justify-end">
            {social.map((v, i) => (
              <img key={i} src={`/images/social/${v}.png`} alt={v} />
            ))}
          </nav>
          <div>
            <p>Copyright © 2024 PARTY ENT. All rights reserved.</p>
          </div>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
