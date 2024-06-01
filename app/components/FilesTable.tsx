import { FileMetaData } from "@/app/models/app-interfaces";
import fileTypeMapping from "@/assets/file_types_mapping.json"

export default function FilesTable({filesList}: {filesList: FileMetaData[]}){

    return(
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
            
            <table className="w-full text-sm text-left rtl:text-right text-gray-200">
                <thead className="text-xs  uppercase bg-zinc-700">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Date Uploaded
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Type
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Size
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Action
                        </th>
                    </tr>
                </thead>
                { filesList.length === 0 ? (
                    <tbody>
                        <tr className="bg-zinc-600 border-b border-gray-700 text-center">
                            <td colSpan={5} className="p-4 text-md">No file uploaded.</td>
                        </tr>
                </tbody>
                ) : (
                    filesList.map(({name, type, size, dateUploaded})=>{
                        const dateObj = new Date(dateUploaded);
                        const formattedDate = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
                        const fileType = fileTypeMapping[type as keyof typeof fileTypeMapping] || "Unknown File Type";
                        const sizeInKb = Math.ceil(size/1024);
                        return(
                            <tbody key={name+type}>
                                <tr className="bg-zinc-600 border-b border-gray-700">
                                    <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                        {name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {formattedDate}
                                    </td>
                                    <td className="px-6 py-4">
                                        {fileType}
                                    </td>
                                    <td className="px-6 py-4">
                                        {sizeInKb} KB
                                    </td>
                                    <td className="px-6 py-4">
                                        <svg className="w-6 h-6 text-white hover:text-zinc-400 mx-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"/>
                                        </svg>
                                    </td>
                                </tr>
                            </tbody>
                        )
                    })
                )}
            </table>
        </div>
    );
}