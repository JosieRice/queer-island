import type { ActionFunctionArgs } from "@remix-run/node";

import { redirect } from "@remix-run/node";
// import { Form, useLoaderData, useNavigate } from "@remix-run/react";
import invariant from "tiny-invariant";
// import { getContact, updateContact } from "../data";

export const action = async ({ params }: ActionFunctionArgs) => {
    invariant(params.sportId, "Missing sportId param");
    // const formData = await request.formData();
    // const updates = Object.fromEntries(formData);
    // await updateContact(params.sportId, updates);
    return redirect(`/contacts/${params.sportId}`);
};

export const loader = async () => {};

export default function EditContact() {
    return null;
    // const { contact } = useLoaderData<typeof loader>();
    // const navigate = useNavigate();

    // return (
    //   <Form key={contact.id} id="contact-form" method="post">
    //     <p>
    //       <span>Name</span>
    //       <input
    //         defaultValue={contact.first}
    //         aria-label="First name"
    //         name="first"
    //         type="text"
    //         placeholder="First"
    //       />
    //       <input
    //         aria-label="Last name"
    //         defaultValue={contact.last}
    //         name="last"
    //         placeholder="Last"
    //         type="text"
    //       />
    //     </p>
    //     <label>
    //       <span>Twitter</span>
    //       <input
    //         defaultValue={contact.twitter}
    //         name="twitter"
    //         placeholder="@jack"
    //         type="text"
    //       />
    //     </label>
    //     <label>
    //       <span>Avatar URL</span>
    //       <input
    //         aria-label="Avatar URL"
    //         defaultValue={contact.avatar}
    //         name="avatar"
    //         placeholder="https://example.com/avatar.jpg"
    //         type="text"
    //       />
    //     </label>
    //     <label>
    //       <span>Notes</span>
    //       <textarea defaultValue={contact.notes} name="notes" rows={6} />
    //     </label>
    //     <p>
    //       <button type="submit">Save</button>
    //       <button onClick={() => navigate(-1)} type="button">
    //         Cancel
    //       </button>
    //     </p>
    //   </Form>
    // );
}
