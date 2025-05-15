"use client";

import { useState } from "react";

import Image, { type ImageProps } from "next/image";
import Skeleton from "@/app/components/Skeleton";

interface Props extends ImageProps {
  className?: string;
  alt: string;
}
export default function ImageWithBlur({ alt, className, ...props }: Props) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="relative">
      {!imgLoaded && <Skeleton className="absolute inset-0" />}

      <Image
        {...props}
        alt={alt}
        onLoad={() => setImgLoaded(true)}
        className={`duration-300 ${className} ${
          imgLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
