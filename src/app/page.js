import Image from 'next/image';
import Nav from './assets/nav';
import React from 'react';

export default function Home({state}) {
  return (
    <main className="">
      <title>Web dev tools</title>
      <Nav></Nav>
      <div id='about' className="py-8 px-6 flex justify-center">
        <div className="rounded-full bg-gradient-to-t from-slate-400 w-3/6 p-10">
          <h1 className="text-white text-2xl font-bold">About</h1>
          <p className="text-white mt-4">WebDev Tools is a comprehensive online platform designed to empower web developers with a wide array of code samples and snippets. Whether you are a seasoned professional or just starting your journey in web development, our website provides you with a vast collection of code examples to streamline your workflow, enhance productivity, and create exceptional websites and web applications.</p>
        </div>
      </div>
      <div id='contribute' className="py-8 px-6 flex justify-center ml-5 mt-10">
        <div className="rounded-full bg-gradient-to-t from-slate-400 w-3/6 p-10">
          <h1 className="text-white text-2xl font-bold">Contribute</h1>
          <p className="text-white mt-4">
            To contribute go to the <a href='https://github.com/Bashamega/WebDevTools' className=' hover:border-b-2 border-white'>github repo</a>.<br></br>
            Then follow the guid in the Readme  
          </p>
        </div>
      </div>
    </main>
  );
}
