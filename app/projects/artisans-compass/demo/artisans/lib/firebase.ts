// Web demo stub — the real app signs into Firebase anonymously for cloud sync.
// The demo runs fully offline, so every entry point resolves to a no-op.

export const firebaseApp: any = null;
export const firestore: any = null;
export const firebaseAuth: any = null;

export async function getFirebaseAnalytics(): Promise<null> {
    return null;
}

export function getCurrentUser(): null {
    return null;
}

export function subscribeUser(_cb: (user: null) => void): () => void {
    return () => { };
}

export function ensureSignedIn(): Promise<never> {
    return new Promise(() => { }); // never resolves — demo has no cloud session
}
