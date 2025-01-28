import { StartPage } from "@/components/start-page";
import type { UserInfo } from "@/types/qa";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const userInfoCookie = cookieStore.get("user-info");
  let userInfo: UserInfo | null = null;

  if (userInfoCookie) {
    try {
      userInfo = JSON.parse(userInfoCookie.value);
    } catch (error) {
      console.error("Failed to parse user info cookie:", error);
    }
  }

  return (
    <main className="min-h-screen p-4 flex items-center justify-center">
      <StartPage userInfo={userInfo} />
    </main>
  );
}
