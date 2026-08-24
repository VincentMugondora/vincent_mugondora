const textEncoder = new TextEncoder();

export async function signToken(payload: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    textEncoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    textEncoder.encode(payload)
  );
  
  const sigHex = Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
    
  return `${payload}.${sigHex}`;
}

export async function verifyToken(token: string, secret: string): Promise<boolean> {
  if (!token || !token.includes(".")) return false;
  
  const [payload, sigHex] = token.split(".");
  if (!payload || !sigHex) return false;
  
  const expectedToken = await signToken(payload, secret);
  return token === expectedToken;
}
