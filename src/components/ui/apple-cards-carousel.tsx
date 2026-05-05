"use client";

import React, {
  useEffect,
  useState,
  createContext,
} from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";

interface CarouselProps {
  items: React.ReactElement[];
  initialScroll?: number;
}

type CardData = {
  src: string;
  title: string;
  category: string;
  content: React.ReactNode;
};

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void;
  currentIndex: number;
}>({
  onCardClose: () => {},
  currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 2);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const handleCardClose = (index: number) => {
    if (carouselRef.current) {
      const cardWidth = isMobile() ? 240 : 384;
      const gap = isMobile() ? 12 : 16;
      const scrollPosition = (cardWidth + gap) * Math.max(index - 1, 0);
      carouselRef.current.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const isMobile = () => window.innerWidth < 768;

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-auto overscroll-x-contain scroll-smooth py-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:py-12"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          <div className="flex flex-row justify-start gap-3 pl-4 pr-4 mx-auto max-w-7xl md:gap-4 md:pl-6 md:pr-6">
            {items.map((item, index) => (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.4,
                    delay: 0.08 * index,
                    ease: "easeOut",
                  },
                }}
                key={"card" + index}
                className="rounded-3xl shrink-0 snap-start last:pr-1 md:last:pr-6"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mt-2 mr-4 flex justify-end gap-2 md:mr-10">
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 border border-white/15 text-white disabled:opacity-40"
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 border border-white/15 text-white disabled:opacity-40"
            onClick={scrollRight}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  );
};

export const Card = ({
  card,
  index,
  layout = false,
}: {
  key?: React.Key;
  card: CardData;
  index: number;
  layout?: boolean;
}) => {
  return (
    <motion.div
        layoutId={layout ? `card-${card.title}` : undefined}
        className="relative z-10 flex h-72 w-60 flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 md:h-[34rem] md:w-96"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/60 via-transparent to-black/40" />
        <BlurVideo src={card.src} title={card.title} />
    </motion.div>
  );
};

const BlurVideo = ({ src, title }: { src: string; title: string }) => {
  const [isLoading, setLoading] = useState(true);

  return (
    <video
      className={cn(
        "absolute inset-0 z-10 h-full w-full object-cover transition duration-300",
        isLoading ? "blur-sm" : "blur-0"
      )}
      onLoadedData={() => setLoading(false)}
      src={src}
      autoPlay
      loop
      muted
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
  );
};
