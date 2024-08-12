import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PopUpModalConfirm from '../../components/PopUpModals/PopUpModalConfirm';
import { PieChart, Tooltip, Pie, Legend, Cell } from 'recharts';

const createdScheme = () => {
  const COLORS = ['#77c878', '#8884d8', '#82ca9d'];

  const router = useRouter();
  const [applications, setApplications] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [uuid, setUuid] = useState('');
  const [accrej, setAccrej] = useState('');
  const [raw, setRaw] = useState([]);
  const [disabilityType, setDisabilityType] = useState([]);

  function change_modal_state() {
    setModal(!modal);
  }

  const getBeneficiaries = async () => {
    const query = JSON.stringify({
      query: `query MyQuery {
  beneficiary(where: {scheme_id: {_eq: "${router.query.id}"}}) {
    id
    justification
    scheme_id
    profile_id
    status
    profile {
      last_name
      first_name
      aadhar
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
    setApplications(responseJson.data.beneficiary);
    setIsLoading(false);
  };

  const getStats = async () => {
    const query = JSON.stringify({
      query: `query MyQuery {
  beneficiary(where: {scheme_id: {_eq: "${router.query.id}"}}) {
    status
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
    const res = responseJson.data.beneficiary;
    let freqMap = {};
    console.log(res);
    for (const ben of res) {
      if (!freqMap[ben.status]) {
        freqMap[ben.status] = 0;
      }
      freqMap[ben.status] += 1;
    }
    let arr = [];
    for (const [key, value] of Object.entries(freqMap)) {
      let status;
      if (key == 0) {
        status = 'Enrolled';
      } else if (key == 1) {
        status = 'Accepted';
      } else {
        status = 'Rejected';
      }
      arr.push({ status: status, value: value });
    }
    console.log(arr);
    setRaw(arr);
  };

  const getDisabilityTypes = async () => {
    const query = JSON.stringify({
      query: `query MyQuery {
  beneficiary(where: {scheme_id: {_eq: "${router.query.id}"}}) {
    profile {
      disability_type
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
    const res = responseJson.data.beneficiary;

    let freqMap = {};
    console.log(res);
    for (const ben of res) {
      if (!freqMap[ben.profile.disability_type]) {
        freqMap[ben.profile.disability_type] = 0;
      }
      freqMap[ben.profile.disability_type] += 1;
    }

    let arr = [];
    for (const [key, value] of Object.entries(freqMap)) {
      arr.push({ type: key, value: value });
    }
    console.log(arr);
    setDisabilityType(arr);
  };

  useEffect(() => {
    getBeneficiaries();
    getStats();
    getDisabilityTypes();
  }, []);

  const accept = async (id, description) => {
    console.log('Run accept');
    const query = JSON.stringify({
      query: `mutation MyMutation {
  update_beneficiary(where: {id: {_eq: "${id}"}}, _set: {status: 1, justification: "${description}"}) {
    returning {
      id
      profile {
        mobile
      }
      scheme {
        name
        admin {
          name
        }
      }
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

    const phone =
      '+91' +
      String(responseJson.data.update_beneficiary.returning[0].profile.mobile);

    const scheme_name =
      responseJson.data.update_beneficiary.returning[0].scheme.name;

    const admin_name =
      responseJson.data.update_beneficiary.returning[0].scheme.admin.name;

    const msg = `The scheme ${scheme_name} by ${admin_name} you applied for has been approved. Thanks and Regards, ReachOut`;

    const res = await fetch('/api/sendMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone: phone, message: msg }),
    });
    const apiResponse = await res.json();
    console.log(apiResponse);
  };

  const reject = async (id, description) => {
    const query = JSON.stringify({
      query: `mutation MyMutation {
  update_beneficiary(where: {id: {_eq: "${id}"}}, _set: {status: 2, justification: "${description}"}) {
    returning {
      id
      profile {
        mobile
      }
      scheme {
        name
        admin {
          name
        }
      }
      justification
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

    const phone =
      '+91' +
      String(responseJson.data.update_beneficiary.returning[0].profile.mobile);

    const scheme_name =
      responseJson.data.update_beneficiary.returning[0].scheme.name;

    const admin_name =
      responseJson.data.update_beneficiary.returning[0].scheme.admin.name;

    const reason =
      responseJson.data.update_beneficiary.returning[0].justification;

    const msg = `The scheme ${scheme_name} by ${admin_name} you applied for has been rejected. Reason: ${reason}.Thanks and Regards, ReachOut`;

    const res = await fetch('/api/sendMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone: phone, message: msg }),
    });
    const apiResponse = await res.json();
    console.log(apiResponse);
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
                View Documents for Verification
              </th>
              <th scope="col" className="py-3 px-6">
                Aadhar Card Number
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
                      href={`https://rymsimuithtpkvfhmrtf.supabase.co/storage/v1/object/public/certificate/public/${application.profile_id}.pdf`}
                      target="_blank"
                    >
                      View Disability Certificate
                    </a>
                  </td>
                  <td className="py-4 px-6">
                    <p className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {application.profile.aadhar}
                    </p>
                  </td>
                  <td className="py-4 px-6">
                    <p
                      onClick={() => {
                        setUuid(application.id);
                        setAccrej('Approve');
                        setModal(!modal);
                      }}
                      className={`font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer`}
                    >
                      Approve Beneficiary <br />
                    </p>
                    <p
                      onClick={() => {
                        setUuid(application.id);
                        setAccrej('Reject');
                        setModal(!modal);
                      }}
                      className={`font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer`}
                    >
                      Reject
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="flex justify-around">
          <PieChart width={400} height={350}>
            <Pie
              data={raw}
              dataKey="value"
              nameKey="status"
              cx="50%"
              cy="50%"
              label
              legendType="square"
              outerRadius={100}
              fill="#8884d8"
            >
              {raw.map((entry, index) => (
                <Cell fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend></Legend>
            <Tooltip />
          </PieChart>
          <PieChart width={400} height={350}>
            <Pie
              data={disabilityType}
              dataKey="value"
              nameKey="type"
              cx="50%"
              cy="50%"
              label
              legendType="square"
              outerRadius={100}
              fill="#8884d8"
            >
              {raw.map((entry, index) => (
                <Cell fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend></Legend>
            <Tooltip />
          </PieChart>
        </div>
      </div>
      {modal && (
        <PopUpModalConfirm
          id={router.query.id}
          change_modal_state={change_modal_state}
          accept={accept}
          reject={reject}
          accrej={accrej}
          uuid={uuid}
        />
      )}
    </div>
  );
};

export default createdScheme;
