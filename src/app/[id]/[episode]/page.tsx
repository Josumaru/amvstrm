import v2 from "@/lib/amvstrm/src/modules/v2";
import { AnimeInfo } from "@/lib/amvstrm/src/types/v2";
import { extract } from "@/lib/amvstrm/src/utils/gogostream";
import { meta } from "@/lib/anilist";
import { IAnimeEpisode } from "@consumet/extensions/dist/models/types";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

interface Props {
  params: Promise<{
    episode: string;
  }>;
}

const Page: NextPage<Props> = async ({ params }) => {
  const { episode } = await params;
//   const [info, setInfo] = useState<AnimeInfo | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
    console.log(episode);

    const data = await extract('ao-no-hako-episode-3');

    const stream =
      data.sources === null
        ? null
        : data.sources.find((item: any) => item.quality === "default") ||
          data.sources[0].url ||
          null;
    console.log(stream);
    // const getData = async () => {

    // //   setLoading(false);
    // };
    // getData();
//   }, [episode]);
//   if (loading) {
//     return <div>Loading</div>;
//   }
  return <div>
    {stream.url}
  </div>;
};

export default Page;
