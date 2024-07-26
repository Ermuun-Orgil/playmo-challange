"use client";
import { HistoryCard, ReviewCard } from "@/components";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { LoadingPage } from "../loading-page";

export const HistoryPage = () => {
  const [data, setData] = useState<any>();
  const [sort, setSort] = useState("Newest");

  useEffect(() => {
    axios({
      method: "get",
      url: window.location.origin + `/api/reviews/me`,
      headers: {
        Authorization: "Bearer " + getCookie("user"),
      },
    })
      .then(function (response) {
        console.log(response.data);
        setData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  if (!data) {
    return <LoadingPage />;
  }

  return (
    <div className="flex flex-col items-center px-[15vw] pt-[4vh] gap-6 mb-[200px]">
      <div className="w-full flex justify-between">
        <p className="text-[32px] font-semibold">History</p>
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
      <div className="w-full flex flex-col gap-4">
        {data?.length !== 0 ? (
          sort === "Newest" ? (
            data?.toReversed().map((item: any, index: number) => {
              return <HistoryCard key={index} data={item} />;
            })
          ) : (
            data?.map((item: any, index: number) => {
              return <HistoryCard key={index} data={item} />;
            })
          )
        ) : (
          <p className="text-[32px]">Not Found</p>
        )}
      </div>
    </div>
  );
};
