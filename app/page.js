import Image from "next/image";
import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "@/components/builder";

// Builder Public API Key set in .env file
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

export const metadata = {
  title: "Sarah Knego",
  description: "Sarah Knego's portfolio home page.",
}

export default async function Home() {
  const builderModelName = "page";

  const content = await builder
    // Get the page content from Builder with the specified options
    .get(builderModelName, {
      userAttributes: {
        // Use the page path specified in the URL to fetch the content
        urlPath: "/" 
      },
      prerender: false,
      staleCacheSeconds: 400,
    })
    // Convert the result to a promise
    .toPromise();

  return (
    <>
      {/* Render the Builder page */}
      <RenderBuilderContent content={content} model={builderModelName} />
    </>
  );
}
