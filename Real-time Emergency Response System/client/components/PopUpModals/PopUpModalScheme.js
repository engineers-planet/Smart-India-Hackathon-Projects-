function PopUpModalScheme(props) {
  console.log(props.selected);

  const apply_for_scheme = async () => {
    const query = JSON.stringify({
      query: `
      mutation MyMutation {
        insert_beneficiary(objects: {profile_id: "${props.user.id}", scheme_id: "${props.selected.id}", status: "0"}){
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
    props.setP(true);
    props.func();
  };

  if (props.registered) {
    return (
      <div className="floating-popup">
        <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                You have already applied for this scheme.
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Once You have already applied for the scheme, you cannot again
              apply for it. Kindly wait for the government officials to respond
              to your application.
            </p>
            <p
              className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
              onClick={() => {
                props.func();
              }}
            >
              Close
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
                {props.selected.admin.name}
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {props.selected.description}
            </p>
            <p
              className="m-2 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
              onClick={() => {
                apply_for_scheme();
              }}
            >
              Confirm
            </p>
            <p
              className="m-2 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer"
              onClick={() => {
                props.func();
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

export default PopUpModalScheme;
