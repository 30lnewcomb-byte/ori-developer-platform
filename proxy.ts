import { clerkMiddleware } from "@clerk/nextjs/server";

// Initialize Clerk request context here. Protect each page and route handler
// at the resource itself so document requests can redirect to sign-in and
// API handlers can return an intentional JSON 401 response.
export default clerkMiddleware();

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
