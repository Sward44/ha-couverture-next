"use server";
import Link from "next/link";

export async function Header({ url }) {
  console.log(url);
  return (
    <div className="mt-8 flex justify-center">
      <h1 className="text-xl md:text-3xl">
        Page de{" "}
        <Link href={url}>
          <span className="font-bold underline">
            {process.env.HOST}
            {url}
          </span>
        </Link>
      </h1>
    </div>
  );
}
