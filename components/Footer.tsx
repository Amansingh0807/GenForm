import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/Amansingh0807"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/github.png"
            alt="Window icon"
            width={30}
            height={30}
          />
          Code
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.linkedin.com/in/amansingh08/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/linkedin.png"
            alt="Globe icon"
            width={30}
            height={30}
          />
          Let&apos;s Connect
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://x.com/RealAman_Singh"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/x.png"
            alt="File icon"
            width={30}
            height={30}
          />
          Follow Me
        </a>
      </footer>
      <div className="mt-8 text-center">
        <h4 className="text-lg font-semibold">Made with Passion🔥By Aman Singh</h4>
      </div>
    </div>
  );
};

export default Footer;
