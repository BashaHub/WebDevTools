import Search from './search';

export default function Nav() {
  return (
    <nav className="bg-blue-500 py-4 px-6 flex">
      <div className="text-white text-2xl font-bold w-20%">Web Dev Tools</div>

      <Search />

      <div className="ml-80">
        <a href='/codeedit' className=' mr-5'>
          New Project
        </a>

        <a href="#about" className="text-white">
          About
        </a>
        
        
        <a href="#contribute" className="text-white ml-7">
          contribute
        </a>
        
      </div>
    </nav>
  );
}
