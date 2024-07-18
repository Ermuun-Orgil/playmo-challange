"use client";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { MovieCard } from "@/components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export const HomePage = () => {
  const [data, setData] = useState<any>();
  useEffect(() => {
    axios({
      method: "get",
      url: window.location.origin + `/api/contents`,
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
    <div className="flex flex-col items-center py-[2vh] h-[100vh] gap-10">
      <div className="flex justify-center w-full">
        <p className="text-[40px] font-semibold">Browse movies</p>
      </div>
      <div className="flex flex-col">
        <p className="text-[24px]">New Movies</p>
        <Swiper
          slidesPerView={6}
          spaceBetween={30}
          navigation
          modules={[Navigation]}
          className="mySwiper flex items-center w-[90vw]"
        >
          {data?.map((item: any, index: number) => {
            return (
              <SwiperSlide
                key={index}
                className="relative hover:z-20 z-10 flex items-center"
              >
                <MovieCard data={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="flex flex-col">
        <p className="text-[24px]">TV Shows</p>
        <Swiper
          slidesPerView={6}
          spaceBetween={30}
          navigation
          modules={[Navigation]}
          className="mySwiper flex items-center w-[90vw]"
        >
          {data?.map((item: any, index: number) => {
            return (
              <SwiperSlide
                key={index}
                className="relative hover:z-20 z-10 flex items-center"
              >
                <MovieCard data={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
      <div className="flex flex-col">
        <p className="text-[24px]">Comedy</p>
        <Swiper
          slidesPerView={6}
          spaceBetween={30}
          navigation
          modules={[Navigation]}
          className="mySwiper flex items-center w-[90vw]"
        >
          {data?.map((item: any, index: number) => {
            return (
              <SwiperSlide
                key={index}
                className="relative hover:z-20 z-10 flex items-center"
              >
                <MovieCard data={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};
