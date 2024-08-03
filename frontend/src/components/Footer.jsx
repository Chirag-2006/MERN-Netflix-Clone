import React from "react";

const Footer = () => {
  return (
    <footer className="py-6 md:px-8 md:py-0 bg-black text-white border-t border-gray-800">
      <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-balance text-sm leading-loose md:text-left">
          Built By{" "}
          <a
            href="https://github.com/Chirag-2006"
            target="_blank"
            className="font-medium underline underline-offset-4"
          >
            you
          </a>
          . The source code is available on{" "}
          <a
            href="https://github.com/Chirag-2006/MERN-Netflix-Clone"
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
