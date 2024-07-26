"use client";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { MovieCard } from "@/components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { bg, IconClear } from "@/assets";
import { LoadingPage } from "../loading-page";
import Image from "next/image";

const category = ["New Movies", "TV Shows", "Comedy"];

export const HomePage = () => {
  const [movieName, setMovieName] = useState("");
  const [search, setSearch] = useState("");
  const [data, setData] = useState<any>();
  const [focus, setFocus] = useState(false);
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

  const submitButton = () => {
    setSearch(movieName);
  };

  const clearButton = () => {
    setSearch("");
    setMovieName("");
  };

  const inputHandler = (e: any) => {
    setMovieName(e.target.value);
    if (e.target.value === "") setSearch("");
  };

  const onBlurHandler = () => {
    setTimeout(() => {
      setFocus(false);
    }, 100);
  };

  return (
    <div className="flex flex-col items-center gap-10 mb-[100px]">
      <div className="relative flex flex-col items-center w-full py-[10vh] gap-4">
        {/* <div
          style={{ backgroundImage: `url(${bg})` }}
          className="bg-cover bg-center w-full h-full absolute top-0 left-0"
        > */}
        <Image
          loading="eager"
          alt="bg"
          src={bg}
          fill
          objectFit="cover"
          className="absolute z-[9]"
          priority
        />
        <div className="w-full absolute top-0 h-full z-10 bg-black opacity-90" />
        {/* </div> */}
        <p className="text-[24px] w-[300px] md:w-full md:text-[32px] z-10 font-semibold  text-center">
          Find Movies, TV shows and more
        </p>
        <div className="px-[20vw] w-full flex z-10 gap-5">
          <div className="relative w-full flex items-center">
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") submitButton();
              }}
              onChange={inputHandler}
              className="w-full h-[45px] bg-[#31333f] px-2 rounded border-[1px] border-[#5a5a62]"
              placeholder="Enter keywords..."
              value={movieName}
              onFocus={() => setFocus(true)}
              onBlur={onBlurHandler}
            />
            <button
              className={`absolute right-3 cursor-pointer ${
                movieName !== "" ? "block" : "hidden"
              }`}
              onClick={clearButton}
            >
              <IconClear />
            </button>
            <div
              className={`${
                movieName.trim() !== "" && focus ? "flex" : "hidden"
              } absolute h-max-[200px] overflow-y-scroll flex-col items-start p-4 gap-1 top-[50px] w-full z-10 rounded bg-[#FFFFFF]`}
            >
              {data
                ?.filter((item: any) => {
                  return item.title
                    .toLowerCase()
                    .includes(movieName.toLowerCase());
                })
                .map((item: any, index: number) => {
                  return (
                    <button
                      onClick={() => {
                        console.log(item.title);
                        setSearch(item.title);
                        setMovieName(item.title);
                      }}
                      key={index}
                      className="text-[#000] w-full text-start"
                    >
                      {item.title}
                    </button>
                  );
                })}
            </div>
          </div>
          <button
            onClick={submitButton}
            className="px-[10px] bg-[#424242] hover:bg-[#555555] rounded h-[45px] font-semibold"
          >
            SEARCH
          </button>
        </div>
      </div>
      {search === "" ? (
        <>
          {category.map((item, index: number) => {
            return (
              <div key={index} className="flex flex-col w-full px-[5vw]">
                <p className="text-[24px]">{item}</p>
                <Swiper
                  breakpoints={{
                    200: {
                      slidesPerView: 2,
                      slidesPerGroup: 1,
                    },
                    500: {
                      slidesPerView: 3,
                      slidesPerGroup: 1,
                    },
                    768: {
                      slidesPerView: 4,
                      slidesPerGroup: 2,
                    },
                    1000: {
                      slidesPerView: 5,
                      slidesPerGroup: 3,
                    },
                    1440: {
                      slidesPerView: 6,
                      slidesPerGroup: 3,
                    },
                  }}
                  slidesPerView={6}
                  spaceBetween={30}
                  navigation
                  modules={[Navigation]}
                  className="mySwiper flex items-center w-full"
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
            );
          })}
        </>
      ) : (
        <div className="flex flex-col w-full px-[5vw]">
          <p className="text-[24px]">Search Results</p>
          <Swiper
            breakpoints={{
              200: {
                slidesPerView: 2,
                slidesPerGroup: 1,
              },
              500: {
                slidesPerView: 3,
                slidesPerGroup: 1,
              },
              768: {
                slidesPerView: 4,
                slidesPerGroup: 2,
              },
              1000: {
                slidesPerView: 5,
                slidesPerGroup: 3,
              },
              1440: {
                slidesPerView: 6,
                slidesPerGroup: 3,
              },
            }}
            slidesPerView={6}
            spaceBetween={30}
            navigation
            modules={[Navigation]}
            className="mySwiper flex items-center w-full"
          >
            {data
              ?.filter((item: any) => {
                return item.title
                  .toLowerCase()
                  .includes(movieName.toLowerCase());
              })
              .map((item: any, index: number) => {
                console.log(item);
                return (
                  <SwiperSlide
                    key={index}
                    className="relative flex items-center"
                  >
                    <MovieCard data={item} />
                  </SwiperSlide>
                );
              })}
          </Swiper>
        </div>
      )}
    </div>
  );
};
