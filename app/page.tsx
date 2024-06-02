"use client"

export default function Home() {
  
  return (
    <div className="w-screen h-screen">
      <section className="text-white">
        <div className="w-screen h-screen px-4 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h1
              className="bg-clip-text text-6xl font-extrabold text-white"
            >
              Understand User Flow.
            </h1>

            <p className="mx-auto mt-4 max-w-xl text-xl/relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus
              numquam ea!
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                className="block w-full rounded border border-teal-500 bg-teal-500 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                href="/file-upload"
              >
                File Upload Page
              </a>

              <a
                className="block w-full rounded border border-teal-500 px-12 py-3 text-sm font-medium text-white hover:bg-teal-500 focus:outline-none focus:ring active:bg-teal-500 sm:w-auto"
                href="/signin"
              >
                Signin Page
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
