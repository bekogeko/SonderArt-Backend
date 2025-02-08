import { clerkClient } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {

  const data = await request.json();
  return new Response( (await (await clerkClient()).users.getUser(data.userId)).imageUrl,{
    headers:{
      "Content-Type": "application/json;",
    },
  });
}