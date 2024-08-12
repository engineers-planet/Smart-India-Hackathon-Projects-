import Router from 'next/router';
import { Auth, Typography, Button } from '@supabase/ui';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabaseClient';
import { useState, useEffect } from 'react';

const Home = (props) => {
  // const [user, setUser] = useState('')
  const { user } = Auth.useUser();
  console.log(user);
  const router = useRouter();
  const [type, setType] = useState(null);
  const [token, setToken] = useState('');
  // useEffect(() => {
  //   setTimeout(() => {
  //     setToken(localStorage.getItem('supabase.auth.token'));
  //   }, 100);
  // }, []);\

  if (user) {
    router.push(
      {
        pathname: '/profile',
        query: { type },
      },
      'profile',
    );
  }

  // return (
  //   <div classNameName="lg:p-20 flex justify-center items-center my-10 lg:my-0">
  //     <Typography.Text>Signed in: {user.email}</Typography.Text>
  //     <Button block onClick={() => props.supabaseClient.auth.signOut()}>
  //       Sign out
  //     </Button>
  //   </div>
  // );
  return (
    <section className="lg:p-20 flex-col items-center my-10 lg:my-0">
      <div>
        <h1 className="mb-4 font-semibold text-gray-900 dark:text-white text-center">
          Login As
        </h1>

        <div className="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
          <input
            id="bordered-radio-1"
            type="radio"
            name="bordered-radio"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            onChange={() => {
              console.log('user');
              localStorage.setItem('accessLevel', 'user');
              setType('user');
            }}
          />
          <label
            for="bordered-radio-1"
            className="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            User
          </label>
        </div>
        <div className="flex items-center pl-4 rounded border border-gray-200 dark:border-gray-700">
          <input
            id="bordered-radio-2"
            type="radio"
            name="bordered-radio"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600"
            onChange={() => {
              console.log('company');
              localStorage.setItem('accessLevel', 'company');
              setType('company');
            }}
          />
          <label
            for="bordered-radio-2"
            className="py-4 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Company
          </label>
        </div>
      </div>

      <article>{props.children}</article>
    </section>
  );
};

export default function logi() {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Home supabaseClient={supabase}>
        <Auth supabaseClient={supabase} />
      </Home>
    </Auth.UserContextProvider>
  );
}
