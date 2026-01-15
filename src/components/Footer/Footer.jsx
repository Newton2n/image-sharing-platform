import Link from "next/link";
import Logo from "../logo";

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-white dark:bg-black border border-t-2 border-t-black dark:border-t-gray-200">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          <div className="w-full p-6 sm:1/2 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="100px" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  &copy; Copyright 2026. All Rights Reserved by Webcre8or.
                </p>
              </div>
            </div>
          </div>
          <div className="w-1/2 p-6  sm:w-1/2 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500  dark:text-gray-100">
                Company
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-gray-900 dark:hover:text-gray-500  dark:text-gray-300"
                    href="/"
                  >
                    Features
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-gray-900 dark:hover:text-gray-500  dark:text-gray-300"
                    href="/"
                  >
                    Pricing
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-gray-900 dark:hover:text-gray-500  dark:text-gray-300"
                    href="/"
                  >
                    Affiliate Program
                  </Link>
                </li>
                <li>
                  <Link
                    className=" text-base font-medium text-gray-900 dark:hover:text-gray-500  dark:text-gray-300"
                    href="/"
                  >
                    Press Kit
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-1/2 p-6 sm:w-1/2 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500  dark:text-gray-100">
                Support
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-gray-900 dark:hover:text-gray-500  dark:text-gray-300"
                    href="/"
                  >
                    Account
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-gray-900 dark:hover:text-gray-500  dark:text-gray-300"
                    href="/"
                  >
                    Help
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-gray-900 dark:hover:text-gray-500  dark:text-gray-300"
                    href="/"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    className=" text-base font-medium text-gray-900 dark:hover:text-gray-500  dark:text-gray-300"
                    href="/"
                  >
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-1/2 p-6  sm:e-1/2 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500  dark:text-gray-100">
                Legals
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-gray-900 dark:hover:text-gray-500  dark:text-gray-300"
                    href="/"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-gray-900 dark:hover:text-gray-500  dark:text-gray-300"
                    href="/"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className=" text-base font-medium text-gray-900 dark:hover:text-gray-500  dark:text-gray-300"
                    href="/"
                  >
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
