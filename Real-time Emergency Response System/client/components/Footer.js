import Image from 'next/image';
import Link from 'next/link';

function Footer() {
  return (
    <div>
      <footer className="p-4 bg-white shadow md:px-6 md:py-8 dark:bg-zinc-900 border-t-4 border-indigo-500">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="https://flowbite.com/"
            className="flex items-center mb-4 sm:mb-0"
          >
            <Image
              src="/icon-256x256.png"
              width={60}
              height={60}
              className="mr-3 h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              ReachOut
            </span>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <Link href="/governmentLogin">
                <a className="mr-4 hover:underline md:mr-6 ">Admin Login</a>
              </Link>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2022{' '}
          <a href="/" className="hover:underline">
            ReachOut
          </a>
        </span>
      </footer>
    </div>
  );
}

export default Footer;
