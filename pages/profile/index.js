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
  const [user, setUser] = useState(props.user);
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [imgSource, setimgSource] = useState(api_origin + props.user.image);
  // const [isOpen, setIsOpen] = useState(true);
  // const onClose = () => setIsOpen(true);
  // const onOpen = () => setIsOpen(false);

  const {
    username,
    first_name: firstName,
    last_name: lastName,
    email,
    gender,
    age,
  } = user;

  const userProfile = {
    username,
    firstName,
    lastName,
    email,
    gender,
    age,
  };

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

      const resGetUserProfile = await axiosInstance.get(
        "/users/profile",
        config
      );

      setUser(resGetUserProfile.data.data.result);
    } catch (error) {
      console.log({error});
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <Flex height="89vH" bg="blue.900" direction="column" textColor="white">
        <Box
          borderRadius={12}
          marginX="60vH"
          marginY="9vH"
          border="1px"
          borderColor="blue.700"
          background="blue.700"
        >
          <VStack marginY={4}>
            <Image src={imgSource} width={200} height={200} />
            <input type={"file"} onChange={onFileChange} />
            <Button colorScheme="blue" variant={"solid"} onClick={onSaveButton}>
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
    </>
  );
}

export async function getServerSideProps(context) {
  try {
    const session = await getSession({req: context.req});

    if (!session) return {redirect: {destination: "/login"}};

    const {accessToken} = session.user;

    const config = {
      headers: {Authorization: `Bearer ${accessToken}`},
    };

    const res = await axiosInstance.get("/users/profile", config);

    return {
      props: {user: res.data.data.result, session},
    };
  } catch (error) {
    console.log({error});
    return {props: {}};
  }
}

export default Profile;

{
  /* <Flex bg="blue.900">
        <VStack alignItems="left" textColor="white" marginLeft={3}>
          <Text>Username : {username}</Text>
          <Text>
            Full Name : {firstName} {lastName}
          </Text>
          <Text>Email : {email}</Text>
          <Text>Age : {age}</Text>
          <Text>Gender : {gender}</Text>
          
          
        </VStack>
      </Flex> */
}
