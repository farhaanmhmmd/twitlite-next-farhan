import {Button, Flex, Heading, Input} from "@chakra-ui/react";
import {useState} from "react";
import {signIn} from "next-auth/react";
import {useRouter} from "next/router";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [isRegisterProcess, setisRegisterProcess] = useState(false);

  const onLoginClick = async () => {
    setisRegisterProcess(true);
    const res = await signIn("credentials", {
      redirect: false,
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

  return (
    <Flex height="85vh" alignItems="center" justifyContent="center">
      <Flex direction="column" background="gray.400" p={12} rounded={6}>
        <Heading mb={6}>Login</Heading>
        <Input
          type="text"
          value={email}
          placeholder="your@mail.com"
          variant="filled"
          mb={3}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Input
          type="password"
          value={password}
          placeholder="**************"
          variant="filled"
          mb={6}
          onChange={(event) => setPassword(event.target.value)}
        />

        <Button
          isLoading={isRegisterProcess}
          colorScheme="teal"
          onClick={onLoginClick}
        >
          Login
        </Button>
      </Flex>
    </Flex>
  );
}

export default Login;
