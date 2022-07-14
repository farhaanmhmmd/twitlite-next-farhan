import {Flex, Text, Button} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

export default function ProductItem(props) {
  const {id, productName, productImage, price} = props.product;

  return (
    <Flex
      w="30%"
      direction="column"
      background="gray.200"
      marginBlock={5}
      rounded={5}
      p={3}
    >
      <Image src={productImage} alt={productName} width={500} height={700} />
      {/* <img src={productImage} alt={productName} /> */}
      <Text mt={3} mb={2}>
        {productName}
      </Text>
      <Text> Rp {price.toLocaleString("id")}</Text>
      <Link href={`/products/${id}`}>
        <Button>Detail</Button>
      </Link>
    </Flex>
  );
}
