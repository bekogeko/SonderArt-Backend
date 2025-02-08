import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/db";
import { NextApiRequest } from "next";

export async function GET(request: NextApiRequest) {
  
  if(request.body == null){
    return new Response("No event id", { status: 400 });
  }

  // const events = await db.select().from(eventTable);
  const applications = await prisma.application.findMany({where:{
    eventId: request.body.eventId
  }});

  return new Response(JSON.stringify(applications), {
    headers: {
      "Content-Type": "application/json;",
    },
  });
}

export async function PUT(request: NextApiRequest) {

  // request.headers.
  await auth.protect();
  const user = (await auth());

  if(user.userId == null){
    return new Response("No user", { status: 400 });
  }


  if(request.body == null){
    return new Response("No event id", { status: 400 });
  }

  const application = await prisma.application.create({
    data: {
      eventId: request.body.eventId,
      event: {
        connect: {
          id: request.body.eventId
        }
      },
      email: request.body.email,
      imageUrl: request.body.imageUrl,
      fullName: request.body.fullName,
    }
  });

  return new Response(JSON.stringify(application), {
    headers: {
      "Content-Type": "application/json;",
    },
  });
}