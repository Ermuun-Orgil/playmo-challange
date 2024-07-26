"use client";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useState } from "react";

type HistoryCardType = {
  data: any;
};

export const HistoryCard: React.FC<HistoryCardType> = ({ data }) => {
  const router = useRouter();
  const [seeMore, setSeeMore] = useState(false);

  const cut = () => {
    const sliced = data.body.slice(0, 300);
    if (!seeMore) {
      return sliced + (data.body.length > 300 ? "..." : "");
    } else {
      return data.body;
    }
  };

  return (
    <div className="w-full">
      <div className="w-full border-[1px] border-[#424242] rounded-lg p-3 flex gap-[10px] min-h-[160px]">
        <div className="w-[160px]">
          <button
            onClick={() => {
              router.push(`/reviews?content_uri=${data.content_uri}`);
            }}
            style={{
              backgroundImage: `url("${data.content.poster_url}")`,
            }}
            className="w-[100px] bg-contain flex items-end bg-no-repeat bg-center h-[160px] relative"
          >
            <div className="w-full min-h-[40px] flex items-center relative">
              <p className="z-20 relative p-2 text-[14px] text-center">
                {data.content.name.length > 12
                  ? data.content.name.slice(0, 11) + "..."
                  : data.content.name}
              </p>
              <div className="w-full top-0 h-full absolute opacity-80 bg-[#000] z-10" />
            </div>
          </button>
        </div>
        <div className={`flex flex-col w-full gap-[10px]`}>
          <div className="flex items-center gap-2">
            <div className="flex flex-col items-start">
              <p className="font-light text-[14px] text-[#969696]">
                {moment(data.created_at).fromNow()}
              </p>
            </div>
          </div>
          <p className="text-start">
            {cut()}
            <button
              onClick={() => setSeeMore(!seeMore)}
              className={`${
                data.body.length > 300 ? "block" : "hidden"
              } text-blue-300`}
            >
              {seeMore ? "see less" : "see more"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
