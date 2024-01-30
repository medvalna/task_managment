import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";
export default authMiddleware({
  
  publicRoutes:["/"],
  afterAuth(auth, req){
    if(auth.userId && auth.isPublicRoute){
      let path = `/dashboard/${auth.userId}/inbox`;
      const dashboard = new URL(path, req.url);
      return NextResponse.redirect(dashboard);
    }
    
    if (!auth.userId &&   !auth.isPublicRoute){
      return redirectToSignIn({returnBackUrl: req.url});
    }
  }
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};