import { auth,clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/db";
import { NextApiRequest } from "next";
import { headers } from "next/headers";

export async function GET(request: NextApiRequest) {
  return new Response( (await (await clerkClient()).users.getUser(request.body.userId)).imageUrl,{
    headers:{
      "Content-Type": "application/json;",
    },
  });
}

export async function PUT(request: Request) {

  // request.headers should be there
  await auth.protect();

  // get user
  const user = (await auth());

  if(user.userId == null){
    return new Response("No user", { status: 400 });
  }
  
  return new Response(JSON.stringify(result), {
    headers: {
      "Content-Type": "application/json;",
    },
  });
}