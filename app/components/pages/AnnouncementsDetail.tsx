import { useLocation, Navigate, Link } from "react-router";
import { useParams } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import type { Route } from "./+types/AnnouncementsDetail";
import { Button } from "~/components/ui/button";
import moment from "moment";

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
  authorName: string;
}

// function elapsedTime(date) {
//   const start = new Date(date);
//   const end = new Date();

//   const diff = (end - start) / 1000;

//   const times = [
//     { name: '년', milliSeconds: 60 * 60 * 24 * 365 },
//     { name: '개월', milliSeconds: 60 * 60 * 24 * 30 },
//     { name: '일', milliSeconds: 60 * 60 * 24 },
//     { name: '시간', milliSeconds: 60 * 60 },
//     { name: '분', milliSeconds: 60 },
//   ];

//   for (const value of times) {
//     const betweenTime = Math.floor(diff / value.milliSeconds);

//     if (betweenTime > 0) {
//       return `${betweenTime}${value.name} 전`;
//     }
//   }
//   return '방금 전';
// }

// elapsedTime('2022-11-15');

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
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="text-2xl text-gray-900 font-bold">
              {announcement.title}
            </CardTitle>
            <div className="justify-end">
              <p className="text-gray-700">{announcement.authorName}</p>
              <p className="text-gray-700">
                {moment(announcement.createdAt).format("YY-MM-DD HH-mm")}
              </p>
            </div>
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
