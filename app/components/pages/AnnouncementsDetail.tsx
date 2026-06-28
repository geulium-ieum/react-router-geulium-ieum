import { useLocation, Navigate, Link } from "react-router";
import { useParams } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { Route } from "./+types/AnnouncementsDetail";
import { Button } from "~/components/ui/button";

interface Announcement {
  id: string;
  title: string;
  content: string;
  authorId: string;
  isPublished: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  isPinned: boolean;
}

export default function AnnouncementsDetail() {
  const location = useLocation();
  const state = location.state as {
    announcement?: Announcement;
    announcements?: Announcement[];
  } | null;

  const { announcements } = state ?? {};
  const params = useParams();
  const announcement = announcements?.find((a) => a.id === params.id);

  if (!announcement) {
    return <Navigate to="/announcements" replace />;
  }

  return (
    <div className="bg-gray-50">
      <div className="max-w-7xl min-h-[calc(100vh-398px)] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div>
          <h1 className="text-3xl text-gray-900 mb-4">공지사항</h1>
        </div>
        <Card className="mb-2 flex-1 flex flex-col">
          <CardHeader className="mb-8 flex items-center justify-between">
            <CardTitle className="text-2xl text-gray-900 font-bold">
              {announcement.title}
            </CardTitle>
            <span className="text-gray-700">{announcement.createdAt}</span>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-gray-700 whitespace-pre-wrap">
              {announcement.content}
            </p>
          </CardContent>
        </Card>
        <div className="mb-2 flex justify-end">
          <Button>
            <Link to="/announcements">목록으로 돌아가기</Link>
          </Button>
        </div>
        <div className="border-[1px] border-lightGray/30"></div>
      </div>
    </div>
  );
}
