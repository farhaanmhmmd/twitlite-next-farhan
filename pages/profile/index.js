import React, {useState} from "react";
import {getSession} from "next-auth/react";
import axiosInstance from "../../services/axios";
import {Text, VStack, Flex, Button, useDisclosure, Box} from "@chakra-ui/react";
import Image from "next/image";
import MyButton from "../../components/button";
import {api_origin} from "../../constraint";
import EditProfile from "../../components/edit-profile";

function Profile(props) {
  const [avatar, setAvatar] = useState({});
  const [isEmailVerifProcess, setisEmailVerifProcess] = useState(false);
  const [user, setUser] = useState(props.user);
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [imgSource, setimgSource] = useState(api_origin + props.user.image);
  // const [isOpen, setIsOpen] = useState(true);
  // const onClose = () => setIsOpen(true);
  // const onOpen = () => setIsOpen(false);

  const {
    user_id,
    username,
    bio,
    isVerified,
    first_name: firstName,
    last_name: lastName,
    email,
    gender,
    age,
  } = user;

  const userProfile = {
    user_id,
    isVerified,
    username,
    bio,
    firstName,
    lastName,
    email,
    gender,
    age,
  };

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

  const onFileChange = (event) => {
    setAvatar(event.target.files[0]);
    setimgSource(URL.createObjectURL(event.target.files[0]));
  };

  const onSaveButton = async () => {
    try {
      const session = await getSession();

      const {accessToken} = session.user;

      const body = new FormData();

      body.append("avatar", avatar);

      const config = {
        headers: {Authorization: `Bearer ${accessToken}`},
      };

      const res = await axiosInstance.patch("/users/avatar", body, config);

      alert(res.data.message);
    } catch (error) {
      console.log({Error});
      alert(error.response.data.message);
    }
  };

  const onSaveProfileUpdate = async (body) => {
    try {
      const session = await getSession();

      const {accessToken} = session.user;

      const config = {
        headers: {Authorization: `Bearer ${accessToken}`},
      };

      await axiosInstance.patch("/users", body, config);

      alert("Update Profile Success");
      const URI = `/users/profile/${user_id}`;
      const resGetUserProfile = await axiosInstance.get(URI, config);

      setUser(resGetUserProfile.data.data.result);
    } catch (error) {
      console.log({error});
      alert(error.response.data.message);
    }
  };

  const onSendEmailButton = async () => {
    try {
      setisEmailVerifProcess(true);

      const res = await axiosInstance.post("/users/email/send", userProfile);
      alert(res.data.message);
    } catch (error) {
      console.log({error});
    } finally {
      setisEmailVerifProcess(false);
    }
  };

  return (
    <>
      <Flex>
        <Flex
          bg="blue.900"
          width="700px"
          height="89vH"
          direction="column"
          textColor="white"
        >
          <Box
            width="60vH"
            borderRadius={12}
            marginLeft="50vH"
            marginY="10vH"
            border="1px"
            borderColor="gray.800"
            background="gray.800"
          >
            <VStack marginY={4}>
              <Image src={imgSource} width={150} height={200} />
              <input type={"file"} onChange={onFileChange} />
              <Button
                colorScheme="blue"
                variant={"solid"}
                onClick={onSaveButton}
              >
                Save
              </Button>
              <Button colorScheme="blue" variant={"solid"} onClick={onOpen}>
                Edit Profile
              </Button>
              <EditProfile
                isOpen={isOpen}
                onClose={onClose}
                userProfile={userProfile}
                onSaveProfileUpdate={onSaveProfileUpdate}
              />
            </VStack>
          </Box>
        </Flex>
        <Flex
          bg="blue.900"
          width="700px"
          height="89vH"
          direction="column"
          textColor="white"
        >
          <Box
            width="60vH"
            borderRadius={12}
            marginLeft="5vH"
            border="1px"
            borderColor="gray.800"
            background="gray.800"
            marginTop="23vH"
          >
            <VStack alignItems="left" textColor="white" marginLeft={3}>
              <Text>Username : {username}</Text>
              <text>Bio : {bio}</text>
              <Text>
                Full Name : {firstName} {lastName}
              </Text>
              <Text>Email : {email}</Text>
              <Text>Age : {age}</Text>
              <Text>Gender : {gender}</Text>
            </VStack>
            <VStack marginY={2} alignContent="center">
              <Button
                colorScheme="blue"
                variant={"solid"}
                size="xs"
                isLoading={isEmailVerifProcess}
                onClick={() => onSendEmailButton(user)}
              >
                Send Email Verification
              </Button>
            </VStack>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const session = await getSession({req: context.req});

    // if (!session) return {redirect: {destination: "/login"}};
    if (!session) return {redirect: {destination: "/"}};

    const {accessToken} = session.user;

    const config = {
      headers: {Authorization: `Bearer ${accessToken}`},
    };

    const user_id = session.user.user_id;
    const URI = `/users/profile/${user_id}`;
    const res = await axiosInstance.get(URI, config);

    return {
      props: {user: res.data.data.result, session},
    };
  } catch (error) {
    console.log({error});
    return {props: {}};
  }
}

export default Profile;
