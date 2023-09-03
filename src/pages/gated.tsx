import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { api } from "~/utils/api";
import { Roles } from "@prisma/client";
import Link from "next/link";
import { ThreeDots } from "react-loader-spinner";
import { LoaderIcon } from "react-hot-toast";

const Gated = () => {
  const session = useSession();

  const role = api.officeRoute.getRole.useQuery({
    input: session.data?.user.id as string,
  });

  const self = api.officeRoute.getSelf.useQuery(
    session.data?.user.id as string
  );

  const [selectedRole, setSelectedRole] = useState("");

  const addToTable = api.officeRoute.addToTable.useMutation();

  const setRole = api.officeRoute.setRole.useMutation({
    onSuccess: async () => {
      await role.refetch();
      addToTable.mutate(`Set their own role to ${selectedRole}`);
    },
  });

  return (
    <div className="mx-auto flex w-min max-w-6xl flex-col gap-y-6 py-48">
      <p className="whitespace-nowrap text-2xl ">{session.data?.user.name}</p>
      
      <p className="flex gap-x-3 whitespace-nowrap text-2xl ">
        Your role is:{" "}
        <span className="font-bold text-babyblue">
          {setRole.isLoading ? (
            <ThreeDots
              height="40"
              width="50"
              radius="9"
              color="#00AFF0"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              visible={true}
            />
          ) : (
            (role.data?.roles as string)
          )}
        </span>
      </p>

      <select
        value={role.data?.roles}
        onChange={(e) => {
          setSelectedRole(e.target.value);

          setRole.mutate({
            input: session.data?.user.id as string,
            role: e.target.value,
          });
        }}
        className="text-md block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-white dark:text-gray-900 dark:placeholder-gray-400 dark:focus:border-babyblue dark:focus:ring-babyblue"
      >
        {(Object.keys(Roles) as Array<keyof typeof Roles>).map((key) => {
          return <option key={key}>{key}</option>;
        })}
      </select>

      {(role.data?.roles as string) !== "Patient" && (
        <Link
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-babyblue px-4 py-2 text-center text-base font-medium text-white transition duration-75 hover:scale-102 active:scale-97 disabled:cursor-not-allowed disabled:bg-gray-400 "
          href={role.isFetched ? `/console/${role.data?.roles as string}` : ""}
        >
          {role.isFetched && (role.data?.roles as string) !== "Patient" ? (
            `Go to ${role.data?.roles as string} Console`
          ) : (
            <LoaderIcon />
          )}
        </Link>
      )}
      {/* Patient have a different page route so I created separate buttons for them */}
      {(role.data?.roles as string) === "Patient" && (
        <Link
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-babyblue px-4 py-2 text-center text-base font-medium text-white transition duration-75 hover:scale-102 active:scale-97 disabled:cursor-not-allowed disabled:bg-gray-400 "
          href={
            role.isFetched
              ? `/console/${role.data?.roles as string}/patient/${
                  session.data?.user.id as string
                }`
              : ""
          }
        >
          {role.isFetched ? (
            `Go to ${role.data?.roles as string} Console`
          ) : (
            <LoaderIcon />
          )}
        </Link>
      )}
      {self.isFetchedAfterMount &&
        self.data?.officeId &&
        self.data.roleInOffice && (
          <p className="whitespace-nowrap font-thin text-lg ">
            You are currently an {self.data.roleInOffice} in an office
          </p>
        )}
    </div>
  );
};

export default Gated;
