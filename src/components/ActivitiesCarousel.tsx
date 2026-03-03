
'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useEffect, useRef, useState } from 'react';

interface Activity {
  title: string;
  role: string;
  description: string;
  images: string[];
  link?: string;
}

export default function ActivitiesCarousel() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fetch('public/data/activities.json')
    fetch(`${import.meta.env.BASE_URL}data/activities.json`)
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => {
        setActivities(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading || activities.length === 0) {
    return (
      <div className="py-32 text-center text-white text-lg">
        {loading ? 'Loading activities...' : 'No activities found'}
      </div>
    );
  }

  return <ActivitiesCarouselContent activities={activities} />;
}

function ActivitiesCarouselContent({ activities }: { activities: Activity[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const rafRef = useRef<number | null>(null);
  const speed = 1; // Adjust speed: 0.5 = slow, 1 = medium, 2 = fast

  // PERFECT INFINITE AUTO-SCROLL
  useEffect(() => {
    if (isHovered || !containerRef.current) return;

    const scroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const scrollWidth = container.scrollWidth / 2; // Half because we duplicate

      // Increment scroll
      container.scrollLeft += speed;

      // When we reach the end of the first set → instantly jump back (seamless)
      if (container.scrollLeft >= scrollWidth) {
        container.scrollLeft = container.scrollLeft - scrollWidth;
      }

      rafRef.current = requestAnimationFrame(scroll);
    };

    rafRef.current = requestAnimationFrame(scroll);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isHovered, speed]);

  const scrollOneCard = (direction: 'left' | 'right') => {
    if (!containerRef.current) return;
    const card = containerRef.current.querySelector('.card-item') as HTMLElement;
    if (!card) return;

    const cardWidth = card.offsetWidth;
    const gap = 32; // gap-8 = 2rem = 32px
    const amount = cardWidth + gap;

    containerRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth'
    });
  };

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main scrolling container */}
      <div
        ref={containerRef}
        className="flex overflow-x-hidden gap-8 py-6"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Duplicate content for seamless loop */}
        {[...activities, ...activities].map((activity, index) => (
          <div
            key={`${activity.title}-${index}`}
            className="card-item flex-shrink-0 w-[90vw] sm:w-[70vw] md:w-[45vw] lg:w-[35vw] xl:w-[30vw]"
          >
            <ActivityCard activity={activity} />
          </div>
        ))}
      </div>

      {/* Animated gradient progress bar */}
      {/* <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-2xl h-1.5 bg-slate-800/80 rounded-full overflow-hidden backdrop-blur-md">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600 rounded-full shadow-lg"
          animate={{ x: ['-100%', '100%'] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div> */}

      {/* Navigation arrows - appear on hover */}
      <button
        onClick={() => scrollOneCard('left')}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-amber-500 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 backdrop-blur-md"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={() => scrollOneCard('right')}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-amber-500 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 backdrop-blur-md"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}

// Your original ActivityCard — 100% unchanged
function ActivityCard({ activity }: { activity: Activity }) {
  const [idx, setIdx] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    timer.current = setInterval(() => {
      setIdx(i => (i + 1) % activity.images.length);
    }, 4000);
    return () => clearInterval(timer.current!);
  }, [activity.images.length]);

  const pause = () => clearInterval(timer.current!);
  const resume = () => {
    timer.current = setInterval(() => {
      setIdx(i => (i + 1) % activity.images.length);
    }, 4000);
  };

  const go = (i: number) => {
    setIdx(i);
    pause();
    resume();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-amber-400/40 transition-all h-full flex flex-col"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      {/* Header */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-display font-bold text-white line-clamp-2">
              {activity.title}
            </h3>
            <p className="text-amber-400 font-medium text-sm mt-1">{activity.role}</p>
          </div>
          {activity.link && (
            <a href={activity.link} target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 flex-shrink-0">
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      {/* Image Gallery - Fixed & Beautiful */}
      <div className="relative bg-slate-900/40 overflow-hidden">
        <div className="relative w-full h-full min-h-64 md:min-h-80"> {/* Gives breathing room */}
          {activity.images.map((src, i) => (
            <div
              key={i}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                i === idx ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <LazyLoadImage
                src={src}
                alt={`${activity.title} – Image ${i + 1}`}
                effect="blur"
                className="w-full h-full object-contain object-center"
                wrapperProps={{
                  style: { width: '100%', height: '100%' }
                }}
                style={{ display: 'block' }}
                placeholderSrc="/placeholder.jpg" // optional: add a low-res placeholder
              />
            </div>
          ))}
        </div>

        {/* Dots */}
        {activity.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {activity.images.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className={`transition-all duration-300 rounded-full ${
                  i === idx
                    ? 'bg-amber-400 w-8 h-2'
                    : 'bg-white/50 hover:bg-white/80 w-2 h-2'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Description */}
      <div className="p-5 flex-shrink-0">
        <p className={`text-slate-300 text-sm leading-relaxed ${expanded ? '' : 'line-clamp-3'}`}>
          {activity.description}
        </p>
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 text-amber-400 hover:text-amber-300 text-sm font-medium"
        >
          {expanded ? 'Show less' : 'Read more'}
        </button>
      </div>
    </motion.div>
  );
}