import type { Metadata } from "next";
import "./styles/reset/reset.scss";
import Menu from "./repetitiveComponents/menu/menu";
import Footer from "./repetitiveComponents/footer/footer";
import MobileMenu from "./repetitiveComponents/mobileMenu";
import { metaData } from "../metadata/metadata";
import { Tracker } from "./components/Tracker";
import Script from "next/script";
import BannerCookie from "./banners/cookie";

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
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(108393702, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true,
                ecommerce:"dataLayer"
            });
          `}
        </Script>

        <BannerCookie />
        <Footer />
        <Tracker />
      </body>
    </html>
  );
}