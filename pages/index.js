import {HStack, Flex, ChakraProvider} from "@chakra-ui/react";
import Image from "next/image";

function Home() {
  return (
    <ChakraProvider>
      <HStack>
        <Flex>
          <Image
            src="/twitlitehomewallpaper.jpg"
            alt="Twitlite Home Wallpaper"
            width={1250}
            height={522}
          />
        </Flex>
      </HStack>
    </ChakraProvider>
  );
}

export default Home;
