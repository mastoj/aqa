import { QASession } from "@/components/qa-session";
import { getSession } from "@/lib/session-store";
import type { UserInfo } from "@/types/qa";
import { cookies } from "next/headers";

export default async function SessionPage({
  params,
}: {
  params: { id: string };
}) {
  const cookieStore = cookies();
  const userInfoCookie = cookieStore.get("user-info");
  let userInfo: UserInfo | null = null;

  if (userInfoCookie) {
    try {
      userInfo = JSON.parse(userInfoCookie.value);
    } catch (error) {
      console.error("Failed to parse user info cookie:", error);
    }
  }

  if (!userInfo) {
    return <div>Error: User information not found</div>;
  }

  const session = await getSession(params.id);

  if (!session) {
    return <div>Error: Session not found</div>;
  }

  return (
    <main className="min-h-screen p-4 flex items-center justify-center">
      <QASession userInfo={userInfo} initialSession={session} />
    </main>
  );
}
