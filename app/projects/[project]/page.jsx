import { builder } from "@builder.io/sdk";
import { RenderBuilderContent } from "@/components/builder";

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

      if (!projectData) {
        return {
          title: "Project | Sarah Knego",
        };
      }
  
      return {
        title: `${toTitleCase(projectData?.data?.projectName)} | Sarah Knego`,
      }
  }

export async function getStaticParams() {
    const data = await builder.getAll("project")
    return (
        data.map((project) => {
            return {project: project.data.slug}
        })
    )
}

export default async function Page(props) {
    const builderModelName = "project";
    let content;

    try {
        content = await builder
            .get(builderModelName, {
                cachebust: true,
                prerender: false, 
                staleCacheSeconds: 400,
                query: {
                    data: {
                        slug: props.params.project, 
                    }
                },
            })
            .toPromise();
    } catch (error) {
        console.error("Error fetching content from Builder.io:", error);
        return <div>Error loading page content: - {props.params.project} - . Please try again later.</div>;
    }

    // Convert the result to a promise

    return (
        <>
        {/* Render the Builder page */}
        <RenderBuilderContent content={content} model={"project"} />
        </>
    )
}


