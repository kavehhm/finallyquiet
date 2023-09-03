/* eslint-disable @typescript-eslint/no-misused-promises */
import React from "react";
import { signIn, getProviders } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { authOptions } from "~/server/auth";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import backgroundImage from "../../../public/background-auth.jpg";
import bg from "../../../public/bg.jpg";
import logo from "../../../public/logo2.png";
import { AiOutlineGoogle } from "react-icons/ai";

const FinallyAuth = ({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="relative flex h-[100vh] min-h-full  justify-center md:px-12 lg:px-0">
      <div className="relative z-10 flex flex-1 flex-col bg-white px-4 py-10 shadow-2xl sm:justify-center md:flex-none md:px-28">
        <main className="mx-auto mt-12 flex w-full max-w-md flex-col items-center  justify-center sm:mt-0 sm:px-4 md:w-96 md:max-w-sm md:items-start md:px-0">
          <>
            <Head>
              <title>Sign In - Finally Quiet</title>
              <meta
                name="description"
                content="Sign into Finally Quiet today"
              />
              <link rel="icon" href="/logo2.png" />
            </Head>
            <Image
              alt="background"
              src={bg}
              className="object-fit absolute left-0 top-0 -z-10 h-[100vh] min-h-full opacity-20 md:hidden"
            />
            <div className="flex">
              <Link href="/" aria-label="Home">
                <Image
                  src={logo}
                  alt="Finally Quiet Logo"
                  className="h-10 w-auto"
                />
              </Link>
            </div>
            <h2 className="mt-10 text-xl font-semibold text-gray-900">
              Sign in to your account
            </h2>

            <p className="text-md mt-2 text-center text-gray-700 md:text-left">
              By signing in with Google you will gain access to our software.
            </p>

            {providers &&
              Object.values(providers).map((provider) => (
                <div key={provider.name} style={{ marginBottom: 0 }}>
                  <button
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onClick={() => signIn(provider.id)}
                    type="submit"
                    className="py-4.5 text-md mx-auto mt-10  flex-none rounded-md bg-babyblue px-6 py-4 font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    <div className=" flex items-center justify-center gap-x-2">
                      <AiOutlineGoogle className="text-lg" /> Join Finally Quiet
                      with Google
                    </div>
                  </button>
                </div>
              ))}
          </>
        </main>
      </div>
      <div className="hidden sm:contents lg:relative lg:block lg:flex-1">
        <Image
          className="absolute inset-0 h-full w-full object-cover"
          src={backgroundImage}
          alt=""
          unoptimized
        />
      </div>
    </div>
  );
};

export default FinallyAuth;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
