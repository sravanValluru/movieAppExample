import { useEffect, useState } from "react";

let tabs = [
  { name: "All", value: "all", current: true },
  { name: "Movie", value: "movie", current: false },
  { name: "TV Shows", value: "tv", current: false },
  { name: "Artists", value: "person", current: false }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Trending() {
  const [trendingList, setTrendingList] = useState([]);
  const [trendingState, setTrendingState] = useState("all");

  const trendingStateChangeHandler = event => {
    event.preventDefault();
    console.log("event.target.value: ", event.target);
    setTrendingState(event.target.value);
  };

  useEffect(() => {
    console.log("useffect changed: ", trendingState);
    getTrending();
  }, [trendingState]);

  async function getTrending() {
    const res = await fetch(
      `https://api.themoviedb.org/3/trending/${trendingState}/day?api_key=182f779a880e10cc1fb388c581def8f4`
    );
    const data = await res.json();

    console.log("trending data: ", data.results);
    setTrendingList(data.results);
  }

  return (
    <div className="relative bg-white py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
        <h2 className="text-base font-semibold tracking-wider text-cyan-600 uppercase">
          Explore Trending Movies
        </h2>
        <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
          All the trending movies, tv shows, artists at one place
        </p>
        <p className="mt-5 max-w-prose mx-auto text-xl text-gray-500">
          Phasellus lorem quam molestie id quisque diam aenean nulla in.
          Accumsan in quis quis nunc, ullamcorper malesuada. Eleifend
          condimentum id viverra nulla.
        </p>
        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* {features.map((feature) => (
                    <div key={feature.name} className="pt-6">
                      <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                        <div className="-mt-6">
                          <div>
                            <span className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-md shadow-lg">
                              <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                            </span>
                          </div>
                          <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.name}</h3>
                          <p className="mt-5 text-base text-gray-500">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  ))} */}
          </div>
        </div>
      </div>
      {/* full width Tabs */}
      <div>
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          <select
            id="tabs"
            name="tabs"
            className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
            defaultValue={tabs.find(tab => tab.current).name}
            onChange={trendingStateChangeHandler}
          >
            {tabs.map(tab => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex" aria-label="Tabs">
              {tabs.map(tab => (
                <a
                  key={tab.value}
                  href="#"
                  onClick={e => {
                    e.preventDefault();
                    setTrendingState(tab.value);
                    tabs.forEach(eachTab => {
                      if (eachTab.value == tab.value) {
                        eachTab.current = true;
                      } else {
                        eachTab.current = false;
                      }
                    });
                    console.log("tabs: ", tabs);
                  }}
                  // value={trendingState}
                  className={classNames(
                    tab.current
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300",
                    "w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm"
                  )}
                  aria-current={tab.current ? "page" : undefined}
                >
                  {tab.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
      {/* cards */}
      {(trendingState === "all" ||
        trendingState === "movie" ||
        trendingState === "tv") && (
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-gray-100 m-8 p-8 rounded-lg"
        >
          {trendingList.map(trendingMovie => (
            <li
              key={trendingMovie.id}
              className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
            >
              <div className="flex-1 flex flex-col p-8">
                <img
                  className="w-40 h-40 flex-shrink-0 mx-auto rounded-full"
                  src={`https://image.tmdb.org/t/p/w500/${trendingMovie.backdrop_path}`}
                  alt=""
                />
                <h3 className="mt-6 text-gray-900 text-sm font-medium">
                  {trendingState === "tv"
                    ? trendingMovie.name
                    : trendingMovie.title}
                </h3>
                <dl className="mt-1 flex-grow flex flex-col justify-between">
                  <dt className="sr-only">Title</dt>
                  <dd className="text-gray-500 text-sm text-left">
                    {trendingMovie.overview
                      ? trendingMovie.overview.substring(0, 150) + " ... "
                      : " Amazing story telling "}
                  </dd>
                  <dt className="sr-only">Role</dt>
                  <dd className="mt-3">
                    <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                      {trendingMovie.vote_average}
                    </span>
                  </dd>
                </dl>
              </div>
              <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="w-0 flex-1 flex justify-center items-center p-3">
                    <h4 className="text-gray-900 text-sm font-medium">
                      {trendingState === "tv"
                        ? "First Air Date: "
                        : "Release Date:"}
                    </h4>
                    <span className="text-gray-500 text-sm">
                      {trendingState === "tv"
                        ? trendingMovie.first_air_date
                        : trendingMovie.release_date}
                    </span>
                  </div>
                  <div className="-ml-px w-0 flex-1 flex">
                    <div className="w-0 flex-1 flex justify-center items-center p-3">
                      <h4 className="text-gray-900 text-sm font-medium">
                        Votes:&nbsp;
                      </h4>
                      <span className="text-gray-500 text-sm">
                        {trendingMovie.vote_count}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
      {trendingState === "person" && (
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 bg-gray-100 m-8 p-8 rounded-lg"
        >
          {trendingList.map(trendingMovie => (
            <li
              key={trendingMovie.id}
              className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
            >
              <div className="flex-1 flex flex-col p-8">
                <img
                  className="w-32 h-32 flex-shrink-0 mx-auto rounded-full"
                  src={`https://image.tmdb.org/t/p/w500/${
                    trendingMovie.profile_path
                      ? trendingMovie.profile_path
                      : "nraZoTzwJQPHspAVsKfgl3RXKKa.jpg"
                  }`}
                  alt=""
                />
                <h3 className="mt-6 text-gray-900 text-sm font-medium">
                  {trendingMovie.name}
                </h3>
                <dl className="mt-1 flex-grow flex flex-col justify-between">
                  <dt className="sr-only">Title</dt>
                  {/* <dd className="text-gray-500 text-sm text-left">
                    {trendingMovie.known_for_department}
                  </dd> */}
                  <dt className="sr-only">Role</dt>
                  {/* <dd className="mt-3">
                    <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                      {trendingMovie.known_for[0]["vote_average"]}
                    </span>
                  </dd> */}
                </dl>
              </div>
              {/* <div>
                <div className="-mt-px flex divide-x divide-gray-200">
                  <div className="w-0 flex-1 flex justify-center items-center p-3">
                    <h4 className="text-gray-900 text-sm font-medium">
                      Release Date:
                    </h4>
                    <span className="text-gray-500 text-sm">
                      {trendingMovie.known_for[0]["release_date"]}
                    </span>
                  </div>
                  <div className="-ml-px w-0 flex-1 flex">
                    <div className="w-0 flex-1 flex justify-center items-center p-3">
                      <h4 className="text-gray-900 text-sm font-medium">
                        Votes:&nbsp;
                      </h4>
                      <span className="text-gray-500 text-sm">
                        {trendingMovie.known_for[0]["vote_count"]}
                      </span>
                    </div>
                  </div>
                </div>
              </div> */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
