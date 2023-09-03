import React from "react";
import { useRouter } from "next/router";
import FetchRole from "~/hooks/fetchRole";
import Link from "next/link";
import SystemAdminPage from "~/components/roles/SystemAdminPage";
import DentalStaff from "~/components/roles/DentalStaff";

const RoleConsole = () => {
  const router = useRouter();
  const { role } = router.query;

  const userRole = FetchRole();

  //If the user is on the wrong page
  //Ex: if a user is trying to view the SuperAdmin console as a TenantAdmin, they get this screen.
  if (userRole !== (role as string)) {
    return (
      <div className="flex flex-col items-center justify-center gap-y-6 py-48">
        <p className="text-center text-3xl font-bold text-red-700">
          You are on the wrong page!
        </p>
        <Link
          className="inline-flex items-center justify-center rounded-md border border-transparent bg-babyblue px-4 py-2 text-center text-base font-medium text-white disabled:cursor-not-allowed disabled:bg-gray-400 "
          href={`/gated`}
        >
          Go back to role selector
        </Link>
      </div>
    );
  } 
  //If the user is on the right page
  //Ex: if the user is a TenantAdmin on the TenantAdmin console.
  else {
    return (
      <div className="w-full  py-48">
        <p className="text-center text-3xl font-bold text-green-700">
          You are on the right page!
        </p>
        {/* Only render the admin screen if the user is an Admin. */}
        <div className="mx-auto">
          {(role === "SystemAdmin" || role==="TenantAdmin" || role==="SuperAdmin") &&  <SystemAdminPage />}
        </div>
        {/* Only render the dental staff screen if the user isn't an Admin or Patient. */}
        <div className="mx-auto">
          {role !== "TenantAdmin" &&
            role !== "SystemAdmin" &&
            role !== "SuperAdmin" &&
            role !== "Patient" && <DentalStaff />}
        </div>
      </div>
    );
  }
};

export default RoleConsole;
