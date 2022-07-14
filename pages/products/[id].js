// import {useRouter} from "next/router";
import {Box, HStack, Flex, Text} from "@chakra-ui/react";
import axiosInstance from "../../services/axios";
import Head from "next/head";

function ProductDetail(props) {
  // const router = useRouter();
  // const {id} = router.query;
  const {product} = props;
  const {productName, productImage, price, description} = product;

  return (
    <HStack>
      <Head>
        <title>Detail Post - Twitlite</title>
        <meta name="description" content="Twitlite Post Detail" />
      </Head>
      <img style={{width: "50%"}} src={productImage} alt={productName} />
      <Box p={2}>
        <Text mb={3}>{productName}</Text>
        <Text mb={2}>{description}</Text>
        <Text>Rp. {price.toLocaleString("id")}</Text>
      </Box>
    </HStack>
  );
}

export async function getServerSideProps(context) {
  try {
    const {id} = context.params;
    const res = await axiosInstance.get(`/products/${id}`);
    return {
      props: {product: res.data},
    };
  } catch (error) {
    console.log({error});
  }
}

export default ProductDetail;
