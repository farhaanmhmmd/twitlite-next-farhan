import Layout from "../components/layout";
import "../styles/globals.css";
import {ChakraProvider} from "@chakra-ui/react";
import Head from "next/head";
import {SessionProvider} from "next-auth/react";

function MyApp({Component, pageProps}) {
  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider>
        <Layout>
          <Head>
            <title>Twitlite</title>
            <meta
              name="description"
              content="The No. 1 Social App in Indonesia"
            />
          </Head>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
