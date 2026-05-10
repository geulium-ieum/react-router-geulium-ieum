import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import ky from 'ky'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const http = ky.create({
  prefix: import.meta.env.VITE_API_URL
});

export function updatedTime(time: string) {
  const now = new Date();
  const updatedTime = new Date(time);
  const diffInMs = now.getTime() - updatedTime.getTime();
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInHours < 1) {
    return `${diffInMinutes}분 전`;
  } else if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  } else if (diffInDays < 7) {
    return `${diffInDays}일 전`;
  } else {
    return updatedTime.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
  }
}

export function calculateAge(birthDate: string) {
  const now = new Date();
  const birthDateObj = new Date(birthDate);
  const age = now.getFullYear() - birthDateObj.getFullYear() - 1;
  return age;
}
