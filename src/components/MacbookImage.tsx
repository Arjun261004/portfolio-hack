import { cn } from "../lib/utils";
import { TerminalWindow } from "./TerminalWindow";
import { MotionValue } from "framer-motion";
import { CardContainer, CardBody, CardItem } from "./ui/3d-card";

interface MacbookImageProps {
  className?: string;
  progress?: MotionValue<number>;
}

export const MacbookImage = ({ className, progress }: MacbookImageProps) => {
  return (
    <CardContainer className="w-full">
      <CardBody className={cn("relative flex flex-col items-center justify-center w-full max-w-[1700px] mx-auto h-auto", className)}>
        {/* 
          This wrapper holds the aspect ratio of the image. 
          Adjust these inset values if the terminal doesn't perfectly align with the screen bezels.
        */}
        <CardItem translateZ="50" className="relative w-[95vw] md:w-[115vw] lg:w-[94rem] max-w-[1670px]">

          <img 
            src="/mac_image1.png" 
            alt="MacBook Air" 
            className="w-full h-auto object-contain block pointer-events-none select-none shadow-2xl"
          />
          <CardItem 
            translateZ="100"
            className="absolute overflow-hidden flex items-center justify-center p-4 lg:p-8"
            style={{
              top: "14%",
              bottom: "29%",
              left: "22.5%",
              right: "22.5%"
            }}
          >
            {/* Centered, more rectangular terminal */}
            <div className="w-[98%] sm:w-[90%] md:w-[70%] lg:w-[60%] aspect-[3/2] max-h-full">

              <div className="w-full h-full drop-shadow-[0_0_20px_rgba(0,255,65,0.3)]">
                <TerminalWindow isEmbedded={true} progress={progress} />
              </div>
            </div>
          </CardItem>
        </CardItem>
      </CardBody>
    </CardContainer>
  );
};
