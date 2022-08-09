import React, {useState} from "react";
import {getSession} from "next-auth/react";
import axiosInstance from "../../services/axios";
import {
  Text,
  HStack,
  VStack,
  Flex,
  Box,
  Button,
  FormControl,
  Input,
} from "@chakra-ui/react";
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

  const {post_id, username, postImage, createdAt, caption, likes} = post;

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

  async function onLikelick() {
    const likesCount = {user_id, post_id};

    const resAddLike = await axiosInstance.post(`/likes/addLike`, likesCount);
  }

  async function addComment() {
    const commentPost = document.getElementById("commentPost").value;
    const addComment = {user_id, commentPost};

    const resAddLike = await axiosInstance.post(
      `/comments/${post.post_id}`,
      addComment
    );
  }

  const listComments = post.comments.map((postComment) => {
    return (
      <Text>
        {post.username}: {postComment.commentPost}
      </Text>
    );
  });

  async function editCaption() {
    try {
      const editCaptipn = document.getElementById("editCaption").value;
      const reqBody = {
        caption: editCaptipn,
        post_id: post.post_id,
      };
      const res = await axiosInstance.patch("/posts/caption", reqBody);

      alert(res.data.message);
    } catch (error) {
      console.log({Error});
      alert(error.response.data.message);
    }
  }

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
              onClick={onLikelick}
              size="xs"
              padding={3}
              fontSize={18}
              textColor="white"
            >
              ♥
            </Button>
            <Text fontSize={14}>{likes} likes </Text>
          </HStack>
          <Text fontSize={15}>Caption: {caption}</Text>
          <FormControl>
            <HStack marginBottom={4}>
              <Input
                placeholder="Edit Caption"
                size="xs"
                width={340}
                type="text"
                id="editCaption"
                borderColor="gray.800"
              />
              <Button
                size="xs"
                colorScheme="facebook"
                variant="outline"
                onClick={editCaption}
              >
                Submit
              </Button>
            </HStack>
          </FormControl>
          <VStack alignItems="left" fontSize={15}>
            <Text>Comments:</Text>
          </VStack>
          <VStack alignItems="left" fontSize={14}>
            {listComments}
          </VStack>
          <VStack>
            <FormControl>
              <HStack marginBottom={6}>
                <Input
                  placeholder="Add Comment!"
                  size="sm"
                  width={340}
                  type="text"
                  id="commentPost"
                />
                <Button
                  size="xs"
                  colorScheme="facebook"
                  onClick={addComment}
                  variant="solid"
                >
                  Submit
                </Button>
              </HStack>
            </FormControl>
          </VStack>
          <HStack paddingBottom={4} paddingTop={1} paddingLeft={320}>
            <Button
              colorScheme="red"
              variant="solid"
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
