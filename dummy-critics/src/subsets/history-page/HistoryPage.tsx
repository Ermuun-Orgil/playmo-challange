"use client";
import { ReviewCard } from "@/components";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

export const HistoryPage = () => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    axios({
      method: "get",
      url: window.location.origin + `/api/reviews/me`,
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

  return (
    <div className="flex flex-col items-center px-[15vw] pt-[4vh] gap-6">
      <div className="text-[32px] font-semibold">History</div>
      <div className="w-full flex flex-col gap-4">
        {data?.length !== 0 ? (
          data?.map((item: any) => {
            return <ReviewCard data={item} clickable />;
          })
        ) : (
          <p className="text-[32px]">Not Found</p>
        )}
      </div>
    </div>
  );
};
