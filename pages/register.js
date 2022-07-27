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
import axiosInstance from "../services/axios";
import Image from "next/image";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegisterProcess, setisRegisterProcess] = useState(false);

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const validatePassword = (password) => {
    const validator = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    return validator.test(password);
  };

  const onRegisterClick = async () => {
    try {
      setisRegisterProcess(true);

      if (!username.length) {
        alert("Username cannot be empty");
        return false;
      }

      if (username.length > 12) {
        alert("Username max characters is 12");
        return false;
      }

      if (!email.length) {
        alert("Email cannot be empty");
        return false;
      }

      if (!validateEmail(email)) {
        alert("Invalid email address");
        return false;
      }

      if (!validatePassword(password)) {
        alert(
          "Passwords should contain at least 8 characters, an uppercase letter, a symbol, and a number"
        );
        return false;
      }

      if (password != confirmPassword) {
        alert("Passwords do not match");
        return false;
      }

      const body = {
        username,
        email,
        password,
      };
      const res = await axiosInstance.post("/users", body);
      alert(res.data.message);
    } catch (error) {
      console.log({error});
      alert(error.response.data.message);
    } finally {
      setisRegisterProcess(false);
    }
  };

  const [show, setShow] = React.useState(false);
  const [showRepeat, setShowRepeat] = React.useState(false);

  const handleClick = () => setShow(!show);
  const handleClickRepeat = () => setShowRepeat(!showRepeat);

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
              Register to Twitlite
            </Heading>
            <Input
              _focusVisible
              type="text"
              value={username}
              placeholder="Username"
              variant="filled"
              mb={3}
              onChange={(event) => setUsername(event.target.value)}
            />
            <Input
              _focusVisible
              type="text"
              value={email}
              placeholder="Email"
              variant="filled"
              mb={3}
              onChange={(event) => setEmail(event.target.value)}
            />
            <InputGroup>
              <Input
                _focusVisible
                pr="4.5rem"
                type={show ? "text" : "password"}
                value={password}
                placeholder="Password"
                variant="filled"
                mb={3}
                onChange={(event) => setPassword(event.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <InputGroup>
              <Input
                _focusVisible
                pr="4.5rem"
                type={showRepeat ? "text" : "password"}
                value={confirmPassword}
                placeholder="Repeat Password"
                variant="filled"
                mb={6}
                onChange={(event) => setConfirmPassword(event.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClickRepeat}>
                  {showRepeat ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
            <Button
              isLoading={isRegisterProcess}
              colorScheme="blue"
              onClick={onRegisterClick}
            >
              Register
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}

export default Register;
