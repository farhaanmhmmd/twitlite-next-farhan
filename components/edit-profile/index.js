import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Heading,
  Button,
  Input,
  Select,
} from "@chakra-ui/react";
import {useState} from "react";

function EditProfile(props) {
  const {isOpen, onClose, userProfile, onSaveProfileUpdate} = props;
  // userProfile : { username, firstName, lastName, email, gender, phone, age }
  const [user, setUser] = useState(userProfile);
  const {username, firstName, lastName, email, gender, phone, age} = user;

  const onHandleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            name="username"
            type="text"
            value={username}
            disabled
            variant="filled"
            mb={3}
            onChange={onHandleChange}
          />
          <Input
            name="firstName"
            type="text"
            value={firstName}
            variant="filled"
            mb={3}
            onChange={onHandleChange}
          />
          <Input
            name="lastName"
            type="text"
            value={lastName}
            variant="filled"
            mb={3}
            onChange={onHandleChange}
          />
          <Input
            name="email"
            type="text"
            value={email}
            variant="filled"
            mb={3}
            onChange={onHandleChange}
          />
          <Input
            name="age"
            type="text"
            value={age}
            variant="filled"
            mb={3}
            onChange={onHandleChange}
          />
          <Select
            name="gender"
            value={gender}
            variant="filled"
            onChange={onHandleChange}
            mb={3}
          >
            <option value="M">M</option>
            <option value="F">F</option>
          </Select>

          <Input
            name="phone"
            type="text"
            value={phone}
            variant="filled"
            mb={3}
            onChange={onHandleChange}
          />
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="green"
            mr={3}
            onClick={() => onSaveProfileUpdate(user)}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditProfile;
