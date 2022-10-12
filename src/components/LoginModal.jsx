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
    const modalHeader = isSignin ? "Login" : "Register"
    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{modalHeader}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <LoginCard setToken={setToken} isSignin={isSignin} onClose={onClose}/>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}