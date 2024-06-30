"use client"

import { useState, useRef } from "react";
import { FileMetaData } from "@/app/models/app-interfaces";
import FilesTable from "@/app/components/FilesTable";
import  appConstants  from "@/assets/app-constants.json"
import { fileAlreadyExists } from "@/app/utils/FileUtils";

export default function FileUploadPage() {

  const [files, SetFiles] = useState<FileMetaData[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleFileUploadEvent(event: React.ChangeEvent<HTMLInputElement>){
    const file = event.target.files?.[0] as File;
    event.target.value = '';//clear file upload component
    if(!file) return;
    else if(file.size>appConstants.MAX_FILE_SIZE){
      //show toast message
      alert("File size exceeds 50 MB");
      return;
    }
    else if(fileAlreadyExists(files, file)){
      const overwrite = confirm(`file with the name and type already exists, do you want to overwrite`);
      if(overwrite) uploadFile(file, true);
      else return;
    }
    else uploadFile(file, false);
  }

  function appendNewFileMetaData(newFile: FileMetaData){
    SetFiles((prevFiles) => [...prevFiles, newFile]);
  };

  function updateExistingFileMetaData(newFile: FileMetaData){
    const index = files.findIndex(file => file.name === newFile.name && file.type === newFile.type);
    if (index !== -1) {
      const updatedFiles = [...files]; // Create a copy of the files array
      updatedFiles[index] = newFile; // Replace the file metadata at the found index
      SetFiles(updatedFiles); // Update the state with the modified array
    }
  }

  function removeFileMetaData(filename: string){
    SetFiles(files.filter( file => file.name !== filename ))
  }

  async function uploadFile(file: File, overwrite: boolean){
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
        if(overwrite) updateExistingFileMetaData(newFile);
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

  async function updateFile(filename: string){
    try {
      const response = await fetch(`/api/file/${filename}`,{
        method: 'PUT'
      });
    } catch (error) {
      //show toast message
      console.error(error);
    }
  }

  async function deleteFile(filename: string){
    try {
      const response = await fetch(`/api/file/${filename}`,{
        method: 'DELETE'
      });
      if(response.ok){
        //show toast message
        removeFileMetaData(filename);
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
          onChange={handleFileUploadEvent}
        />
      </div>
      <div className="w-5/6 mx-auto">
            <div className="flex flex-row-reverse">
                <button type="button" onClick={()=>{fileInputRef.current?.click()}} className="w-fit text-white bg-zinc-600 hover:bg-zinc-700 font-medium rounded-lg text-sm px-5 py-2.5 mb-2">
                    Upload File
                </button>
            </div>
        <FilesTable filesList={files} updateFile={updateFile} deleteFile={deleteFile} />
      </div>
    </div>
  );
}
