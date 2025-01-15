import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { createSubscription } from "@/actions/userSubscription";
import { NextResponse } from 'next/server';
 
const relevantEvents = new Set([
  "checkout.session.completed",
]);

export async function POST(req: Request) {

  if (!process.env.WEBHOOK_ENDPOINT_SECRET) {
    throw new Error("WEBHOOK_ENDPOINT_SECRET is not set");
  }

  const secret = process.env.WEBHOOK_ENDPOINT_SECRET!;
  const payload = await req.text(); // Read the raw body as text
  const sig = req.headers.get("stripe-signature") as string; // Retrieve the signature from headers

  if (!sig) {
    return NextResponse.json({ error: "Missing Stripe signature header" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    // Verify and construct the event using the raw body, signature, and secret
    event = stripe.webhooks.constructEvent(payload, sig, secret);
  } catch (err) {
    console.log(`Webhook signature verification failed.`, err);
    return NextResponse.json(
      { error: "Webhook signature verification failed" },
      { status: 400 }
    );
  }

  // Handle relevant Stripe events
  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case "checkout.session.completed": {
          const session = event.data.object as Stripe.Checkout.Session; 
          const userId = session.metadata?.userId as string;
          // Call your function to create a subscription 
          await createSubscription({ userId }); 
          break;
        }
        default:
          break;
      }
    } catch (error) {
      console.log("Error processing event", error);
      return NextResponse.json(
        { error: `Error processing event ${event.type}` },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}

 