"use client";

import React, { useEffect, useState, useRef } from 'react';
import Slider from 'react-slick';
import { Anuncios } from './ui/anuncio';
import { Anuncio } from '@/app/lib/definitions';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/app/styles.css"

const fetchAnuncios = async (): Promise<Anuncio[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items`);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

const Page: React.FC = () => {
  const [anuncios, setAnuncios] = useState<Anuncio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const sliderRef: any = useRef<Slider>(null);

  useEffect(() => {
    const getAnuncios = async () => {
      try {
        const data = await fetchAnuncios();
        setAnuncios(data);
      } catch (error) {
        console.error('Error fetching anuncios:', error);
      } finally {
        setIsLoading(false);
      }
    };

    getAnuncios();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
    centerMode: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  useEffect(() => {
    if (!isLoading && anuncios.length > 0 && sliderRef.current) {
      sliderRef.current.slickPlay();
    }
  }, [isLoading, anuncios]);

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  return (
    <main className="overflow-hidden">
      <Slider {...settings} ref={sliderRef} className="flex">
        {anuncios.map((anuncio) => (
          <div key={anuncio._id} className="text-center">
            <Anuncios anuncios={[anuncio]} />
          </div>
        ))}
      </Slider>
    </main>
  );
};

export default Page;
