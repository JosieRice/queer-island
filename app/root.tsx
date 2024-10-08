import type { LinksFunction } from "@remix-run/node";

import { json, LoaderFunctionArgs } from "@remix-run/node";
import {
    Form,
    NavLink,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useLoaderData,
    useNavigation,
    useSubmit,
} from "@remix-run/react";
import { useEffect } from "react";

import appStylesHref from "./app.css?url";
import { getSports } from "./data";

export const links: LinksFunction = () => [
    { href: appStylesHref, rel: "stylesheet" },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const sports = await getSports(q);
    return json({ q, sports });
};

export default function App() {
    const { q, sports } = useLoaderData<typeof loader>();
    const navigation = useNavigation();
    const submit = useSubmit();
    const searching =
        navigation.location &&
        new URLSearchParams(navigation.location.search).has("q");

    useEffect(() => {
        const searchField = document.getElementById("q");
        if (searchField instanceof HTMLInputElement) {
            searchField.value = q || "";
        }
    }, [q]);

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
            </head>
            <body>
                <div id="sidebar">
                    <h1>Queer Island Sports Society</h1>
                    <div>
                        <Form
                            id="search-form"
                            onChange={(event) => {
                                const isFirstSearch = q === null;
                                submit(event.currentTarget, {
                                    replace: !isFirstSearch,
                                });
                            }}
                            role="search"
                        >
                            <input
                                id="q"
                                aria-label="Search contacts"
                                className={searching ? "loading" : ""}
                                defaultValue={q || ""}
                                placeholder="Search"
                                type="search"
                                name="q"
                            />
                            <div
                                id="search-spinner"
                                aria-hidden
                                hidden={!searching}
                            />
                        </Form>
                    </div>
                    <nav>
                        {sports.length ? (
                            <ul>
                                {sports.map((sport) => (
                                    <li key={sport.id}>
                                        <NavLink
                                            className={({
                                                isActive,
                                                isPending,
                                            }) =>
                                                isActive
                                                    ? "active"
                                                    : isPending
                                                      ? "pending"
                                                      : ""
                                            }
                                            to={`sports/${sport.id}`}
                                        >
                                            {sport.name}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>
                                <i>No sports</i>
                            </p>
                        )}
                    </nav>
                </div>
                <div
                    className={
                        navigation.state === "loading" && !searching
                            ? "loading"
                            : ""
                    }
                    id="detail"
                >
                    <Outlet />
                </div>
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}
