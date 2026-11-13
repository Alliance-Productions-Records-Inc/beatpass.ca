import { ComponentPropsWithoutRef, forwardRef } from "react";
import clsx from "clsx";

interface ChannelCarouselViewportProps
  extends ComponentPropsWithoutRef<"div"> {}

export const ChannelCarouselViewport = forwardRef<
  HTMLDivElement,
  ChannelCarouselViewportProps
>(({ children, className, ...domProps }, ref) => (
  <div
    {...domProps}
    ref={ref}
    className={clsx(
      "content-carousel content-grid relative grid w-full grid-flow-col grid-rows-[auto] snap-x snap-mandatory snap-always overflow-x-auto overflow-y-visible scroll-smooth motion-reduce:scroll-auto touch-manipulation [-webkit-overflow-scrolling:touch] hidden-scrollbar",
      className,
    )}
  >
    {children}
  </div>
));

ChannelCarouselViewport.displayName = "ChannelCarouselViewport";
