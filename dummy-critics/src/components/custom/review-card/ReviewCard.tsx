"use client";
import moment from "moment";
import { useRouter } from "next/navigation";

type ReviewCardType = {
  data: any;
  clickable?: boolean;
};

export const ReviewCard: React.FC<ReviewCardType> = ({
  data,
  clickable = false,
}) => {
  const router = useRouter();

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
            className="rounded-full"
          />
          <div className="flex flex-col items-start">
            <p className="font-semibold text-[16px]">{data.user_id}</p>
            <p className="font-light text-[14px] text-[#969696]">
              {moment(data.created_at).format("LL")}
            </p>
          </div>
        </div>
        <p>{data.body}</p>
      </button>
    </div>
  );
};
