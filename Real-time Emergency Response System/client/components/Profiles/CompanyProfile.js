import { useState, useEffect } from 'react';
import { Auth } from '@supabase/ui';
import { supabase } from '../../utils/supabaseClient';
import { useDropzone } from 'react-dropzone';

function CompanyProfile({ user }) {
  const [edit, setEdit] = useState(false);
  const [edit2, setEdit2] = useState(false);
  const [newCompany, setNewCompany] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [url, setUrl] = useState('');
  const [phone, setPhone] = useState(8888888888);
  const [date, setDate] = useState('');
  const [head, setHead] = useState('');
  const [gstin, setGstin] = useState('');
  const [about, setAbout] = useState();
  const [publicURL, setPublicURL] = useState('');
  const [base64, setBase64] = useState();

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({});

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const setupUser = async () => {
    console.log(user.id);
    const query = JSON.stringify({
      query: `query MyQuery {
  company(where: {id: {_eq: "${user.id}"}}) {
    gstin
    head
    id
    mobile
    name
    website
    about
    establishment_date
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
    setEmail(user.email);

    if (responseJson.data.company.length !== 0) {
      const u = responseJson.data.company[0];
      setGstin(u.gstin);
      setHead(u.head);
      setPhone(u.mobile);
      setName(u.name);
      setUrl(u.website);
      setAbout(u.about);
      setDate(u.establishment_date);

      const { data, error: error1 } = await supabase.storage
        .from('association')
        .download(`public/${user.id}.pdf`);

      if (!error1) {
        const { publicURL: publicurl, error } = supabase.storage
          .from('association')
          .getPublicUrl(`public/${user.id}.pdf`);

        console.log(error);

        if (!error) {
          console.log(publicurl);
          setPublicURL(publicurl);
        }
      }
    } else {
      setNewCompany(true);
      setEdit(true);
      setEdit2(true);
    }
  };

  useEffect(() => {
    //fetch the data from database.
    //set the values of the state variables.
    setupUser();
  }, []);

  const submitForm = async () => {
    let query;
    if (newCompany) {
      query = JSON.stringify({
        query: `mutation MyMutation {
  insert_company(objects: {id: "${user.id}", head: "${head}", about: "${about}", gstin: "${gstin}", establishment_date: "${date}", mobile: "${phone}", name: "${name}", website: "${url}"}) {
    returning {
      id
    }
  }
}
`,
      });
    } else {
      query = JSON.stringify({
        query: `mutation MyMutation {
  update_company(where: {id: {_eq: "${user.id}"}}, _set: {about: "${about}", establishment_date: "${date}", gstin: "${gstin}", head: "${head}", mobile: "${phone}", name: "${name}", website: "${url}"}) {
    returning {
      id
    }
  }
}
`,
      });
    }
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
  };

  function formResponse(e) {
    e.preventDefault();
    if (edit) {
      setEdit(false);
      // Save Changes into the database;
      const obj = {
        name,
        email,
        url,
        phone,
        date,
        head,
        gstin,
        about,
      };
      console.log(obj);
      //submit the changes made to the database.
      submitForm();
    } else {
      setEdit(true);
    }
  }
  function formResponse2(e) {
    e.preventDefault();
    if (edit2) {
      setEdit2(false);
    } else {
      setEdit2(true);
    }
  }

  async function fileSelectedHandler(event) {
    var cfktFile = event.target.files[0];
    // var reader = new FileReader();
    // reader.onload = function (FileLoadEvent) {
    //   var srcData = FileLoadEvent.target.result;
    //   setBase64(srcData);
    //   console.log(base64);
    // };
    // reader.readAsDataURL(file);
    console.log(event.target);
    const { data, error } = await supabase.storage
      .from('association')
      .upload(`public/${user.id}.pdf`, cfktFile, {
        cacheControl: '3600',
        upsert: false,
      });
    console.log(data);
    console.log(error);
  }

  return (
    <div>
      <div className="p-10">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h1 className="text-3xl font-medium leading-6 text-gray-900 dark:text-white p-x-2">
                Profile
              </h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6 dark:bg-zinc-800">
                  {!publicURL ? (
                    <div {...getRootProps({ className: 'dropzone' })}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-white">
                        {' '}
                        Upload Article of association of the company{' '}
                      </label>
                      <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                        <div className="space-y-1 text-center">
                          <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                          <div className="flex text-sm text-gray-600">
                            <label
                              for="file-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="file-upload"
                                {...getInputProps()}
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                onChange={fileSelectedHandler}
                                disabled={!edit2}
                              />
                            </label>
                            <p className="pl-1">
                              {!isDragActive
                                ? 'or drag and drop'
                                : 'release to drop'}
                            </p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                          <aside className="text-xs text-gray-500">
                            <ul>{files}</ul>
                          </aside>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h2 className="block text-sm font-medium text-gray-700 dark:text-white my-4">
                        Article of Association for Company Uploaded
                      </h2>
                      <object
                        width="100%"
                        height="400"
                        data={publicURL}
                        type="application/pdf"
                      >
                        {' '}
                      </object>
                    </div>
                  )}
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 dark:bg-zinc-800">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={formResponse2}
                  >
                    {edit2 ? 'Save' : 'Edit'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200"></div>
        </div>
      </div>
      <div className="mt-10 sm:mt-0 p-10">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-3xl font-medium leading-6 text-gray-900 dark:text-white">
                Company Information
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                ( This will be the details shown to the other users and
                companies )
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2 ">
            <form className="shadow sm:rounded-md sm:overflow-hidden p-5 border-gray-300 dark:bg-zinc-800">
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label
                    for="company_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Company name
                  </label>
                  <input
                    type="text"
                    id="company_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Google"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    disabled={!edit}
                    required
                  />
                </div>
                <div>
                  <label
                    for="company_email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Company email
                  </label>
                  <input
                    type="email"
                    id="company_email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="google@gmail.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    disabled={!edit}
                    required
                  />
                </div>
                <div>
                  <label
                    for="company_url"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Company's website URL
                  </label>
                  <input
                    type="url"
                    id="company"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="google.com"
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                    }}
                    disabled={!edit}
                    required
                  />
                </div>
                <div>
                  <label
                    for="contact_number"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Company's contact number
                  </label>
                  <input
                    type="tel"
                    id="contact_number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="8888888888"
                    pattern="[0-9]{10}"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    disabled={!edit}
                    required
                  />
                </div>
                <div>
                  <label
                    for="establishment_date"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Establishment date
                  </label>
                  <input
                    type="date"
                    id="website"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="flowbite.com"
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                    }}
                    disabled={!edit}
                    required
                  />
                </div>
                <div>
                  <label
                    for="head"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Company Head
                  </label>
                  <input
                    type="text"
                    id="head"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Elon Musk"
                    value={head}
                    onChange={(e) => {
                      setHead(e.target.value);
                    }}
                    disabled={!edit}
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  for="about"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  {' '}
                  About{' '}
                </label>
                <div className="mt-1">
                  <textarea
                    id="about"
                    name="about"
                    rows="3"
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
                    placeholder="About company"
                    value={about}
                    onChange={(e) => {
                      setAbout(e.target.value);
                    }}
                    disabled={!edit}
                  ></textarea>
                </div>
                <br />
              </div>
              <div className="mb-6">
                <label
                  for="gstin"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Company's GSTIN Number (15 Digits)
                </label>
                <input
                  type="text"
                  id="gstin"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  value={gstin}
                  onChange={(e) => {
                    setGstin(e.target.value);
                  }}
                  disabled={!edit}
                  required
                />
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 dark:bg-zinc-800">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={(e) => {
                    formResponse(e);
                  }}
                >
                  {edit ? 'Save' : 'Edit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function logi({ user }) {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <CompanyProfile supabaseClient={supabase} user={user}>
        <Auth supabaseClient={supabase} />
      </CompanyProfile>
    </Auth.UserContextProvider>
  );
}
