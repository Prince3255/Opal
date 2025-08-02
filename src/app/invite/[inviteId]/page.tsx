import { acceptInvite } from "@/app/action/user";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: {
    inviteId: string;
  };
};

const page = async ({ params: { inviteId } }: Props) => {
  const invite = await acceptInvite(inviteId);
console.log(invite)
  if (invite?.status === 404) {
    redirect("/auth/sign-in");
  }

  if (invite?.status === 401) {
    return (
      <div className="h-screen container flex flex-col gap-y-2 justify-center items-center">
        <h2 className="text-6xl font-bold text-white">Not Authorized</h2>
        <p>You are not authorized to accept this invite</p>
      </div>
    );
  }

  if (invite?.status === 200) return redirect('/auth/callback')
};

export default page;
