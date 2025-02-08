import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/db";

export async function GET(request: Request) {

  // const events = await db.select().from(eventTable);
  const events = await prisma.event.findMany();
  console.log(request);
  // send json
  return new Response(JSON.stringify(events), {
    headers: {
      "Content-Type": "application/json;",
    },
  });
}

export async function PUT(request: Request) {

  // request.headers.
  await auth.protect();

  const user = (await auth());

  if (user.userId == null){
    return new Response("Unauthorized", { status: 401 });
  }

  // body with name
  // with eventTime
  // with created_at
  // with publisher_id
  const event = await request.json();


  console.log(event);
  
  const result = await prisma.event.create({
    data: {
      name: event.name,
      eventTime: new Date(event.eventTime),
      created_at: new Date(),
      publisher: user.userId,
      city: event.city,
      location: event.location,
    }
  });


  
  return new Response(JSON.stringify(result), {
    headers: {
      "Content-Type": "application/json;",
    },
  });
}