import React, {useState} from "react";
import {getSession} from "next-auth/react";
import axiosInstance from "../../services/axios";
import {Text, VStack, Flex, Button, Box} from "@chakra-ui/react";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";

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
      const image = `http://localhost:2104${post.postImage}`;
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
          <VStack marginY={3} alignItems="left" marginX={8}>
            <Text fontWeight={700} fontSize={18} marginBottom={3}>
              {post.username}
            </Text>
            <Image src={image} width={250} height={250} />
            <VStack
              alignItems="end"
              fontSize={12}
              marginRight={6}
              marginTop={2}
            >
              <Text>Created at: {post.createdAt.slice(0, 10)}</Text>
            </VStack>
            <Text fontSize={15}>{post.likes} likes </Text>
            <Text fontSize={16}>Caption: {post.caption}</Text>
          </VStack>
          <VStack marginTop={4} marginBottom={4}>
            <Button colorScheme="facebook" variant={"solid"} size="sm">
              <a href={`/detailPost/${post.post_id}`}> Detail Post</a>
            </Button>
          </VStack>
        </Box>
      );
    });

    return (
      <>
        <Flex
          height="auto"
          width="100%"
          direction="column"
          backgroundImage="url('/universe.jpg')"
          backgroundSize={500}
        >
          <Button
            colorScheme="facebook"
            variant={"solid"}
            marginTop={2}
            marginBottom={1}
            marginLeft="75vH"
            width="33.2%"
          >
            <a href="/createPost">Create a New Post! </a>
          </Button>
          <Flex textColor="white" flexDirection="column">
            {postMap}
          </Flex>
        </Flex>
      </>
    );
  } else {
    return (
      <Flex
        bg="blue.900"
        height="89vH"
        width="100%"
        backgroundImage="url('/twitlitehomewallpaper.jpg')"
        backgroundSize={1370}
      >
        <Flex textColor="white">
          <Box
            width="100vH"
            borderRadius={6}
            marginLeft="60vH"
            marginTop="25vH"
            marginBottom="35vH"
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
