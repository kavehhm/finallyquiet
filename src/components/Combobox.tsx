/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

// @ts-nocheck
import { useEffect, useState } from "react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import { api } from "~/utils/api";

type usersType = {
  setUser: React.Dispatch<React.SetStateAction<string>>;
};

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function ComboField({ setUser }: usersType) {
  const users = api.officeRoute.getAllUsers.useQuery();

  const [query, setQuery] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(() => "Loading...");

  //When user data is fetched on initial load, we set the selected person
  //on the combo box to the user at index 0.
  useEffect(() => {
    if (users.isFetchedAfterMount) {
      setSelectedPerson(users?.data?.at(0));
    }
  }, [users?.data, users.isFetchedAfterMount]);

  //When we change the selected person on the combo box, we set the selected user for our form to that person.
  useEffect(() => {
    setUser(selectedPerson.id);
  }, [selectedPerson, setUser]);


  //To search and filter the combo box.
  const filteredPeople =
    query === ""
      ? users.data
      : users?.data?.filter((person) => {
          return person?.name?.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <Combobox as="div" value={selectedPerson} onChange={setSelectedPerson}>
      <Combobox.Label className="block text-sm font-medium leading-6 text-gray-900">
        Assigned to
      </Combobox.Label>
      <div className="relative mt-2">
        <Combobox.Input
          className="w-full rounded-md border-2 border-babyblue bg-white py-1.5 pl-3 pr-10 text-gray-900 shadow-sm  ring-inset ring-gray-300  focus:ring-inset focus:ring-babyblue sm:text-sm sm:leading-6"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={() => selectedPerson.name}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {(filteredPeople?.length as number) > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredPeople?.map((person) => (
              <Combobox.Option
                key={person.id}
                value={person}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-babyblue text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <span
                      className={classNames(
                        "block truncate",
                        selected && "font-semibold"
                      )}
                    >
                      {person.name}
                    </span>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-babyblue"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
}
