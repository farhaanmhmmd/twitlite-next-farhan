import React, {useState} from "react";
import {getSession} from "next-auth/react";
import axiosInstance from "../../services/axios";
import {Text, VStack, Flex, Button, Box} from "@chakra-ui/react";
import Image from "next/image";

function Posts(props) {
  const [user, setUser] = useState(props.user);
  const [allPosts, setAllPosts] = useState(props.allPosts);

  const {user_id, isVerified} = user;

  const userProfile = {
    user_id,
    isVerified,
  };

  const [] = allPosts;

  const userVerified = userProfile.isVerified;
  if (userVerified) {
    if (typeof window !== "undefined") {
      localStorage.setItem("userVerified", true);
    }
  }

  const userID = userProfile.user_id;
  if (userID) {
    if (typeof window !== "undefined") {
      localStorage.setItem("user_id", userID);
    }
  }

  if (userVerified) {
    const postMap = allPosts.map((post) => {
      const completeImageURL = `http://localhost:2104${post.postImage}`;
      return (
        <Box
          width="70vH"
          borderRadius={6}
          marginLeft="75vH"
          marginTop="1vH"
          marginBottom="1vH"
          border="1px"
          borderColor="gray.800"
          background="gray.800"
        >
          <VStack marginY={3}>
            <Text marginBottom={1}>{post.username}</Text>
            <Image src={completeImageURL} width={250} height={250} />
            <Text>Created at: {post.createdAt.slice(0, 10)}</Text>
            <Text>Likes: {post.likes}</Text>
            <Text>Caption: {post.caption}</Text>
            <Button colorScheme="blue" variant={"solid"}>
              <a href="/postDetail"> Detail</a>
            </Button>
          </VStack>
        </Box>
      );
    });

    return (
      <>
        <Flex bg="blue.900" height="auto" width="100%" direction="column">
          <Button
            colorScheme="blue"
            variant={"solid"}
            marginTop={2}
            marginBottom={1}
            marginLeft="75vH"
            width="32.9%"
          >
            <a href="/postImage">Create a New Post! </a>
          </Button>
          <Flex textColor="white" flexDirection="column">
            {postMap}
          </Flex>
        </Flex>
      </>
    );
  } else {
    return (
      <Flex bg="blue.900" height="89vH" width="100%">
        <Flex textColor="white">
          <Box
            width="100vH"
            borderRadius={6}
            marginLeft="60vH"
            marginTop="15vH"
            marginBottom="44vH"
            border="1px"
            borderColor="gray.800"
            background="gray.800"
            padding={10}
          >
            <VStack>
              <Text marginBottom="4vH">You are not verified yet. </Text>
              <Text>
                You need to verify your account before you open this page.
              </Text>
            </VStack>
          </Box>
        </Flex>
      </Flex>
    );
  }
}

export async function getServerSideProps(context) {
  try {
    const session = await getSession({req: context.req});

    if (!session) return {redirect: {destination: "/"}};

    const {accessToken} = session.user;

    const config = {
      headers: {Authorization: `Bearer ${accessToken}`},
    };

    const user_id = session.user.user_id;
    const res = await axiosInstance.get(`/users/profile/${user_id}`, config);
    const postRes = await axiosInstance.get(`/posts`);

    return {
      props: {
        user: res.data.data.result,
        allPosts: postRes.data.data,
        session,
      },
    };
  } catch (error) {
    console.log({error});
    return {props: {}};
  }
}

export default Posts;
