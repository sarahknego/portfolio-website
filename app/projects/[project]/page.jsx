import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "@/components/builder";
import parse from 'html-react-parser';
import sanitizeHtml from "sanitize-html";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY);

export async function generateMetadata({ params }) {
    const builderModelName = "project";
  
    const projectData = await builder
      // Get the page content from Builder with the specified options
      .get(builderModelName, {
        cachebust: true,
        query: {
          data: {
              slug: params.project,
          }
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
    const data = await builder.getAll("project")
    return (
        data.map((project) => {
            return {id: project.data.slug}
        })
    )
}

export default async function Page(props) {
    const builderModelName = "project";
    const content = await builder

    // Get the page content from Builder with the specified options
    .get("project", {
      cachebust: true,
      prerender: false, 
      staleCacheSeconds: 400,
      query: {
        data: {
            slug: props.params.project, 
        }
    },
    })

    // Convert the result to a promise
    .toPromise();

    return (
        <>
        {/* Render the Builder page */}
        <RenderBuilderContent content={content} model={"project"} />
        </>
    )
}

