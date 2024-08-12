import { useState, useEffect } from 'react';
import { Auth, IconOctagon } from '@supabase/ui';
import { supabase } from '../../utils/supabaseClient';
import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';
import { useDropzone } from 'react-dropzone';

function UserProfile({ user }) {
  const [edit, setEdit] = useState(false);
  const [newUser, setNewUser] = useState(false);
  const [firstName, setFirstName] = useState(''); //
  const [lastName, setLastName] = useState(''); //
  const [phone, setPhone] = useState(8888888888); //
  const [disabilityType, setDisabilityType] = useState(''); //
  const [severity, setSeverity] = useState(''); //
  const [age, setAge] = useState(18);
  const [aadhar, setAadhar] = useState(888888888888); //
  const [disability, setDisability] = useState(''); //
  const [location, setLocation] = useState(''); //
  const [qualifications, setQualifications] = useState('');
  const [publicURL, setPublicURL] = useState(null);
  const [resumeURL, setResumeURL] = useState(null);

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
  profile(where: {id: {_eq: "${user.id}"}}) {
    id
    aadhar
    age
    disability
    disability_type
    first_name
    last_name
    mobile
    place
    qualifications
    severity
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
    if (responseJson.data.profile.length !== 0) {
      const u = responseJson.data.profile[0];
      setFirstName(u.first_name);
      setLastName(u.last_name);
      setPhone(u.mobile);
      setDisability(u.disability);
      setSeverity(u.severity);
      setAadhar(u.aadhar);
      setLocation(u.place);
      setDisabilityType(u.disability_type);
      setQualifications(u.qualifications);

      const { data, error: errori } = await supabase.storage
        .from('certificate')
        .download(`public/${user.id}.pdf`);

      if (!errori) {
        const { publicURL: publicurl, error } = supabase.storage
          .from('certificate')
          .getPublicUrl(`public/${user.id}.pdf`);

        if (!error) {
          console.log(publicurl);
          setPublicURL(publicurl);
        }
      }

      const { data: dataj, error: errorj } = await supabase.storage
        .from('resume')
        .download(`public/${user.id}.pdf`);

      if (!errorj) {
        const { publicURL: resumeurl, error: error1 } = supabase.storage
          .from('resume')
          .getPublicUrl(`public/${user.id}.pdf`);

        if (!error1) {
          console.log(resumeurl);
          setResumeURL(resumeurl);
        }
      }
    } else {
      setNewUser(true);
      setEdit(true);
    }
  };

  useEffect(() => {
    //fetch the data from database.
    //set the values of the state variables.
    setupUser();
    speak({
      text: 'Do you want to enable voice recognition for filling form. Speak yes or no.',
    });
  }, []);

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
      .from('certificate')
      .upload(`public/${user.id}.pdf`, cfktFile, {
        cacheControl: '3600',
        upsert: false,
      });
    console.log(data);
    console.log(error);
  }

  async function fileSelectedHandler2(event) {
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
      .from('resume')
      .upload(`public/${user.id}.pdf`, cfktFile, {
        cacheControl: '3600',
        upsert: false,
      });
    console.log(data);
    console.log(error);
  }

  const submitForm = async () => {
    let query;
    if (newUser) {
      query = JSON.stringify({
        query: `mutation MyMutation {
        insert_profile(objects: {aadhar: "${aadhar}", age: "${age}", disability: "${disability}", disability_type: "${disabilityType}", first_name: "${firstName}", last_name: "${lastName}", mobile: "${phone}", place: "${location}", qualifications: "${qualifications}", severity: "${severity}", id: "${user.id}"}) {
          returning {
            id
          }
        }
      }
      `,
      });
      setNewUser(false);
    } else {
      query = JSON.stringify({
        query: `mutation MyMutation {
        update_profile(where: {id: {_eq: "${user.id}"}}, _set: {aadhar: "${aadhar}", age: "${age}", disability: "${disability}", disability_type: "${disabilityType}", first_name: "${firstName}", last_name: "${lastName}", mobile: "${phone}", place: "${location}", qualifications: "${qualifications}", severity: ${severity}}) {
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
      const obj = {
        firstName,
        lastName,
        phone,
        disability,
        severity,
        aadhar,
        disabilityType,
        location,
      };
      console.log(obj);
      //submit the changes made to the database.
      submitForm();
    } else {
      setEdit(true);
    }
  }

  //Speech recognition part.
  const [speech, setSpeech] = useState(true);
  const [focusValue, setFocusValue] = useState('');
  const [value, setValue] = useState(
    "Reach out works for the  society's development",
  );
  const { speak } = useSpeechSynthesis();
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      if (focusValue === 'firstname') {
        setFirstName(result);
      } else if (focusValue === 'lastname') {
        setLastName(result);
      } else if (focusValue === 'phonenumber') {
        setPhone(result);
      } else if (focusValue === 'aadhar') {
        setAadhar(result);
      } else if (focusValue === 'age') {
        setAge(result);
      } else if (focusValue === 'severity') {
        setSeverity(result);
      } else if (focusValue === 'location') {
        setLocation(result);
      } else if (focusValue === 'disability') {
        setDisability(result);
      } else if (focusValue === 'disabilitytype') {
        setDisabilityType(result);
      } else if (focusValue === 'severity') {
        setSeverity(result);
      } else if (focusValue === 'qualifications') {
        setQualifications(result);
      }
    },
  });
  function voice(e) {
    if (e.keyCode == 45) {
      console.log('listening started');
      listen();
    } else if (e.keyCode == 27) {
      console.log('listening stopped');
      stop();
    } else if (e.keyCode === 46) {
      if (focusValue === 'firstname') {
        setFirstName('');
      } else if (focusValue === 'lastname') {
        setLastName('');
      } else if (focusValue === 'phonenumber') {
        setPhone('');
      } else if (focusValue === 'aadhar') {
        setAadhar('');
      } else if (focusValue === 'age') {
        setAge('');
      } else if (focusValue === 'severity') {
        setSeverity('');
      } else if (focusValue === 'location') {
        setLocation('');
      } else if (focusValue === 'disability') {
        setDisability('');
      } else if (focusValue === 'disabilitytype') {
        setDisabilityType('');
      } else if (focusValue === 'severity') {
        setSeverity('');
      } else if (focusValue === 'qualifications') {
        setQualifications('');
      }
    }
  }

  return (
    <div>
      <div className="mt-10 sm:mt-0 p-10">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-3xl font-medium leading-6 text-gray-900 dark:text-white">
                Personal Information
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Use a permanent address where you can receive mail.
              </p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2 ">
            <form className="shadow sm:rounded-md sm:overflow-hidden p-5 border-gray-300 dark:bg-zinc-800">
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label
                    for="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Harshad"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    disabled={!edit}
                    onFocus={() => {
                      speech &&
                        speak({
                          text: 'Enter your first name. Press Insert to start and escape to stop the input.',
                        });
                      setFocusValue('firstname');
                    }}
                    onKeyDown={(e) => {
                      speech && voice(e);
                    }}
                    required
                  />
                </div>
                <div>
                  <label
                    for="last_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Mehta"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    disabled={!edit}
                    onFocus={() => {
                      speech &&
                        speak({
                          text: 'Enter your last name. Press Insert to start and escape to stop the input.',
                        });
                      setFocusValue('lastname');
                    }}
                    onKeyDown={(e) => {
                      speech && voice(e);
                    }}
                    required
                  />
                </div>
                <div>
                  <label
                    for="phone"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Phone number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="8888888888"
                    pattern="[0-9]{10}"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    disabled={!edit}
                    onFocus={() => {
                      speech &&
                        speak({
                          text: 'Enter your phone number. Press Insert to start and escape to stop the input.',
                        });
                      setFocusValue('phonenumber');
                    }}
                    onKeyDown={(e) => {
                      speech && voice(e);
                    }}
                    required
                  />
                </div>
                <div>
                  <label
                    for="default"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                  >
                    Disability Type
                  </label>
                  <select
                    id="default"
                    className="bg-gray-50 border border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={disabilityType}
                    onChange={(e) => {
                      setDisabilityType(e.target.value);
                    }}
                    disabled={!edit}
                    onFocus={() => {
                      speech &&
                        speak({
                          text: 'Select your disability type. Press enter and use down arrow key for selection and then press enter',
                        });
                      setFocusValue('disabilitytype');
                    }}
                  >
                    <option selected>Choose appropriate option</option>
                    <option value="Physical">Physical</option>
                    <option value="Sensory">Sensory</option>
                    <option value="Mental">Mental</option>
                    <option value="Intellectual">Intellectual</option>
                  </select>
                </div>
              </div>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label
                    for="severity"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Severity of corresponding disability (Out of 10)
                  </label>
                  <input
                    type="number"
                    id="severity"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    value={severity}
                    onChange={(e) => {
                      setSeverity(e.target.value);
                    }}
                    disabled={!edit}
                    onFocus={() => {
                      speech &&
                        speak({
                          text: 'Enter your severity of disability out of 10. Press Insert to start and escape to stop the input.',
                        });
                      setFocusValue('severity');
                    }}
                    onKeyDown={(e) => {
                      speech && voice(e);
                    }}
                    required
                  />
                </div>
                <div>
                  <label
                    for="age"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Age
                  </label>
                  <input
                    type="number"
                    id="age"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder=""
                    value={age}
                    onChange={(e) => {
                      setAge(e.target.value);
                    }}
                    disabled={!edit}
                    onFocus={() => {
                      speech &&
                        speak({
                          text: 'Enter your age. Press Insert to start and escape to stop the input.',
                        });
                      setFocusValue('age');
                    }}
                    onKeyDown={(e) => {
                      speech && voice(e);
                    }}
                    required
                  />
                </div>
              </div>
              <div className="mb-6">
                <label
                  for="aadhar_number"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Aadhar number
                </label>
                <input
                  type="text"
                  id="aadhar_number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="8888 8888 8888"
                  value={aadhar}
                  onChange={(e) => {
                    setAadhar(e.target.value);
                  }}
                  disabled={!edit}
                  onFocus={() => {
                    speech &&
                      speak({
                        text: 'Enter your aadhar number. Press Insert to start and escape to stop the input.',
                      });
                    setFocusValue('aadhar');
                  }}
                  onKeyDown={(e) => {
                    speech && voice(e);
                  }}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  for="disability"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Disability
                </label>
                <input
                  type="text"
                  id="disability"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Physical"
                  value={disability}
                  onChange={(e) => {
                    setDisability(e.target.value);
                  }}
                  disabled={!edit}
                  onFocus={() => {
                    speech &&
                      speak({
                        text: 'Enter the specific disability you have. Press Insert to start and escape to stop the input.',
                      });
                    setFocusValue('disability');
                  }}
                  onKeyDown={(e) => {
                    speech && voice(e);
                  }}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  for="location"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Address of the applicant (Location will cover the jobs within
                  50kms)
                </label>
                <input
                  type="text"
                  id="location"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Mumbai"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                  }}
                  disabled={!edit}
                  onFocus={() => {
                    speech &&
                      speak({
                        text: 'Enter the location where you stay. Press Insert to start and escape to stop the input.',
                      });
                    setFocusValue('location');
                  }}
                  onKeyDown={(e) => {
                    speech && voice(e);
                  }}
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  for="qualifications"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Qualifications
                </label>
                <input
                  type="text"
                  id="qualifications"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-zinc-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="10th Pass"
                  value={qualifications}
                  onChange={(e) => {
                    setQualifications(e.target.value);
                  }}
                  disabled={!edit}
                  onFocus={() => {
                    speech &&
                      speak({
                        text: 'Enter your one best and highest qualification degree. Press Insert to start and escape to stop the input.',
                      });
                    setFocusValue('qualifications');
                  }}
                  onKeyDown={(e) => {
                    speech && voice(e);
                  }}
                  required
                />
              </div>
              {!publicURL ? (
                <div {...getRootProps({ className: 'dropzone' })}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white">
                    {' '}
                    Upload appropriate document that proves your disability (Eg.
                    Disability Certificate){' '}
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
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            {...getInputProps()}
                            onChange={fileSelectedHandler}
                            onFocus={() => {
                              speech &&
                                speak({
                                  text: 'Upload an appropriate document that proves your disability like your disability certificate',
                                });
                            }}
                            disabled={!edit}
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
                    Disability Certificate Uploaded
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
              {!resumeURL ? (
                <div {...getRootProps({ className: 'dropzone' })}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white pt-5">
                    {' '}
                    Upload your resume{' '}
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
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            {...getInputProps()}
                            onChange={fileSelectedHandler2}
                            disabled={!edit}
                            onFocus={() => {
                              speech &&
                                speak({
                                  text: 'Upload here your resume',
                                });
                            }}
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
                    Resume Uploaded
                  </h2>
                  <object
                    width="100%"
                    height="400"
                    data={resumeURL}
                    type="application/pdf"
                  >
                    {' '}
                  </object>
                </div>
              )}
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 dark:bg-zinc-800">
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={(e) => {
                    formResponse(e);
                  }}
                  onFocus={() => {
                    speech &&
                      edit &&
                      speak({
                        text: 'Are you sure you want to save the changes you made, If yes then press enter.',
                      });
                    speech &&
                      !edit &&
                      speak({
                        text: 'Do you want to edit your profile, If yes then press enter.',
                      });
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
      <UserProfile supabaseClient={supabase} user={user}>
        <Auth supabaseClient={supabase} />
      </UserProfile>
    </Auth.UserContextProvider>
  );
}
