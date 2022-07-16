import {Box} from "@chakra-ui/react";
import React from "react";
import Navigation from "../navigation";

function Layout({children}) {
  return (
    <>
      <Navigation />
      <Box width="100%">{children}</Box>
    </>
  );
}

export default Layout;
