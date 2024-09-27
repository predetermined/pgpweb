import { useEffect, useState } from "react";

interface EncryptedValue {
  salt: string;
  iv: string;
  content: string;
}

async function getKey(password: string, salt: BufferSource) {
  const passwordBytes = new TextEncoder().encode(password);

  const initialKey = await crypto.subtle.importKey(
    "raw",
    passwordBytes,
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
    initialKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

export const useStateAndLocalStorage = <T>(
  key: string,
  options?: {
    encryptionPassword?: string;
    isDisabled?: boolean;
    fallback?: T;
  }
): {
  value: T | null;
  set(value: T): void;
} => {
  const [value, setValue] = useState<T | null>(null);

  const getTransformedFromLocalStorage = async (value: string) => {
    if (options?.encryptionPassword) {
      const jsonParsed = JSON.parse(value) as EncryptedValue;
      const salt = new Uint8Array(
        jsonParsed.salt.split(",").map((x) => Number(x))
      );
      const iv = new Uint8Array(jsonParsed.iv.split(",").map((x) => Number(x)));
      const content = new Uint8Array(
        jsonParsed.content.split(",").map((x) => Number(x))
      );

      const key = await getKey(options.encryptionPassword, salt);
      return JSON.parse(
        new TextDecoder().decode(
          new Uint8Array(
            await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, content)
          )
        )
      );
    }

    return JSON.parse(value) as T;
  };

  const getTransformedToLocalStorage = async (value: T) => {
    if (options?.encryptionPassword) {
      const salt = crypto.getRandomValues(new Uint8Array(12));
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const key = await getKey(options.encryptionPassword, salt);
      const content = new Uint8Array(
        await crypto.subtle.encrypt(
          { name: "AES-GCM", iv },
          key,
          new TextEncoder().encode(JSON.stringify(value))
        )
      );
      return JSON.stringify({
        salt: salt.join(","),
        iv: iv.join(","),
        content: content.join(","),
      });
    }

    return JSON.stringify(value);
  };

  const loadValue = async () => {
    const v = localStorage.getItem(key);
    console.debug(`LocalStorage[${key}]: Loading`);
    if (!v) {
      console.debug(`LocalStorage[${key}]: No value`);
      if (options?.fallback) {
        console.debug(`LocalStorage[${key}]: Setting to fallback`);
        setValue(options.fallback);
      }
      return;
    }
    const value = await getTransformedFromLocalStorage(v);
    setValue(value);
  };

  const set = async (value: T) => {
    setValue(value);
    localStorage.setItem(key, await getTransformedToLocalStorage(value));
    console.debug(`LocalStorage[${key}]: Set to: ${value}`);
  };

  useEffect(() => {
    if (options?.isDisabled) return;
    try {
      loadValue();
    } catch {
      alert("Loading values from localstorage failed");
    }
  }, [options?.isDisabled, options?.encryptionPassword]);

  return {
    value,
    set,
  };
};
