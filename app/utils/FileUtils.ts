import { FileMetaData } from "../models/app-interfaces";

export function formattedTodaysDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0'); // Get day with leading zero if necessary
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Get month (January is 0)
    const yyyy = today.getFullYear(); // Get full year
    return `${dd}/${mm}/${yyyy}`;
}

export function fileAlreadyExists(files:FileMetaData[], newFile: File){
    return files.some((file) => {
      return file.name === newFile.name && file.type === newFile.type;
    });
}

export function fileNameWithoutExtension(filename: string){
  return filename.substring(0, filename.lastIndexOf('.'));
}