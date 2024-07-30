"use client";
import React, { useState } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CloseIcon from "@mui/icons-material/Close";
import Nav from "@/app/components/nav";
import { NavBar } from "@/app/components/navbar";

export default function ButtonCustomizer() {
  const [paragraphs, setParagraphs] = useState(1);
  const [code, setCode] = useState("");
  const [copiedStatus, setCopiedStatus] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);

  const generateLoremIpsum = () => {
    let loremIpsumText = "";
    for (let i = 0; i < paragraphs; i++) {
      loremIpsumText += `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus auctor orci quis metus ultricies, vitae finibus urna pellentesque. Sed commodo, tortor sed pharetra bibendum, turpis purus gravida orci, nec aliquet mi ligula eu purus. In at elit ex. Quisque ultricies pulvinar purus, at luctus justo lacinia vel. Vestibulum pulvinar lacus eu turpis rutrum, et fermentum sapien rhoncus. Nullam dapibus felis in neque ultricies ullamcorper. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In hac habitasse platea dictumst. Donec efficitur dolor a bibendum vehicula. Curabitur vitae est elit. Integer tempus massa elit, eget euismod nunc pharetra eget. Morbi efficitur metus in viverra finibus. Aliquam sollicitudin pharetra sapien nec bibendum. Etiam congue faucibus malesuada. Nunc vulputate congue vulputate.\n\n`;
    }
    setCode(loremIpsumText);
  };

  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopiedStatus("Text copied successfully");
  };

  const closeBtn = () => {
    setCopiedStatus("");
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <main
      className={`${isDarkMode ? "bg-gray-900 text-gray-400" : "bg-white text-gray-800"} h-screen flex flex-col gap-10 min-w-80`}
    >
      <NavBar
        title={"Lorem Ipsum generator"}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      <section className="flex items-center justify-center">
        <div
          className={`${isDarkMode ? "bg-gray-800" : "bg-gray-400"} p-10 w-full max-w-5xl overflow-y-scroll max-h-96 min-w-80`}
        >
          <div className="flex justify-center pb-5 flex-wrap gap-4 md:justify-between">
            <div className="flex gap-2 items-center">
              <label htmlFor="paragraphs">Number of paragraphs:</label>
              <input
                type="number"
                id="paragraphs"
                value={paragraphs}
                min={1}
                max={10}
                onChange={(e) => setParagraphs(e.target.value)}
                className="focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
            </div>
            <div className="flex gap-5">
              <button
                onClick={generateLoremIpsum}
                className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:outline-none"
              >
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                  Generate
                </span>
              </button>
              <button
                onClick={copy}
                className="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2"
              >
                Copy
                <ContentCopyIcon fontSize="small" className="ml-2" />
              </button>
            </div>
          </div>
          {code !== "" && !copiedStatus && <pre>{code}</pre>}
          {copiedStatus !== "" && (
            <div className="copyStatus bg-green-500 font-bold text-center rounded-lg p-2 relative">
              <button className="absolute top-0 right-1" onClick={closeBtn}>
                <CloseIcon fontSize="small" />
              </button>
              {copiedStatus}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
