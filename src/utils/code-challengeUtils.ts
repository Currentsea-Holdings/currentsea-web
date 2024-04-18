async function sha256(plain: string): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest('SHA-256', data);
}

function base64urlencode(buffer: ArrayBuffer): string {
  return btoa(String.fromCharCode.apply(null, Array.from(new Uint8Array(buffer))))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

async function generateCodeChallenge(codeVerifier: string): Promise<string> {
  const hashBuffer = await sha256(codeVerifier);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return base64urlencode(new Uint8Array(hashArray));
}

function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  return Array.from(window.crypto.getRandomValues(new Uint8Array(length)))
    .map((byte) => characters[byte % characters.length])
    .join('');
}

export const codeVerifier = generateRandomString(128);
export const codeChallenge = generateCodeChallenge(codeVerifier);