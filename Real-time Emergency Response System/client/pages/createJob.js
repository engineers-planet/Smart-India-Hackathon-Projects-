import { useState, useEffect } from 'react';
import Image from 'next/image';

function createJob() {
  const [jobPosition, setJobPosition] = useState('');
  const [salary, setSalary] = useState('');
  const [description, setDescription] = useState('');
  const [qualification, setQualification] = useState('');
  const [sector, setSector] = useState('');
  const [disability, setDisability] = useState('');
  const [location, setLocation] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem('supabase.auth.token'))
      .currentSession.user.id;
    console.log(userId);
    setId(userId);
  }, []);

  const insert_job = async () => {
    const query = JSON.stringify({
      query: `mutation MyMutation {
        insert_job(objects: {company_id: "${id}", description: "${description}", disability: "${disability}", location: "${location}", position: "${jobPosition}", qualification: "${qualification}", salary: "${salary}", sector: "${sector}"}){
          returning {
            company_id
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

  function createJobFunc(e) {
    e.preventDefault();
    // Add this job into the Database---
    insert_job();
  }

  return (
    <div>
      <div className="mt-10 sm:mt-0 p-10">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-2">
            <form className="p-10 bg-gray-200 rounded dark:bg-zinc-900">
              <h3 className="text-3xl font-medium leading-6 text-gray-900 dark:text-white py-2">
                Create Jobs for the needy
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 pb-10">
                ( The jobs you create will be shown to all the users registered
                on the Reachout's server )
              </p>
              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="text"
                  name="job_position"
                  id="job_position"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={jobPosition}
                  onChange={(e) => {
                    setJobPosition(e.target.value);
                  }}
                  required
                />
                <label
                  for="job_position"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Job position
                </label>
              </div>
              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="text"
                  name="salary"
                  id="salary"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={salary}
                  onChange={(e) => {
                    setSalary(e.target.value);
                  }}
                  required
                />
                <label
                  for="salary"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Salary for the above job
                </label>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 mb-6 w-full group">
                  <input
                    type="text"
                    name="job_type"
                    id="job_type"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    required
                  />
                  <label
                    for="job_type"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Description of job offered by the company
                  </label>
                </div>
                <div className="relative z-0 mb-6 w-full group">
                  <input
                    type="text"
                    name="qualification"
                    id="qualification"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={qualification}
                    onChange={(e) => {
                      setQualification(e.target.value);
                    }}
                    required
                  />
                  <label
                    for="qualification"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Qualification required to be eligible for Job
                  </label>
                </div>
              </div>
              <div className="grid md:grid-cols-2 md:gap-6">
                <div className="relative z-0 mb-6 w-full group">
                  <input
                    type="text"
                    name="sector"
                    id="sector"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={sector}
                    onChange={(e) => {
                      setSector(e.target.value);
                    }}
                    required
                  />
                  <label
                    for="sector"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Sector of job offered
                  </label>
                </div>
                <div className="relative z-0 mb-6 w-full group">
                  <input
                    type="text"
                    name="disability_type"
                    id="disability_type"
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                    value={disability}
                    onChange={(e) => {
                      setDisability(e.target.value);
                    }}
                    required
                  />
                  <label
                    for="disability_type"
                    className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Type of disability allowed
                  </label>
                </div>
              </div>
              <div className="relative z-0 mb-6 w-full group">
                <input
                  type="text"
                  name="location"
                  id="location"
                  className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                  required
                />
                <label
                  for="location"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Location of the job
                </label>
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-3"
                onClick={(e) => createJobFunc(e)}
              >
                Submit
              </button>
            </form>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-1 ">
            <div className="px-4 sm:px-0">
              <Image src="/icon-384x384.png" width={450} height={450} />
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
