import { initializeApp, getApps, cert, type App } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

/**
 * Firestore (Admin SDK) — server-side only.
 *
 * On Firebase App Hosting / Cloud Run the SDK auto-discovers credentials via
 * Application Default Credentials, so no key file is needed in production.
 * For local dev, set GOOGLE_APPLICATION_CREDENTIALS to a service-account JSON,
 * or run `firebase emulators:start` and set FIRESTORE_EMULATOR_HOST.
 */
let app: App | undefined;

function getAdminApp(): App {
  if (getApps().length) return getApps()[0]!;
  const projectId = process.env.GOOGLE_CLOUD_PROJECT ?? process.env.GCLOUD_PROJECT;
  const saJson = process.env.SERVICE_ACCOUNT_JSON;
  app = initializeApp(
    saJson ? { credential: cert(JSON.parse(saJson)) } : { projectId },
  );
  return app;
}

export function db(): Firestore {
  return getFirestore(getAdminApp());
}
