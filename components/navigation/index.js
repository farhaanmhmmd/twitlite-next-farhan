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
    await signOut();
  };
  return (
    <ChakraProvider>
      <Box pl="30vH" width="100%" height="11vh" backgroundColor="gray.800">
        <HStack>
          <Flex>
            <Box my="18px" mr={1}>
              <Image
                src="/twitlite.png"
                alt="Twitlite Logo"
                width={25}
                height={25}
              />
            </Box>
            <Box>
              <Text mr="5" fontSize="lg" my={4} color="blue.300">
                TWITLITE
              </Text>
            </Box>
            <NextLink href="/">
              <Link>
                <Text mr="8" fontSize="lg" my={4} color="blue.300">
                  Home
                </Text>
              </Link>
            </NextLink>
            <Box>
              <ButtonGroup>
                <IconButton
                  colorScheme="blue"
                  variant="link"
                  aria-label="Search database"
                  my={6}
                  icon={<SearchIcon />}
                />
              </ButtonGroup>
            </Box>
            <Input placeholder="Search" my={4} size="sm" width="68vH" />
            {/* {session && (
              <NextLink href="/products">
                <Link>
                  <Text mx="3" fontSize="lg" color="blue.300" my={4} w="100%">
                    Products
                  </Text>
                </Link>
              </NextLink>
            )} */}
            {!session && (
              <>
                <NextLink href="/login">
                  <Link>
                    <Text
                      ml="8vH"
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
                    ml="8vH"
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
