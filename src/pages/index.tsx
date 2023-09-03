
import Head from "next/head";
import Hero from "~/components/Hero";


export default function Home() {

  return (
    <>
      <Head>
        <title>Finally Quiet</title>
        <meta name="description" content="Cutting edge technology for loud workspaces. Sign up today!" />
        <link rel="icon" href="/logo2.png" />
      </Head>
      <main className="">
        <Hero />
       
      </main>
    </>
  );
}

