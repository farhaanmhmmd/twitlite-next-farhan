import {Button} from "@chakra-ui/react";

export default function MyButton(props) {
  const {children} = props;
  return (
    <Button _hover={{bg: "gray"}} colorScheme="blue" {...props}>
      {children}
    </Button>
  );
}
