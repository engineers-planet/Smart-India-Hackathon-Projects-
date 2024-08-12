import React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

function Schemes() {
  const [isLoading, setIsLoading] = useState(true);

  const get_schemes = async () => {
    const query = JSON.stringify({
      query: `query MyQuery {
  scheme(where: {admin_id: {_eq: "${localStorage.getItem('admin')}"}}) {
    admin_id
    description
    eligibility
    id
    name
    type
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
    setSchemes(responseJson.data.scheme);
    setIsLoading(false);
  };

  const [schemes, setSchemes] = useState([]);
  useEffect(() => {
    get_schemes();
  }, []);

  if (isLoading) {
    return <h1 className="text-3xl text-center p-3">Loading...</h1>;
  }

  return (
    <div>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg m-10">
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
                    <Link href={`/createdScheme/${scheme.id}`}>
                      <a className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                        Details
                      </a>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Schemes;
