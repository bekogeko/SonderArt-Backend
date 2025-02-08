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