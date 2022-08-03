import React, {useState} from "react";
import axiosInstance from "../../services/axios";
import {getSession} from "next-auth/react";
import {useRouter} from "next/router";
import {
  Button,
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Image,
  Flex,
} from "@chakra-ui/react";

function createPost(props) {
  const [imgSource, setImgSource] = useState({});
  const [image, setImage] = useState({});
  const [caption, setCaption] = useState("");
  const router = useRouter();

  const {user_id} = props;

  function onChooseImage(event) {
    setImage(event.target.files[0]);
    setImgSource(URL.createObjectURL(event.target.files[0]));
  }

  async function onClickPost() {
    try {
      const {accessToken} = props;

      const body = new FormData();

      body.append("createPost", image);
      body.append("caption", caption);

      const config = {
        headers: {Authorization: `Bearer ${accessToken}`},
        caption,
      };

      const resCreateNewPost = await axiosInstance.post(
        `/posts/createPost/${user_id}`,
        body,
        config
      );

      router.replace("/posts");
    } catch (error) {
      console.log({error});
    }
  }

  function onCaptionInput(event) {
    setCaption(event.target.value);
  }

  return (
    <Flex
      bg="blue.900"
      height="89vH"
      width="100%"
      backgroundImage="url('/universe.jpg')"
      backgroundSize={500}
    >
      <Flex textColor="white">
        <Box
          width="70vH"
          borderRadius={20}
          marginLeft="75vH"
          marginTop="6vH"
          marginBottom="6vH"
          border="1px"
          borderColor="gray.800"
          background="gray.800"
          padding={6}
          paddingTop={3}
        >
          <VStack textAlign="left">
            <FormLabel>Choose an Image</FormLabel>
          </VStack>
          <VStack>
            <Image src={imgSource} width={200} height={200} />
            <input onChange={onChooseImage} type={"file"} />
            <FormControl>
              <FormLabel marginTop={2}>Write a Caption!</FormLabel>
              <Input
                marginBottom={2}
                type="text"
                onChange={onCaptionInput}
                focused
              />
            </FormControl>
            <Button colorScheme="blue" variant={"solid"} onClick={onClickPost}>
              Share
            </Button>
          </VStack>
        </Box>
      </Flex>
    </Flex>
  );
}

export async function getServerSideProps(context) {
  try {
    const session = await getSession({req: context.req});

    if (!session) return {redirect: {destination: "/"}};

    const {user_id, accessToken} = session.user;

    return {
      props: {
        user_id,
        accessToken,
      },
    };
  } catch (error) {
    const errorMessage = error.message;
    console.log({error});
    return {
      props: {
        errorMessage,
      },
    };
  }
}

export default createPost;
