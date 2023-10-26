import {
  GitHubConfig,
  LocalConfig,
  collection,
  config,
  fields,
  singleton,
} from "@keystatic/core";

const storage: LocalConfig["storage"] | GitHubConfig["storage"] =
  process.env.NODE_ENV === "development"
    ? { kind: "local" }
    : {
        kind: "github",
        repo: {
          owner: process.env.NEXT_PUBLIC_GIT_REPO_OWNER!,
          name: process.env.NEXT_PUBLIC_GIT_REPO_SLUG!,
        },
      };

export default config({
  storage,
  singletons: {
    westpacUIInfo: singleton({
      label: "Westpac UI Info",
      path: "content/westpac-ui-info",
      schema: {
        changelog: fields.url({
          label: "Changelog link",
        }),
        currentVersion: fields.text({
          label: "current gel version",
        }),
      },
    }),
  },
  collections: {
    posts: collection({
      label: "Posts",
      slugField: "title",
      path: "posts/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        content: fields.document({
          label: "Content",
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
      },
    }),
  },
});
