import Stripe from "stripe";

import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
    const { price, userId, plan } = await req.json();
 

    if (!userId) {
        return NextResponse.json({ error: "User not found" }, { status: 400 })
    }

    const successUrl = process.env.NEXT_PUBLIC_BASE_URL ? `${process.env.NEXT_PUBLIC_BASE_URL}/success` : null;
    const cancelUrl = process.env.NEXT_PUBLIC_BASE_URL ? `${process.env.NEXT_PUBLIC_BASE_URL}/cancel` : null;

    if (!successUrl || !cancelUrl) {
        return NextResponse.json({ error: "Frontend_url invalid" }, { status: 400 })
    }
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        unit_amount: price * 100,
                        product_data: {
                            name: `You are choosing ${plan} plan`
                        }
                    },
                    quantity: 1
                }
            ],
            mode: 'payment',
            success_url: successUrl,
            cancel_url: cancelUrl,
            metadata: {
                userId: userId as string
            }
        });
        return NextResponse.json({ sessionId: session.id, url: session.url }, { status: 200 })
    } catch (error) {
        console.log(error);
    }
}