import { useState } from "react";
import {
  Search,
  Calendar,
  MapPin,
  User,
  Plus,
  Globe,
  Lock,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Card } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Form } from "react-router";

export default function SearchDeceased() {
  return(
      <div className = "bg-gray-50">
        <div 
          className = "max-w-7xl min-h-[calc(100vh-398px)] mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
          <div
            className = "mb-8 flex items-center justify-between"
          >
            <div>
            <h1
              className = "text-3xl text-gray-900 mb-2"
            >
              고인 검색
            </h1>
            <p className="text-gray-600">
              고인의 정보를 입력하여 추모관을 찾아보세요
            </p>
            </div>
          </div>
        </div>
      </div>
  )
}