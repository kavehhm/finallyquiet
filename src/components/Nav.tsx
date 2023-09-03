import { Popover, Transition } from "@headlessui/react";
import {  XMarkIcon } from "@heroicons/react/24/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { Fragment } from "react";
import Image from "next/image";
import logo from "../../public/logo2.png";
import Link from "next/link";

const navigation = [{ name: "Home", href: "/" }];


const Nav = () => {
  const { data: session } = useSession();
  return (
    <Popover as="header" className="relative">
      <div className="bg-white pt-6">
        <nav
          className="relative mx-auto flex max-w-7xl items-center justify-between px-6"
          aria-label="Global"
        >
          <div className="flex flex-1 items-center">
            <div className="flex w-full items-center justify-between md:w-auto">
              <Link href="/">
                <span className="sr-only">Your Company</span>
                
                <Image
                  className="h-8 w-auto sm:h-10"
                  src={logo}
                  alt="Finally Quiet Logo"
                />
              </Link>
              {/* <div className="-mr-2 flex items-center md:hidden">
                <Popover.Button className="focus-ring-inset inline-flex items-center justify-center rounded-md p-2 text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div> */}
            </div>
            <div className="hidden space-x-8 md:ml-10 md:flex">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-base font-medium text-black hover:text-gray-300"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-6">
            {!session && (
              <button
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={() => signIn()}
                className="text-base font-medium text-black hover:text-gray-300 "
              >
                Log in
              </button>
            )}
            {session && (
              <button
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={() => signOut()}
                className="text-base font-medium text-black hover:text-gray-300 "
              >
                Log out
              </button>
            )}

            {session && (
              <Link
                href={"/gated"}
                className="inline-flex hover:scale-102 transition duration-75 active:scale-97 items-center rounded-md border border-transparent bg-babyblue px-4 py-2 text-base font-medium text-white disabled:cursor-not-allowed disabled:bg-gray-400 "
              >
                Manage
              </Link>
            )}
          </div>
        </nav>
      </div>

      <Transition
        as={Fragment}
        enter="duration-150 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <Popover.Panel
          focus
          className="absolute inset-x-0 top-0 z-10 origin-top transform p-2 transition md:hidden"
        >
          <div className="overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5">
            <div className="flex items-center justify-between px-5 pt-4">
              <div>
                <Image className="h-8 w-auto" src={logo} alt="" />
              </div>
              <div className="-mr-2">
                <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600">
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="pb-6 pt-5">
              <div className="space-y-1 px-2">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="mt-6 px-5">
                {!session && (
                  <button
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onClick={() => signIn()}
                    className="block w-full rounded-md bg-babyblue px-4 py-3 text-center font-medium text-white shadow hover:bg-indigo-700 "
                  >
                    Log in
                  </button>
                )}
                {session && (
                  <button
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onClick={() => signOut()}
                    className="block w-full rounded-md bg-babyblue px-4 py-3 text-center font-medium text-white shadow hover:bg-indigo-700 "
                  >
                    Log out
                  </button>
                )}
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default Nav;
