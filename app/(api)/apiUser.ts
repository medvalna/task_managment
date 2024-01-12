'use server'
import { auth } from "@clerk/nextjs";
export const getUserId = async (): Promise<string> => {
    const { userId } = auth();
    if (!userId) {
      throw new Error("not logged in");
    }
    return userId;
  };