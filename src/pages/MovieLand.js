import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Modal from "../components/Modal";
import OverlayModal from "../components/OverlayModal";

import { ChevronRightIcon } from "@heroicons/react/solid";
/* This example requires Tailwind CSS v2.0+ */
const people = [
  {
    name: "Lindsay Walton",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
  }
  // More people...
];
const activityItems = [
  {
    id: 1,
    person: people[0],
    project: "Workcation",
    commit: "2d89f0c8",
    environment: "production",
    time: "1h"
  }
  // More items...
];

export default function MovieLand() {
  const history = useHistory();
  const searchQuery = history.location.state.data;
  //   useState()
  const [movieList, setMovieList] = useState([]);
  const [toggleModal, setToggleModal] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    console.log("In MovieLand() useffect changed: ", movieList);
    getMovieList();
  }, [searchQuery]);

  async function getMovieList() {
    const res = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=182f779a880e10cc1fb388c581def8f4&language=en-US&page=1&include_adult=false&query=${searchQuery}`
    );
    const data = await res.json();

    console.log("trending data: ", data.results);
    setMovieList(data.results);
  }

  const movieItemClickHandler = movie => {
    console.log("movie clicked: ", movie);
    setMovie(movie);
    setToggleModal(true);
    // return (
    //   <Modal>
    //     <div>
    //       <h1>{movie.original_title}</h1>
    //     </div>
    //   </Modal>
    // );
  };

  return (
    <div>
      {toggleModal ? (
        <Modal>
          <OverlayModal movieData={movie} setToggleModal={setToggleModal} />
        </Modal>
      ) : (
        <div className="relative bg-white py-16 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-md px-4 text-center sm:max-w-3xl sm:px-6 lg:px-8 lg:max-w-7xl">
            <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl pb-12">
              Showing results for {searchQuery} ...
            </p>
            <div className="flex-1 justify-center items-center">
              <ul className="divide-y divide-gray-200">
                {movieList.map(movie => (
                  <li key={movie.id} className="py-4">
                    <div
                      onClick={() => movieItemClickHandler(movie)}
                      className="flex space-x-3 w-8/12 mx-auto items-center p-6 rounded-lg bg-gray-100 shadow-md duration-50 hover:shadow-inner hover:bg-gray-100 cursor-pointer"
                    >
                      <img
                        className="h-24 w-24 rounded-full"
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt=""
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-medium">
                            {movie.original_title}
                          </h3>

                          <span className="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">
                            {movie.vote_average}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 text-left">
                          {movie.overview}
                        </p>
                      </div>
                      <div>
                        <ChevronRightIcon
                          className="h-5 w-5 text-gray-400 hover:text-gray-800"
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
