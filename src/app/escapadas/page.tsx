import { redirect } from "next/navigation";

// Merged into /ofertas (same data: cheapest destinations from a city).
export default function EscapadasPage() {
  redirect("/ofertas");
}
