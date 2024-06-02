import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/app/configs/firebase-config";
import { ref, uploadBytes } from "firebase/storage" 

const firebaseRootDir = 'Uploaded-Files'

export async function POST(req: NextRequest) {
  try {
    const file: File  = (await req.formData()).get('file') as unknown as File;//type casting to explicitly treat file as a File type.
    if(file == 'undefined' as unknown as File) return NextResponse.json({ message: "No file found" }, { status: 400 });
    else if(file.size>52428800) return NextResponse.json({ message: "File size exceeds the maximum allowed limit, Please upload a file that is smaller than 50 MB." }, { status: 413 });
    const fileStorageRef = ref(storage, `${firebaseRootDir}/${file.name}`);
    await uploadBytes(fileStorageRef, file);
    return NextResponse.json({ metadata: { name: file.name, size: file.size, type: file.type, dateUploaded: Date() } }, { status: 200 });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ message: "File upload failed" }, { status: 500 });
  }
}