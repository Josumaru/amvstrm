"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// Swiper options
import {
  Navigation,
  Pagination,
  EffectCoverflow,
  Autoplay,
} from "swiper/modules";

import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { SwiperOptions } from "swiper/types";
import { AnimeResult } from "@/lib/amvstrm/src/types/v2";
import { NextPage } from "next";
import HyperText from "@/components/ui/hyper-text";
import MorphingText from "@/components/ui/morphing-text";
import { Badge } from "@/components/ui/badge";
import ShimmerButton from "@/components/ui/shimmer-button";
import InteractiveHoverButton from "@/components/ui/interactive-hover-button";
import Link from "next/link";

interface Props {
  data: AnimeResult;
}

const PopularSwiper: NextPage<Props> = ({ data }) => {
  const [position, setPosition] = useState(0);
  console.log(data);

  const swiperOptions: SwiperOptions = {
    modules: [Pagination, Navigation, Autoplay],
    // spaceBetween: -40,
    grabCursor: true,
    centeredSlides: true,
    initialSlide: 1,
    slidesPerView: "auto",
    effect: "coverflow",
    coverflowEffect: {
      rotate: 0,
      stretch: 40,
      depth: 0,
      modifier: 5,
    },
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      bulletActiveClass: ".swiper-bullet",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  };

  const handleSlideChange = (e: any) => {
    setPosition(e.realIndex);
  };

  return (
    <div className="relative">
      <Swiper {...swiperOptions} className="" onSlideChange={handleSlideChange}>
        {data.results.map((result) => (
          <SwiperSlide key={`${result.id}`} className="h-full relative px-5">
            <div className="w-1/2 h-full absolute z-40 rounded-xl overflow-hidden">
              <div
                style={{
                  pointerEvents: "none",
                  position: "absolute",
                  inset: "0 0 auto auto",
                  right: 0,
                  width: "100%",
                  height: "100%",
                  background: `linear-gradient(90deg, ${
                    result.coverImage?.color ?? "#000000"
                  } 70%, transparent 100%)`,
                }}
              />
              <div className="absolute bottom-0 p-16">
                {/* <HyperText
                  className="text-9xl font-bold h-32 w-[70%] overflow-hidden"
                  style={{ color: result.coverImage?.color ?? "red" }}
                >
                  {result.title.native}
                </HyperText> */}
                <MorphingText
                  className="text-6xl font-bold overflow-hidden text-white"
                  texts={[result.title.userPreferred, result.title.native]}
                />
                <p className="text-xl font-medium overflow-hidden text-white pb-2">
                  {result.season} {result.seasonYear} -{" "}
                  {result.episodes ?? "Unknown"} Episodes
                </p>
                {result.genres.slice(0, 2).map((genre) => (
                  <Badge
                    variant={"secondary"}
                    key={genre}
                    className="text-xl font-bold mr-2 rounded-3xl"
                  >
                    {genre}
                  </Badge>
                ))}
                <div className="relative w-2/3 pt-3">
                  <p
                    className={`text-xl bg-gradient-to-b from-[#ffffff] text-transparent bg-clip-text font-medium overflow-hidden line-clamp-6 text-clip bg-transparent`}
                    dangerouslySetInnerHTML={{ __html: result.description }}
                  />
                </div>
                <div className="flex gap-5 items-center">
                  <Link href={`/${result.id}`}>
                    <InteractiveHoverButton
                      className="px-5 py-3"
                      text="Watch"
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative w-full flex justify-end">
              <Image
                src={
                  result.trailer?.thumbnail.replace(
                    "hqdefault.jpg",
                    "maxresdefault.jpg"
                  ) ?? result.bannerImage
                }
                alt={result.title.userPreferred}
                width={1280}
                height={720}
                className="h-[600px] w-2/3 object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
        <div className="!flex items-center pl-20 -translate-y-20 h-5 mt-5 absolute z-50">
          {/* <ArrowLeft
            className="swiper-button-prev !relative mx-4"
            color="gray"
          /> */}
          {data.results.map((_, index) => (
            <div
              key={index}
              className={`rounded-full w-10 h-2 z-20 mx-1`}
              style={{
                backgroundColor: index === position ? "#ffffff" : "#4c4c4c",
              }}
            />
          ))}
          {/* <ArrowRight
            className="swiper-button-next !relative mx-4"
            color="gray"
          /> */}
        </div>
      </Swiper>
    </div>
  );
};

export default PopularSwiper;
