import LoginCard from './LoginCard'
import React from 'react';

import {
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalBody,
    ModalContent,
    ModalCloseButton
} from '@chakra-ui/react';

export default function LoginModal({ setToken, isSignin, isOpen, onOpen, onClose}) {

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Login</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <LoginCard setToken={setToken}/>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}