import { Helmet } from "react-helmet";

interface HeadProps {
  title: string;
  description?: string;
  disableTitleTemplate?: boolean;
}

export default function Head({
  title,
  description,
  disableTitleTemplate,
}: HeadProps) {
  const metaDescription =
    description ||
    "Metasoco is a bridge between soccor fans and crypto users.  Support your favorite team, get your NFT, and win the final prize!";

  return (
    <Helmet
      defer={false}
      htmlAttributes={{ lang: "en" }}
      title={title}
      titleTemplate={disableTitleTemplate ? undefined : "%s | Mantine"}
      meta={[
        {
          name: "viewport",
          content: "width=device-width, user-scalable=no",
        },
        {
          name: "description",
          content: metaDescription,
        },
        {
          property: "og:title",
          content: title,
        },
        {
          property: "og:image",
          // @todo
          content:
            "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/Hero.png",
        },
        {
          property: "og:image:width",
          content: "1280",
        },
        {
          property: "og:image:height",
          content: "640",
        },
        {
          property: "og:description",
          content: metaDescription,
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          name: "twitter:card",
          content: "summary_large_image",
        },
        {
          name: "twitter:Metasoco",
          content: "@TheAether_io",
        },
        {
          name: "twitter:title",
          content: title,
        },
        {
          name: "twitter:description",
          content: metaDescription,
        },
      ]}
    />
  );
}
