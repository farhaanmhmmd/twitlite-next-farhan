import {Box, HStack, Flex, Button} from "@chakra-ui/react";
import React from "react";
import ProductItem from "../../components/product-item";
import axiosInstance from "../../services/axios";
import Head from "next/head";
import {getSession} from "next-auth/react";

function Products(props) {
  const {products, session} = props;

  const renderProducts = () => {
    //masuk ke props.product di components product-item
    return products.map((product) => (
      <ProductItem key={product.id} product={product} />
    ));
  };

  return (
    <HStack>
      <Head>
        <title>Posts - Twitlite</title>
        <meta name="description" content="All of The Twitlite Posts" />
      </Head>
      {/* melihat session milik siapa */}
      {/* <Box>{session?.user.email}</Box> */}
      <Flex
        mx="auto"
        w="66.5%"
        wrap="wrap"
        // bg="gray.800"
        justifyContent={"space-between"}
        padding={3}
      >
        {renderProducts()}
      </Flex>
    </HStack>
  );
}
export async function getServerSideProps(context) {
  try {
    const session = await getSession({req: context.req});

    const res = await axiosInstance.get("/products");

    if (!session) return {redirect: {destination: "/login"}};

    return {
      props: {products: res.data, session},
    };
  } catch (error) {
    console.log({error});
  }
}

export default Products;
