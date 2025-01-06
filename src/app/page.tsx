"use client";
import PopularSwiper from "@/components/home/popular-swiper/popular-swiper";
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
      const popularsData = await v2.Popular(1, 20);
      const trendingsData = await v2.Trending(1, 20);
      setPopulars(popularsData);
      setTrending(trendingsData);
    };
    getData();
  }, []);
  return (
    <div className="w-full h-full">
      {populars &&<PopularSwiper data={populars}/>}
      {trendings && trendings.results.map((result) => <Link href={`/${result.id}`}>
        <p className="hover:text-red-500 pb-2">{result.title.userPreferred}</p>
      </Link>)}
    </div>
  );
};

export default Page;
