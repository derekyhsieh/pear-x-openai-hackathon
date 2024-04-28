"use client";
import {
  ChevronDownIcon,
  CircleIcon,
  GitHubLogoIcon,
  PlusIcon,
  StarIcon,
} from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { NewspaperIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import ReactPlayer from "react-player";

export function CustomCard({ title, description, link, date, tags }) {
  let icon = <NewspaperIcon className="mr-2 h-4 w-4" />;

  if (link.includes("github")) {
    icon = <GitHubLogoIcon className="mr-2 h-4 w-4" />;
  }

  const [open, setOpen] = useState(false);

  const hitGatekeep = async (query: string) => {
    const apiKey = process.env.GATEKEEP_API;
    const url = "https://vapi.gatekeep.ai/api/v1/gen_video_opus";

    const requestBody = {
      query: query,
      user_id: "adsf",
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Card
        className="hover:scale-105 transition-transform duration-500"
        onClick={() => setOpen(true)}
      >
        <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0 mr-3">
          <div className="space-y-1">
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
            <Button
              variant="secondary"
              className="px-3 shadow-none"
              onClick={() => {
                console.log("clicked");
                window.open(link, "_blank");
              }}
            >
              {icon}
              {link.includes("github") ? "GitHub" : "Read"}
            </Button>
            <Separator orientation="vertical" className="h-[20px]" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" className="px-2 shadow-none">
                  <ChevronDownIcon className="h-4 w-4 text-secondary-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                alignOffset={-5}
                className="w-[200px]"
                forceMount
              >
                <DropdownMenuLabel>Suggested Lists</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Future Ideas
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>My Stack</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>
                  Inspiration
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <PlusIcon className="mr-2 h-4 w-4" /> Create List
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <div className="flex space-x-4 text-sm text-muted-foreground">
              {tags.slice(0, 4).map((tag) => (
                <div key={tag} className="flex items-center">
                  <CircleIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
                  {tag.charAt(0).toUpperCase() + tag.slice(1)}
                </div>
              ))}
            </div>
            <div className="ml-8 text-sm text-muted-foreground">
              Updated{" "}
              {new Date(date * 1000).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </div>
          </div>
        </CardContent>
      </Card>
      <DialogContent className="w-full">
        <video src="https://d3i0h2ufgb677u.cloudfront.net/2024-04-28T002424.803222_9b4b432e8b246b7ee0f4100e8439a29a66e4d23bada3b7359d057836dc9a1312.mp4?Expires=1714267465&Signature=hIF148XS5XbyZogO-3jgMEZy2bqAHGWBfNONtHdZHxddPElozPlUDsxsXUlPsgGP2rQ-4sE8UStHXdV4K04rDvFMjSst5R02YJe~0oivp2yjmPxSJaoXm0y4VDxUfcOUqPO8B27T-Nlca7SV41luZfjlWLtt6cijp77FSmq3aU8FMQsM~gJhv9WIJ7R8kE9h3vuwwdD4Kno~32Z6qJrey3GT2WY2rQnyocyHPm23P37LvPYWtrYAR1ot9uVEr~xpHV6H~4ugh~GNPZIVyiLiN~D0UfTjNz8FaFcOHPGf57Nt5ZKLufPgiPDRyFlQutGWA31Dn6jZ2AtMyohTFOeYOw__&Key-Pair-Id=APKA6MKUPIQNNHKM6O5M" autoPlay/>
      </DialogContent>
    </Dialog>
  );
}
