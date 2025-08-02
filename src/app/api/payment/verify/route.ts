import { NextRequest, NextResponse } from "next/server";
import { Cashfree, CFEnvironment } from "cashfree-pg";

export async function GET(req: NextRequest) {
  const order_id = req.nextUrl.searchParams.get("order_id");
  if (!order_id)
    return NextResponse.json(
      { error: "Order ID is required" },
      { status: 400 }
    );

  const cashfree = new Cashfree(
    CFEnvironment.SANDBOX,
    process.env.CASHFREE_CLIENT_ID!,
    process.env.CASHFREE_CLIENT_SECRET!
  );

  // Cashfree.XClientId = process.env.CASHFREE_CLIENT_ID!;
  // Cashfree.XClientSecret = process.env.CASHFREE_CLIENT_SECRET!;
  // Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;

  try {
    const { data } = await cashfree.PGOrderFetchPayments(order_id);

    return NextResponse.json({ payments: data }, { status: 200 });
  } catch (error: any) {
    console.error(error.response?.data || error);
    return NextResponse.json({ error: "verification failed" }, { status: 500 });
  }
}
