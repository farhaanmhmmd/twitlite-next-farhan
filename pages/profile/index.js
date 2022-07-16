import React, {useState} from "react";
import {getSession} from "next-auth/react";
import axiosInstance from "../../services/axios";
import {Text, VStack, Button, useDisclosure} from "@chakra-ui/react";
import Image from "next/image";
import MyButton from "../../components/button";
import {api_origin} from "../../constraint";
import EditProfile from "../../components/edit-profile";

function Profile(props) {
  const [avatar, setAvatar] = useState({});
  const [user, setUser] = useState(props.user);
  const {isOpen, onOpen, onClose} = useDisclosure();
  const [imgSource, setimgSource] = useState(api_origin + props.user.image);

  const {
    username,
    first_name: firstName,
    last_name: lastName,
    email,
    gender,
    phone,
    age,
  } = user;

  const userProfile = {
    username,
    firstName,
    lastName,
    email,
    gender,
    phone,
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
      <VStack mt={2}>
        <Image src={imgSource} width={200} height={200} />
        <input type={"file"} onChange={onFileChange} />
        <Button variant={"ghost"} onClick={onSaveButton}>
          Save
        </Button>
      </VStack>
      <Text>Username : {username}</Text>
      <Text>First name : {firstName}</Text>
      <Text>Last name : {lastName}</Text>
      <Text>Email : {email}</Text>
      <Text>Age : {age}</Text>
      <Text>Gender : {gender}</Text>
      <Text>Phone : {phone}</Text>
      <MyButton variant={"ghost"} onClick={onOpen}>
        Edit Profile
      </MyButton>
      <EditProfile
        isOpen={isOpen}
        onClose={onClose}
        userProfile={userProfile}
        onSaveProfileUpdate={onSaveProfileUpdate}
      />
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
