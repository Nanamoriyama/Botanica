"use client";

import { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const mobileImages = [
  "/hero/mobile/slide1_sp.jpg",
  "/hero/mobile/slide3_sp.jpg",
  "/hero/mobile/slide4_sp.jpg",
  "/hero/mobile/slide5_sp.jpg",
];

const desktopImages = [
  "/hero/desktop/slide1.jpg",
  "/hero/desktop/slide3.jpg",
  "/hero/desktop/slide4.jpg",
  "/hero/desktop/slide5.jpg",
];

export default function HeroSlider() {
  const [isMobile, setIsMobile] = useState(false);

  // useKeenSlider から「refをセットする関数」と「sliderインスタンス」を取り出す
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1,
    },
  });

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      slider.current?.next(); // スライダーを進める
    }, 3000);

    return () => clearInterval(interval);
  }, [slider]);

  const imagesToShow = isMobile ? mobileImages : desktopImages;

  return (
    <div ref={sliderRef} className="keen-slider">
      {imagesToShow.map((src, index) => (
        <div className="keen-slider__slide" key={index}>
          <img
            src={src}
            alt={`Slide ${index + 1}`}
            className="w-full h-auto object-cover"
          />
        </div>
      ))}
    </div>
  );
}
