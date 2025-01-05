"use client";
import v2 from "@/lib/amvstrm/src/modules/v2";
import { AnimeResult } from "@/lib/amvstrm/src/types/v2";
import { NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {}

const Page: NextPage<Props> = ({}) => {
  const [populars, setPopulars] = useState<AnimeResult | null>(null);
  useEffect(() => {
    const getPopular = async (page: number) => {
      const response = await v2.Trending(1, 10);
      console.log(response);
      setPopulars(response);
    };
    getPopular(1);
  }, []);
  return (
    <div>
      {populars?.results.map((popular) => <Link key={popular.id} href={`/${popular.id}`}>
        <p className="hover:text-red-500">{popular.title.userPreferred}</p>
      </Link>
      )}
    </div>
  );
};

export default Page;
