import { Button } from "~/components/ui/button";
import { Menu } from "lucide-react";
// import { Badge } from "~/components/ui/badge";
import { Link, useLocation } from "react-router";
import type { User } from "~/types";
import ProfileDropDown from "~/components/molecules/ProfileDropDown";
import { useSidebar } from "../ui/sidebar";
import FlexDiv from "../FlexDiv";

export default function Header({ user }: { user: User | null, }) {
    const { toggleSidebar } = useSidebar();
    const location = useLocation();
    const pathname = location.pathname;

    if (
        pathname === '/login' || 
        pathname === '/register' || 
        pathname === '/auth/verify-email' ||
        pathname.includes('/family-groups/join')
    ) {
        return null;
    }
    
    const handleSidebarToggle = () => {
        toggleSidebar();
    }

    return (
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <FlexDiv className="items-center justify-between">
                    <Link to="/">
                        <FlexDiv className="items-center gap-3 cursor-pointer">
                            <div className="w-10 h-10 bg-linear-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white">🕊️</span>
                            </div>
                            <h1 className="text-lg md:text-xl font-bold text-gray-900">그리움 이음</h1>
                        </FlexDiv>
                    </Link>

                    {user ? (
                        <nav className="md:hidden">
                            <Button
                                variant="ghost"
                                className="p-0!"
                                onClick={handleSidebarToggle}
                            >
                                <Menu className="size-5" />
                            </Button>
                        </nav>
                    ) : (
                        <nav className="md:hidden">
                            <Link to="/login">
                                <Button
                                    variant="ghost"
                                    className="text-sm text-gray-700 hover:text-gray-900 transition-colors px-0!"
                                >
                                    로그인
                                </Button>
                            </Link>
                        </nav>
                    )}

                    <nav className="hidden md:flex items-center gap-4">
                        {user ? (
                            <>
                                <Link to="/announcements">
                                    <Button
                                        variant="ghost"
                                        className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                                    >
                                        공지사항
                                    </Button>
                                </Link>
                                <Link to="/search">
                                    <Button
                                        variant="ghost"
                                        className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                                    >
                                        고인 검색
                                    </Button>
                                </Link>
                                <Link to="/family-groups">
                                    <Button
                                        variant="ghost"
                                        className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                                    >
                                        가족 그룹
                                    </Button>
                                </Link>
                                <ProfileDropDown user={user} />
                            </>
                        ) : (
                            <>
                                <Link to="/announcements">
                                    <Button
                                        variant="ghost"
                                        className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                                    >
                                        공지사항
                                    </Button>
                                </Link>
                                <Link to="/login">
                                    <Button
                                        variant="ghost"
                                        className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                                    >
                                        로그인
                                    </Button>
                                </Link>
                                <Link to="/register">
                                    <Button className="text-sm">
                                        회원가입
                                    </Button>
                                </Link>
                            </>
                        )}
                    </nav>
                </FlexDiv>
            </div>
        </header>
    )
}
