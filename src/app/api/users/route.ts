import { clerkClient } from "@clerk/nextjs/server";
import { NextApiRequest } from "next";

export async function GET(request: NextApiRequest) {
  return new Response( (await (await clerkClient()).users.getUser(request.body.userId)).imageUrl,{
    headers:{
      "Content-Type": "application/json;",
    },
  });
}