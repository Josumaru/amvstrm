"use client";
import v2 from "@/lib/amvstrm/src/modules/v2";
import { AnimeInfo } from "@/lib/amvstrm/src/types/v2";
import { meta } from "@/lib/anilist";
import { IAnimeEpisode } from "@consumet/extensions/dist/models/types";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const Page: NextPage<Props> = ({ params }) => {
  const { id } = use(params);
  const [info, setInfo] = useState<AnimeInfo | null>(null);
  const [episodes, setEpisodes] = useState<IAnimeEpisode[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      const animeInfo = await v2.AnimeInfo(parseInt(id));
      const animeEpisodes = await meta.fetchEpisodesListById(id);
      console.log(animeInfo);
      console.log(animeEpisodes);
      setInfo(animeInfo);
      setEpisodes(animeEpisodes);
      setLoading(false);
    };
    getData();
  }, [id]);
  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <div>
      <p>{info && info.title.userPreferred}</p>
      {episodes == null ? (
        <p>Episode not found</p>
      ) : (
        episodes?.map((episode) => (
          <Link href={`${info?.id}/${episode.id}`} key={episode.id}>
            <p>{episode.title}</p>
            <p>{episode.number}</p>
            <Image
              src={episode.image ?? ""}
              width={200}
              height={500}
              alt={episode.title ?? ""}
            />
          </Link>
        ))
      )}
    </div>
  );
};

export default Page;
