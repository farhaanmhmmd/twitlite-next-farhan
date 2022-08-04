import React, {useState} from "react";
import {getSession} from "next-auth/react";
import axiosInstance from "../../services/axios";
import {Text, HStack, VStack, Flex, Box, Button} from "@chakra-ui/react";
import Image from "next/image";
import {useRouter} from "next/router";

function Post(props) {
  const [user, setUser] = useState(props.user);
  const [post, setPost] = useState(props.post);
  const router = useRouter();

  const {user_id, isVerified} = user;

  const userProfile = {
    user_id,
    isVerified,
  };

  const {post_id, username, postImage, createdAt, caption} = post;

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

  async function onDeleteClick() {
    try {
      const resDeletePost = await axiosInstance.delete(`/posts/${post_id}`);
      router.replace("/posts");
    } catch (error) {
      console.log({error});
    }
  }

  console.log(post_id);

  return (
    <Flex
      height="auto"
      backgroundImage="url('/universe.jpg')"
      backgroundSize={500}
    >
      <Box
        width="78vH"
        borderRadius={12}
        marginLeft="72vH"
        marginY="4vH"
        border="1px"
        borderColor="gray.800"
        background="gray.800"
        textColor="white"
        height="auto"
      >
        <VStack alignItems="left" marginTop={3} marginBottom={3} marginLeft={6}>
          <Text fontWeight={700} fontSize={18}>
            {username}
          </Text>
        </VStack>
        <VStack>
          <Image
            src={`http://localhost:2104${postImage}`}
            width={400}
            height={300}
          />
        </VStack>
        <VStack alignItems="end" fontSize={12} marginRight={6} marginTop={2}>
          <Text>Posted at: {createdAt.slice(0, 10)}</Text>
        </VStack>
        <VStack alignItems="left" marginLeft={6} marginTop={2}>
          <HStack>
            <Button
              colorScheme="pink"
              variant={"solid"}
              // onClick={onLikelick}
              size="xs"
              padding={3}
              fontSize={18}
              textColor="white"
            >
              ♥
            </Button>
            <Text fontSize={14}>0 likes </Text>
          </HStack>
          <Text fontSize={15}>Caption: {caption}</Text>
          {/* <HStack paddingBottom={4} alignItems="left" fontSize={15}>
              <Text>Comments:</Text>
            </HStack> */}
          <HStack paddingBottom={3} paddingTop={1} paddingLeft={240}>
            <Button
              colorScheme="facebook"
              variant={"solid"}
              // onClick={onEditClick}
              size="xs"
              padding={3}
              textColor="white"
            >
              Edit Post
            </Button>
            <Button
              colorScheme="facebook"
              variant={"solid"}
              onClick={onDeleteClick}
              size="xs"
              padding={3}
              textColor="white"
            >
              Delete Post
            </Button>
          </HStack>
        </VStack>
      </Box>
    </Flex>
  );
}

export async function getServerSideProps(context) {
  try {
    const session = await getSession({req: context.req});

    if (!session) return {redirect: {destination: "/"}};

    const {accessToken} = session.user;

    const {post_id} = context.params;

    const config = {
      headers: {Authorization: `Bearer ${accessToken}`},
    };

    const user_id = session.user.user_id;
    const userRes = await axiosInstance.get(
      `/users/profile/${user_id}`,
      config
    );
    const postRes = await axiosInstance.get(`/posts/${post_id}`);

    return {
      props: {
        user: userRes.data.data.result,
        post: postRes.data.data.detail,
        session,
      },
    };
  } catch (error) {
    console.log({error});
    return {props: {}};
  }
}

export default Post;
