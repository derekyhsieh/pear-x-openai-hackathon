"use client";
import Image from "next/image";
import { User, createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { useState, useEffect } from "react";
import { UserProvider, useUser } from "./UserContext";
import { NavBar } from "./NavBar";
import { GoogleSignInButton } from "./GoogleSignIn";
import Hero from "@/components/tag-input-demo";
import TagForm from "@/components/tag-input-demo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

import { helix } from "ldrs";
import { CustomCard } from "@/components/CustomCard";

const testData = {
  status: "success",
  articles: [
    {
      id: "3097fca9b1ec8942c4305e550ef1b50a",
      title: "China's first Sora-level text-to-video large model Vidu unveiled",
      description:
        "China's first Sora-level text-to-video large model Vidu was unveiled at the 2024 Zhongguancun Forum in Beijing on Saturday, intensifying the artificial intelligence competition globally.",
      metadata: {
        date: 1714253228.120358,
        quality: 0.9,
        source: "https://github.com",
        tags: [
          "ai",
          "generative ai",
          "open ai",
          "sora",
          "video generation",
          "vidu",
          "china",
          "china ai",
          "text to video",
        ],
        text: "China's first Sora-level text-to-video large model Vidu was unveiled at the 2024 Zhongguancun Forum in Beijing on Saturday, intensifying the artificial intelligence competition globally.",
        type: "https://github.com",
      },
      match: {
        china: 1.0008558,
      },
    },
  ],
};

export default function Home() {
  const user = useUser();

  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  const [data, setData] = useState(testData);

  const onSubmit = async () => {
    setLoading(true);

    console.log("getting newsletter", tags);
  };

  const getNewsletter = async () => {};

  helix.register();

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      {data ? (
        <NewsletterView data={data} />
      ) : // If data is not available, check the loading state
      loading ? (
        <div className="flex-grow flex justify-center items-center">
          <l-helix size="100" speed="2.5" color="black"></l-helix>
        </div>
      ) : (
        <TagForm tags={tags} setTags={setTags} onGetNewsletter={onSubmit} />
      )}
    </div>
  );
}

const NewsletterView = ({ data }) => {
  return (
    <div className="flex-grow flex flex-col items-center mt-5 space-y-5">
      <h1 className="text-4xl font-bold">Derek's Newsletter</h1>

      <Tabs defaultValue="articles" className="items-center justify-center w-1/2">
        <TabsList>
          <TabsTrigger value="articles">News Articles</TabsTrigger>
          <TabsTrigger value="research">Research Papers</TabsTrigger>
          <TabsTrigger value="github">GitHub Repos</TabsTrigger>
        </TabsList>
        <TabsContent value="articles">
          <div className="">
            {data.articles.map((article: any) => {
              return (
                <CustomCard
                  key={article.id}
                  title={article.title}
                  description={article.description}
                  link={article.metadata.source}
                  tags={article.metadata.tags}
                  date={article.metadata.date}
                />
              );
            })}
          </div>
        </TabsContent>
        <TabsContent value="research">
          <div className="">
            {data.articles.map((article: any) => {
              return (
                <CustomCard
                  key={article.id}
                  title={article.title}
                  description={article.description}
                  link={article.metadata.source}
                  tags={article.metadata.tags}
                  date={article.metadata.date}
                />
              );
            })}
          </div>
        </TabsContent>
        <TabsContent value="github">
          <div className="">
            {data.articles.map((article: any) => {
              return (
                <CustomCard
                  key={article.id}
                  title={article.title}
                  description={article.description}
                  link={article.metadata.source}
                  tags={article.metadata.tags}
                  date={article.metadata.date}
                />
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
