import {
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, {useState} from "react";
import {signIn} from "next-auth/react";
import {useRouter} from "next/router";

function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [isRegisterProcess, setisRegisterProcess] = useState(false);

  const onLoginClick = async () => {
    setisRegisterProcess(true);
    const res = await signIn("credentials", {
      redirect: false,
      username,
      email,
      password,
    });

    if (!res.error) {
      router.replace("/");
    } else {
      alert(res.error);
    }
    setisRegisterProcess(false);
  };

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  return (
    <Flex
      bg="blue.900"
      height="89vh"
      alignItems="center"
      justifyContent="center"
    >
      <Flex direction="column" background="gray.800" p={10} rounded={6}>
        <Heading mb={6} size="lg" color="white">
          Login
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
          isLoading={isRegisterProcess}
          colorScheme="blue"
          onClick={onLoginClick}
        >
          Login
        </Button>
      </Flex>
    </Flex>
  );
}

export default Login;
