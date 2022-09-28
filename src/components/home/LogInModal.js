import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Icon, VStack, Text } from '@chakra-ui/react';
import { IoLogoGoogle, IoLogoApple } from 'react-icons/io';

export function LogInModal({
	isLogInModalOpen,
	setIsLogInModalOpen,
	setIsSignUpModalOpen,
}) {
	return (
		<Modal
			variant="unstyled"
			buttonText="Entrar"
			ModalTitle="Login"
			isOpen={isLogInModalOpen}
			setIsOpen={setIsLogInModalOpen}
		>
			<VStack textAlign="center" spacing="16px" mb="16px">
				<VStack color="white" width="100%">
					<Button variant="styled" width="100%">
						<Icon as={IoLogoGoogle} mr="8px" fontSize={22} />
						Continuar com Google
					</Button>
					<Button variant="styled" width="100%">
						<Icon as={IoLogoApple} mr="8px" fontSize={22} />
						Continuar com Apple
					</Button>
					<Button variant="styled" width="100%">
						Continuar com E-mail
					</Button>
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
