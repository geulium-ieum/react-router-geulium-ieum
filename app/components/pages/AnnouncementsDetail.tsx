import { useLocation, Navigate, Link } from "react-router";
import { useParams } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

interface Announcement {
  id: string;
  title: string;
  content: string;
  createdDate: Date;
  isPinned: boolean;
  author: string;
}

export default function AnnouncementsDetail() {
  const location = useLocation();
  const state = location.state as
    | { announcement?: Announcement; announcements?: Announcement[] }
    | null;

  const { announcements } = state ?? {};
  const params = useParams();
  const announcement = announcements?.find(a => a.id === params.id);

  if (!announcement) {
    return <Navigate to="/announcements" replace />;
  }

  return (
    <div
      className="bg-gray-50"
    >
      <div
        className="max-w-7xl min-h-[calc(100vh-398px)] mx-auto px-4 sm:px-6 lg:px-8 py-12"
      >
        <Card
            className="flex-1 flex flex-col"
        >
            <CardHeader>
                <CardTitle className="text-2xl text-gray-900 font-bold">{announcement.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-gray-700 whitespace-pre-wrap">{announcement.content}</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}