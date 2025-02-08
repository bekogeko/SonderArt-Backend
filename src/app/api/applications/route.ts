import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/db";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const data = await request.json();

  if(data.eventId == null){
    return new Response("No event Id");
  }
  await auth.protect();

  // const events = await db.select().from(eventTable);
  const applications = await prisma.application.findMany({
    select:{
      email:true,
      fullName:true,
      imageUrl:true
    },
    where:{
      eventId: data.eventId
    }
  });

  return new Response(JSON.stringify(applications), {
    headers: {
      "Content-Type": "application/json;",
    },
  });
}

export async function PUT(request: NextRequest) {

  const data = await request.json();

  if(data.eventId == null || data.email == null || data.imageUrl == null ||fullName==null){
    return new Response("data i snecessary");
  }

  // request.headers.
  await auth.protect();
  const user = (await auth());

  if(user.userId == null){
    return new Response("No user", { status: 400 });
  }


  if(data == null){
    return new Response("No event id", { status: 400 });
  }

  const application = await prisma.application.create({
    data: {
      eventId: data.eventId,
      email: data.email,
      imageUrl: data.imageUrl,
      fullName: data.fullName,
      desc: data.desc
    },
    omit:{
      eventId:true
    }
  });



  return new Response(JSON.stringify(application), {
    headers: {
      "Content-Type": "application/json;",
    },
  });
}