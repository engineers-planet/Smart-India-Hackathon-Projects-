import { useEffect, useState } from 'react';
import Image from 'next/image';

function createJob() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [admin, setAdmin] = useState('');
  console.log(admin);
  const [eligibility, setEligibility] = useState('');
  const insert_scheme = async () => {
    const query = JSON.stringify({
      query: `mutation MyMutation {
  insert_scheme(objects: {admin_id: "${admin}", description:"${description}", eligibility: "${eligibility}", name: "${name}", type: "${type}"}) {
    returning {
      admin_id
    }
  }
}`,
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
  useEffect(() => {
    setAdmin(localStorage.getItem('admin'));
  }, []);
  function createSchemeFunc(e) {
    e.preventDefault();
    const obj = {
      name,
      description,
      type,
      admin,
      eligibility,
    };
    console.log(obj);
    // Add this Scheme into the Database---
    insert_scheme();
  }

  return (
    <div>
      <div className="mt-10 sm:mt-0 p-10">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-2">
            <form className="p-10 bg-gray-200 rounded dark:bg-zinc-900">
              <h3 className="text-3xl font-medium leading-6 text-gray-900 dark:text-white py-2">
                Create schemes
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 pb-5">
                ( The schemes you create will be shown to all the users
                registered on the Reachout's server )
              </p>
              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="text"
                  name="scheme_name"
                  id="scheme_name"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  required
                />
                <label
                  for="scheme_name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Name of the scheme
                </label>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 mb-6 w-full group">
                  <input
                    type="text"
                    name="eligibility"
                    id="eligibility"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={eligibility}
                    onChange={(e) => {
                      setEligibility(e.target.value);
                    }}
                    required
                  />
                  <label
                    for="qualification"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Eligibility criteria to apply for the scheme
                  </label>
                </div>
                <div className="relative z-0 mb-6 w-full group">
                  <input
                    type="text"
                    name="type"
                    id="type"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={type}
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                    required
                  />
                  <label
                    for="qualification"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Type of the scheme
                  </label>
                </div>
              </div>
              <textarea
                id="description"
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Description ..."
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></textarea>
              <button
                type="submit"
                className="mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-3"
                onClick={(e) => createSchemeFunc(e)}
              >
                Submit
              </button>
            </form>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-1 ">
            <div className="px-4 sm:px-0">
              <Image src="/icon-384x384.png" width={400} height={400} />
              <h3 className="text-3xl font-medium leading-6 text-gray-900 dark:text-white px-10">
                ReachOut
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 px-10">
                ( Working towards the betterment of society )
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default createJob;
