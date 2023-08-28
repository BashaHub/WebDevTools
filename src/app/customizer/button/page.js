"use client";
import Search from "@/app/assets/search";
import React, { use, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export default function ButtonCustomizer() {
  const [containerBackground, setContainerBackground] = useState('')
  const [backgroundColor, setBackgroundColor] = useState("#FF0000");
  const [textColor, setTextColor] = useState("#FFFFFF");
  const [borderRadius, setBorderRadius] = useState(4);
  const [width, setwidth] = useState("400");
  const [height, setheight] = useState("200");
  const [cursor, setcursor] = useState("pointer");
  const [fontsize, setfonts] = useState("16");
  const [fontw, setfontw] = useState("bold");
  const [fontf, setfontf] = useState("tahoma");
  const [showCode, setShowCode] = useState(false);
  const [showSuccessMessage, setshowSuccessMessage] = useState(false);
  const handleCopyCode = () => {
    const code = `
<button style="
  background-Color: ${backgroundColor};
  color: ${textColor};
  border-Radius: ${borderRadius}px;
  padding: 10px 20px;
  fontSize: ${fontsize}px;
  fontWeight: ${fontw};
  font-Family: ${fontf};
  border: none;
  cursor: ${cursor};
  width: ${width}px;
  height: ${height}px;
">
  Customized Button
</button>
`;
    navigator.clipboard.writeText(code);
    setShowCode(false);
  };

  const handleContainerBackgroundColorChange = (event) => {
    setContainerBackground(event.target.value)
  }

  const handleBackgroundColorChange = (event) => {
    setBackgroundColor(event.target.value);
  };

  const handleBorderwidth = (event) => {
    setwidth(event.target.value);
  };

  const handlecursor = (event) => {
    setcursor(event.target.value);
  };

  const handleBorderheight = (event) => {
    setheight(event.target.value);
  };

  const handleTextColorChange = (event) => {
    setTextColor(event.target.value);
  };

  const handleBorderRadiusChange = (event) => {
    setBorderRadius(Number(event.target.value));
  };

  const handlefonts = (event) => {
    setfonts(event.target.value);
  };

  const handlefontw = (event) => {
    setfontw(event.target.value);
  };

  const handlefontf = (event) => {
    setfontf(event.target.value);
  };

  const handleCodeButtonClick = () => {
    setShowCode(true);
  };

  const buttonStyles = {
    backgroundColor,
    color: textColor,
    borderRadius: `${borderRadius}px`,
    padding: "10px 20px",
    fontSize: `${fontsize}px`,
    fontWeight: fontw,
    fontFamily: fontf,
    border: "none",
    cursor: cursor,
    width: `${width}px`,
    height: `${height}px`,
  };

  const buttonContainerStyles = {
    backgroundColor: containerBackground,
    width: "100vw",
    height: "100vh",
    zIndex: "-1",
    position: "fixed",
    top: "0px",
    left: "0px",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  };

  const cursorOptions = [
    "auto",
    "default",
    "none",
    "context-menu",
    "help",
    "pointer",
    "progress",
    "wait",
    "cell",
    "crosshair",
    "text",
    "vertical-text",
    "alias",
    "copy",
    "move",
    "no-drop",
    "not-allowed",
    "grab",
    "grabbing",
    "all-scroll",
    "col-resize",
    "row-resize",
    "n-resize",
    "e-resize",
    "s-resize",
    "w-resize",
    "ne-resize",
    "nw-resize",
    "se-resize",
    "sw-resize",
    "ew-resize",
    "ns-resize",
    "nesw-resize",
    "nwse-resize",
    "zoom-in",
    "zoom-out",
  ];

  const fontWeights = [
    "normal",
    "bold",
    "bolder",
    "lighter",
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
  ];

  const fontFamilies = [
    "Arial, sans-serif",
    "Helvetica, sans-serif",
    "Times New Roman, serif",
    "Georgia, serif",
    "Courier New, monospace",
    "Verdana, sans-serif",
    "Impact, sans-serif",
    "Comic Sans MS, cursive",
    "Trebuchet MS, sans-serif",
    "Arial Black, sans-serif",
    "Lucida Sans Unicode, sans-serif",
    "Palatino Linotype, serif",
    "Tahoma, sans-serif",
    "Garamond, serif",
    "MS Sans Serif, sans-serif",
    "Open Sans, sans-serif",
    "Roboto, sans-serif",
    "Montserrat, sans-serif",
    "Lato, sans-serif",
    "Oswald, sans-serif",
    "Raleway, sans-serif",
    "Noto Sans, sans-serif",
    "Source Sans Pro, sans-serif",
    "IBM Plex Sans, sans-serif",
    "Playfair Display, serif",
    "Merriweather, serif",
    "Roboto Slab, serif",
    "Cabin, sans-serif",
    "Ubuntu, sans-serif",
    "Droid Serif, serif",
    "PT Sans, sans-serif",
    "Quicksand, sans-serif",
  ];

  return (
    <div>
      <section className="buttonContainer" style={buttonContainerStyles}>
        <button style={buttonStyles} className="text-4xl">
          Customized Button
        </button>
      </section>

      <Tabs className="fixed bottom-0 left-0 right-0 mt-5 bg-slate-700">
        <TabList className="flex border-b bg-slate-600 flex flex-wrap p-2 gap-4">
          <Tab className="font-mono cursor-pointer p-1">Background Color</Tab>
          <Tab className="font-mono cursor-pointer p-1">Text Color</Tab>
          <Tab className="font-mono cursor-pointer p-1">Border Radius</Tab>
          <Tab className="font-mono cursor-pointer p-1">Width and height</Tab>
          <Tab className="font-mono cursor-pointer p-1">Cursor</Tab>
          <Tab className="font-mono cursor-pointer p-1">Font</Tab>
        </TabList>

        <TabPanel className="bg-slate-700">
          <div className="my-8 bg-black text-white p-5 w-full rounded-md shadow-md flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 font-mono">
              Button Customizer
            </h2>
            <div className="mb-4">
              <label className="mr-2 font-mono">Background Color:</label>
              <input
                type="color"
                value={backgroundColor}
                onChange={handleBackgroundColorChange}
              />
            </div>
            <div className="mb-4">
              <label className="mr-2 font-mono">Container Background Color:</label>
              <input
                type="color"
                value={containerBackground}
                onChange={handleContainerBackgroundColorChange}
              />
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="my-8 bg-black text-white p-5 w-full rounded-md shadow-md flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 font-mono">
              Button Customizer
            </h2>
            <div className="mb-4">
              <label className="mr-2 font-mono">Text Color:</label>
              <input
                type="color"
                value={textColor}
                onChange={handleTextColorChange}
              />
            </div>
          </div>
        </TabPanel>

        <TabPanel>
          <div className="my-8 bg-black text-white p-5 w-full rounded-md shadow-md flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 font-mono">
              Button Customizer
            </h2>
            <div className="mb-4">
              <label className="mr-2 font-mono">Border Radius:</label>
              <input
                type="number"
                min="0"
                placeholder="Enter border radius"
                className="text-white bg-gray-700 p-1 rounded-md font-mono"
                value={borderRadius}
                onChange={handleBorderRadiusChange}
              />
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="my-8 bg-black text-white p-5 w-full rounded-md shadow-md flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 font-mono">
              Button Customizer
            </h2>
            <div className="mb-4">
              <label className="mr-2 font-mono">Width:</label>
              <input
                type="number"
                min="0"
                className="text-white bg-gray-700 p-1 rounded-md font-mono"
                value={width}
                onChange={handleBorderwidth}
              />
            </div>
            <div className="mb-4">
              <label className="mr-2 font-mono">Height:</label>
              <input
                type="number"
                min="0"
                className="text-white bg-gray-700 p-1 rounded-md font-mono"
                value={height}
                onChange={handleBorderheight}
              />
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="my-8 bg-black text-white p-5 w-full rounded-md shadow-md flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 font-mono">
              Button Customizer
            </h2>
            <div className="mb-4">
              <label className="mr-2 font-mono" for="cursor-options">
                Cursor:
              </label>

              <select
                name="cursor-options"
                id="cursor-options"
                onChange={handlecursor}
                value={cursor}
                className="text-white bg-gray-700 p-1 rounded-md font-mono"
              >
                {cursorOptions.map((option) => (
                  <option name={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="my-8 bg-black text-white p-5 w-full rounded-md shadow-md flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4 font-mono">
              Button Customizer
            </h2>
            <div className="mb-4">
              <label className="mr-2 font-mono">Font size:</label>
              <input
                type="number"
                min="0"
                className="text-white bg-gray-700 p-1 rounded-md font-mono"
                value={fontsize}
                onChange={handlefonts}
              />
            </div>
            <div className="mb-4">
              <label className="mr-2 font-mono">Font Weight:</label>

              <select
                name="weight-options"
                id="weight-options"
                onChange={handlefontw}
                value={fontw}
                className="text-white bg-gray-700 p-1 rounded-md font-mono"
              >
                {fontWeights.map((option) => (
                  <option name={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="mr-2 font-mono">Font Family:</label>

              <select
                name="family-options"
                id="family-options"
                onChange={handlefontf}
                value={fontf}
                className="text-white bg-gray-700 p-1 rounded-md font-mono"
              >
                {fontFamilies.map((option) => (
                  <option name={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </TabPanel>
      </Tabs>
      {showSuccessMessage && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-green-500 text-white px-4 py-2 rounded flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 inline-block mr-2 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="inline-block align-middle">
              Action successfully completed!
            </span>
          </div>
        </div>
      )}
      <nav className="bg-blue-500 py-4 px-6 flex items-center justify-between">
        <a
          href="https://web-dev-tools.vercel.app/"
          className="flex items-center border rounded p-2 hover:bg-blue-600 mr-2"
        >
          <h1 className="text-white  text-lg md:text-2xl font-bold mr-2">
            Web Dev Tools
          </h1>
          <p>Button Customizer</p>
        </a>
        <Search />
      </nav>

      <button
        className="m-3 bg-red-700 p-5 rounded"
        onClick={handleCodeButtonClick}
      >
        Code
      </button>

      {showCode && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className=" bg-slate-500 p-8">
            <p>
              <code>
                &lt;button style=" background-Color: {backgroundColor}; color:{" "}
                {textColor}; border-Radius: {borderRadius}px; padding: 10px
                20px; fontSize: {fontsize}px; fontWeight: {fontw}; font-Family:{" "}
                {fontf}; border: none; cursor: {cursor}; width: {width}px;
                height: {height}px; "&gt; Customized Button &lt;/button&gt;
              </code>
            </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 mt-4 mr-2"
              onClick={handleCopyCode}
            >
              Copy
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 mt-4"
              onClick={() => setShowCode(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
