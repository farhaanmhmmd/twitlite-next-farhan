import React, {useState} from "react";
import {getSession} from "next-auth/react";
import axiosInstance from "../../services/axios";
import {Text, VStack, Button} from "@chakra-ui/react";
import Image from "next/image";
import {api_origin} from "../../constraint";

function Profile(props) {
  const [avatar, setAvatar] = useState({});
  const [imgSource, setimgSource] = useState(api_origin + props.user.image);

  const {username, first_name, last_name, email, gender, phone} = props.user;

  const onFileChange = (event) => {
    setAvatar(event.target.files[0]);
    setimgSource(URL.ObjectURL(event.target.files[0]));
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

  return (
    <>
      <VStack>
        <Image src={imgSource} width={200} height={200} />
        <input type={"file"} onChange={onFileChange} />
        <Button variant={"ghost"} onClick={onSaveButton}>
          Save
        </Button>
      </VStack>
      <Text>Username : {username}</Text>
      <Text>First name : {first_name}</Text>
      <Text>Last name : {last_name}</Text>
      <Text>Email : {email}</Text>
      <Text>Gender : {gender}</Text>
      <Text>Phone : {phone}</Text>
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
