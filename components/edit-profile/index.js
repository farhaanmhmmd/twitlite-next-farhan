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
  const [user, setUser] = useState(userProfile);
  const {username, bio, firstName, lastName, email, gender} = user;

  const onHandleChange = (e) => {
    setUser({...user, [e.target.name]: e.target.value});
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent backgroundColor="gray.700">
        <ModalHeader color="white">Update Profile</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            _focusVisible
            name="username"
            placeholder="Username"
            type="text"
            value={username}
            variant="filled"
            mb={3}
            onChange={onHandleChange}
          />
          <Input
            _focusVisible
            name="email"
            placeholder="Email"
            type="text"
            value={email}
            disabled
            variant="filled"
            mb={3}
            onChange={onHandleChange}
          />
          <Input
            _focusVisible
            name="bio"
            placeholder="Bio"
            type="text"
            value={bio}
            variant="filled"
            mb={3}
            onChange={onHandleChange}
          />
          <Input
            _focusVisible
            name="firstName"
            placeholder="First Name"
            type="text"
            value={firstName}
            variant="filled"
            mb={3}
            onChange={onHandleChange}
          />
          <Input
            _focusVisible
            name="lastName"
            placeholder="Last Name"
            type="text"
            value={lastName}
            variant="filled"
            mb={3}
            onChange={onHandleChange}
          />
          <Select
            _focusVisible
            name="gender"
            placeholder="Gender"
            value={gender}
            variant="filled"
            onChange={onHandleChange}
            mb={3}
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </Select>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
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
