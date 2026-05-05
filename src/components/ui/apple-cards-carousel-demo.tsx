"use client";

import React from "react";
import { Card, Carousel } from "./apple-cards-carousel";
import video1 from "../../dpeipics/video/video1.mp4";
import video2 from "../../dpeipics/video/video2.mp4";
import video3 from "../../dpeipics/video/video3.mp4";
import video4 from "../../dpeipics/video/video4.mp4";

export default function AppleCardsCarouselDemo() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-20">
      <div className="max-w-7xl px-6 mx-auto mb-2">
        <h2 className="text-[10px] sm:text-xs uppercase tracking-[0.4em] text-brand-gold font-bold mb-5">
          Site Progress Videos
        </h2>
        <p className="max-w-3xl text-2xl sm:text-3xl md:text-5xl font-serif font-bold text-white leading-tight">
          Site videos
        </p>
      </div>
      <Carousel items={cards} />
    </div>
  );
}

const VideoContent = ({ src, title }: { src: string; title: string }) => {
  return (
    <div className="bg-white/[0.03] border border-white/10 p-4 md:p-6 rounded-3xl mb-4">
      <video
        src={src}
        className="w-full max-h-[70vh] rounded-2xl object-cover bg-black"
        autoPlay
        muted
        loop
        playsInline
        controls
        preload="metadata"
        onVolumeChange={(e) => {
          const video = e.currentTarget;
          if (!video.muted) {
            video.muted = true;
            video.volume = 0;
          }
        }}
        aria-label={title}
      />
    </div>
  );
};

const data = [
  {
    category: "Execution",
    title: "On-site Progress",
    src: video1,
    content: <VideoContent src={video1} title="On-site Progress" />,
  },
  {
    category: "Detailing",
    title: "Finishing Work",
    src: video2,
    content: <VideoContent src={video2} title="Finishing Work" />,
  },
  {
    category: "Craft",
    title: "Material & Craftsmanship",
    src: video3,
    content: <VideoContent src={video3} title="Material & Craftsmanship" />,
  },
  {
    category: "Delivery",
    title: "Final Setup",
    src: video4,
    content: <VideoContent src={video4} title="Final Setup" />,
  },
];
