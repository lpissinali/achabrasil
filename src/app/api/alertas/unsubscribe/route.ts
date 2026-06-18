import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";

/**
 * GET /api/alertas/unsubscribe?id=<docId>&token=<unsubToken>
 * Sets the alert to inactive (LGPD opt-out). The token is the random
 * `unsubToken` stored on the document at creation, so no shared secret is
 * needed. Redirects to a friendly confirmation page either way.
 */
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const token = searchParams.get("token");

  const fail = () => NextResponse.redirect(new URL("/alertas/cancelado?erro=1", req.url));

  if (!id || !token) return fail();

  try {
    const ref = db().collection("priceAlerts").doc(id);
    const snap = await ref.get();
    if (!snap.exists || snap.data()?.unsubToken !== token) return fail();

    await ref.update({ active: false, unsubscribedAt: new Date().toISOString() });
    return NextResponse.redirect(new URL("/alertas/cancelado", req.url));
  } catch (err) {
    console.error("unsubscribe failed", err);
    return fail();
  }
}
