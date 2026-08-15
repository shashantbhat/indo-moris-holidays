const encoder = new TextEncoder();

function toBase64(bytes: Uint8Array): string {
    let binary = "";

    for (const byte of bytes) {
        binary += String.fromCharCode(byte);
    }

    return btoa(binary);
}

function fromBase64(value: string): Uint8Array {
    const binary = atob(value);

    return Uint8Array.from(binary, char => char.charCodeAt(0));
}

export async function hashPassword(password: string): Promise<string> {
    const salt = crypto.getRandomValues(new Uint8Array(16));

    const keyMaterial = await crypto.subtle.importKey(
        "raw",
        encoder.encode(password),
        "PBKDF2",
        false,
        ["deriveBits"]
    );

    const hash = await crypto.subtle.deriveBits(
        {
            name: "PBKDF2",
            salt,
            iterations: 310_000,
            hash: "SHA-256",
        },
        keyMaterial,
        256
    );

    return [
        "pbkdf2",
        "sha256",
        "310000",
        toBase64(salt),
        toBase64(new Uint8Array(hash)),
    ].join("$");
}

export async function verifyPassword(
    password: string,
    storedHash: string
): Promise<boolean> {
    const parts = storedHash.split("$");

    if (parts.length !== 5) {
        return false;
    }

    const [, algorithm, iterationsString, saltBase64, hashBase64] = parts;

    if (algorithm !== "sha256") {
        return false;
    }

    const iterations = Number(iterationsString);

    const salt = fromBase64(saltBase64);
    const expectedHash = fromBase64(hashBase64);

    const keyMaterial = await crypto.subtle.importKey(
        "raw",
        encoder.encode(password),
        "PBKDF2",
        false,
        ["deriveBits"]
    );

    const hash = await crypto.subtle.deriveBits(
        {
            name: "PBKDF2",
            salt,
            iterations,
            hash: "SHA-256",
        },
        keyMaterial,
        256
    );

    const actualHash = new Uint8Array(hash);

    if (actualHash.length !== expectedHash.length) {
        return false;
    }

    let difference = 0;

    for (let i = 0; i < actualHash.length; i++) {
        difference |= actualHash[i] ^ expectedHash[i];
    }

    return difference === 0;
}