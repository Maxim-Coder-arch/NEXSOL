import type { Metadata } from "next";
import "./styles/reset/reset.scss";
import Menu from "./repetitiveComponents/menu/menu";
import Footer from "./repetitiveComponents/footer/footer";
import MobileMenu from "./repetitiveComponents/mobileMenu";
import { metaData } from "../metadata/metadata";
import { Tracker } from "./components/Tracker";

export const metadata: Metadata = metaData;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Menu />
        <MobileMenu />
        {children}
        <Footer />
        <Tracker />
      </body>
    </html>
  );
}