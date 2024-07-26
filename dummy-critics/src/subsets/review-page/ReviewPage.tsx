"use client";
import { Alert, ReviewCard } from "@/components";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useSearchParams } from "next/navigation";
import { ContentType, ReviewType } from "@/types/types";
import { LoadingPage } from "../loading-page";

export const ReviewPage = () => {
  const [review, setReview] = useState("");
  const [sort, setSort] = useState("Newest");
  const [reviewData, setReviewData] = useState<ReviewType[] | undefined>();
  const [contentDetail, setContentDetail] = useState<ContentType | undefined>();
  const [success, setSuccess] = useState(false);
  const searchParams = useSearchParams();
  useEffect(() => {
    axios({
      method: "get",
      url:
        window.location.origin +
        `/api/contents/${searchParams.get("content_uri")}`,
      headers: {
        Authorization: "Bearer " + getCookie("user"),
      },
    })
      .then(function (response) {
        setContentDetail(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    axios({
      method: "get",
      url: window.location.origin + `/api/reviews${window.location.search}`,
      headers: {
        Authorization: "Bearer " + getCookie("user"),
      },
    })
      .then(function (response) {
        console.log(response.data);
        setReviewData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const send = () => {
    axios({
      method: "put",
      url: window.location.origin + `/api/reviews`,
      headers: {
        Authorization: "Bearer " + getCookie("user"),
      },
      data: {
        body: review,
        content_uri: contentDetail?.uri,
      },
    })
      .then(function (response) {
        setSuccess(true);
        setReview("");
        axios({
          method: "get",
          url: window.location.origin + `/api/reviews${window.location.search}`,
          headers: {
            Authorization: "Bearer " + getCookie("user"),
          },
        })
          .then(function (response) {
            setReviewData(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
        setTimeout(() => {
          setSuccess(false);
        }, 2000);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  if (!contentDetail) {
    return <LoadingPage />;
  }

  return (
    <div className="flex flex-col items-center h-[100vh] gap-6">
      <div className="grid grid-cols-4 relative py-[4vh] gap-[20px] px-[15vw]">
        <img src={contentDetail?.poster_url} className="rounded-lg z-10" />
        <div className="col-span-3 gap-[16px] flex flex-col z-10">
          <div>
            <p className="text-[32px] font-bold">{contentDetail?.name}</p>
            <p className="text-[#969696]">{contentDetail?.tagline}</p>
          </div>
          <div className="gap-[16px] hidden flex-col md:flex">
            <div>
              <p className="font-semibold text-[24px]">Overview</p>
              <p className="text-[#969696]">{contentDetail?.overview}</p>
            </div>
            <div className="flex gap-[10px] items-center">
              <p className="text-[24px] font-semibold">Genres:</p>
              {contentDetail?.genres?.map((item: any, index: number) => {
                return (
                  <p key={index} className="text-[#969696]">
                    {item.name}
                    {index + 1 === contentDetail?.genres?.length ? "" : ","}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-span-4 z-10 gap-[16px] flex flex-col md:hidden w-full">
          <div>
            <p className="font-semibold text-[24px] md:text-[32px]">Overview</p>
            <p className="text-[#969696] text-[16px] md:text-[20px]">
              {contentDetail?.overview}
            </p>
          </div>
          <div className="text-[16px] md:text-[20px] gap-[6px] w-full">
            <p className="font-semibold">Genres:</p>
            {contentDetail?.genres?.map((item: any, index: number) => {
              return (
                <span key={index} className="text-[#969696]">
                  {item.name}
                  {index + 1 === contentDetail?.genres?.length ? "" : ", "}
                </span>
              );
            })}
          </div>
        </div>
        <div
          className="w-full h-full absolute bg-center bg-cover bg-no-repeat z-0"
          style={{
            backgroundImage: `url(${contentDetail?.backdrop_url})`,
          }}
        >
          <div className="w-full h-full opacity-80 bg-[#000]" />
        </div>
      </div>
      <div className="w-full gap-[20px] flex flex-col px-[15vw] pb-[15vh]">
        <div className="flex justify-between">
          <p className="font-bold text-[28px]">Reviews</p>
          <select
            onChange={(e) => {
              setSort(e.target.value);
            }}
            className="bg-[#31333f] p-2 rounded border-[1px] border-[#5a5a62] w-[120px]"
          >
            <option value={"Newest"}>Newest</option>
            <option value={"Oldest"}>Oldest</option>
          </select>
        </div>
        <div className="flex h-[45px] gap-4">
          <textarea
            onKeyDown={(e) => {
              if (e.keyCode == 13 && !e.shiftKey) {
                e.preventDefault();
                review.trim() === "" ? null : send();
              }
            }}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="w-full h-min-full h-auto bg-[#31333f] p-2 rounded border-[1px] border-[#5a5a62] overflow-hidden"
            placeholder="Add a comment..."
          />
          <button
            disabled={review.trim() === ""}
            onClick={send}
            className={`w-[100px] text-[16px] ${
              review.trim() !== ""
                ? "hover:bg-[#555555] bg-[#424242]"
                : "bg-[#7b7b7b]"
            } rounded h-full font-semibold`}
          >
            Send
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {sort === "Newest"
            ? reviewData?.toReversed().map((item: any, index: number) => {
                return <ReviewCard data={item} key={index} />;
              })
            : reviewData?.map((item: any, index: number) => {
                return <ReviewCard data={item} key={index} />;
              })}
        </div>
      </div>
      <Alert
        open={success}
        setOpen={setSuccess}
        title="Амжилттай илгээлээ"
        type="success"
      />
    </div>
  );
};
