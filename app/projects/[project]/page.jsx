import { builder } from "@builder.io/sdk";
import parse from 'html-react-parser';
import sanitizeHtml from "sanitize-html";

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

    console.log(props)

    const content = await builder 
    .get(builderModelName, {
        staleCacheSeconds: 400,
        query: {
            data: {
                slug: props.params.project,
            }
        },
    })


    .toPromise();

    console.log(content)
    return (
        <>
        {/* Render the Builder page */}
        <h1>{content.data.projectName}</h1>
        <div>{parse(sanitizeHtml(content.data.description)) || "No description provided"}</div>
        </>
    )
}

