import { useEffect, useState } from 'react';
function PopUpModalConfirm(props) {
  const [info, setInfo] = useState({});
  const [description, setDescription] = useState('');
  const getInfo = async () => {
    const query = JSON.stringify({
      query: `query MyQuery {
  beneficiary(where: {scheme_id: {_eq: "${props.id}"}}) {
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

    const response = await fetch('https://reachout-sih.hasura.app/v1/graphql', {
      headers: {
        'content-type': 'application/json',
        'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
      },
      method: 'POST',
      body: query,
    });

    const responseJson = await response.json();
    console.log('Response------------>');
    console.log(responseJson.data.beneficiary);
    setInfo(responseJson.data.beneficiary);
  };
  useEffect(() => {
    getInfo();
  }, []);
  if (info[0] == undefined || info[0].status === undefined) {
    return <div></div>;
  }
  if (info[0].status === 1 || info[0].status === 2) {
    return (
      <div className="floating-popup">
        <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Invalid Operation
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {info[0].status === 1
                ? 'You have already accepted this application and you cannot undo the operation'
                : 'You have already rejected this application and you cannot undo the operation'}
            </p>
            <p
              className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
              onClick={() => {
                props.change_modal_state();
              }}
            >
              Close
            </p>
          </div>
        </div>
      </div>
    );
  } else if (props.accrej === 'Approve') {
    return (
      <div className="floating-popup">
        <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Acceptance confirmation
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Are you sure that you want to accept this application for this
              scheme.
            </p>
            <div>
              <input
                type="text"
                id="first_name"
                class="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Add description if you want"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                required
              />
            </div>
            <p
              className="m-2 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
              onClick={() => {
                props.accept(props.uuid, description);
                props.change_modal_state();
              }}
            >
              Confirm
            </p>
            <p
              className="m-2 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
              onClick={() => {
                props.change_modal_state();
              }}
            >
              Cancel
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="floating-popup">
        <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Rejection confirmation
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Are you sure that you want to reject this application for this
              scheme.
            </p>
            <div>
              <input
                type="text"
                id="first_name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Add description if you want"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                required
              />
            </div>
            <p
              className="m-2 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
              onClick={() => {
                props.reject(props.uuid, description);
                props.change_modal_state();
              }}
            >
              Confirm
            </p>
            <p
              className="m-2 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
              onClick={() => {
                props.change_modal_state();
              }}
            >
              Cancel
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default PopUpModalConfirm;
