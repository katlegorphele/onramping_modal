import { createThirdwebClient } from "thirdweb";

const thirdwebClient = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT as string,
});

export {thirdwebClient}