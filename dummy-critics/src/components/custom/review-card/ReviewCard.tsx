"use client";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type ReviewCardType = {
  data: any;
  clickable?: boolean;
};

export const ReviewCard: React.FC<ReviewCardType> = ({
  data,
  clickable = false,
}) => {
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
  console.log(seeMore);
  return (
    <div className="w-full">
      <button
        onClick={() => {
          if (clickable)
            router.push(`/reviews?content_uri=${data.content_uri}`);
        }}
        className={`${
          clickable ? "cursor-pointer" : "cursor-default"
        } border-[1px] border-[#424242] flex flex-col w-full gap-[10px] rounded-lg p-3`}
      >
        <div className="flex items-center gap-2">
          <img
            src="https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg"
            width={50}
            height={50}
            alt="avatar"
            className={`rounded-full ${data.user ? "block" : "hidden"}`}
          />
          <div className="flex flex-col items-start">
            <p className="font-semibold text-[16px]">
              {data.user ? data.user.email : data?.content?.name}
            </p>
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
      </button>
    </div>
  );
};
