// app/api/updateProjectById/route.ts
import { NextRequest, NextResponse } from "next/server";

import Project from "@/app/(models)/ProjectSchema";

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const body = await request.json();

  if (!id) {
    return new NextResponse(
      JSON.stringify({ message: "Project ID is required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  if (!body || Object.keys(body).length === 0) {
    return new NextResponse(
      JSON.stringify({ message: "Update data is required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  try {
    const result = await Project.updateOne({ _id: id }, { $set: body });

    if (result.modifiedCount === 0) {
      return new NextResponse(
        JSON.stringify({ message: "Project not found or not modified" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    console.log("Project updated successfully", result);
    return new NextResponse(
      JSON.stringify({ message: "Project updated successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error updating project:", error);
    return new NextResponse(
      JSON.stringify({ message: "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
