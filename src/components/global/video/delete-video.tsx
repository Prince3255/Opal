// import React from "react";
// import Modal from "../modal";
// import { Move, Trash2 } from "lucide-react";
// import ChangeVideoLocation from "@/components/form/change-video-location";
// import { deleteVideo } from "@/app/action/workspace";
// import { toast } from "sonner";
// import { DialogClose, DialogFooter } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { useQueryClient } from "@tanstack/react-query";

// type Props = {
//   videoId: string;
// };

// const DeleteVideo = ({ videoId }: Props) => {
//   const queryClient = useQueryClient();
//   const handleClick = async (e: any) => {
//     e.preventDefault();
//     const res = await deleteVideo(videoId);
//     if (res?.status === 200) {
//       await queryClient.invalidateQueries({ queryKey: ["folder-video"] });
//       await queryClient.invalidateQueries({ queryKey: ["user-videos"] });
//       toast.success("Video deleted successfully");
//     } else {
//       toast.error("Failed to delete video");
//     }
//   };

//   return (
//     <Modal
//       className="flex items-center cursor-pointer gap-x-2"
//       title="Are you sure you want to delete these video"
//       description="This action cannot be undone. This will permanently delete your video from our servers."
//       trigger={
//         <Trash2 size={20} className="text-[#4f4f4f] hover:text-[#f9f9f9]" />
//       }
//     >
//       <div className="flex gap-x-6 items-center">
//         <DialogFooter>
//           <DialogClose asChild>
//             <Button variant="outline">No</Button>
//           </DialogClose>
//           <DialogClose asChild>
//             <Button type="submit" onClick={handleClick}>
//               Yes
//             </Button>
//           </DialogClose>
//         </DialogFooter>
//       </div>
//     </Modal>
//   );
// };

// export default DeleteVideo;

import React from "react";
import Modal from "../modal";
import { Trash2 } from "lucide-react";
import { deleteVideo } from "@/app/action/workspace";
import { toast } from "sonner";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
type Props = { videoId: string };
const DeleteVideo = ({ videoId }: Props) => {
  const queryClient = useQueryClient();
  const handleClick = async (e: any) => {
    e.preventDefault();
    const res = await deleteVideo(videoId);
    if (res?.status === 200) {
      await queryClient.invalidateQueries({ queryKey: ["folder-video"] });
      await queryClient.invalidateQueries({ queryKey: ["user-videos"] });
      toast.success("Video deleted successfully");
    } else {
      toast.error("Failed to delete video");
    }
  };
  return (
    <Modal
      className="flex items-center cursor-pointer gap-x-2"
      title="Are you sure you want to delete these video"
      description="This action cannot be undone. This will permanently delete your video from our servers."
      trigger={
        <Trash2 size={20} className="text-[#4f4f4f] hover:text-[#f9f9f9]" />
      }
    >
      
      <div className="flex gap-x-6 items-center">
        
        <DialogFooter>
          
          <DialogClose asChild>
            <Button variant="outline">No</Button>
          </DialogClose>
          <DialogClose asChild>
            
            <Button type="submit" onClick={handleClick}>
              Yes
            </Button>
          </DialogClose>
        </DialogFooter>
      </div>
    </Modal>
  );
};
export default DeleteVideo;
