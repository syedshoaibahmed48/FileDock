"use client"

export default function Navbar(){

  return(
      <nav id="header" className="w-full text-white py-1">
        <div className="w-full container mx-2 my-1 flex flex-wrap items-center justify-between mt-0">
          <div className=" flex items-center">
            <a
              className="text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
              href="/"
            >
              <svg
                className="h-6 w-6 inline-block fill-current text-yellow-700"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M13 8V0L8.11 5.87 3 12h4v8L17 8h-4z" />
              </svg>
              FileDock
            </a>
          </div>
        </div>
      </nav>
  );
}