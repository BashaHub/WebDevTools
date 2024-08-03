"use client";
import { useEffect, useState } from "react";
import { NavBar } from "../components/navbar";
import Link from "next/link";
import Image from "next/image";
import BasicModal from "./modal";
import { InsertLink, LinkOff } from "@mui/icons-material";

export default function GhFinder() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selected, setSelected] = useState(1);
  const [data, setData] = useState([]);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [filteredIssue, setFilteredIssue] = useState([]);

  // New states
  const [searchQuery, setSearchQuery] = useState("");
  const [isAssigned, setIsAssigned] = useState(false);
  const [maxResults, setMaxResults] = useState(10); // TODO FEATURE => Add Pages

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const cacheKey = selected === 1 ? "webdevtools-issues" : `github-issues-${maxResults}`;
  const cacheExpirationKey = `${cacheKey}-timestamp`;
  const cacheExpirationTime = 1000 * 60 * 30; // Cache expiration time (e.g., 30 minutes)

  const fetchData = async (url) => {
    const cachedData = localStorage.getItem(cacheKey);
    const cacheTimestamp = localStorage.getItem(cacheExpirationKey);
    const now = new Date().getTime();

    if (cachedData && cacheTimestamp && (now - cacheTimestamp) < cacheExpirationTime) {
      return JSON.parse(cachedData);
    } else {
      try {
        const response = await fetch(url);
        const result = await response.json();
        localStorage.setItem(cacheKey, JSON.stringify(result));
        localStorage.setItem(cacheExpirationKey, now.toString());
        return result;
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      }
    }
  };

  useEffect(() => {
    const url =
      selected === 1
        ? "https://api.github.com/repos/bashamega/webdevtools/issues"
        : `https://api.github.com/search/issues?q=state:open+is:issue&per_page=${maxResults}&page=1`;

    const fetchDataAndSet = async () => {
      const result = await fetchData(url);
      const filteredData = selected === 1
        ? result.filter((item) => !item.node_id.includes("PR_"))
        : result.items;
      setData(filteredData);
    };

    fetchDataAndSet();
  }, [selected, maxResults]);

  // Filter issues by label
  const issuesByLabel = () => {
    if (data?.length) {
      const newFilterIssues = data.filter((issue) => {
        return selectedLabels.every((selectedLabel) => {
          return issue.labels.some((label) => label.name === selectedLabel);
        });
      });
      setFilteredIssue(newFilterIssues);
    }
  };

  useEffect(() => {
    issuesByLabel();
  }, [selectedLabels]);

  // Filter function for search, assign and fork
  const filteredData = data?.filter((issue) => {
    const matchesSearch = issue.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesAssignment = isAssigned ? issue.assignees.length > 0 : true;
    return matchesSearch && matchesAssignment;
  });

  const issuesToDisplay =
    filteredIssue.length > 0 ? filteredIssue : filteredData;

  // New function to fetch PRs linked to issues
  const fetchPRsForIssue = async (issue) => {
    const timelineUrl = `${issue.url}/timeline`;
    const response = await fetch(timelineUrl, {
      headers: {
        Accept: "application/vnd.github.mockingbird-preview+json",
      },
    });
    const events = await response.json();
    const linkedPRs = events?.filter(
      (event) =>
        event.event === "cross-referenced" && event.source?.issue?.pull_request,
    );
    return linkedPRs.map((pr) => pr.source.issue.pull_request.html_url);
  };

  // New useEffect to add PRs linked to issues
  useEffect(() => {
    const fetchPRsInfo = async () => {
      const issuesWithPRsInfo = await Promise.all(
        data.map(async (issue) => {
          const linkedPRs = await fetchPRsForIssue(issue);
          return { ...issue, linkedPRs };
        }),
      );
      setData(issuesWithPRsInfo);
    };

    if (data?.length > 0 && !data.some(issue => issue.linkedPRs)) {
      fetchPRsInfo();
    }
  }, [data]);

  function isDarkColor(color) {
    // Convert the color to RGB
    const hexColor = color.replace("#", "");
    const r = parseInt(hexColor.substr(0, 2), 16);
    const g = parseInt(hexColor.substr(2, 2), 16);
    const b = parseInt(hexColor.substr(4, 2), 16);

    // Calculate the luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Return true if luminance is less than 0.5 (considered dark)
    return luminance < 0.5;
  }

  if (!issuesToDisplay?.length) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="relative">
          <div
            className={
              "h-24 w-24 rounded-full border-t-8 border-b-8 " +
              (isDarkMode ? "border-gray-900" : "border-gray-100")
            }
          ></div>
          <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
          <p className="mt-2 text-center">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${
        isDarkMode ? "bg-gray-900 text-gray-400" : "bg-gray-100 text-gray-500"
      } min-h-screen w-full pb-2`}
    >
      <NavBar
        title={"GitHub Issue Finder"}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      <div className="mt-10 flex w-screen justify-center">
        <header className="lg:w-2/3">
          <h1 className="relative z-10 font-sans text-lg font-bold text-center text-transparent md:text-7xl bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-600">
            Github Issue Finder
          </h1>

          <div className="flex justify-between w-full lg:w-1/2 lg:mx-[25%] my-5 items-center">
            <input
              type="text"
              className="p-2 rounded border border-gray-400"
              placeholder="Search issues"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isAssigned"
                checked={isAssigned}
                onChange={() => setIsAssigned(!isAssigned)}
                className="mr-2"
              />
              <label htmlFor="isAssigned">Is assigned</label>
            </div>
          </div>

          <div className="flex justify-between w-full lg:w-1/2 lg:mx-[25%] my-5 items-center">
            <button
              className={
                "hover:bg-blue-800 transition-colors min-w-1/3 duration-100 p-5 rounded-full hover:text-white " +
                (selected === 1 && "bg-blue-600  text-white")
              }
              onClick={() => setSelected(1)}
            >
              Web Dev Tools Issues
            </button>
            <button
              className={
                "hover:bg-blue-800 transition-colors w-1/3 duration-100 p-5 rounded-full hover:text-white " +
                (selected === 2 && "bg-blue-600  text-white")
              }
              onClick={() => setSelected(2)}
            >
              Github
            </button>
            <BasicModal
              isDarkMode={isDarkMode}
              selectedLabels={selectedLabels}
              setSelectedLabels={setSelectedLabels}
            />
          </div>
        </header>
      </div>
      <div className="ml-[25%] w-1/2">
        {issuesToDisplay.map((item) => (
          <div
            key={item.id}
            className="bg-slate-500 rounded mb-5 pl-5 pb-5 flex w-full"
          >
            <div className="w-2/3 overflow-hidden">
              <Link
                href={item.html_url}
                className="text-white font-bold text-3xl hover:underline truncate block"
              >
                {item.title}
              </Link>
              <Link
                className="text-slate-300"
                href={item.repository_url.replace(
                  "https://api.github.com/repos",
                  "https://github.com",
                )}
              >
                {item.repository_url.replace("https://api.github.com/repos/", "")}
              </Link>
              <div
                className={
                  "flex flex-wrap items-center mt-1 " +
                  (isDarkMode ? "text-gray-300" : "text-gray-600")
                }
              >
                {item.labels?.map((label) => (
                  <span
                    key={label.id}
                    className="inline-block px-2 py-1 mr-2 text-xs font-semibold text-white bg-green-500 rounded-full"
                    style={{
                      backgroundColor: `#${label.color}`,
                      color: isDarkColor(`#${label.color}`) ? 'white' : 'black',
                    }}
                  >
                    {label.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="w-1/3 flex flex-col items-center justify-center">
              <div className="text-sm mt-3">{item.comments} Comments</div>
              {item.linkedPRs?.length > 0 && (
                <div className="mt-2">
                  {item.linkedPRs.map((prUrl, index) => (
                    <a key={index} href={prUrl} className="text-blue-500 hover:underline">
                      PR #{index + 1}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
