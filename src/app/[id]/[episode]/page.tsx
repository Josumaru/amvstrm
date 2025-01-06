"use client";
import v2 from "@/lib/amvstrm/src/modules/v2";
import { AnimeInfo } from "@/lib/amvstrm/src/types/v2";
import { extract } from "@/lib/amvstrm/src/utils/gogostream";
import { meta } from "@/lib/anilist";
import { IAnimeEpisode } from "@consumet/extensions/dist/models/types";
import axios from "axios";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useRef, useState } from "react";
import Hls from "hls.js";

interface Props {
  params: Promise<{
    episode: string;
  }>;
}

const Page: NextPage<Props> = ({ params }) => {
  const { episode } = use(params);
  const [info, setInfo] = useState<AnimeInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [stream, setStream] = useState<any | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const getData = async () => {
      const data = await extract(episode);

      const stream =
        data.sources === null
          ? null
          : data.sources.find((item: any) => item.quality === "default") ||
            data.sources[0].url ||
            null;
      console.log(data);
      setStream(data.sources);
      setLoading(false);
    };
    getData();
  }, [episode]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(`${process.env.NEXT_PUBLIC_REVERSE_PROXY}/proxy?url=${stream[0].url}`);
      hls.attachMedia(video);

    //   hls.on(Hls.Events.MANIFEST_PARSED, () => {
    //     video.play();
    //   });

      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = `${process.env.NEXT_PUBLIC_REVERSE_PROXY}/proxy?url=${stream[0].url}`;
    } else {
      console.error("HLS is not supported on this browser.");
    }
  }, [stream]);

  if (!stream && loading) return <p>Loading...</p>;

  return (
    <div>
      {stream[0].url}
      <video ref={videoRef} className="w-screen h-screen" controls autoPlay />
    </div>
  );
};

export default Page;
