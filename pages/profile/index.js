import React from "react";
import {getSession} from "next-auth/react";
import axiosInstance from "../../services/axios";
import {Text} from "@chakra-ui/react";

function Profile(props) {
  const {username, first_name, last_name, email, gender, phone} = props.user;
  return (
    <>
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
