import { cn } from "../lib/utils";
import { TerminalWindow } from "./TerminalWindow";

export const MacbookCSS = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      {/* Lid */}
      <div className="relative [perspective:800px]">
        <div
          style={{
            transform: "perspective(800px) rotateX(-25deg)",
            transformOrigin: "bottom",
          }}
          className="relative h-[12rem] w-[32rem] sm:w-[40rem] rounded-2xl bg-black p-2"
        >
          <div className="absolute inset-0 rounded-lg bg-gray-900 flex items-center justify-center">
            <span className="text-white text-sm">Macbook</span>
          </div>
        </div>

        <div className="absolute inset-0 h-96 w-[32rem] sm:w-[40rem] rounded-2xl bg-black p-2">
          <div className="absolute inset-0 rounded-lg bg-[#050505] overflow-hidden">
            <div className="w-full h-full relative p-2">
               {/* Use the embedded terminal here. Force it to fit the screen. */}
               <TerminalWindow isEmbedded={true} />
            </div>
          </div>
        </div>
      </div>

      {/* Base */}
      <div className="relative -z-10 h-[22rem] w-[32rem] sm:w-[40rem] overflow-hidden rounded-2xl bg-gray-200 dark:bg-[#272729]">
        {/* hinge */}
        <div className="relative h-10 w-full">
          <div className="absolute inset-x-0 mx-auto h-4 w-[80%] bg-black" />
        </div>

        {/* keyboard + speakers */}
        <div className="relative flex">
          <div className="mx-auto w-[10%]">
            <SpeakerGrid />
          </div>

          <div className="mx-auto w-[80%]">
            <Keypad />
          </div>

          <div className="mx-auto w-[10%]">
            <SpeakerGrid />
          </div>
        </div>

        <Trackpad />

        <div className="absolute inset-x-0 bottom-0 mx-auto h-2 w-20 rounded-tl-3xl rounded-tr-3xl bg-gradient-to-t from-[#272729] to-black" />
      </div>
    </div>
  );
};

const Trackpad = () => {
  return (
    <div
      className="mx-auto my-1 h-32 w-[40%] rounded-xl"
      style={{ boxShadow: "0px 0px 1px 1px #00000020 inset" }}
    />
  );
};

const Keypad = () => {
  return (
    <div className="mx-1 rounded-md bg-black p-1 grid grid-cols-[repeat(14,minmax(0,1fr))] gap-[2px]">
      {Array.from({ length: 70 }).map((_, i) => (
        <KBtn key={i} />
      ))}
    </div>
  );
};

const KBtn = ({ className }: { className?: string }) => {
  return (
    <div className="rounded-[4px] p-[0.5px] bg-white/[0.1]">
      <div
        className={cn(
          "flex h-4 sm:h-6 w-full items-center justify-center rounded-[3.5px] bg-[#0A090D]",
          className
        )}
      />
    </div>
  );
};

const SpeakerGrid = () => {
  return (
    <div
      className="mt-2 h-40 border-l border-r border-[#333] border-opacity-20"
      style={{
        backgroundImage:
          "radial-gradient(circle, #08080A 0.5px, transparent 0.5px)",
        backgroundSize: "3px 3px",
      }}
    />
  );
};
