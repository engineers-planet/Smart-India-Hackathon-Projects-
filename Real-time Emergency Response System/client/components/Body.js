import Image from 'next/image';
import Link from 'next/link';
import Slideshow from './SlideShow';
import Flowchart from './Flowcharts/Flowchart';
import CompanyFlowchart from './Flowcharts/CompanyFlowchart';
import GovtFlowchart from './Flowcharts/GovtFlowchart'
import { useState, useEffect } from 'react';

function Body() {
  const [level, setLevel] = useState('');

  useEffect(() => {
    setLevel(localStorage.getItem('accessLevel'));
  }, []);

  return (
    <div class="bg-transparent">
      <div class="w-full h-full">
        <Slideshow />
      </div>
      <section class="bg-gray-100 text-zinc-900 dark:text-gray-400 dark:bg-gray-900 body-font">
        <div class="w-100vw h-100vh">
          {level === 'user' && <Flowchart />}
          {level === 'company' && <CompanyFlowchart />}
          {level === 'government' && <GovtFlowchart />}
        </div>
      </section>

      <section class="text-zinc-900 bg-gray-100 dark:text-gray-400 dark:bg-gray-900 body-font">
        <div class="container px-5 py-2  mx-auto">
          <div class="grid grid-cols-1 divide-y mb-8">
            <div></div>
            <div></div>
          </div>
          <div class="flex flex-col text-center w-full mb-7  ">
            <h1 class="sm:text-4xl text-4xl font-medium title-font mb-4 dark:text-white text-zinc-900">
              Features of ReachOut
            </h1>
            <p class="lg:w-2/3 mx-auto leading-loose text-xl ">
              After logged in user can avail various government schemes and
              apply to the job's available for them.
            </p>
          </div>
          <div class="flex flex-wrap justify-evenly">
            <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 m-10">
              <div>
                <img
                  class="rounded-t-lg"
                  src="https://tse3.mm.bing.net/th?id=OIP.10RJysmf12hywtib0y57FgHaHa&pid=Api&P=0"
                  alt=""
                />
              </div>
              <div class="p-5">
                <a href="#">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Get your Dream Job
                  </h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Register yourself for the perfect job oppertunities waiting
                  just for you!.
                </p>
                <Link
                  href="/"
                  class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  <button
                    type="button"
                    class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    Apply for Job
                  </button>
                </Link>
              </div>
            </div>
            <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 m-10">
              <div>
                <img
                  class="rounded-t-lg"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbtgQEv2gCHbyF4m-E2-5TDd-T2gucPpCHLB16TmthOY9vIMCVqZfA-Buf5ZWEuNQ8aQY&usqp=CAU"
                  width="100%"
                  alt=""
                />
              </div>
              <div class="p-5">
                <a href="#">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Get Opportunities
                  </h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Get access to various opportunities which are hard to find
                  anywhere.
                </p>
                <Link
                  href="/"
                  class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  <button
                    type="button"
                    class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mt-20 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    Apply for Job
                  </button>
                </Link>
              </div>
            </div>

            <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 m-10">
              <div>
                <img
                  class="rounded-t-lg"
                  src="https://tse4.mm.bing.net/th?id=OIP.6vCfZ95RrqqMQdnLwJWDJAHaE7&pid=Api&P=0"
                  alt=""
                />
              </div>
              <div class="p-5">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Nearest Job
                </h5>

                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Find out the nearby job oppertunities available from your
                  location.
                </p>
                <Link
                  href="/maps"
                  class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  <button
                    type="button"
                    class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    View on Map
                  </button>
                </Link>
              </div>
            </div>
            <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 m-10">
              <div>
                <img
                  class="rounded-t-lg"
                  src="https://tse1.mm.bing.net/th?id=OIP.x6cFBl7B2EyHH4wge5V7qgHaDt&pid=Api&P=0"
                  alt=""
                />
              </div>
              <div class="p-5">
                <a href="#">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Put up Job offer
                  </h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Companies can put up job offers and look for hiring new
                  recruiters.
                </p>
                <Link
                  href="/"
                  class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  <button
                    type="button"
                    class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mt-14 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    Post a Job
                  </button>
                </Link>
              </div>
            </div>

            <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 m-10">
              <div>
                <img
                  class="rounded-t-lg"
                  src="https://tse3.mm.bing.net/th?id=OIP.jssGgKh1PInTDNjuSB-A_AHaEc&pid=Api&P=0"
                  alt=""
                />
              </div>
              <div class="p-5">
                <a href="#">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Add New Schemes
                  </h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Government ministries can add new schemes for the disabled
                  people.
                </p>
                <Link
                  href="/"
                  class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  <button
                    type="button"
                    class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mt-8 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    Add Schemes
                  </button>
                </Link>
              </div>
            </div>
            <div class="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 m-10">
              <div>
                <img
                  class="rounded-t-lg"
                  src="https://tse4.mm.bing.net/th?id=OIP.vq-1vqXhrRfBER8aP6Am4AHaD3&pid=Api&P=0"
                  alt=""
                />
              </div>
              <div class="p-5">
                <a href="#">
                  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Government Schemes
                  </h5>
                </a>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Benefit yourself from all the government schemes available for
                  you.
                </p>
                <Link
                  href="/"
                  class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  <button
                    type="button"
                    class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mt-14 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    Apply for Government Schemes
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Body;
