import React, { useEffect, useState } from 'react';
import { Auth } from '@supabase/ui';
import { supabase } from '../utils/supabaseClient';
import PopUpModalScheme from '../components/PopUpModals/PopUpModalScheme';

function Schemes() {
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [present, setPresent] = useState(true);
  const [selected, setSelected] = useState({});
  const [schemes, setSchemes] = useState([]);
  const [category, setCategory] = useState('All');

  const { user } = Auth.useUser();

  const get_schemes = async (ans) => {
    const query = JSON.stringify({
      query: ans,
    });

    const response = await fetch('https://reachout-sih.hasura.app/v1/graphql', {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
      },
      method: 'POST',
      body: query,
    });

    const responseJson = await response.json();
    console.log(responseJson);
    setSchemes(responseJson.data.scheme);
    setIsLoading(false);
  };

  useEffect(() => {
    // Fetch schemes offered by the ministries from the database.
    // set the state variables
    let ans = `query MyQuery {
      scheme {
        description
        eligibility
        id
        name
        type
        admin {
          name
        }
      }
    }`;
    get_schemes(ans);
  }, []);

  function changePopUpState() {
    setModal(!modal);
  }

  const get_details = async (scheme) => {
    setSelected(scheme);
    const query = JSON.stringify({
      query: `
      query MyQuery {
        beneficiary(where: {profile_id: {_eq: "${user.id}"}, scheme_id: {_eq: "${scheme.id}"}}) {
          id
          profile_id
          scheme_id
          status
        }
      }
`,
    });

    const response = await fetch('https://reachout-sih.hasura.app/v1/graphql', {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
      },
      method: 'POST',
      body: query,
    });

    const responseJson = await response.json();
    console.log(responseJson);
    if (responseJson.data.beneficiary.length === 0) {
      setPresent(false);
    }
    setIsLoading(false);
    changePopUpState();
  };

  function openPopUp(scheme) {
    get_details(scheme);
  }

  if (isLoading) {
    return <h1 className="text-3xl text-center p-3">Loading...</h1>;
  }

  function filteration_01(e) {
    console.log(e.target.value);
    setCategory(e.target.value);
  }

  function filteration_02(e) {
    if (category === 'All') {
      // Fetch all the records from the database and set the react variable setJob
      let ans = `
      query MyQuery {
        scheme {
          description
          eligibility
          id
          name
          type
          admin {
            name
          }
        }
      }
`;
      get_schemes(ans);
    } else if (e.target.value === '') {
      // Fetch all the records from the database and set the react variable setJob
      let ans = `
      query MyQuery {
        scheme {
          description
          eligibility
          id
          name
          type
          admin {
            name
          }
        }
      }
`;
      get_schemes(ans);
    } else {
      //Fetch Based of the condition
      let ans = ``;
      if (category === 'scheme_name') {
        ans = `query MyQuery {
          scheme(where: {name: {_ilike: "${'%' + e.target.value + '%'}"}}) {
            admin_id
            description
            eligibility
            id
            name
            type
            admin {
              name
            }
          }
        }
        `;
      } else if (category === 'type_of_scheme') {
        ans = `query MyQuery {
          scheme(where: {type: {_ilike: "${'%' + e.target.value + '%'}"}}) {
            admin_id
            description
            eligibility
            id
            name
            type
            admin {
              name
            }
          }
        }
        `;
      } else {
        ans = `query MyQuery {
          scheme(where: {eligibility: {_ilike: "${
            '%' + e.target.value + '%'
          }"}}) {
            admin_id
            description
            eligibility
            id
            name
            type
            admin {
              name
            }
          }
        }
        `;
      }
      get_schemes(ans);
    }
  }

  return (
    <div>
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-2 m-3">
          <select
            id="large"
            className="block py-3 px-4 w-full h-full text-base text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => {
              filteration_01(e);
            }}
          >
            <option selected>All</option>
            <option value="scheme_name">Scheme Name</option>
            <option value="type_of_scheme">Type of Scheme</option>
            <option value="eligibility">Eligibility</option>
          </select>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-1">
          <label
            for="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300"
          >
            Search
          </label>
          <div className="relative m-3">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="my-3 block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
              onChange={(e) => {
                filteration_02(e);
              }}
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg m-5">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Scheme name
              </th>
              <th scope="col" className="py-3 px-6">
                Description
              </th>
              <th scope="col" className="py-3 px-6">
                Type of Scheme
              </th>
              <th scope="col" className="py-3 px-6">
                Eligibility
              </th>
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {schemes.map((scheme) => {
              return (
                <tr
                  key={scheme.id}
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {scheme.name}
                  </th>
                  <td className="py-4 px-6">{scheme.description}</td>
                  <td className="py-4 px-6">{scheme.type}</td>
                  <td className="py-4 px-6">{scheme.eligibility}</td>
                  <td className="py-4 px-6">
                    <p
                      onClick={() => {
                        openPopUp(scheme);
                      }}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                    >
                      Apply
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {modal && (
        <PopUpModalScheme
          selected={selected}
          func={changePopUpState}
          setP={setPresent}
          registered={present}
          user={user}
        />
      )}
    </div>
  );
}

export default function logi() {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Schemes supabaseClient={supabase}>
        <Auth supabaseClient={supabase} />
      </Schemes>
    </Auth.UserContextProvider>
  );
}
