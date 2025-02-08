import db from "@/db";
import { eventTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";

export async function GET(request: Request) {

  // const events = await db.select().from(eventTable);
  const events = await db.select().from(eventTable);

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

  const canHeCreateEvents = (await auth()).orgPermissions?.some((perm) => perm === "org:feature:event_create");

  if(!canHeCreateEvents){
    return new Response("You are not allowed to create events", {
      status: 403
    });
  }

  // body with name
  // with eventTime
  // with created_at
  // with publisher_id
  const event = await request.json();


  console.log(event);
  
  const result = await db.insert(eventTable).values({
    name: event.name,
    publisher: (await auth()).userId as string,
  }).returning();


  
  return new Response(JSON.stringify(result), {
    headers: {
      "Content-Type": "application/json;",
    },
  });
}