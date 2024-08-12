import { Auth } from '@supabase/ui';
import { supabase } from '../../utils/supabaseClient';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Job = () => {
  const router = useRouter();
  const { user } = Auth.useUser();
  const [applications, setApplications] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getApplications = async () => {
    const query = JSON.stringify({
      query: `query MyQuery {
  job(where: {company_id: {_eq: "${user.id}"}}) {
    applications(where: {status: {_eq: 0}, _and: {job_id: {_eq: "${router.query.id}"}}}) {
      id
      job_id
      profile {
        id
        first_name
        last_name
      }
      status
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
    setApplications(responseJson.data.job[0].applications);
    setIsLoading(false);
  };

  useEffect(() => {
    getApplications();
  }, []);

  const accept = async (id) => {
    const query = JSON.stringify({
      query: `mutation MyMutation {
  update_application(where: {id: {_eq: "${id}"}}, _set: {status: 1}) {
    returning {
      id
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
  };

  const reject = async (id) => {
    const query = JSON.stringify({
      query: `mutation MyMutation {
  update_application(where: {id: {_eq: "${id}"}}, _set: {status: 2}) {
    returning {
      id
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
  };

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
                Applicant name
              </th>
              <th scope="col" className="py-3 px-6">
                View Resume
              </th>
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => {
              return (
                <tr
                  key={application.id}
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {`${application.profile.first_name} ${application.profile.last_name}`}
                  </th>
                  <td className="py-4 px-6">
                    <a
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      href={`https://rymsimuithtpkvfhmrtf.supabase.co/storage/v1/object/public/resume/public/${application.profile.id}.pdf`}
                      target="_blank"
                    >
                      View Resume
                    </a>
                  </td>
                  <td className="py-4 px-6">
                    <p
                      onClick={() => {
                        if (application.status === 0) {
                          application.status = 1;
                          accept(application.id);
                        }
                      }}
                      className={`font-medium text-blue-600 dark:text-blue-500 hover:underline ${
                        application.status !== 0
                          ? 'cursor-not-allowed'
                          : 'cursor-pointer'
                      }`}
                    >
                      Select <br />
                    </p>
                    <p
                      onClick={() => {
                        if (application.status === 0) {
                          application.status = 2;
                          reject(application.id);
                        }
                      }}
                      className={`font-medium text-blue-600 dark:text-blue-500 hover:underline ${
                        application.status !== 0
                          ? 'cursor-not-allowed'
                          : 'cursor-pointer'
                      }`}
                    >
                      Reject
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function logi() {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Job supabaseClient={supabase}>
        <Auth supabaseClient={supabase} />
      </Job>
    </Auth.UserContextProvider>
  );
}
