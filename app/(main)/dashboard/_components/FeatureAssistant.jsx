"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { Button } from "@/components/ui/button";
import { ExpertList } from "@/services/Options";
import { useUser } from "@stackframe/stack";
import Image from "next/image";
import React from "react";

export default function FeatureAssistant() {
  const user = useUser();
  return (
    <div>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-medium text-gray-400">My Workspace</h2>
          <h2 className="text-3xl font-bold">
            My Workspace, {user?.displayName}
          </h2>
        </div>
        <Button>Profile</Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 mt-10 gap-10">
        {ExpertList.map((option, index) => (
          <BlurFade key={option.icon} delay={0.25 + index * 0.05} inView>
            <div
              key={index}
              className="p-3 bg-secondary rounded-3xl justify-center items-center flex flex-col"
            >
              <Image
                src={option.icon}
                width={150}
                height={150}
                className="h-[70px] w-[70px] hover:rotate-12 cursor-pointer transition-all"
                alt={option.name}
              />
              <h2 className="mt-3 text-gray-700">{option.name}</h2>
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}
