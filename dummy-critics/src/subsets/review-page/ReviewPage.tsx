"use client";
import { Alert, ReviewCard } from "@/components";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "cookies-next";

export const ReviewPage = () => {
  const [review, setReview] = useState("");
  const [data, setData] = useState<any>([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    axios({
      method: "get",
      url: window.location.origin + `/api/contents${window.location.search}`,
      headers: {
        Authorization: "Bearer " + getCookie("user"),
      },
    })
      .then(function (response) {
        console.log(response.data);
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
        setData(response.data);
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
        content_uri: data[0]?.content.uri,
      },
    })
      .then(function (response) {
        setSuccess(true);
        setReview("");
        setData([...data, response.data]);
        setTimeout(() => {
          setSuccess(false);
        }, 2000);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  if (data.length !== 0) {
    return (
      <div className="flex flex-col items-center h-[100vh] gap-6">
        <div className="grid grid-cols-4 relative py-[4vh] gap-[20px] px-[15vw]">
          <img src={data[0]?.content.poster_url} className="rounded-lg z-10" />
          <div className="col-span-3 gap-[16px] flex flex-col z-10">
            <div>
              <p className="text-[32px] font-bold">{data[0]?.content.name}</p>
              <p className="text-[20px] text-[#969696]">
                {data[0]?.content.tagline}
              </p>
            </div>
            <div>
              <p className="font-semibold text-[24px]">Overview</p>
              <p className="text-[#969696]">{data[0]?.content.overview}</p>
            </div>
            <div className="flex text-[20px] gap-[6px]">
              <p>Genres:</p>
              {data[0]?.content.genres.map((item: any, index: number) => {
                return (
                  <p key={index} className="text-[#969696]">
                    {item.name}
                    {index + 1 === data[0]?.content.genres.length ? "" : ","}
                  </p>
                );
              })}
            </div>
          </div>
          <div
            className="w-full h-full absolute bg-center bg-cover bg-no-repeat z-0"
            style={{
              backgroundImage: `url(${data[0]?.content.backdrop_url})`,
            }}
          >
            <div className="w-full h-full opacity-80 bg-[#000] blur-sm" />
          </div>
        </div>
        <div className="w-full gap-[20px] flex flex-col px-[15vw] pb-[15vh]">
          <p className="font-bold text-[28px]">Reviews</p>
          <div className="flex flex-col gap-2">
            {data.map((item: any, index: number) => {
              return <ReviewCard data={item} key={index} />;
            })}
          </div>
          <div className="flex h-[45px] gap-4">
            <textarea
              onKeyDown={(e) => {
                if (e.key === "Enter") send();
              }}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full h-full bg-[#31333f] p-2 rounded border-[1px] border-[#5a5a62]"
              placeholder="I Think..."
            />
            <button
              onClick={send}
              className="w-[100px] text-[16px] bg-[#424242] hover:bg-[#555555] rounded h-full font-semibold"
            >
              Send
            </button>
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
  } else {
    return (
      <div className="w-full h-[80vh] flex justify-center items-center text-[40px]">
        Not Found
      </div>
    );
  }
};
