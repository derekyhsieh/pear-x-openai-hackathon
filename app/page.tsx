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

export default function Home() {
  const user = useUser();

  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);

  const [data, setData] = useState(null);

  const onSubmit = async () => {
    setLoading(true);

    console.log("getting newsletter", tags);
    await getNewsletter(tags);
  };

  const getNewsletter = async (tags: string[]) => {
    const currentDate = Math.floor(Date.now() / 1000); // Get current timestamp
    const twoWeeksAgo = currentDate - 14 * 24 * 60 * 60; // Get timestamp 2 weeks ago

    const requestBody = {
      tags: tags.map((tag) => tag.text.toLowerCase()),
      date: twoWeeksAgo,
    };

    // hit supabase update user id

    // replace user_profiles id user id, update tags with new tags
    // console.log(user.id)
    // const { data, error } =  await supabase.from("user_profiles").upsert({
    //   id: user.id,
    //   tags: tags.map((tag) => tag.text.toLowerCase()),
    // });

    // console.log(error)

    // console.log(data);

    console.log(JSON.stringify(requestBody));

    try {
      const response = await fetch(
        "https://pearx-backend.fly.dev/get_articles",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setData(data);
        console.log("DATA", data);
        setLoading(false);
      } else {
        console.error("Error fetching articles:", response.statusText);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      setLoading(false);
    }
  };

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
      <h1 className="text-4xl font-bold mb-3">Derek's Newsletter</h1>

      <Tabs
        defaultValue="articles"
        className="items-center justify-center w-1/2"
      >
        <TabsList>
          <TabsTrigger value="articles">News Articles</TabsTrigger>
          <TabsTrigger value="research">Research Papers</TabsTrigger>
          <TabsTrigger value="github">GitHub Repos</TabsTrigger>
        </TabsList>
        <TabsContent value="articles">
          <div className="space-y-5 mt-4">
            {data.articles

              .filter(
                (article: any) =>
                  !article.metadata.source.includes("arxiv") &&
                  !article.metadata.source.includes("github")
              )
              .slice(0, 5)
              .map((article: any) => {
                return (
                  <CustomCard
                    key={article.id}
                    title={article.metadata.title}
                    description={article.metadata.description}
                    link={article.metadata.source}
                    tags={article.metadata.tags}
                    date={article.metadata.date}
                  />
                );
              })}
          </div>
        </TabsContent>
        <TabsContent value="research">
          <div className="space-y-5 mt-4">
            {data.articles
              .filter((article: any) =>
                article.metadata.source.includes("arxiv")
              )
              .slice(0, 5)
              .map((article: any) => {
                return (
                  <CustomCard
                    key={article.id}
                    title={article.metadata.title}
                    description={
                      article.metadata.description.length > 100
                        ? `${article.metadata.description.substring(0, 100)}...`
                        : article.metadata.description
                    }
                    link={article.metadata.source}
                    tags={article.metadata.tags}
                    date={article.metadata.date}
                  />
                );
              })}
          </div>
        </TabsContent>
        <TabsContent value="github">
          <div className="space-y-5 mt-4">
            {data.articles
              .filter((article: any) =>
                article.metadata.source.includes("github")
              )
              .slice(0, 6)
              .map((article: any) => {
                if (article.metadata.title === "软件开发管理与程序员培养") {
                  null
                } else {
                  return (
                    <CustomCard
                      key={article.id}
                      title={article.metadata.title}
                      description={
                        article.metadata.description.length > 100
                          ? `${article.metadata.description.substring(
                              0,
                              100
                            )}...`
                          : article.metadata.description
                      }
                      link={article.metadata.source}
                      tags={article.metadata.tags}
                      date={article.metadata.date}
                    />
                  );
                }
              })}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
