import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/app/configs/firebase-config";
import { deleteObject, getBytes, getMetadata, ref, updateMetadata } from "firebase/storage" 

export async function GET(req: NextRequest, { params }: { params: { filename : string }}){
  try {
    const { filename } = params;
    if(!filename) return NextResponse.json({ message: "Filename parameter missing" }, { status: 400 });
    const fileStorageRef = ref(storage, `${process.env.Firebase_Storage_Root_Dir}/${filename}`);
    const { contentType: fileType, size: fileSize } = await getMetadata(fileStorageRef);
    const fileBytes = await getBytes(fileStorageRef);
    const buffer = Buffer.from(fileBytes);
    const res = new NextResponse(buffer);
    res.headers.set('Content-Type', `${fileType}`);
    res.headers.set('Content-Length', `${fileSize}`);
    res.headers.set('Content-Disposition', `attachment; filename="${filename}"`);
    return res;
  } catch (error) {
    console.error("Error fetching file:", error);
    return NextResponse.json({ message: "File fetching failed" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { filename : string }}) {
  try {
    const { filename } = params;
    if(!filename) return NextResponse.json({ message: "Filename parameter missing" }, { status: 400 });
    // update metadata in db
    return NextResponse.json({ updated: "Done" }, { status: 200 });
  } catch (error) {
    console.error("Error updating file metadata:", error);
    return NextResponse.json({ message: "File update failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { filename : string }}){
  try {
    const { filename } = params;
    if(!filename) return NextResponse.json({ message: "Filename parameter missing" }, { status: 400 });
    const fileStorageRef = ref(storage, `${process.env.Firebase_Storage_Root_Dir}/${filename}`);
    await deleteObject(fileStorageRef);
    return NextResponse.json({ deleted: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json({ message: "File deletion failed" }, { status: 500 });
  }
}