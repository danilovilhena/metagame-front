import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import {
	Icon,
	VStack,
	Text,
	FormControl,
	FormLabel,
	Input,
} from '@chakra-ui/react';
import { IoLogoGoogle, IoLogoApple } from 'react-icons/io';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export function LogInModal({
	isLogInModalOpen,
	setIsLogInModalOpen,
	setIsSignUpModalOpen,
}) {
	const [showEmailInputs, setShowEmailInputs] = useState(false);

	return (
		<Modal
			variant="unstyled"
			ModalTitle="Login"
			isOpen={isLogInModalOpen}
			setIsOpen={setIsLogInModalOpen}
		>
			<VStack textAlign="center" spacing="16px" mb="16px">
				<VStack color="white" width="100%">
					{showEmailInputs ? (
						<FormControl isRequired>
							<FormLabel>First name</FormLabel>
							<Input placeholder="First name" />
						</FormControl>
					) : (
						<>
							<Button
								variant="styled"
								width="100%"
								onClick={() => signIn('google')}
							>
								<Icon as={IoLogoGoogle} mr="8px" fontSize={22} />
								Continuar com Google
							</Button>
							<Button variant="styled" width="100%">
								<Icon as={IoLogoApple} mr="8px" fontSize={22} />
								Continuar com Apple
							</Button>
							<Button
								variant="styled"
								width="100%"
								onClick={() => setShowEmailInputs(true)}
							>
								Continuar com e-mail
							</Button>
						</>
					)}
				</VStack>
				<Text fontSize="14px" display="flex" alignItems="center">
					Não possui conta?
					<Button
						variant="unstyled"
						px="4px"
						onClick={() => {
							setIsLogInModalOpen(false);
							setIsSignUpModalOpen(true);
						}}
					>
						Faça seu cadastro.
					</Button>
				</Text>
				<Text fontSize="14px">
					Ao continuar, você concorda com os nossos{' '}
					<Text as="strong">Termos de Serviço e Política de Privacidade.</Text>
				</Text>
			</VStack>
		</Modal>
	);
}
