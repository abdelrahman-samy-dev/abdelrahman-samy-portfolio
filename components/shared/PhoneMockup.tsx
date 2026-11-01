import Image from "next/image";

interface PhoneMockupProps {
  src: string;
  alt: string;
  className?: string;
}

/** A vector phone frame (CSS only) around a screenshot. Position it with className (e.g. "absolute …"). */
export default function PhoneMockup({ src, alt, className = "relative" }: PhoneMockupProps) {
  return (
    <div
      className={`rounded-[1.6rem] p-[5px] ${className}`}
      style={{
        aspectRatio: "9 / 19",
        background: "linear-gradient(145deg, #3a3833, #141414 45%, #2a2824)",
        boxShadow: "0 30px 60px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.08), inset 0 0 0 1px rgba(255,255,255,0.06)",
      }}
    >
      {/* side buttons */}
      <span aria-hidden="true" className="absolute -left-[2px] top-[22%] w-[2px] h-[9%] rounded-l bg-[#2c2a26]" />
      <span aria-hidden="true" className="absolute -right-[2px] top-[18%] w-[2px] h-[14%] rounded-r bg-[#2c2a26]" />
      <div className="relative w-full h-full rounded-[1.3rem] overflow-hidden bg-black">
        <Image src={src} alt={alt} fill className="object-cover object-top" sizes="(max-width: 768px) 30vw, 200px" />
        {/* dynamic island */}
        <span aria-hidden="true" className="absolute top-[1.6%] left-1/2 -translate-x-1/2 w-[30%] h-[2.6%] rounded-full bg-black" />
      </div>
    </div>
  );
}
