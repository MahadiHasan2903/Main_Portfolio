"use client";

import React from "react";
import Image from "next/image";
import {
  Card,
  CardDescription,
  CardTitle,
  CardHeader,
} from "../../components/ui/card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Star } from "lucide-react";
import { reviewsData } from "../../util/data";

const Reviews = () => {
  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const halfStar = rating - filledStars >= 0.5 ? 1 : 0;
    const emptyStars = 5 - filledStars - halfStar;

    const stars = [];
    for (let i = 0; i < filledStars; i++) {
      stars.push(<Star key={i} className="text-primary" />);
    }
    if (halfStar === 1) {
      stars.push(<Star key={filledStars} className="text-primary" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={filledStars + i + 1} />);
    }

    return stars;
  };

  return (
    <section className="mb-12 xl:mb-32">
      <div className="container mx-auto">
        <h2 className="mx-auto mb-12 text-center section-title">Reviews</h2>
        <Swiper
          className="h-[350px]"
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            1400: {
              slidesPerView: 3,
            },
          }}
          spaceBetween={30}
          modules={[Pagination]}
          pagination={{ clickable: true }}
        >
          {reviewsData?.map((person, index) => {
            return (
              <SwiperSlide key={index}>
                <Card className="bg-tertiary dark:bg-secondary/40 p-8 min-h-[300px]">
                  <CardHeader className="p-0 mb-10">
                    <div className="flex items-center gap-x-4">
                      <Image
                        src={person.avatar}
                        alt={person.name}
                        width={70}
                        height={70}
                        priority="true"
                      />
                      <div className="flex flex-col">
                        <CardTitle>{person.name}</CardTitle>
                        <p>{person.job}</p>
                      </div>
                    </div>
                    <div className="flex items-center ">
                      {renderStars(person.rating)}
                    </div>
                  </CardHeader>
                  <CardDescription className="text-lg text-muted-foreground">
                    {person.review}
                  </CardDescription>
                </Card>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default Reviews;
