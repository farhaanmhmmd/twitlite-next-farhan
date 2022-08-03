import React, {useState} from "react";
import {getSession} from "next-auth/react";
import axiosInstance from "../../services/axios";
import {Text, VStack, Flex, Button, useDisclosure, Box} from "@chakra-ui/react";
import Image from "next/image";
import {api_origin} from "../../constraint";
import EditProfile from "../../components/edit-profile";

function Profile(props) {
  const [avatar, setAvatar] = useState({});
  const [isEmailVerifProcess, setisEmailVerifProcess] = useState(false);
  const [user, setUser] = useState(props.user);
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [imgSource, setimgSource] = useState(api_origin + props.user.image);

  const {
    user_id,
    username,
    bio,
    isVerified,
    first_name: firstName,
    last_name: lastName,
    email,
    gender,
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
      const resGetUserProfile = await axiosInstance.get(
        `/users/profile/${user_id}`,
        config
      );

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

  if (!userVerified) {
    return (
      <>
        <Flex
          height="89vH"
          backgroundImage="url('twitlitehomewallpaper.jpg')"
          backgroundSize={1370}
        >
          <Flex width="700px" direction="column" textColor="white">
            <Box
              width="60vH"
              borderRadius={12}
              marginLeft="50vH"
              marginY="6vH"
              border="1px"
              borderColor="gray.800"
              background="gray.800"
              padding={5}
            >
              <VStack
                marginLeft={4}
                marginBottom={3}
                alignItems="left"
                fontWeight={700}
                fontSize="xl"
              >
                <Text>Profile Picture</Text>
              </VStack>
              <VStack paddingBottom={3}>
                <Image src={imgSource} width={275} height={275} />
              </VStack>
              <VStack marginLeft={4} paddingBottom={3}>
                <input type={"file"} onChange={onFileChange} />
              </VStack>
              <VStack>
                <Button
                  colorScheme="facebook"
                  variant={"solid"}
                  onClick={onSaveButton}
                  size="sm"
                  padding={3}
                >
                  Change Profile Picture
                </Button>
              </VStack>
            </Box>
          </Flex>
          <Flex width="700px" direction="column" textColor="white">
            <Box
              width="60vH"
              borderRadius={12}
              marginLeft="5vH"
              border="1px"
              borderColor="gray.800"
              background="gray.800"
              marginTop="16vH"
              padding={5}
            >
              <VStack
                alignItems="left"
                textColor="white"
                marginLeft={3}
                marginBottom={2}
                fontWeight={700}
                fontSize="xl"
              >
                <Text>User Profile</Text>
              </VStack>
              <VStack alignItems="left" textColor="white" marginLeft={3}>
                <Text>Username : {username}</Text>
                <Text>Email : {email}</Text>
                <Text>
                  Full Name : {firstName} {lastName}
                </Text>
                <Text>Gender : {gender}</Text>
                <Text>Bio : {bio}</Text>
                <VStack paddingTop={2}>
                  <Button
                    colorScheme="facebook"
                    variant={"solid"}
                    onClick={onOpen}
                    size="sm"
                    width={100}
                    alignSelf="center"
                  >
                    Edit Profile
                  </Button>
                  <EditProfile
                    isOpen={isOpen}
                    onClose={onClose}
                    userProfile={userProfile}
                    onSaveProfileUpdate={onSaveProfileUpdate}
                  />
                </VStack>
                <VStack paddingTop={2} alignContent="center">
                  <Button
                    colorScheme="facebook"
                    variant={"solid"}
                    size="sm"
                    isLoading={isEmailVerifProcess}
                    onClick={() => onSendEmailButton(user)}
                  >
                    Resend Email Verification
                  </Button>
                </VStack>
              </VStack>
            </Box>
          </Flex>
        </Flex>
      </>
    );
  } else {
    return (
      <>
        <Flex
          height="89vH"
          backgroundImage="url('twitlitehomewallpaper.jpg')"
          backgroundSize={1370}
        >
          <Flex width="700px" direction="column" textColor="white">
            <Box
              width="60vH"
              borderRadius={12}
              marginLeft="50vH"
              marginY="6vH"
              border="1px"
              borderColor="gray.800"
              background="gray.800"
              padding={5}
            >
              <VStack
                marginLeft={4}
                marginBottom={3}
                alignItems="left"
                fontWeight={700}
                fontSize="xl"
              >
                <Text>Profile Picture</Text>
              </VStack>
              <VStack paddingBottom={3}>
                <Image src={imgSource} width={275} height={275} />
              </VStack>
              <VStack marginLeft={4} paddingBottom={3}>
                <input type={"file"} onChange={onFileChange} />
              </VStack>
              <VStack>
                <Button
                  colorScheme="facebook"
                  variant={"solid"}
                  onClick={onSaveButton}
                  size="sm"
                  padding={3}
                >
                  Change Profile Picture
                </Button>
              </VStack>
            </Box>
          </Flex>
          <Flex width="700px" direction="column" textColor="white">
            <Box
              width="60vH"
              borderRadius={12}
              marginLeft="5vH"
              border="1px"
              borderColor="gray.800"
              background="gray.800"
              marginTop="19vH"
              padding={5}
            >
              <VStack
                alignItems="left"
                textColor="white"
                marginLeft={3}
                marginBottom={2}
                fontWeight={700}
                fontSize="xl"
              >
                <Text>User Profile</Text>
              </VStack>
              <VStack alignItems="left" textColor="white" marginLeft={3}>
                <Text>Username : {username}</Text>
                <Text>Email : {email}</Text>
                <Text>
                  Full Name : {firstName} {lastName}
                </Text>
                <Text>Gender : {gender}</Text>
                <Text>Bio : {bio}</Text>
                <VStack paddingTop={2}>
                  <Button
                    colorScheme="facebook"
                    variant={"solid"}
                    onClick={onOpen}
                    size="sm"
                    width={100}
                    alignSelf="center"
                  >
                    Edit Profile
                  </Button>
                  <EditProfile
                    isOpen={isOpen}
                    onClose={onClose}
                    userProfile={userProfile}
                    onSaveProfileUpdate={onSaveProfileUpdate}
                  />
                </VStack>
              </VStack>
            </Box>
          </Flex>
        </Flex>
      </>
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

    return {
      props: {user: res.data.data.result, session},
    };
  } catch (error) {
    console.log({error});
    return {props: {}};
  }
}

export default Profile;
