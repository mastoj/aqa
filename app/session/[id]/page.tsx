import { QASession } from "@/components/qa-session";
import { getSession } from "@/lib/session-store";
import type { UserInfo } from "@/types/qa";
import { cookies } from "next/headers";

export default async function SessionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
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

  if (!userInfo) {
    return <div>Error: User information not found</div>;
  }

  const initialSession = await getSession(id);

  if (!initialSession) {
    return <div>Error: Session not found</div>;
  }

  console.log("==> Stuff: ", {
    userInfo,
    id,
    initialSession,
    sessionType: typeof initialSession,
  });
  return (
    <main className="min-h-screen p-4 flex items-center justify-center">
      <QASession
        userInfo={userInfo}
        sessionId={id}
        initialSession={{
          id: initialSession.id,
          title: initialSession.title,
          questions: initialSession.questions,
        }}
      />
    </main>
  );
}
