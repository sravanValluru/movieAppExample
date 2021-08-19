/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ]
  }
  ```
*/

import { ChevronRightIcon } from "@heroicons/react/solid";
import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";

export default function SignUp() {
  const history = useHistory();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = event => {
    event.preventDefault();

    const emailEntered = emailInputRef.current.value;
    const passwordEntered = passwordInputRef.current.value;

    setIsLoading(true);
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB1d866ZNDrZ8EsAmA9ARBoOLpWtSLtnyU",
      {
        method: "POST",
        body: JSON.stringify({
          email: emailEntered,
          password: passwordEntered,
          returnSecureToken: true
        }),
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(res => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then(data => {
            let errorMessage = "Authentication failed!";

            throw new Error(errorMessage);
          });
        }
      })
      .then(data => {
        console.log("authentication succesful DATA: ", data);
        alert("Successfully created a new Account. Now goin to Login Page");
        history.replace("/login");
      })
      .catch(err => {
        alert(err.message);
      });
  };

  return (
    <div
      style={{ "min-width": "100vw" }}
      className="relative bg-gray-800 overflow-hidden min-h-screen min-w-full"
    >
      {/* <div
        className="hidden sm:block sm:absolute sm:inset-0"
        aria-hidden="true"
      > */}
      <main className="mt-16 sm:mt-24">
        <div className="mx-auto max-w-7xl">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="px-4 sm:px-6 sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left lg:flex lg:items-center">
              <div>
                {/* eslint-disable-next-line */}
                <a
                  href="#"
                  className="inline-flex items-center text-white bg-gray-900 rounded-full p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-gray-200"
                >
                  <span className="px-3 py-0.5 text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-indigo-500 rounded-full">
                    Login now
                  </span>
                  <span className="ml-4 text-sm">Explore movies</span>
                  <ChevronRightIcon
                    className="ml-2 w-5 h-5 text-gray-500"
                    aria-hidden="true"
                  />
                </a>
                <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-white sm:mt-5 sm:leading-none lg:mt-6 lg:text-5xl xl:text-6xl">
                  <span className="md:block">One stop destination to</span>{" "}
                  <span className="text-indigo-400 md:block">
                    binge watch movies
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure
                  qui lorem cupidatat commodo. Elit sunt amet fugiat veniam
                  occaecat fugiat aliqua ad ad non deserunt sunt.
                </p>
                <p className="mt-8 text-sm text-white uppercase tracking-wide font-semibold sm:mt-10">
                  Used by
                </p>
                <div className="mt-5 w-full sm:mx-auto sm:max-w-lg lg:ml-0">
                  <div className="flex flex-wrap items-start justify-between">
                    <div className="flex justify-center px-1">
                      <img
                        className="h-9 sm:h-10"
                        src="https://tailwindui.com/img/logos/tuple-logo-gray-400.svg"
                        alt="Tuple"
                      />
                    </div>
                    <div className="flex justify-center px-1">
                      <img
                        className="h-9 sm:h-10"
                        src="https://tailwindui.com/img/logos/workcation-logo-gray-400.svg"
                        alt="Workcation"
                      />
                    </div>
                    <div className="flex justify-center px-1">
                      <img
                        className="h-9 sm:h-10"
                        src="https://tailwindui.com/img/logos/statickit-logo-gray-400.svg"
                        alt="StaticKit"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-16 sm:mt-24 lg:mt-0 lg:col-span-6">
              <div className="bg-white sm:max-w-md sm:w-full sm:mx-auto sm:rounded-lg sm:overflow-hidden">
                <div className="px-4 py-8 sm:px-10">
                  {/* Start here */}
                  <div>
                    <img
                      class="mx-auto h-12 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                      alt="Workflow"
                    />
                    <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                      Sign Up for an account
                    </h2>
                  </div>
                  {/* End here */}

                  <div className="mt-6">
                    <form onSubmit={submitHandler} className="space-y-6">
                      <div>
                        <label htmlFor="mobile-or-email" className="sr-only">
                          Email
                        </label>
                        <input
                          type="text"
                          name="mobile-or-email"
                          id="mobile-or-email"
                          autoComplete="email"
                          placeholder="Mobile number or email"
                          required
                          className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                          ref={emailInputRef}
                        />
                      </div>

                      <div>
                        <label htmlFor="password" className="sr-only">
                          Password
                        </label>
                        <input
                          id="password"
                          ref={passwordInputRef}
                          name="password"
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          required
                          className="block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                        />
                      </div>

                      <div>
                        <button
                          type="submit"
                          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Create your account
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="px-4 py-6 bg-gray-50 border-t-2 border-gray-200 sm:px-10">
                  <p className="text-xs leading-5 text-gray-500">
                    By signing up, you agree to our{" "}
                    {/* eslint-disable-next-line */}
                    <a
                      href="#"
                      className="font-medium text-gray-900 hover:underline"
                    >
                      Terms
                    </a>
                    , {/* eslint-disable-next-line */}
                    <a
                      href="#"
                      className="font-medium text-gray-900 hover:underline"
                    >
                      Data Policy
                    </a>{" "}
                    and {/* eslint-disable-next-line */}
                    <a
                      href="#"
                      className="font-medium text-gray-900 hover:underline"
                    >
                      Cookies Policy
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
    // </div>
  );
}
