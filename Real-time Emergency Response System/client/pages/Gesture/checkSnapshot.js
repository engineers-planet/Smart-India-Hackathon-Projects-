import { useRef } from 'react';
import Webcam from 'react-webcam';

function checkSnapshot() {
  const webcamRef = useRef(null);
  function checkLogin() {
    // Check the snapshot from the database.
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
          Login through face recognition
        </h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 pb-10">
          ( The snapshot taken will be checked with the one already present into
          the database )
        </p>
        <Webcam class="rounded-lg border" ref={webcamRef} />
        <button
          type="button"
          class="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => {
            checkLogin();
          }}
        >
          Take a snapshot
        </button>
      </div>
    </div>
  );
}

export default checkSnapshot;
