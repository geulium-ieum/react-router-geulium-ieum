import { Button } from '~/components/ui/button';
import { ChevronDown } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "~/components/ui/dropdown-menu";
import { Link } from 'react-router';
import type { User } from '~/types';
import { Form } from 'react-router';
import { useState } from 'react';

export default function ProfileDropDown({ user }: { user: User }) {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          {user.name} 님 <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link
              to={
                user.role === "ADMIN" ||
                user.role === "SUPER_ADMIN" ?
                    '/admin-mypage'
                    :
                    '/mypage'
              }
              onClick={() => setOpen(false)}
            >
              마이페이지
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Form method="POST" action="/auth/logout" className="cursor-pointer">
              <button type="submit" className="w-full text-left font-normal text-sm outline-none">
                로그아웃
              </button>
            </Form>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}