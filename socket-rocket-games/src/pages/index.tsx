import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import { Content } from "@/components/content";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Socket Rocket Games</title>
        <meta name="description" content="Personal Page built with Nextjs" />
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
      </Head>
      <main>
        <Content />
      </main>
    </>
  );
}
