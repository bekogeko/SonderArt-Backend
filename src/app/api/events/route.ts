import db from "@/db";
import { eventTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";

export async function GET(request: Request) {

  const events = await db.select().from(eventTable);
  return new Response(JSON.stringify(events), {
    headers: {
      "Content-Type": "application/json;",
    },
  });
}

export async function PUT(request: Request) {

  // request.headers.

  const canHeCreateEvents = (await auth()).orgPermissions?.some((perm) => perm === "CanCreateEvent");

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
    eventTime: new Date(),
    created_at: new Date(),
    publisher_id: userId,
  }).returning();


  
  return new Response(JSON.stringify(result), {
    headers: {
      "Content-Type": "application/json;",
    },
  });
}