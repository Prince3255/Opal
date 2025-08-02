import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
type Props = {};

const HowToPost = (props: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Opal: How-To Guide</CardTitle>
        <CardDescription className="text-[1rem]">
          Everything you need to get started and make the most of Opal’s
          features.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {/* Item 1 */}
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-[1.25rem]">Getting Started</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc ml-6 space-y-2 text-[1rem]">
                <li>
                  <span className="font-semibold">Sign Up:</span> Create your
                  Opal account with your email or via single sign-on (Google,
                  Microsoft).
                </li>
                <li>
                  <span className="font-semibold">Login:</span> Use your
                  registered credentials to access the Opal dashboard.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          {/* Item 2 */}
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-[1.25rem]">Creating Workspaces</AccordionTrigger>
            <AccordionContent>
              <ul className="list-disc ml-6 space-y-2 text-[1rem]">
                <li>
                  <span className="font-semibold">Purpose:</span> Workspaces
                  organize your videos, teammates, and projects.
                </li>
                <li>
                  <span className="font-semibold">Steps:</span>
                  <ol className="list-decimal ml-6 mt-1">
                    <li>
                      Click on <span className="font-medium">Workspaces</span>{" "}
                      in the left navigation.
                    </li>
                    <li>
                      Tap <span className="font-medium">Create Workspace</span>.
                    </li>
                    <li>Enter a name and optional description.</li>
                    <li>
                      Set visibility: <span className="italic">Private</span>{" "}
                      (invite-only) or <span className="italic">Public</span>{" "}
                      (company-wide).
                    </li>
                    <li>
                      Click <span className="font-medium">Create</span> to
                      finish.
                    </li>
                  </ol>
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          {/* Item 3 */}
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-[1.25rem]">Adding Team Members</AccordionTrigger>
            <AccordionContent>
              <ol className="list-decimal ml-6 space-y-2 text-[1rem]">
                <li>
                  Head to your workspace settings and click{" "}
                  <span className="font-medium">Invite Members</span>.
                </li>
                <li>
                  Enter emails and assign roles:{" "}
                  <span className="italic">Admin</span>,{" "}
                  <span className="italic">Member</span>, or{" "}
                  <span className="italic">Viewer</span>.
                </li>
                <li>
                  Send invitations. Members will receive an email to join.
                </li>
              </ol>
            </AccordionContent>
          </AccordionItem>
          {/* Item 4 */}
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-[1.25rem]">Recording & Sharing</AccordionTrigger>
            <AccordionContent>
              <h3 className="font-semibold mb-2 text-[1rem]">Recording Videos</h3>
              <ol className="list-decimal ml-6 mb-4 space-y-1 text-[0.95rem]">
                <li>
                  Click <span className="font-medium">Record New Video</span>.
                </li>
                <li>Choose your recording source (Screen & Camera, etc.).</li>
                <li>
                  Set browser permissions and hit{" "}
                  <span className="font-medium">Record</span>.
                </li>
              </ol>
              <h3 className="font-semibold mt-4 mb-2 text-[1rem]">Sharing Links</h3>
              <ol className="list-decimal ml-6 space-y-1 text-[0.95rem]">
                <li>
                  Select a video from your dashboard and click{" "}
                  <span className="font-medium">Share</span>.
                </li>
                <li>Copy the generated URL to distribute.</li>
              </ol>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default HowToPost;
