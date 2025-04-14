"use client";

import { useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import Image from "next/image";
import "keen-slider/keen-slider.min.css";

// 画像パスをモバイル & デスクトップで分けて管理
const imageSet = [
  {
    mobile: "/hero/mobile/slide1_sp.jpg",
    desktop: "/hero/desktop/slide1.jpg",
  },
  {
    mobile: "/hero/mobile/slide3_sp.jpg",
    desktop: "/hero/desktop/slide3.jpg",
  },
  {
    mobile: "/hero/mobile/slide4_sp.jpg",
    desktop: "/hero/desktop/slide4.jpg",
  },
  {
    mobile: "/hero/mobile/slide5_sp.jpg",
    desktop: "/hero/desktop/slide5.jpg",
  },
];

export default function HeroSlider() {
  // Keen Slider の初期化
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1,
    },
  });

  // スライダーを3秒ごとに自動で進める
  useEffect(() => {
    const interval = setInterval(() => {
      slider.current?.next();
    }, 3000);

    return () => clearInterval(interval);
  }, [slider]);

  return (
    <div ref={sliderRef} className="keen-slider">
      {imageSet.map((img, index) => (
        <div className="keen-slider__slide" key={index}>
          <div className="relative w-full h-[60vh] sm:h-[90vh]">
            <picture>
              {/* モバイル画像 */}
              <source media="(max-width: 767px)" srcSet={img.mobile} />
              {/* デスクトップ画像 */}
              <Image
                src={img.desktop}
                alt={`Slide ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 767px) 100vw, 100vw"
                priority={index === 0}
              />
            </picture>
          </div>
        </div>
      ))}
    </div>
  );
}
