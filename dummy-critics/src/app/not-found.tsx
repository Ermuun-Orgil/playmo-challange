import { notFound } from "@/assets";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col w-full h-[80vh] items-center justify-center">
      <Image loading="lazy" alt="404" src={notFound} width={600} height={600} />
      <div>
        <Link className="text-[24px]" href="/">
          Go back to Home
        </Link>
      </div>
    </div>
  );
}
