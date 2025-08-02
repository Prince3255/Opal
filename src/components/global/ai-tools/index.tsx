import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import React from "react";
import Loader from "../loader";
import { Bot, FileTextIcon, Pencil, StarsIcon } from "lucide-react";
import { useSubscription } from "@/hooks/useSubscription";
import Modal from "../modal";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useUser } from "@/hooks/useUser";

type Props = {
  plan: "FREE" | "PRO";
  trial: boolean;
  videoId: string;
  videoUrl: string;
  clerkId: string;
  goToTranscript: () => void;
};

const AiTools = ({
  plan,
  trial,
  videoId,
  videoUrl,
  clerkId,
  goToTranscript,
}: Props) => {
  const { onSubscribe, isProcessing } = useSubscription();
  const user = useUser();

  const handleClick = () => {
    if (plan === "FREE" && !trial) {
    }
  };
  
  const handleAiTool = async () => {
    if (plan === "PRO") {
      let url = "http://localhost:5000/api/audio";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoUrl, clerkId, plan, workspaceId: user?.workspaceId }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
    }
    else if (!trial) {
      let url = "http://localhost:5000/api/audio";
      console.log("acbd");
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ videoUrl, clerkId, plan, workspaceId: user?.workspaceId }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      }
    } else {
      toast(
        "Sorry! Your free trial is over. Please upgrade to PRO to continue."
      );
    }
  };


  return (
    <TabsContent value="Ai Tools">
      <div className="p-5 bg-[#1D1D1D]  rounded-xl flex flex-col gap-y-6">
        <div className="flex flex-col items-center gap-4">
          <div className="w-full">
            <h2 className="text-3xl font-bold"> Ai Tools</h2>
            <p className="text-[#BDBDBD] ">
              Taking your video to the next step with the power of AI!
            </p>
          </div>

          <div className="flex gap-4 w-full gap-x-4">
            {plan === "FREE" ? (
              <Modal
                trigger={
                  <Button className=" mt-2 text-sm">
                    <Loader state={false} color="#000">
                      Try now
                    </Loader>
                  </Button>
                }
                title="Do you want to spend your free credit"
                description="Opal gives you 1 free credit to use on all AI tool except ai agent. For ai agent you must be a PRO member."
              >
                <div className="flex gap-x-6 items-center">
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">No</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button type="submit" onClick={handleAiTool}>
                        Yes
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </div>
              </Modal>
            ) : (
              <Button
                className="mt-2 text-sm"
                onClick={handleAiTool}
              >
                Try now
              </Button>
            )}
            {plan === "FREE" && (
              <Button
                className="mt-2 text-sm"
                variant={"secondary"}
                onClick={onSubscribe}
                disabled={isProcessing}
              >
                <Loader color="#000" state={isProcessing}>
                  Pay Now
                </Loader>
              </Button>
            )}
          </div>
        </div>
        <div className=" border-[1px] rounded-xl p-4 gap-4 flex flex-col bg-[#1b0f1b7f] ">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-bold text-[#a22fe0]"> Opal Ai</h2>
            <StarsIcon color="#a22fe0" fill="#a22fe0" />
          </div>
          <div className="flex gap-2 items-start cursor-pointer">
            <div className="p-2 rounded-full border-[#2d2d2d] border-[2px] bg-[#2b2b2b] ">
              <Pencil color="#a22fe0" />
            </div>
            <div className="flex flex-col">
              <h3 className="textmdg">Summary</h3>
              <p className="text-muted-foreground text-sm">
                Generate a description for your video using AI.
              </p>
            </div>
          </div>
          <div
            className="flex gap-2 items-start cursor-pointer"
            onClick={goToTranscript}
          >
            <div className="p-2 rounded-full border-[#2d2d2d] border-[2px] bg-[#2b2b2b] ">
              <FileTextIcon color="#a22fe0" />
            </div>
            <div className="flex flex-col">
              <h3 className="textmdg">Transcript</h3>
              <p className="text-muted-foreground text-sm">
                Generate a transcript for your video using AI.
              </p>
            </div>
          </div>
          <div
            className="flex gap-2 items-start cursor-pointer"
            onClick={handleClick}
          >
            <div className="p-2 rounded-full border-[#2d2d2d] border-[2px] bg-[#2b2b2b] ">
              <Bot color="#a22fe0" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-md">AI Agent</h3>
              <p className="text-muted-foreground text-sm">
                Viewers can ask questions on your video and our ai agent will
                respond.
              </p>
            </div>
          </div>
        </div>
      </div>
    </TabsContent>
  );
};

export default AiTools;
