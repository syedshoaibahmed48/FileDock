import { FileMetaData } from "@/app/models/app-interfaces";
import Link from "next/link";
import fileTypes from "@/assets/file_types_mapping.json"
import { fileNameWithoutExtension } from "../utils/FileUtils";

export default function FilesTable({filesList, updateFile, deleteFile}: {filesList: FileMetaData[], updateFile: (filename: string) => Promise<void>, deleteFile: (filename: string) => Promise<void>}){

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
                        const filename = fileNameWithoutExtension(name);
                        const filetype = fileTypes[type as keyof typeof fileTypes] || "file";
                        const sizeInKb = Math.ceil(size/1024);
                        return(
                            <tbody key={name+type}>
                                <tr className="bg-zinc-600 border-b border-gray-700">
                                    <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                        {filename}
                                    </td>
                                    <td className="px-6 py-4">
                                        {dateUploaded}
                                    </td>
                                    <td className="px-6 py-4">
                                        {filetype}
                                    </td>
                                    <td className="px-6 py-4">
                                        {sizeInKb} KB
                                    </td>
                                    <td className="flex flex-row px-6 py-4">
                                        <div className="flex flex-row justify-between">
                                            <div>
                                                <Link href={`/api/file/${name}`}>
                                                    <svg className="w-6 h-6 text-white hover:text-zinc-400 mx-auto" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 18"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"/></svg>
                                                </Link>
                                            </div>
                                            <div onClick={()=>{deleteFile(name)}}>
                                                <svg className="w-6 h-6 fill-black hover:fill-gray-700 mx-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>
                                            </div>
                                            <div onClick={()=>{updateFile(name)}}>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 fill-white hover:fill-zinc-400 mx-auto" viewBox="0 0 576 512"><path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"/></svg>
                                            </div>
                                        </div>
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