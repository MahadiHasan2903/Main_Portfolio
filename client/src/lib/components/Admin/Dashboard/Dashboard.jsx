"use client";

import React from "react";
import { Card, CardDescription, CardTitle, CardHeader } from "../../ui/card";
import {
  Code2,
  FolderOpenDot,
  GraduationCap,
  LayoutList,
  Users,
} from "lucide-react";
import Link from "next/link";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 gap-4 text-lg xl:mt-8 lg:grid-cols-4">
      <Card className="bg-tertiary dark:bg-secondary/40 p-8 h-[220px] max-w-[350px]">
        <CardHeader className="p-0 mb-3">
          <div className="flex items-center gap-x-4">
            <Users size={40} />
            <CardTitle>Total User</CardTitle>
          </div>
          <div className="flex items-center justify-start">
            <h2 className="my-5 ml-20 h2">1</h2>
          </div>
        </CardHeader>
        <CardDescription className="text-lg transition-all text-muted-foreground hover:text-primary">
          <Link href="/all-users">View Users</Link>
        </CardDescription>
      </Card>
      <Card className="bg-tertiary dark:bg-secondary/40 p-8 h-[220px] max-w-[350px]">
        <CardHeader className="p-0 mb-3">
          <div className="flex items-center gap-x-4">
            <FolderOpenDot size={40} />
            <CardTitle>Total Projects</CardTitle>
          </div>
          <div className="flex items-center justify-start">
            <h2 className="my-5 ml-20 h2">15</h2>
          </div>
        </CardHeader>
        <CardDescription className="text-lg transition-all text-muted-foreground hover:text-primary">
          <Link href="/all-projects">View Projects</Link>
        </CardDescription>
      </Card>
      <Card className="bg-tertiary dark:bg-secondary/40 p-8 h-[220px] max-w-[350px]">
        <CardHeader className="p-0 mb-3">
          <div className="flex items-center gap-x-4">
            <Code2 size={40} />
            <CardTitle>Total Skills</CardTitle>
          </div>
          <div className="flex items-center justify-start">
            <h2 className="my-5 ml-20 h2">20</h2>
          </div>
        </CardHeader>
        <CardDescription className="text-lg transition-all text-muted-foreground hover:text-primary">
          <Link href="/all-skills">View Skills</Link>
        </CardDescription>
      </Card>
      <Card className="bg-tertiary dark:bg-secondary/40 p-8 h-[220px] max-w-[350px]">
        <CardHeader className="p-0 mb-3">
          <div className="flex items-center gap-x-4">
            <GraduationCap size={40} />
            <CardTitle>Total Education</CardTitle>
          </div>
          <div className="flex items-center justify-start">
            <h2 className="my-5 ml-20 h2">3</h2>
          </div>
        </CardHeader>
        <CardDescription className="text-lg transition-all text-muted-foreground hover:text-primary">
          <Link href="/all-educations">View Educations</Link>
        </CardDescription>
      </Card>
      <Card className="bg-tertiary dark:bg-secondary/40 p-8 h-[220px] max-w-[350px]">
        <CardHeader className="p-0 mb-3">
          <div className="flex items-center gap-x-4">
            <LayoutList size={40} />
            <CardTitle>Total Experience</CardTitle>
          </div>
          <div className="flex items-center justify-start">
            <h2 className="my-5 ml-20 h2">1</h2>
          </div>
        </CardHeader>
        <CardDescription className="text-lg transition-all text-muted-foreground hover:text-primary">
          <Link href="/all-experiences">View Experiences</Link>
        </CardDescription>
      </Card>
    </div>
  );
};

export default Dashboard;
