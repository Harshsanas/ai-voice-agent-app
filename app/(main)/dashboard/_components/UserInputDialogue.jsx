"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { CoachingExpert } from "@/services/Options";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { LoaderCircle } from "lucide-react";

export default function UserInputDialogue({ children, coachingOption }) {
  const [selectExpert, setSelectExpert] = useState("");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const createDiscussionRoom = useMutation(api.DiscussionRoom.CreateNewRoom);

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };

  const handleClickNext = async () => {
    if (!topic || !selectExpert) return;

    try {
      setLoading(true);
      const result = await createDiscussionRoom({
        topic: topic,
        coachingOption: coachingOption.name,
        expertName: selectExpert,
      });
      console.log(result, "result");
    } catch (error) {
      console.error("Error creating discussion room:", error);
    } finally {
      setLoading(false);
      setOpenDialog(false);
    }
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{coachingOption.name}</DialogTitle>
          <DialogDescription asChild>
            <div className="mt-3">
              <h2 className="text-black">
                Enter a topic to master your skills in {coachingOption.name}:
              </h2>
              <Textarea
                placeholder="Enter your text here"
                className="mt-2"
                onChange={handleTopicChange}
                value={topic}
              />
              <h2 className="text-black mt-5">
                Select your coaching expert below:
              </h2>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-6 mt-3">
                {CoachingExpert.map((expert, index) => (
                  <div key={index} onClick={() => setSelectExpert(expert.name)}>
                    <Image
                      src={expert.avatar}
                      width={100}
                      height={100}
                      alt="avatar"
                      className={`rounded-2xl h-[80px] w-[80px] object-cover hover:scale-105 transition-all cursor-pointer ${
                        selectExpert === expert.name ? "border-1" : ""
                      } p-1 border-primary`}
                    />
                    <h2 className="text-center">{expert.name}</h2>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex justify-end gap-5">
                <DialogClose asChild>
                  <Button variant={"ghost"}>Cancel</Button>
                </DialogClose>
                <Button
                  disabled={!topic || !selectExpert}
                  onClick={handleClickNext}
                >
                  {loading && <LoaderCircle className="animate-spin mr-2" />}
                  Next
                </Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
