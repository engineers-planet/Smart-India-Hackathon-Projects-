import { useState, useEffect } from 'react';
import { Auth } from '@supabase/ui';
import { supabase } from '../utils/supabaseClient';

function EnrolledJobs() {
  const [enrolledJobs, setEnrolledJobs] = useState([]);
  const [rejectedJobs, setRejectedJobs] = useState([]);
  const [acceptedJobs, setAcceptedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = Auth.useUser();

  const getEnrolledJobs = async () => {
    const query = JSON.stringify({
      query: `query MyQuery {
  application(where: {profile_id: {_eq: "${user.id}"}, _and: {status: {_eq: 0}}}) {
    id
    job_id
    profile_id
    status
    job {
      company {
        name
        id
      }
      disability
      id
      description
      location
      position
      qualification
      salary
      sector
    }
  }
}
`,
    });

    const response = await fetch(
      'https://reachout-sih.hasura.app/v1/graphql',
      {
        headers: {
          'content-type': 'application/json',
          'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
        },
        method: 'POST',
        body: query,
      },
    );

    const responseJson = await response.json();
    console.log(responseJson);
    setEnrolledJobs(responseJson.data.application);
  };

  const getAcceptedJobs = async () => {
    const query = JSON.stringify({
      query: `query MyQuery {
  application(where: {profile_id: {_eq: "${user.id}"}, _and: {status: {_eq: 1}}}) {
    id
    job_id
    profile_id
    status
    job {
      company {
        name
        id
      }
      disability
      id
      description
      location
      position
      qualification
      salary
      sector
    }
  }
}
`,
    });

    const response = await fetch(
      'https://reachout-sih.hasura.app/v1/graphql',
      {
        headers: {
          'content-type': 'application/json',
          'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
        },
        method: 'POST',
        body: query,
      },
    );

    const responseJson = await response.json();
    console.log(responseJson);
    setAcceptedJobs(responseJson.data.application);
  };

  const getRejectedJobs = async () => {
    const query = JSON.stringify({
      query: `query MyQuery {
  application(where: {profile_id: {_eq: "${user.id}"}, _and: {status: {_eq: 2}}}) {
    id
    job_id
    profile_id
    status
    job {
      company {
        name
        id
      }
      disability
      id
      description
      location
      position
      qualification
      salary
      sector
    }
  }
}
`,
    });

    const response = await fetch(
      'https://reachout-sih.hasura.app/v1/graphql',
      {
        headers: {
          'content-type': 'application/json',
          'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
        },
        method: 'POST',
        body: query,
      },
    );

    const responseJson = await response.json();
    console.log(responseJson);
    setRejectedJobs(responseJson.data.application);
    setIsLoading(false);
  };

  useEffect(() => {
    //Fetch the data for the user for the jobs he registered.
    getEnrolledJobs();
    getAcceptedJobs();
    getRejectedJobs();
  }, []);

  if (isLoading) {
    return <h1 className="text-3xl text-center p-3">Loading...</h1>;
  }

  return (
    <div>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg my-10 mx-10">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 my-10">
          <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            Enrolled Jobs
            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              The below are the list of jobs you have applied. You might have
              got the response of these applications on your email. So please
              check your mail if you haven't.
            </p>
          </caption>
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                Company name
              </th>
              <th scope="col" className="py-3 px-6">
                Job position
              </th>
              <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                Description
              </th>
              <th scope="col" className="py-3 px-6">
                Location
              </th>
              <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                Sector
              </th>
              <th scope="col" className="py-3 px-6">
                Disability
              </th>
            </tr>
          </thead>
          <tbody>
            {enrolledJobs.map((job) => {
              return (
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                  >
                    {job.job.company.name}
                  </th>
                  <td className="py-4 px-6">{job.job.position}</td>
                  <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                    {job.job.description}
                  </td>
                  <td className="py-4 px-6">{job.job.location}</td>
                  <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                    {job.job.sector}
                  </td>
                  <td className="py-4 px-6">{job.job.disability}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 my-10">
          <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            Accepted Jobs
            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              The below are the list of jobs you have been accepted in. Check
              your mail to get in touch with the recruiter for further process.
            </p>
          </caption>
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                Company name
              </th>
              <th scope="col" className="py-3 px-6">
                Job position
              </th>
              <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                Description
              </th>
              <th scope="col" className="py-3 px-6">
                Location
              </th>
              <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                Sector
              </th>
              <th scope="col" className="py-3 px-6">
                Disability
              </th>
            </tr>
          </thead>
          <tbody>
            {acceptedJobs.map((job) => {
              return (
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                  >
                    {job.job.company.name}
                  </th>
                  <td className="py-4 px-6">{job.job.position}</td>
                  <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                    {job.job.description}
                  </td>
                  <td className="py-4 px-6">{job.job.location}</td>
                  <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                    {job.job.sector}
                  </td>
                  <td className="py-4 px-6">{job.job.disability}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 my-10">
          <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            Rejected Jobs
            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              The below are the list of jobs you have been rejected in. You
              might be rejected due to several reasons, but we strongly
              recommend you to keep applying.
            </p>
          </caption>
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                Company name
              </th>
              <th scope="col" className="py-3 px-6">
                Job position
              </th>
              <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                Description
              </th>
              <th scope="col" className="py-3 px-6">
                Location
              </th>
              <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                Sector
              </th>
              <th scope="col" className="py-3 px-6">
                Disability
              </th>
            </tr>
          </thead>
          <tbody>
            {rejectedJobs.map((job) => {
              return (
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                  >
                    {job.job.company.name}
                  </th>
                  <td className="py-4 px-6">{job.job.position}</td>
                  <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                    {job.job.description}
                  </td>
                  <td className="py-4 px-6">{job.job.location}</td>
                  <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                    {job.job.sector}
                  </td>
                  <td className="py-4 px-6">{job.job.disability}</td>
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
      <EnrolledJobs supabaseClient={supabase}>
        <Auth supabaseClient={supabase} />
      </EnrolledJobs>
    </Auth.UserContextProvider>
  );
}
