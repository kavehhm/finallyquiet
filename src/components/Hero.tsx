/*
  This officeRoute requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import {  useEffect, useState } from "react";
import Image from "next/image";
import { useSession, signIn, signOut,  } from "next-auth/react";
import ModalHome from "./ModalHome";
import fQ from '../../public/images/bgremoved/Inked3.jpg'




export default function Hero() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);


  //If the user is signed in, show them the modal to let them know they are on the waitlist.
  useEffect(() => {
    if (session)
    {
      setOpen(true)
    }
  
    
  }, [session])
  

  return (
    <div className="relative ">
      
      

      <main>
        <div className="bg-white pt-10 sm:pt-16 overflow-hidden xl:pb-14 xl:pt-8">
          <div className="mx-auto max-w-7xl xl:px-8">
            <div className="xl:grid xl:grid-cols-2 xl:gap-8">
              <div className="mx-auto max-w-md px-6 sm:max-w-2xl sm:text-center xl:flex xl:items-center xl:px-0 xl:text-left">
                <div className="xl:py-24">
                  <h1 className="text-4xl font-bold tracking-tight text-black sm:text-6xl lg:mt-6 xl:text-6xl">
                    <span className="block">Your office can be</span>
                    <span className="block text-babyblue">Finally Quiet</span>
                  </h1>
                  <p className="my-3 text-base text-gray-600 sm:my-8 sm:text-xl lg:text-lg xl:text-xl">
                    Save yourself, your staff, and your patients from the loudness of your office. Join Finally Quiet today!
                  </p>
                  <div className=" flex gap-x-4">
                  {!session && (
        <button
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={() => signIn()}
          className="block w-full disabled:bg-gray-400 disabled:cursor-not-allowed rounded-md bg-babyblue whitespace-nowrap px-4 py-3 font-medium text-white shadow focus:outline-none focus:ring-2 "
        >
          Join Finally Quiet
        </button>
      )}

      {session && (
        <button
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onClick={() => signOut()}
        disabled
          className="block w-full whitespace-nowrap  disabled:cursor-not-allowed rounded-md bg-babyblue px-4 py-3 font-medium text-white shadow focus:outline-none focus:ring-2 "
        >
          You joined Finally Quiet!
        </button>
      )}
                   
                    <a href={"#pricing"} className=" w-full text-left flex justify-center whitespace-nowrap rounded-md border-2 border-babyblue bg-white px-4 py-3 font-medium text-babyblue shadow focus:outline-none focus:ring-2 ">
                      Learn more
                    </a>
                  </div>
                </div>
              </div>
              <div className="mt-12 xl:ml-20 sm:mt-20  xl:mt-36 mb-12   ">
                {/* Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ */}

                <Image alt="finally quiet headphones" className="mx-auto" src={fQ} />
              </div>
            </div>
          </div>
        </div>

        {/* More main page content here... */}
      </main>
      <ModalHome open={open} setOpen={setOpen} image={'/modal.jpg'} topText={true} />
    </div>
  );
}
