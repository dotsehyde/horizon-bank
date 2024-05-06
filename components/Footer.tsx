import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { logoutAccount } from "@/lib/actions/user.actions";

const Footer = ({ user, type = "desktop" }: FooterProps) => {
  const router = useRouter();
  return (
    <footer className="footer">
      <div className={type !== "mobile" ? "footer_name" : "footer_name-mobile"}>
        <p className="text-xl font-bold text-gray-700">{user.name[0]}</p>
      </div>
      <div
        className={type !== "mobile" ? "footer_email" : "footer_email-mobile"}
      >
        <h1 className="text-14 truncate font-semibold text-gray-700">
          {user.name}
        </h1>
        <p className="text-gray-600 text-14 truncate">{user.email}</p>
      </div>
      <div
        className="footer_image"
        onClick={async () => {
          const res = await logoutAccount();
          if (res) return router.push("/sign-in");
        }}
      >
        <Image src="icons/logout.svg" fill alt="logout" />
      </div>
    </footer>
  );
};

export default Footer;
