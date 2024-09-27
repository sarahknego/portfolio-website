import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "../../components/builder";

// Builder Public API Key set in .env file
builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

export async function generateMetadata({ params }) {
  const builderModelName = "page";

  const pageData = await builder
    // Get the page content from Builder with the specified options
    .get(builderModelName, {
      cachebust: true,
      userAttributes: {
        // Use the page path specified in the URL to fetch the content
        urlPath: "/" + (params?.page?.join("/") || ""),
      },
      prerender: false,
      staleCacheSeconds: 400,
    })
    // Convert the result to a promise
    .toPromise();

    function toTitleCase(str) { return str.replace(/\b\w/g, (char) => char.toUpperCase()); }

    return {
      title: `${toTitleCase(pageData.data.title)} | Sarah Knego`,
    }
}

export default async function Page(props) {
  const builderModelName = "page";

  const content = await builder
    // Get the page content from Builder with the specified options
    .get(builderModelName, {
      cachebust: true,
      userAttributes: {
        // Use the page path specified in the URL to fetch the content
        urlPath: "/" + (props?.params?.page?.join("/") || ""),
      },
      prerender: false,
      staleCacheSeconds: 400,
    })
    // Convert the result to a promise
    .toPromise();

    console.log(content);

  return (
    <>
      {/* Render the Builder page */}
      <RenderBuilderContent content={content} model={builderModelName} />
    </>
  );
}
