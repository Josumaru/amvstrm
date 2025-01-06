"use client";
import { AppSidebar } from "@/components/common/app-sidebar";
import PopularSwiper from "@/components/home/popular-swiper/popular-swiper";
import { Sidebar } from "@/components/ui/sidebar";
import v2 from "@/lib/amvstrm/src/modules/v2";
import { AnimeResult } from "@/lib/amvstrm/src/types/v2";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const [populars, setPopulars] = useState<AnimeResult | null>(null);
  const [trendings, setTrending] = useState<AnimeResult | null>(null);
  useEffect(() => {
    const getData = async () => {
      const popularsData = await v2.Popular(1, 5);
      const trendingsData = await v2.Trending(1, 20);
      setPopulars(popularsData);
      setTrending(trendingsData);
    };
    getData();
  }, []);
  return (
    <div className="flex items-center w-full">
      <div className="w-full h-full">
        <div className="sticky top-0 z-50 h-16 w-full bg-zinc-50 border-b border-zinc-200 mb-5 flex items-center">
          <div className="flex gap-2 items-center mx-5 font-semibold">
            <p className="text-muted-foreground">Movie</p>
            <p>Anime</p>
          </div>
        </div>
        {populars && <PopularSwiper data={populars} />}
        <p className="mt-10 px-5 font-bold">Trending Anime</p>
        <div className="flex gap-5 h-full overflow-x-scroll">
          {trendings &&
            trendings.results.map((result, index) => (
              <Link
                href={`/${result.id}`}
                key={result.id}
                className="w-44"
                style={{ marginLeft: index == 0 ? "1.25rem" : 0 }}
              >
                <div className="rounded-xl w-44 h-64 overflow-hidden">
                  <Image
                    className="object-cover w-full h-full hover:scale-105 transition-transform"
                    src={result.coverImage?.extraLarge ?? ""}
                    alt={result.title.userPreferred}
                    width={1280}
                    height={720}
                  />
                </div>
                <p className="hover:text-red-500 overflow-hidden line-clamp-2">
                  {result.title.userPreferred}
                </p>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
