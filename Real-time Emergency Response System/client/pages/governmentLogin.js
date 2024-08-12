import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

function governmentLogin() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    localStorage.setItem('accessLevel', 'government');
  }, []);

  const verify = async () => {
    const query = JSON.stringify({
      query: `query MyQuery {
  admin(where: {name: {_eq: "${name}"}, _and: {password: {_eq: "${password}"}}}) {
    name
    id
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
    localStorage.setItem('admin', responseJson.data.admin[0].id);
    router.push('/createdSchemes');
  };

  function loginSubmit(e) {
    e.preventDefault();
    const obj = {
      name,
      password,
    };
    console.log(obj);
    verify();
  }

  return (
    <div>
      <form className="m-10 flex justify-center">
        <div className="grid gap-6 mb-6 w-1/2">
          <div>
            <label
              for="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Ministry of Education"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
          </div>
          <div>
            <label
              for="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="•••••••••"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={(e) => {
              loginSubmit(e);
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default governmentLogin;
