import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function Slider() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: false })
  );

  return (
    <>
      <Carousel plugins={[plugin.current]} className="w-full max-w-xl mx-auto">
        <CarouselContent>
          <CarouselItem>
            <img
              src="https://picsum.photos/600/900?random=1"
              className="rounded-lg w-full h-full object-cover"
              alt="Slide 1"
              />
            {/* <div className="absolute bottom-[9%] left-[25%] text-center">
              <h1 className="text-2xl font-semibold mb-2">
                Explore the Moment
              </h1>
              <p className="text-sm text-gray-200 mb-4">
                Every image has a story to tell
              </p>
            </div> */}
          </CarouselItem>
          <CarouselItem>
            <img
              src="https://picsum.photos/600/900?random=2"
              className="rounded-lg w-full"
              alt="Slide 2"
            />
            {/* <div className="absolute bottom-[9%] left-[25%] text-center">
              <h1 className="text-2xl font-semibold mb-2">
                Beyond the Surface
              </h1>
              <p className="text-sm text-gray-200 mb-4">
                A glimpse into moments unseen
              </p>
            </div> */}
          </CarouselItem>
          <CarouselItem>
            <img
              src="https://picsum.photos/600/900?random=3"
              className="rounded-lg w-full"
              alt="Slide 3"
              />
            <div className="absolute bottom-[9%] left-[25%] text-center">
              <h1 className="text-2xl font-semibold mb-2">Timeless Views</h1>
              <p className="text-sm text-gray-200 mb-4">
                Discover beauty in every frame
              </p>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </>
  );
}

export default Slider;
