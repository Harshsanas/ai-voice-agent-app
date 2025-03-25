"use client";
import { api } from "@/convex/_generated/api";
import { CoachingExpert } from "@/services/Options";
import Image from "next/image";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { UserButton } from "@stackframe/stack";
import { Button } from "@/components/ui/button";

export default function DiscussionRoom() {
  const params = useParams();
  const [roomId, setRoomId] = useState(null);
  const [expert, setExpert] = useState();

  const DiscussionRoomData = useQuery(api.DiscussionRoom.GetDiscussionRoom, {
    id: roomId,
  });

  useEffect(() => {
    const currentRoomId = window.location.pathname.split("/").pop();
    setRoomId(currentRoomId);

    if (DiscussionRoomData) {
      const expert = CoachingExpert.find(
        (item) => item.name == DiscussionRoomData.expertName
      );
      setExpert(expert);
    }
  }, [params]);

  console.log(expert, "expert");
  return (
    <div className="-mt-12">
      <h2 className="text-lg font-bold">
        {DiscussionRoomData?.coachingOption}
      </h2>
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <div className="lg:col-span-2 h-[60vh] bg-secondary border rounded-2xl flex flex-col items-center justify-center relative">
            {expert?.avatar && (
              <Image
                src={expert.avatar}
                alt="avatar"
                width={200}
                height={200}
                className="rounded-full object-cover animate-pulse h-[80px] w-[80px]"
              />
            )}
            <h2 className="text-gray-500">{expert?.name}</h2>
            <div className="p-5 bg-gray-200 px-10 rounded-lg absolute bottom-5 right-5">
              <UserButton />
            </div>
          </div>
          <div className="mt-5 flex justify-center">
            <Button>Connect</Button>
          </div>
        </div>
        <div>
          <div className="h-[60vh] bg-secondary border rounded-2xl flex flex-col items-center justify-center relative">
            <h2 className="text-gray-500">CHAT SECTION</h2>
          </div>
          <h2 className="mt-5 text-gray-400 text-small">
            At the end of you conversation we will automatically generate feedback/notes from your conversation.
          </h2>
        </div>
      </div>
    </div>
  );
}
