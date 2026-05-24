import { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '~/components/ui/button';
import FaqDialog from '~/components/templates/dialogs/Faq';
import InquiryDialog from '~/components/templates/dialogs/Inquiry';
import GuideDialog from '~/components/templates/dialogs/Guide';
import TermsDialog from '~/components/templates/dialogs/Terms';
import PrivacyDialog from '~/components/templates/dialogs/Privacy';
import AccessibilityDialog from '~/components/templates/dialogs/Accessibility';
import { Link, useRouteLoaderData } from 'react-router';
import type { Route as RootRoute } from "../../+types/root";

export function Footer() {
  const { user } = useRouteLoaderData("root") as RootRoute.ComponentProps["loaderData"];

  const [activeDialog, setActiveDialog] = useState<'faq' | 'inquiry' | 'guide' | 'terms' | 'privacy' | 'accessibility' | null>(null);  return (
    <>
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-linear-to-br from-purple-600 to-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-sm">🕊️</span>
                </div>
                <span className="text-white">그리움 이음</span>
              </div>
              <p className="text-sm text-gray-400">
                언제 어디서나 사랑하는 분을 추모하는 특별한 공간
              </p>
            </div>

            <div>
              <h3 className="text-white mb-4">바로가기</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/"
                    className="font-medium hover:text-white transition-colors"
                  >
                      홈
                  </Link>
                </li>
                <li>
                  <Link
                    to="/search"
                    className="font-medium hover:text-white transition-colors"
                  >
                    고인 검색
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-white mb-4">고객지원</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/help"
                    className="font-medium hover:text-white transition-colors"
                  >
                    고객센터
                  </Link>
                </li>
                <li>
                  <Link
                    to={user ? `/helpboard/:${user.id}`: "/login" }
                    className="font-medium hover:text-white transition-colors"
                  >
                    1:1 문의
                  </Link>
                </li>
                <li>
                  <Link
                    to="/guide"
                    className="font-medium hover:text-white transition-colors"
                  >
                    이용 가이드
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-white mb-4">약관 및 정책</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="/stipulation"
                    className="font-medium hover:text-white transition-colors"
                  >
                    이용약관
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="font-medium hover:text-white transition-colors"
                  >
                    개인정보처리방침
                  </Link>
                </li>
                <li>
                  <Link
                    to="/web"
                    className="font-medium hover:text-white transition-colors"
                  >
                    웹 접근성 정책
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-gray-400 text-center">
            <p>© 2025 그리움 이음. All rights reserved.</p>
            <p className="mt-2 flex items-center justify-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500" /> for remembrance
            </p>
          </div>
        </div>
      </footer>
      <FaqDialog
        open={activeDialog === 'faq'}
        onOpenChange={() => setActiveDialog(null)}
      />
      <InquiryDialog
        open={activeDialog === 'inquiry'}
        onOpenChange={() => setActiveDialog(null)}
      />
      <GuideDialog
        open={activeDialog === 'guide'}
        onOpenChange={() => setActiveDialog(null)}
      />
      <TermsDialog
        open={activeDialog === 'terms'}
        onOpenChange={() => setActiveDialog(null)}
      />
      <PrivacyDialog
        open={activeDialog === 'privacy'}
        onOpenChange={() => setActiveDialog(null)}
      />
      <AccessibilityDialog
        open={activeDialog === 'accessibility'}
        onOpenChange={() => setActiveDialog(null)}
      />
    </>
  );
}
