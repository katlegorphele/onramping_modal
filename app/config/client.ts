import { createThirdwebClient } from "thirdweb";

if (!process.env.NEXT_PUBLIC_THIRDWEB_KEY) {
  throw new Error("NEXT_PUBLIC_THIRDWEB_SECRET_KEY is not defined");
}

const thirdwebClient = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_KEY,
});

export { thirdwebClient };
