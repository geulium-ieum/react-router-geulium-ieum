import { useState } from 'react';
import { FileText, Plus, Edit, Trash2, Calendar, Pin } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Card } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Textarea } from '~/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog';
import type { User as UserType } from '~/types';
import { toast } from 'sonner';
import { Footer } from '~/components/organisms/Footer';
import { Switch } from '~/components/ui/switch';
import { Link } from 'react-router';

interface AnnouncementsProps {
  user: UserType | null;
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  createdDate: Date;
  isPinned: boolean;
  author: string;
}

export default function Announcements({ user }: AnnouncementsProps) {
  const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN';

  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: '1',
      title: '추석 연휴 안내',
      content: '추석 연휴 기간(9월 16일~18일) 동안 온라인 추모 서비스는 정상 운영됩니다. 다만, 고객센터 운영은 휴무이니 참고 부탁드립니다.',
      createdDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      isPinned: true,
      author: '관리자',
    },
    {
      id: '2',
      title: '새로운 기능 업데이트 안내',
      content: '가족 그룹 기능이 새롭게 추가되었습니다. 이제 가족 구성원들과 함께 추모관을 관리하고 추억을 공유할 수 있습니다.',
      createdDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      isPinned: false,
      author: '관리자',
    },
    {
      id: '3',
      title: '서비스 이용 안내',
      content: '그리움 이음 서비스를 이용해 주셔서 감사합니다. 서비스 이용 중 문의사항이 있으시면 고객센터로 연락 부탁드립니다.',
      createdDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      isPinned: false,
      author: '관리자',
    },
  ]);

  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newIsPinned, setNewIsPinned] = useState(false);

  const handleCreateAnnouncement = () => {
    if (!newTitle.trim() || !newContent.trim()) {
      toast.error('제목과 내용을 모두 입력해주세요');
      return;
    }

    const newAnnouncement: Announcement = {
      id: Date.now().toString(),
      title: newTitle,
      content: newContent,
      createdDate: new Date(),
      isPinned: newIsPinned,
      author: user?.name || '관리자',
    };

    setAnnouncements([newAnnouncement, ...announcements]);
    setNewTitle('');
    setNewContent('');
    setNewIsPinned(false);
    setIsCreateDialogOpen(false);
    toast.success('공지사항이 등록되었습니다');
  };

  const handleEditAnnouncement = () => {
    if (!selectedAnnouncement) return;

    setAnnouncements(announcements.map(a => 
      a.id === selectedAnnouncement.id 
        ? { ...a, title: newTitle, content: newContent, isPinned: newIsPinned }
        : a
    ));
    
    setSelectedAnnouncement(null);
    setNewTitle('');
    setNewContent('');
    setNewIsPinned(false);
    setIsEditDialogOpen(false);
    toast.success('공지사항이 수정되었습니다');
  };

  const handleDeleteAnnouncement = (id: string) => {
    if (confirm('이 공지사항을 삭제하시겠습니까?')) {
      setAnnouncements(announcements.filter(a => a.id !== id));
      toast.success('공지사항이 삭제되었습니다');
    }
  };

  const openEditDialog = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setNewTitle(announcement.title);
    setNewContent(announcement.content);
    setNewIsPinned(announcement.isPinned);
    setIsEditDialogOpen(true);
  };

  const sortedAnnouncements = [...announcements].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return b.createdDate.getTime() - a.createdDate.getTime();
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl text-gray-900 mb-2">공지사항</h1>
            <p className="text-gray-600">중요한 소식과 업데이트를 확인하세요</p>
          </div>
          
          {isAdmin && (
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  새 공지사항
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>새 공지사항 작성</DialogTitle>
                  <DialogDescription>
                    사용자에게 전달할 공지사항을 작성하세요
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="new-title">제목</Label>
                    <Input
                      id="new-title"
                      placeholder="공지사항 제목을 입력하세요"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-content">내용</Label>
                    <Textarea
                      id="new-content"
                      placeholder="공지사항 내용을 입력하세요"
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      rows={8}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="new-pinned"
                      checked={newIsPinned}
                      onCheckedChange={setNewIsPinned}
                    />
                    <Label htmlFor="new-pinned" className="cursor-pointer">
                      상단 고정
                    </Label>
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      취소
                    </Button>
                    <Button onClick={handleCreateAnnouncement}>
                      등록
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Announcements List */}
        <div className="space-y-4">
          {sortedAnnouncements.map(announcement => (
            <Card 
              key={announcement.id}
              className={`p-6 hover:shadow-md transition-shadow ${announcement.isPinned ? 'border-l-4 border-l-purple-500' : ''}`}
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
                      {announcement.createdDate.toLocaleDateString('ko-KR')}
                    </span>
                    <span>•</span>
                    <span>{announcement.author}</span>
                  </div>
                </div>
                
                {isAdmin && (
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => openEditDialog(announcement)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => handleDeleteAnnouncement(announcement.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
              
              <p className="text-gray-700 whitespace-pre-wrap">{announcement.content}</p>
            </Card>
          ))}

          {announcements.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl text-gray-900 mb-2">공지사항이 없습니다</h3>
              <p className="text-gray-600">새로운 공지사항이 등록되면 여기에 표시됩니다</p>
            </div>
          )}
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>공지사항 수정</DialogTitle>
              <DialogDescription>
                공지사항 내용을 수정하세요
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-title">제목</Label>
                <Input
                  id="edit-title"
                  placeholder="공지사항 제목을 입력하세요"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="edit-content">내용</Label>
                <Textarea
                  id="edit-content"
                  placeholder="공지사항 내용을 입력하세요"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  rows={8}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-pinned"
                  checked={newIsPinned}
                  onCheckedChange={setNewIsPinned}
                />
                <Label htmlFor="edit-pinned" className="cursor-pointer">
                  상단 고정
                </Label>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                  취소
                </Button>
                <Button onClick={handleEditAnnouncement}>
                  수정
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Footer />
    </div>
  );
}
