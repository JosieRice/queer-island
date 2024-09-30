import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { oxfordCommaList } from "../utils/oxfordCommaList";

import type { LoaderFunctionArgs } from "@remix-run/node";

import { getSport } from "../data";

// export const action = async ({ params, request }: ActionFunctionArgs) => {
//   invariant(params.contactId, "Missing contactId param");
//   const formData = await request.formData();
//   return updateContact(params.contactId, {
//     favorite: formData.get("favorite") === "true",
//   });
// };

export const loader = async ({ params }: LoaderFunctionArgs) => {
    invariant(params.contactId, "Missing contactId param");
    const sport = await getSport(params.contactId);
    if (!sport) {
        throw new Response("Not Found", { status: 404 });
    }
    return json({ sport });
};

export default function Contact() {
    const { sport } = useLoaderData<typeof loader>();

    return (
        <div id="sport">
            {/* <div>
        <img
          alt={`${sport.first} ${sport.last} avatar`}
          key={sport.avatar}
          src={sport.avatar}
        />
      </div> */}
            <h1>
                {sport.name}
                {/* <Favorite contact={contact} /> */}
            </h1>
            <p>Description: {sport.description}</p>
            <p>When: {sport.when}</p>
            <p>Where: {sport.where}</p>
            <p>Sport: {sport.primarySport}</p>
            {sport.instagram && (
                <a target="_blank" rel="noreferrer" href={sport.instagram}>
                    Instagram Link
                </a>
            )}
            {sport.website && (
                <a target="_blank" rel="noreferrer" href={sport.website}>
                    Website Link
                </a>
            )}
            <p>Categories: {oxfordCommaList(sport.categories)}</p>
            <p>Skill Levels Welcome:{oxfordCommaList(sport.skillLevels)}</p>

            {sport.accessibilityNotes.length > 0 && (
                <>
                    <p>Accessibility Notes:</p>
                    <ul>
                        {sport.accessibilityNotes.map((note) => {
                            return <li key={note}>{note}</li>;
                        })}
                    </ul>
                </>
            )}
            {/* {contact.twitter ? (
          <p>
            <a href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        ) : null} */}
            {/* {contact.notes ? <p>{contact.notes}</p> : null} */}
            {/* <div> */}
            {/* <Form action="edit">
            <button type="submit">Edit</button>
          </Form> */}
            {/* <Form
            action="destroy"
            method="post"
            onSubmit={(event) => {
              const response = confirm(
                "Please confirm you want to delete this record.",
              );
              if (!response) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit">Delete</button>
          </Form> */}
            {/* </div> */}
        </div>
    );
}

// const Favorite: FunctionComponent<{
//   contact: Pick<ContactRecord, "favorite">;
// }> = ({ contact }) => {
//   const fetcher = useFetcher();
//   const favorite = fetcher.formData
//     ? fetcher.formData.get("favorite") === "true"
//     : contact.favorite;

//   return (
//     <fetcher.Form method="post">
//       <button
//         aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
//         name="favorite"
//         value={favorite ? "false" : "true"}
//       >
//         {favorite ? "★" : "☆"}
//       </button>
//     </fetcher.Form>
//   );
// };
