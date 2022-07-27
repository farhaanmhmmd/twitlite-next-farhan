import {
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  Box,
  InputRightElement,
  ChakraProvider,
} from "@chakra-ui/react";
import React, {useState} from "react";
import {signIn} from "next-auth/react";
import {useRouter} from "next/router";
import Image from "next/image";

function Login() {
  const router = useRouter();
  let userID = false;
  if (typeof window !== "undefined") {
    userID = window.localStorage.getItem("user_id");
  }

  if (userID) {
    router.replace("/profile");
  }
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginProcess, setisLoginProcess] = useState(false);

  const onLoginClick = async () => {
    setisLoginProcess(true);
    const res = await signIn("credentials", {
      redirect: false,
      username,
      email,
      password,
    });

    if (!res.error) {
      router.replace("/profile");
    } else {
      alert(res.error);
    }
    setisLoginProcess(false);
  };

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <ChakraProvider>
      <Flex>
        <Flex>
          <Image
            src="/twitliteloginregisterpage.jpg"
            alt="Twitlite Home Wallpaper"
            width={1000}
            height={514}
          />
        </Flex>
        <Flex
          height="89vh"
          width="85vH"
          alignItems="center"
          justifyContent="center"
          background="black"
        >
          <Flex direction="column" rounded={6} p={9}>
            <Box marginBottom={3} textAlign="center">
              <Image
                src="/twitlite.png"
                alt="Twitlite Logo"
                width={40}
                height={40}
              />
            </Box>
            <Heading mb={6} size="md" color="white" textAlign="center">
              Login to Twitlite
            </Heading>
            <Input
              _focusVisible
              type="text"
              value={username || email}
              placeholder="Username or Email"
              variant="filled"
              mb={3}
              onChange={(event) =>
                setUsername(event.target.value) || setEmail(event.target.value)
              }
            />
            <InputGroup size="md">
              <Input
                _focusVisible
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Password"
                variant="filled"
                mb={6}
                onChange={(event) => setPassword(event.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Button
              isLoading={isLoginProcess}
              colorScheme="blue"
              onClick={onLoginClick}
            >
              Login
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}

export default Login;
