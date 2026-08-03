import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export interface GalleryItem {
  name?: string;
  role?: string;
  image: string;
  bio?: string;
  title?: string;
  description?: string;
}

export interface ThreeDHoverGalleryProps {
  items?: GalleryItem[];
  className?: string;
  children?: React.ReactNode;
}

function ThreeDCard({ item, index }: { item: GalleryItem; index: number; key?: React.Key }) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="perspective-1000 group relative flex flex-col h-full cursor-pointer select-none"
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          scale: isHovered ? 1.03 : 1,
        }}
        transition={{ duration: 0.2 }}
        className="relative flex flex-col flex-grow bg-white dark:bg-gray-800/90 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl border border-gray-100 dark:border-gray-700/80 transition-shadow duration-300"
      >
        {/* Subtle Glare effect */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-30 opacity-0 group-hover:opacity-30 transition-opacity duration-300 rounded-2xl"
          style={{
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.8), transparent 60%)`,
          }}
        />

        {/* Card Header / Image Section */}
        {item.image && (
          <div className="flex justify-center pt-8 pb-2 bg-gray-50/80 dark:bg-gray-800/50 relative overflow-hidden">
            {/* Ambient glow behind image */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <motion.div
              style={{ transform: "translateZ(30px)" }}
              className="bg-gray-200 dark:bg-gray-700 overflow-hidden relative border-4 border-white dark:border-gray-700 shadow-md group-hover:shadow-xl rounded-2xl transition-all duration-300"
              aria-label={item.name || item.title || "Team member photo"}
            >
              <img
                src={item.image}
                alt={item.name || item.title || "Gallery Item"}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                className="w-[140px] h-[180px] object-cover object-[center_15%] group-hover:scale-110 transition-transform duration-700 ease-out"
              />
            </motion.div>
          </div>
        )}

        {/* Text Content */}
        <div className="p-6 text-center flex-grow flex flex-col justify-between" style={{ transform: "translateZ(20px)" }}>
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {item.name || item.title}
            </h3>
            {(item.role || item.description) && (
              <p
                className={cn(
                  "text-blue-600 dark:text-blue-400 font-medium mb-3 text-sm",
                  index === 1 && "w-[256px] mx-auto"
                )}
                style={index === 0 ? { marginLeft: "-10px" } : undefined}
              >
                {item.role || item.description}
              </p>
            )}
            {item.bio && (
              <p className="text-gray-600 dark:text-gray-400 text-[14px] leading-relaxed">
                {item.bio}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ThreeDCardWrapper({
  children,
  className,
  index = 0,
  glow = true,
}: {
  children: React.ReactNode;
  className?: string;
  index?: number;
  glow?: boolean;
  key?: React.Key;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="perspective-1000 group relative flex flex-col h-full cursor-pointer"
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        animate={{
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.2 }}
        className={cn("relative flex flex-col flex-grow rounded-2xl transition-all duration-300", className)}
      >
        {glow && (
          <motion.div
            className="pointer-events-none absolute inset-0 z-30 opacity-0 group-hover:opacity-25 transition-opacity duration-300 rounded-2xl"
            style={{
              background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(59,130,246,0.4), transparent 65%)`,
            }}
          />
        )}
        {children}
      </motion.div>
    </motion.div>
  );
}

export function ThreeDHoverGallery({ items, className, children }: ThreeDHoverGalleryProps) {
  if (children) {
    return <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8", className)}>{children}</div>;
  }

  if (!items || items.length === 0) return null;

  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8", className)}>
      {items.map((item, index) => (
        <ThreeDCard key={item.name || item.title || index} item={item} index={index} />
      ))}
    </div>
  );
}

export default ThreeDHoverGallery;
