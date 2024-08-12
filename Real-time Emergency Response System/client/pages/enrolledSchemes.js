import { useState, useEffect } from 'react';
import { Auth } from '@supabase/ui';
import { supabase } from '../utils/supabaseClient';

function EnrolledSchemes() {
  const [enrolledJobs, setEnrolledJobs] = useState([]);
  const [rejectedJobs, setRejectedJobs] = useState([]);
  const [acceptedJobs, setAcceptedJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = Auth.useUser();

  const getEnrolledJobs = async () => {
    const query = JSON.stringify({
      query: `query MyQuery {
  beneficiary(where: {profile_id: {_eq: "${user.id}"}, _and: {status: {_eq: 0}}}) {
    id
    justification
    profile_id
    scheme_id
    status
    scheme {
      admin {
        name
        id
      }
      eligibility
      description
      id
      name
      type
    }
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
    setEnrolledJobs(responseJson.data.beneficiary);
  };

  const getAcceptedJobs = async () => {
    const query = JSON.stringify({
      query: `query MyQuery {
  beneficiary(where: {profile_id: {_eq: "${user.id}"}, _and: {status: {_eq: 1}}}) {
    id
    justification
    profile_id
    scheme_id
    status
    scheme {
      admin {
        name
        id
      }
      eligibility
      description
      id
      name
      type
    }
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
    setAcceptedJobs(responseJson.data.beneficiary);
  };

  const getRejectedJobs = async () => {
    const query = JSON.stringify({
      query: `query MyQuery {
  beneficiary(where: {profile_id: {_eq: "${user.id}"}, _and: {status: {_eq: 2}}}) {
    id
    justification
    profile_id
    scheme_id
    status
    scheme {
      admin {
        name
        id
      }
      eligibility
      description
      id
      name
      type
    }
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
    setRejectedJobs(responseJson.data.beneficiary);
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
            Enrolled Schemes
            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              The below are the list of schemes you have applied. You might have
              got the response of these applications on your email. So please
              check your mail if you haven't.
            </p>
          </caption>
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                Ministry name
              </th>
              <th scope="col" className="py-3 px-6">
                Scheme name
              </th>
              <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                Description
              </th>
              <th scope="col" className="py-3 px-6">
                Eligibility
              </th>
              <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                Type
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
                    {job.scheme.admin.name}
                  </th>
                  <td className="py-4 px-6">{job.scheme.name}</td>
                  <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                    {job.scheme.description}
                  </td>
                  <td className="py-4 px-6">{job.scheme.eligibility}</td>
                  <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                    {job.scheme.type}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 my-10">
          <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            Accepted Schemes
            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              The below are the list of jobs you have been accepted in. Check
              your mail to get in touch with the recruiter for further process.
            </p>
          </caption>
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                Ministry name
              </th>
              <th scope="col" className="py-3 px-6">
                Scheme name
              </th>
              <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                Description
              </th>
              <th scope="col" className="py-3 px-6">
                Eligibility
              </th>
              <th scope="col" className="py-3 px-6">
                Justification
              </th>
              <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                Type
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
                    {job.scheme.admin.name}
                  </th>
                  <td className="py-4 px-6">{job.scheme.name}</td>
                  <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                    {job.scheme.description}
                  </td>
                  <td className="py-4 px-6">{job.scheme.eligibility}</td>
                  <td className="py-4 px-6">{job.justification}</td>
                  <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                    {job.scheme.type}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 my-10">
          <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            Rejected Schemes
            <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
              The below are the list of schemes you have been rejected in.
              Justification for the rejection has been given by the authorities.
            </p>
          </caption>
          <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                Ministry name
              </th>
              <th scope="col" className="py-3 px-6">
                Scheme name
              </th>
              <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                Description
              </th>
              <th scope="col" className="py-3 px-6">
                Eligibility
              </th>
              <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                Type
              </th>
              <th scope="col" className="py-3 px-6 bg-gray-50 dark:bg-gray-800">
                Justification for Rejection
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
                    {job.scheme.admin.name}
                  </th>
                  <td className="py-4 px-6">{job.scheme.name}</td>
                  <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                    {job.scheme.description}
                  </td>
                  <td className="py-4 px-6">{job.scheme.eligibility}</td>
                  <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                    {job.scheme.type}
                  </td>
                  <td className="py-4 px-6 bg-gray-50 dark:bg-gray-800">
                    {job.justification}
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
      <EnrolledSchemes supabaseClient={supabase}>
        <Auth supabaseClient={supabase} />
      </EnrolledSchemes>
    </Auth.UserContextProvider>
  );
}
