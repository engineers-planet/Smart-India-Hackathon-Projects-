import { useState, useEffect } from 'react';
import { Auth } from '@supabase/ui';
import { supabase } from '../utils/supabaseClient';
import Link from 'next/link';

function CreatedJobs() {
  const [isLoading, setIsLoading] = useState(true);
  const [createdJobs, setCreatedJobs] = useState([]);
  const { user } = Auth.useUser();

  useEffect(() => {
    get_jobs();
  }, []);

  const get_jobs = async () => {
    const query = JSON.stringify({
      query: `
      query MyQuery {
        job(where: {company_id: {_eq: "${user.id}"}}) {
          description
          disability
          id
          location
          position
          qualification
          salary
          sector
          company_id
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
    setCreatedJobs(responseJson.data.job);
    setIsLoading(false);
  };

  if (isLoading) {
    return <h1 className="text-3xl text-center p-3">Loading...</h1>;
  }

  return (
    <div>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg my-10 mx-10">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            Created Jobs
            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              The below are the list of jobs that your company has created for
              the needy. Click on the jobs to get the list of the applicants.
            </p>
          </caption>
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                Job position
              </th>
              <th scope="col" className="py-3 px-6">
                Description
              </th>
              <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                Location
              </th>
              <th scope="col" className="py-3 px-6">
                Sector
              </th>
              <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                qualification
              </th>
              <th scope="col" className="py-3 px-6 ">
                Disability
              </th>
              <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                Salary
              </th>
              <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {createdJobs.map((job) => {
              return (
                <tr
                  key={job.id}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                  >
                    {job.position}
                  </th>
                  <td className="py-4 px-6">{job.description}</td>
                  <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                    {job.location}
                  </td>
                  <td className="py-4 px-6">{job.sector}</td>
                  <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                    {job.qualification}
                  </td>
                  <td className="py-4 px-6">{job.disability}</td>
                  <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                    {job.salary}
                  </td>
                  <td className="py-4 px-6">
                    <Link href={`/createdJob/${job.id}`}>
                      <p className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">
                        View Applications
                      </p>
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

export default function logi() {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <CreatedJobs supabaseClient={supabase}>
        <Auth supabaseClient={supabase} />
      </CreatedJobs>
    </Auth.UserContextProvider>
  );
}
