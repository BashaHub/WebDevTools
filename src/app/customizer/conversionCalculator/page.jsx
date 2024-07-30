"use client";

import { NavBar } from "@/app/components/navbar";

import React, { useEffect, useState } from "react";
const convert = require("convert-units");

export default function ButtonCustomizer() {
  const [from, setFrom] = useState("10");
  const [to, setTo] = useState("10000");
  const [opTo, setOpTo] = useState("m");
  const [opFrom, setOpFrom] = useState("km");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const options = convert()
    .possibilities("length")
    .filter((unit) => unit !== "px");

  const calc = () => {
    setTo(convert(from).from(opFrom).to(opTo));
  };

  const handleFromChange = (event) => {
    setFrom(event.target.value);
    calc();
  };

  const handleToChange = (event) => {
    setOpTo(event.target.value);
    calc();
  };

  const handleOpFromChange = (event) => {
    setOpFrom(event.target.value);
    calc();
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    calc();
  }, [calc, to, from, opFrom, opTo]);

  return (
    <main
      className={`${isDarkMode ? "bg-gray-900 text-gray-400" : "bg-white text-gray-800"} min-h-screen`}
    >
      <NavBar
        title={"Conversion Calculator"}
        isDarkMode={isDarkMode}
        toggleTheme={toggleTheme}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "calc(100vh - 15rem)",
        }}
      >
        <section
          className={`${isDarkMode ? "bg-slate-600" : "bg-slate-100"} flex flex-col gap-4 p-4 rounded md:flex-row`}
        >
          <section className="">
            <input
              type="number"
              value={from}
              className="text-black text-center p-2 border border-gray-300 rounded "
              onChange={handleFromChange}
            />
            <br></br>
            <select
              id="dropdown"
              value={opFrom}
              onChange={handleOpFromChange}
              className="bg-slate-500 text-center p-2 border border-gray-300 rounded w-full mt-2 text-black font-bold"
            >
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </section>
          <section className="flex flex-col gap-2">
            <input
              type="number"
              value={to}
              className="text-black text-center p-2 border border-gray-300 rounded"
              readOnly
            />
            <select
              id="dropdown"
              value={opTo}
              onChange={handleToChange}
              className="bg-slate-500 text-center p-2 border border-gray-300 rounded  text-black font-bold"
            >
              {options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </section>
        </section>
      </div>
    </main>
  );
}
