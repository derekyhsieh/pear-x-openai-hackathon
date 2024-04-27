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

export function CustomCard({ title, description, link, date, tags }) {
  // const icon = <GitHubLogoIcon className="mr-2 h-4 w-4" />
  let icon = <NewspaperIcon className="mr-2 h-4 w-4" />;

  if (link.includes("github")) {
    icon = <GitHubLogoIcon className="mr-2 h-4 w-4" />;
  }

  return (
    <Card className="hover:scale-105 transition-transform duration-500">
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
              // go to link

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
              <DropdownMenuCheckboxItem>Inspiration</DropdownMenuCheckboxItem>
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
              <div className="flex items-center">
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
  );
}
