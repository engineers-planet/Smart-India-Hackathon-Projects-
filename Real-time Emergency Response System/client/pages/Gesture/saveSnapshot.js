import { useState, useRef, useEffect } from 'react';
import Webcam from 'react-webcam';

function saveSnapshot() {
  const [clicked, setClicked] = useState(false);
  const webcamRef = useRef(null);

  function retake() {
    // Reset the cam and retake the photo.
    setClicked(!clicked);
  }

  function confirm() {
    //Save the snapshot into the database and then redirect to home page.
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      <div class="m-5 p-6 max-w-lg bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <h3 className="text-3xl font-medium leading-6 text-gray-900 dark:text-white py-2">
          Snapshot
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 pb-10">
          ( The snapshot taken will be saved. So when you try to login through
          the website you can use face recognition in case you forget your
          password )
        </p>
        <Webcam class="rounded-lg border" ref={webcamRef} />
        {!clicked && (
          <button
            type="button"
            class="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => {
              setClicked(!clicked);
            }}
          >
            Take a snapshot
          </button>
        )}
        {clicked && (
          <div>
            <button
              type="button"
              class="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={() => {
                confirm();
              }}
            >
              Confirm and save
            </button>
            <button
              type="button"
              class="mt-5 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              onClick={() => {
                retake();
              }}
            >
              Delete and retake
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default saveSnapshot;
