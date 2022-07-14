import {Box, Button, HStack, Text, Flex, Link} from "@chakra-ui/react";
import MyButton from "../button";
import NextLink from "next/link";
import {useSession, signOut} from "next-auth/react";

function Navigation() {
  const {data: session} = useSession();

  const onLogoutClick = async () => {
    await signOut();
  };
  return (
    <Box width="100%" mx="auto" height="15vh" backgroundColor="gray.800">
      <HStack>
        <NextLink href="/">
          <Link>
            <Text ml="270px" mr="5" fontSize="lg" my={2} color="blue.300">
              TWITLITE
            </Text>
          </Link>
        </NextLink>
        <Flex>
          {session && (
            <NextLink href="/products">
              <Link>
                <Text mx="3" fontSize="lg" color="blue.300" my={7} w="100%">
                  Products
                </Text>
              </Link>
            </NextLink>
          )}
          {!session && (
            <>
              <NextLink href="/login">
                <Link>
                  <Text
                    ml="75vH"
                    mr="3"
                    fontSize="lg"
                    color="blue.300"
                    my={7}
                    w="100%"
                  >
                    Login
                  </Text>{" "}
                </Link>
              </NextLink>
              <NextLink href="/register">
                <Link>
                  <Text mx="3" fontSize="lg" color="blue.300" my={7} w="100%">
                    Register
                  </Text>{" "}
                </Link>
              </NextLink>
            </>
          )}
          {session && (
            <>
              <NextLink href="/About Us">
                <Link>
                  <Text mx="3" fontSize="lg" color="blue.300" my={7} w="80px">
                    About Us
                  </Text>
                </Link>
              </NextLink>
              <Link>
                <Text
                  ml="45vH"
                  onClick={onLogoutClick}
                  my={7}
                  fontSize="lg"
                  color="blue.300"
                >
                  Logout
                </Text>
              </Link>
            </>
          )}
        </Flex>
      </HStack>
    </Box>
  );
}

export default Navigation;
