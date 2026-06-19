# AchaBrasil — Cloud Functions

## checkPriceAlerts
Runs daily at **09:00 America/Sao_Paulo**. For each active document in the
Firestore `priceAlerts` collection it:

1. fetches the cheapest round-trip fare from the Travelpayouts Data API
   (`prices_for_dates v3`) for a near-future month;
2. decides if it's a good price:
   - if the user set a **target**, notify when `price <= target`;
   - if **no target**, it records a `baselinePrice` on first run and notifies
     on a **10%+ drop** vs that baseline;
3. emails the user via **Resend**, including a booking link (with the affiliate
   marker) and a one-click **unsubscribe** link
   (`/api/alertas/unsubscribe?id=…&token=…`).

A dedupe guard (`lastNotifiedPrice` / `lastNotifiedAt`) avoids re-emailing at the
same-or-higher price within 7 days.

## Required secrets
```bash
firebase functions:secrets:set TP_API_TOKEN      # Travelpayouts Data API token
firebase functions:secrets:set RESEND_API_KEY    # Resend API key
```

## Optional env (functions params / .env)
- `ALERT_FROM_EMAIL` — defaults to `AchaBrasil <alertas@achabrasil.com.br>`
- `SITE_URL` — defaults to `https://achabrasil.com.br`
- `TP_MARKER_ID` — defaults to `739432`

> **Resend:** the sending domain (achabrasil.com.br) must be **verified in
> Resend** (SPF/DKIM) before emails will deliver.

## Deploy
```bash
cd functions
npm install
npm run build
firebase deploy --only functions
```

## Test locally
```bash
npm run serve   # builds + starts the emulator
```
