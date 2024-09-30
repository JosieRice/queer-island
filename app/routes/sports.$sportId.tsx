import type { LoaderFunctionArgs } from "@remix-run/node";

import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { getSport } from "../data";
import { oxfordCommaList } from "../utils/oxfordCommaList";

// export const action = async ({ params, request }: ActionFunctionArgs) => {
//   invariant(params.sportId, "Missing sportId param");
//   const formData = await request.formData();
//   return updateContact(params.sportId, {
//     favorite: formData.get("favorite") === "true",
//   });
// };

export const loader = async ({ params }: LoaderFunctionArgs) => {
    invariant(params.sportId, "Missing sportId param");
    const sport = await getSport(params.sportId);
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
            <p>
                <strong>Description:</strong> {sport.description}
            </p>
            <p>
                <strong>Who:</strong> {sport.who}
            </p>
            <p>
                <strong>When:</strong> {sport.when}
            </p>
            <p>
                <strong>Where:</strong> {sport.where}
            </p>
            <p>
                <strong>Sport:</strong> {sport.primarySport}
            </p>
            <p>
                <strong>Cost:</strong> {sport.cost}
            </p>
            <p>
                <strong>Categories:</strong> {oxfordCommaList(sport.categories)}
            </p>
            <p>
                <strong>Skill Levels Welcome:</strong>{" "}
                {oxfordCommaList(sport.skillLevels)}
            </p>
            {sport.accessibilityNotes.length > 0 && (
                <>
                    <p>
                        <strong>Accessibility Notes:</strong>{" "}
                    </p>
                    <ul>
                        {sport.accessibilityNotes.map((note) => {
                            return <li key={note}>{note}</li>;
                        })}
                    </ul>
                </>
            )}
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
