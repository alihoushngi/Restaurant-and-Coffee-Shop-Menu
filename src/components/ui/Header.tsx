import Logo from "@/assets/logo/logo.png";
import Image from "next/image";
import { FC } from "react";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: FC<HeaderProps> = () => {
  return (
    <header className="rounded-[28px] justify-center items-center flex gap-2 w-full">
      <Image
        src={Logo}
        alt="Logo"
        width={1080}
        height={1080}
        quality={75}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="w-14 h-14 object-cover"
      />
      {/* <p className="text-sm font-semibold text-amber-600">رایو</p> */}
      {/* <h1 className="mt-1 text-xl font-bold text-zinc-900">{title}</h1> */}
      {/* {subtitle ? (
        <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>
      ) : null} */}
    </header>
  );
};

export default Header;
