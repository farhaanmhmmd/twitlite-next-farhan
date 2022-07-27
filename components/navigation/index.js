import {
  Box,
  HStack,
  Text,
  Flex,
  Link,
  IconButton,
  ChakraProvider,
  ButtonGroup,
  Input,
} from "@chakra-ui/react";
import NextLink from "next/link";
import Image from "next/image";
import {useSession, signOut} from "next-auth/react";
import {SearchIcon} from "@chakra-ui/icons";

function Navigation() {
  const {data: session} = useSession();

  const onLogoutClick = async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("userVerified");
      localStorage.removeItem("user_id");
    }

    await signOut();
    return {redirect: {destination: "/"}};
  };

  return (
    <ChakraProvider>
      <Box pl="44vH" width="100%" height="11vh" backgroundColor="gray.800">
        <HStack>
          <Flex>
            {session && (
              <>
                <Box my="18px" mr={1}>
                  <Image
                    src="/twitlite.png"
                    alt="Twitlite Logo"
                    width={25}
                    height={25}
                  />
                </Box>

                <Box>
                  <Text mr="3" fontSize="lg" my={4} color="blue.300">
                    TWITLITE
                  </Text>
                </Box>
              </>
            )}
            {!session && (
              <>
                <Box my="18px" mr={1}>
                  <Image
                    src="/twitlite.png"
                    alt="Twitlite Logo"
                    width={25}
                    height={25}
                  />
                </Box>
                <Box>
                  <Text mr="3" fontSize="lg" my={4} color="blue.300">
                    TWITLITE
                  </Text>
                </Box>
              </>
            )}
            {session && (
              <>
                <NextLink href="/posts">
                  <Link>
                    <Text
                      marginLeft="2"
                      mr="0"
                      fontSize="lg"
                      my={4}
                      color="blue.300"
                    >
                      Posts
                    </Text>
                  </Link>
                </NextLink>
              </>
            )}
            {session && (
              <>
                <Box>
                  <ButtonGroup>
                    <IconButton
                      marginLeft="2vH"
                      colorScheme="blue"
                      variant="link"
                      aria-label="Search database"
                      my={6}
                      icon={<SearchIcon />}
                    />
                  </ButtonGroup>
                </Box>
                <Input placeholder="Search" my={4} size="sm" width="60vH" />
              </>
            )}
            {!session && (
              <>
                <Box>
                  <ButtonGroup>
                    <IconButton
                      marginLeft="2vH"
                      colorScheme="blue"
                      variant="link"
                      aria-label="Search database"
                      my={6}
                      icon={<SearchIcon />}
                    />
                  </ButtonGroup>
                </Box>
                <Input placeholder="Search" my={4} size="sm" width="68vH" />
              </>
            )}

            {!session && (
              <>
                <NextLink href="/login">
                  <Link>
                    <Text
                      ml="6vH"
                      mr="3"
                      fontSize="lg"
                      color="blue.300"
                      my={4}
                      w="100%"
                    >
                      Login
                    </Text>{" "}
                  </Link>
                </NextLink>
                <NextLink href="/register">
                  <Link>
                    <Text mx="3" fontSize="lg" color="blue.300" my={4} w="100%">
                      Register
                    </Text>{" "}
                  </Link>
                </NextLink>
              </>
            )}
            {session && (
              <>
                {/* <NextLink href="/About Us">
                  <Link>
                    <Text mx="3" fontSize="lg" color="blue.300" my={4} w="80px">
                      About Us
                    </Text>
                  </Link>
                </NextLink> */}
                <Link>
                  <Text
                    ml="4vH"
                    onClick={onLogoutClick}
                    my={4}
                    fontSize="lg"
                    color="blue.300"
                  >
                    Logout
                  </Text>
                </Link>
                <NextLink href="/profile">
                  <Link>
                    <Text ml="5" fontSize="lg" color="blue.300" my={4}>
                      {session?.user.username}
                    </Text>
                  </Link>
                </NextLink>
              </>
            )}
          </Flex>
        </HStack>
      </Box>
    </ChakraProvider>
  );
}

export default Navigation;
