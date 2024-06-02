"use client"

import { useState, useRef } from "react";
import { FileMetaData } from "@/app/models/app-interfaces";
import FilesTable from "@/app/components/FilesTable";

export default function FileUploadPage() {

  const [uploadedFilesList, SetUploadedFilesList] = useState<FileMetaData[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>){
    const file= event.target.files?.[0] as File;
    if(!file) return;
    else if(file.size>52428800){
      //show toast message
      alert("File size exceeds 50 MB");
      return;
    }
    else uploadFile(file);
  }

  function fileAlreadyExists(newFileMetaData: File){
    return uploadedFilesList.some((fileMetaData) => {
      return fileMetaData.name === newFileMetaData.name && fileMetaData.type === newFileMetaData.type;
    });
  }

  function appendNewFileMetaData(newFile: FileMetaData){
    SetUploadedFilesList((prevFiles) => [...prevFiles, newFile]);
  };

  function updateExistingFileMetaData(newFile: FileMetaData){
    SetUploadedFilesList(uploadedFilesList.map((file)=>{
      if(file.name === newFile.name && file.type === newFile.type) return newFile;
      else return file;
    }))
  }

  async function uploadFile(file: File){
    const fileExists: Boolean = fileAlreadyExists(file);
    if(fileExists){
      const overwriteFile = confirm(`file with the name and type already exists, do you want to overwrite`);
      if(!overwriteFile) return;
    }
    try {
      const formData = new FormData();
      formData.set('file', file as File);
      const response = await fetch(`/api/file`,{
        method: 'POST',
        body: formData
      }); 
      if(response.ok){
        //show toast message
        const newFile = (await response.json()).metadata;
        if(fileExists) updateExistingFileMetaData(newFile);
        else appendNewFileMetaData(newFile);
      } 
      else {
        //show toast message
        alert((await response.json()).message);
      }
    } catch (error) {
      //show toast message
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col p-4 space-y-4">
      <div className="flex flex-row align-middle">
        <label className="hidden mr-2 text-md font-medium" htmlFor="file_input">Upload file:</label>
        <input 
          className="w-fit hidden text-sm text-black border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" 
          id="file_input" 
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
        />
      </div>
      <div className="w-5/6 mx-auto">
            <div className="flex flex-row-reverse">
                <button type="button" onClick={()=>{fileInputRef.current?.click()}} className="w-fit text-white bg-zinc-600 hover:bg-zinc-700 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                    Upload File
                </button>
            </div>
        <FilesTable filesList={uploadedFilesList} />
      </div>
    </div>
  );
}
