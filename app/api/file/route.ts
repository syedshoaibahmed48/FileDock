import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/firebase-config";
import { ref, uploadBytes, getDownloadURL, getMetadata, list, listAll } from "firebase/storage" 

const firebaseRootDir = 'Uploaded-Files'

export async function POST(req: NextRequest) {
  try {
    const file: File  = (await req.formData()).get('file') as unknown as File;//type casting to explicitly treat file as a File type.
    if(file == 'undefined' as unknown as File) return NextResponse.json({ message: "No file found" }, { status: 400 });
    const directoryRef = ref(storage, firebaseRootDir);
    const fileStorageRef = ref(storage, `${firebaseRootDir}/${file.name}`);
    await uploadBytes(fileStorageRef, file);
    return NextResponse.json({ metadata: { name: file.name, size: file.size, type: file.type, dateUploaded: Date() } }, { status: 200 });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ message: "File upload failed" }, { status: 500 });
  }
}