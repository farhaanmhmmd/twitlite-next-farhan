import {
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, {useState} from "react";
import axiosInstance from "../services/axios";

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
          Register
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
        <Input
          _focusVisible
          type="password"
          value={password}
          placeholder="Password"
          variant="filled"
          mb={3}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Input
          _focusVisible
          type="password"
          value={confirmPassword}
          placeholder="Repeat Password"
          variant="filled"
          mb={6}
          onChange={(event) => setConfirmPassword(event.target.value)}
        />
        <Button
          isLoading={isRegisterProcess}
          colorScheme="blue"
          onClick={onRegisterClick}
        >
          Register
        </Button>
      </Flex>
    </Flex>
  );
}

export default Register;
