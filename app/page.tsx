export default function Home() {
  return (
    <div className="flex flex-col p-4 space-y-4">
      <div className="flex flex-row align-middle">
        <label className="block mr-2 text-md font-medium text-gray-900" htmlFor="file_input">Upload file:</label>
        <input className="w-fit block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" id="file_input" type="file" />
      </div>
      <button type="button" className="w-fit text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">Submit</button>
    </div>
  );
}
