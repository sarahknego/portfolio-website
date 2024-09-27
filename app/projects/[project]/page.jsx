import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "@/components/builder";
import parse from 'html-react-parser';
import sanitizeHtml from "sanitize-html";

export async function generateMetadata({ params }) {
    const builderModelName = "projects";
  
    const projectData = await builder
      // Get the page content from Builder with the specified options
      .get(builderModelName, {
        cachebust: true,
        userAttributes: {
          // Use the page path specified in the URL to fetch the content
          urlPath: "/projects/" + (params?.page?.join("/") || ""),
        },
        prerender: false,
        staleCacheSeconds: 400,
      })
      // Convert the result to a promise
      .toPromise();
  
      function toTitleCase(str) { return str.replace(/\b\w/g, (char) => char.toUpperCase()); }
  
      return {
        title: `${toTitleCase(projectData.data.projectName)} | Sarah Knego`,
      }
  }
  

export async function getStaticParams() {
    const data = await builder.getAll("projects")
    return (
        data.map((project) => {
            return {id: project.data.slug}
        })
    )
}

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

export default async function Page(props) {
    const builderModelName = "projects";

    const data = await builder 
    .get(builderModelName, {
        cachebust: true,
        staleCacheSeconds: 400,
        query: {
            data: {
                slug: props.params.project,
            }
        },
    })

    .toPromise();

    const content = await builder

    // Get the page content from Builder with the specified options
    .get("project", {
      prerender: false,
      staleCacheSeconds: 400,
    })

    // Convert the result to a promise
    .toPromise();

    return (
        <>
        {/* Render the Builder page */}
        <RenderBuilderContent content={content} model={"project"} data={data.data} />
        </>
    )
}

