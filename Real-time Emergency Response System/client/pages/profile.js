import { useEffect, useState } from 'react';
import { Auth } from '@supabase/ui';
import { supabase } from '../utils/supabaseClient';
import CompanyProfile from '../components/Profiles/CompanyProfile';
import UserProfile from '../components/Profiles/UserProfile';
import AdminProfile from '../components/Profiles/AdminProfile';

function Profile() {
  const [item, setItem] = useState(null);
  const { user } = Auth.useUser();
  console.log(user);
  useEffect(() => {
    setItem(localStorage.getItem('accessLevel'));
  }, []);

  if (!item) {
    return <h1>Loading...</h1>;
  } else if (item === 'user' && localStorage.getItem('supabase.auth.token')) {
    return (
      <div>
        <UserProfile user={user} />
      </div>
    );
  } else if (
    item === 'company' &&
    localStorage.getItem('supabase.auth.token')
  ) {
    return (
      <div>
        <CompanyProfile user={user} />
      </div>
    );
  } else {
    return (
      <div>
        <AdminProfile user={user} />
      </div>
    );
  }
}

export default function logi() {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Profile supabaseClient={supabase}>
        <Auth supabaseClient={supabase} />
      </Profile>
    </Auth.UserContextProvider>
  );
}
