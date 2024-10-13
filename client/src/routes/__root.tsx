import * as React from "react";
import { Outlet, createRootRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SearchParams, Data as Type } from "@/types";

export const Route = createRootRoute({
  component: Index,
});

export const Data = React.createContext<Type>({
  projects: [],
  session: false,
  userId: "",
  username: "",
});

export const SearchParamsContext = React.createContext<SearchParams>({});
export const Path = React.createContext<string>("");

function Index() {
  const search = Route.useSearch();
  const path = window.location.pathname;
  const navigate = useNavigate();
  const { data, error } = useQuery({
    queryKey: ["data"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/api/v1/todo/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const json = await res.json();

      return json;
    },
    refetchInterval: 1000,
  });

  if (error) {
    console.log(error);
    return (
      <h1 className="text-center text-red-500 mt-48 text-2xl">
        An error has occured. Try refreshing the page
      </h1>
    );
  }

  if (data) {
    if (!data.session && !["/login", "/register", "/"].includes(path)) {
      navigate({
        to: "/login",
      });
    }
    return (
      <React.Fragment>
        <Data.Provider value={data}>
          <SearchParamsContext.Provider value={search}>
            <Path.Provider value={path}>
              <Outlet />
            </Path.Provider>
          </SearchParamsContext.Provider>
        </Data.Provider>
      </React.Fragment>
    );
  }

  return <h1>Loading...</h1>;
}
