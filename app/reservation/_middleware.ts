import { authMiddleware } from "@clerk/nextjs";


export default authMiddleware({});

export const config = {
  matcher: ["/reservation/:path*"],
};