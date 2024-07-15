import React, { useState } from "react";
import darkBg from "./../../assets/bgDark.svg";
import lightBg from "./../../assets/bgLight.svg";
import { FaUserFriends } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import { GrGithub } from "react-icons/gr";
import { BiNotepad } from "react-icons/bi";
import { MdOutlineDateRange } from "react-icons/md";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FiSun, FiMoon } from "react-icons/fi";
import Loading from "../loading/Loading";

const Index = () => {
  const [username, setUsername] = useState("");
  const [loader, setLoader] = useState(false);
  const [profile, setProfile] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [theme, setTheme] = useState("dark");

  const fetchUserName = async (user) => {
    try {
      setLoader(true);
      const res = await fetch(`https://api.github.com/users/${user}`);
      if (res.ok) {
        const userData = await res.json();
        setProfile(userData);
        setNotFound(false);
      } else {
        setProfile(null);
        setNotFound(true);
      }
      setLoader(false);
    } catch (error) {
      console.log("error" + error);
      setProfile(null);
      setLoader(false);
    }
  };

  const handleSubmit = () => {
    if (!username) {
      alert("Please enter a username to search.");
      return;
    }
    fetchUserName(username);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  const getBackgroundImage = () => {
    return theme === "dark" ? darkBg : lightBg;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "long", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div
      className={`h-screen w-screen ${
        theme === "dark" ? "bg-black" : "bg-white"
      } relative overflow-hidden`}
    >
      <div className="absolute -right-56 sm:-right-72 h-screen z-10 hidden sm:block">
        <img
          src={getBackgroundImage()}
          alt="Background"
          className="w-full h-full"
        />
      </div>

      {!loader ? (
        <>
          {profile === null && !notFound ? (
            <div
              className={`text-${
                theme === "dark" ? "white" : "black"
              } w-[70%] p-2 sm:p-8 mt-10 sm:mt-20 z-50`}
            >
              <div className="w-[80%] mx-auto">
                <h1 className="text-2xl sm:text-7xl font-bold ">
                  GitHub Finder
                </h1>
                <h3 className="text-base sm:text-2xl font-medium my-3 sm:my-6 ml-2">
                  Your site to find programmers quickly and easily!
                </h3>
                <div className="mt-8 sm:mt-20 ml-2">
                  <p className="mb-2 text-base sm:text-lg">
                    Enter the developer's name below
                  </p>
                  <div className="flex items-center">
                    <input
                      type="text"
                      placeholder="Enter Username"
                      value={username}
                      className={`w-[50%] sm:w-[60%] px-2 py-2 rounded-l-lg ${
                        theme === "dark"
                          ? "bg-[#333333] text-white"
                          : "bg-[#f0f0f0] text-black"
                      }`}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <button
                      className={` px-1 sm:px-6 bg-${
                        theme === "dark" ? "white" : "[#333333]"
                      } text-${
                        theme === "dark" ? "black" : "white"
                      } py-2 rounded-r-lg sm:font-semibold`}
                      onClick={handleSubmit}
                    >
                      Look Up
                    </button>
                  </div>
                  <button
                    className="mt-6 sm:mt-24 px-4 py-2 bg-gray-800 text-white rounded flex items-center gap-2"
                    onClick={toggleTheme}
                  >
                    {theme === "dark" ? <FiSun /> : <FiMoon />}
                    Toggle Theme
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              {notFound && (
                <div
                  className={`text-${
                    theme === "dark" ? "white" : "black"
                  } p-2 sm:p-8 mt-10 sm:mt-20 z-[9999] relative`}
                >
                  <div className="w-[80%] sm:w-[50%] mx-auto">
                    <div
                      className={`w-full sm:w-[60%] border-${
                        theme === "dark" ? "white" : "black"
                      } border bg-${
                        theme === "dark" ? "[#333]" : "[#f0f0f0]"
                      } text-${
                        theme === "dark" ? "white" : "black"
                      } rounded-xl py-5`}
                    >
                      <button
                        className=" mb-2 px-2 ml-2 rounded-lg text-sm bg-gray-400 py-2 flex items-center gap-2"
                        onClick={() => setNotFound(false)}
                      >
                        <IoIosArrowRoundBack className="text-2xl" />
                        BACK TO SEARCH
                      </button>
                      <h2 className="text-center mt-4 text-xl font-semibold">
                        User Not Found
                      </h2>
                    </div>
                  </div>
                </div>
              )}

              {profile !== null && !notFound && (
                <div
                  className={`text-${
                    theme === "dark" ? "white" : "black"
                  } p-2 sm:p-8 mt-10 sm:mt-14 z-[9999] relative`}
                >
                  <div className="w-[80%] sm:w-[50%] mx-auto">
                    <div
                      className={`w-full sm:w-[60%] border-${
                        theme === "dark" ? "white" : "black"
                      } border bg-${
                        theme === "dark" ? "[#333]" : "[#f0f0f0]"
                      } text-${
                        theme === "dark" ? "white" : "black"
                      } rounded-xl py-5`}
                    >
                      <button
                        className="px-2 ml-2 rounded-lg text-sm bg-gray-400 py-2 flex items-center gap-2"
                        onClick={() => setProfile(null)}
                      >
                        <IoIosArrowRoundBack className="text-2xl" />
                        BACK TO SEARCH
                      </button>
                      <h1 className="text-center mb-2 text-xl sm:text-3xl font-semibold">
                        {profile.name || profile.login}
                      </h1>

                      <div className="w-[60%] mx-auto h-42 sm:h-52 rounded-lg">
                        <img
                          src={profile.avatar_url}
                          alt={profile.login}
                          className="w-full h-full rounded-lg"
                        />
                      </div>
                      <div className="flex flex-col justify-center items-center mt-3">
                        <p className="text-center mb-2 flex gap-2 items-center">
                          <MdOutlineDateRange /> Joined{" "}
                          {formatDate(profile.created_at)}
                        </p>
                        <h4 className="text-lg sm:text-xl font-medium">
                          @{profile.login}
                        </h4>
                        <div className="flex justify-between gap-5 items-center">
                          <p className="flex items-center gap-2">
                            <FaUserFriends /> Followers: {profile.followers}
                          </p>
                          <p className="flex items-center gap-2">
                            <IoMdHeart /> Following: {profile.following}
                          </p>
                        </div>
                        <div className="flex items-center gap-5 justify-between">
                          <div className="flex items-center gap-2">
                            <GrGithub /> Public Repos: {profile.public_repos}
                          </div>
                          <div className="flex items-center gap-2">
                            <BiNotepad /> Public Gists: {profile.public_gists}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center items-center mt-4">
                        <a
                          href={profile.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-white py-2 px-6 text-black rounded"
                        >
                          Visit Profile
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <h2 className={`text-${theme === "dark" ? "white" : "black"}`}>
          <Loading />
        </h2>
      )}
    </div>
  );
};

export default Index;
