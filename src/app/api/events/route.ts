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

  // request.headers should be there
  await auth.protect();

  // get user
  const user = (await auth());

  if(user.userId == null){
    return new Response("No user", { status: 400 });
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
      eventTime: event.eventTime,
      created_at: new Date(),
      publisher: user.userId,
      city: event.city,
      location: event.location,
      imageUrl: event.imageUrl || "https://firebasestorage.googleapis.com/v0/b/sonderart-1be4d.firebasestorage.app/o/IMG_user_2slk0bCjiW8cUUTjg6iR1aJmjZ5.jpeg?alt=media&token=7b33381c-c4f5-4710-8f71-2508e7e7560c",
    }
  });


  
  return new Response(JSON.stringify(result), {
    headers: {
      "Content-Type": "application/json;",
    },
  });
}