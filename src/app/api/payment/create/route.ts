import { NextResponse } from "next/server";
import { Cashfree, CFEnvironment } from "cashfree-pg";
import crypto from "crypto";
import { auth } from "@clerk/nextjs/server";

export async function POST() {
  const user = auth();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const cashfree = new Cashfree(
    CFEnvironment.SANDBOX,
    process.env.CASHFREE_CLIENT_ID!,
    process.env.CASHFREE_CLIENT_SECRET!
  )

//   Cashfree.XClientId = process.env.CASHFREE_CLIENT_ID!;
//   Cashfree.XClientSecret = process.env.CASHFREE_CLIENT_SECRET!;
//   Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

  const order_id = crypto.randomUUID();

  const reqBody = {
    order_amount: 999,
    order_currency: "INR",
    order_id,
    customer_details: {
      customer_id: "1234",
      customer_name: "John Doe",
      customer_phone: "1234567890",
    },
    order_meta: {
      return_url: `${process.env.NEXT_PUBLIC_URL}/payment/return?order_id=${order_id}`,
    //   notify_url: `${process.env.NEXT_PUBLIC_URL}/api/payment/webhook`,
    },
    order_note: ''
  };

  try {
    const { data } = await cashfree.PGCreateOrder(reqBody);
    return NextResponse.json(
      { payment_session_id: data.payment_session_id, order_id: data.order_id },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error.response?.data || error);
    return NextResponse.json({ error: "Cashfree error", detail: error.response?.data || error.message }, { status: 500 });
  }
}
