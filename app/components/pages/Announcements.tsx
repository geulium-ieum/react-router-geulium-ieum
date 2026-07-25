import { useState } from "react";
import { FileText, Plus, Edit, Trash2, Calendar, Pin } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import type { User as UserType } from "~/types";
import { toast } from "sonner";
import { Footer } from "~/components/organisms/Footer";
import { Switch } from "~/components/ui/switch";
import { Link, useRouteLoaderData } from "react-router";
import type { Route } from "./+types/Announcements";
import { userService } from "~/lib/services/user";
import type { Route as RootRoute } from "../../+types/root";
import { getSession } from "~/lib/sessions.server";
import { userContext } from "~/context/userContext";
import { formatNoticeDate } from "~/lib/utils";
import { usePagination } from "~/lib/utils";
import CustomPagination from "~/components/organisms/Pagination";

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

export async function action({ request, context }: Route.LoaderArgs) {
  const user = context.get(userContext);
  const cookie = request.headers.get("Cookie");
  const session = await getSession(cookie);
  const token = session.get("token");
  const formData = await request.formData();
  const title = formData.get("title") as string;
}

export async function loader() {
  const response = await userService.get.announcementList();
  const announcements = Array.isArray(response)
    ? response
    : ((response as { content?: unknown[] }).content ?? []);
  return { announcements };
}

const PAGE_SIZE = 10;

export default function Announcements({ loaderData }: Route.ComponentProps) {
  const { announcements } = loaderData;
  const { currentPage, totalPages, currentItems, goToPage } = usePagination(
    announcements,
    PAGE_SIZE,
  );
  const { user } = useRouteLoaderData(
    "root",
  ) as RootRoute.ComponentProps["loaderData"];
  const isAdmin = user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";

  const [announcementsState, setAnnouncementsState] = useState<Announcement[]>(
    announcements ?? [],
  );
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState<Announcement | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newIsPinned, setNewIsPinned] = useState(false);

  const openEditDialog = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setNewTitle(announcement.title);
    setNewContent(announcement.content);
    setNewIsPinned(announcement.isPinned);
    setIsEditDialogOpen(true);
  };

  const sortedAnnouncements = [...currentItems].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl min-h-[calc(100vh-398px)] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div>
          <h1 className="text-3xl text-gray-900 mb-4">공지사항</h1>
          <p className="text-gray-600 mb-4">
            중요한 소식과 업데이트를 확인하세요
          </p>
        </div>
        {/* Announcements List */}
        <div className="space-y-4">
          {sortedAnnouncements.map((announcement) => (
            <Link
              key={announcement.id}
              to={`/announcements/${announcement.id}`}
              state={{ announcements: announcementsState }}
              className="block"
            >
              <Card
                key={announcement.id}
                className={`p-6 hover:shadow-md transition-shadow ${announcement.isPinned ? "border-l-4 border-l-purple-500" : ""}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {announcement.isPinned && (
                        <Pin className="w-4 h-4 text-purple-600" />
                      )}
                      <Link
                        to={`/announcements/${announcement.id}`}
                        className="hover: cursor-pointer"
                        state={{ announcements }}
                      >
                        <h2 className="text-xl">{announcement.title}</h2>
                      </Link>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatNoticeDate(announcement.createdAt)}
                      </span>
                      <span>{announcement.authorName}</span>
                      {/* <span>{announcement.authorId}</span> */}
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}

          {announcementsState.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">
                공지사항이 없습니다
              </h3>
              <p className="text-gray-600">
                새로운 공지사항이 등록되면 여기에 표시됩니다
              </p>
            </div>
          )}
        </div>{" "}
        <div className="flex justify-center mt-4">
          <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
