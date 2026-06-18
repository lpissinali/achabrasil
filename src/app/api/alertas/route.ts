import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import { AIRPORTS } from "@/lib/airports";

/**
 * POST /api/alertas — create a price alert subscription.
 * Body: { origin, destination, email, targetPrice }
 * Stored in Firestore collection `priceAlerts`. A scheduled Cloud Function
 * (see /functions) reads these daily, checks the Travelpayouts Data API and
 * emails the user via Resend when the price drops.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const origin = String(body.origin ?? "").toUpperCase();
    const destination = String(body.destination ?? "").toUpperCase();
    const email = String(body.email ?? "").trim().toLowerCase();
    const targetPrice =
      body.targetPrice == null ? null : Number(body.targetPrice);

    if (!AIRPORTS[origin] || !AIRPORTS[destination]) {
      return NextResponse.json({ error: "Rota inválida." }, { status: 400 });
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ error: "E-mail inválido." }, { status: 400 });
    }

    const unsubToken = crypto.randomUUID();
    const ref = await db().collection("priceAlerts").add({
      origin,
      destination,
      email,
      targetPrice,
      active: true,
      unsubToken,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true, id: ref.id }, { status: 201 });
  } catch (err) {
    console.error("alertas POST failed", err);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
