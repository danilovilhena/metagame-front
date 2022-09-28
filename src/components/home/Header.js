import {
	Flex,
	Box,
	Link,
	Image,
	Button,
	Icon,
	VStack,
	Text,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { Modal } from '../common/Modal';
import { IoLogoGoogle, IoLogoApple } from 'react-icons/io';
import { useState } from 'react';

export default function Header() {
	const links = [
		{ name: 'Como funciona?', href: '#' },
		{ name: 'Livros', href: '#' },
		{ name: 'Filmes', href: '#' },
		{ name: 'Jogos', href: '#' },
	];

	const [openLoginModal, setOpenLoginModal] = useState(false);
	const [openSignUpModalOpen, setOpenSignUpModalOpen] = useState(false);

	return (
		<Flex
			as="header"
			justify="space-between"
			mx="5em"
			h="5em"
			align="center"
			fontSize="1em"
		>
			<Image src="/logo.svg" alt="Metagame" />
			<Flex as="nav" justifyContent="space-evenly" w="500px">
				{links.map((link, idx) => (
					<NextLink href={link.href} key={idx} passHref>
						<Link>{link.name}</Link>
					</NextLink>
				))}
			</Flex>
			<Box>
				<Modal
					variant="unstyled"
					buttonText="Entrar"
					ModalTitle="Login"
					isOpen={openLoginModal}
					setIsOpen={setOpenLoginModal}
				>
					<VStack textAlign="center" spacing="16px" mb="16px">
						<VStack color="white" width="100%">
							<Button
								bg="secondary"
								_hover={{
									filter: 'brightness(0.9)',
									transition: 'filter 0.5s',
								}}
								width="100%"
							>
								<Icon as={IoLogoGoogle} mr="8px" fontSize={22} />
								Continuar com Google
							</Button>
							<Button
								bg="secondary"
								_hover={{
									filter: 'brightness(0.9)',
									transition: 'filter 0.5s',
								}}
								width="100%"
							>
								<Icon as={IoLogoApple} mr="8px" fontSize={22} />
								Continuar com Apple
							</Button>
							<Button
								bg="secondary"
								_hover={{
									filter: 'brightness(0.9)',
									transition: 'filter 0.5s',
								}}
								width="100%"
							>
								Continuar com E-mail
							</Button>
						</VStack>
						<Text fontSize="14px" display="flex" alignItems="center">
							Não possui conta?
							<Button
								variant="ghost"
								px="8px"
								cursor="pointer"
								_hover={{}}
								as="strong"
								onClick={() => {
									setOpenLoginModal(false);
									setOpenSignUpModalOpen(true);
								}}
							>
								Faça seu cadastro.
							</Button>
						</Text>
						<Text fontSize="14px">
							Ao continuar, você concorda com os nossos{' '}
							<Text as="strong">
								Termos de Serviço e Política de Privacidade.
							</Text>
						</Text>
					</VStack>
				</Modal>
				<Modal
					variant="styled"
					buttonText="Criar conta"
					ModalTitle="Cadastro"
					isOpen={openSignUpModalOpen}
					setIsOpen={setOpenSignUpModalOpen}
				>
					<VStack textAlign="center" spacing="16px" mb="16px">
						<VStack color="white" width="100%">
							<Button
								bg="secondary"
								_hover={{
									filter: 'brightness(0.9)',
									transition: 'filter 0.5s',
								}}
								width="100%"
							>
								<Icon as={IoLogoGoogle} mr="8px" fontSize={22} />
								Continuar com Google
							</Button>
							<Button
								bg="secondary"
								_hover={{
									filter: 'brightness(0.9)',
									transition: 'filter 0.5s',
								}}
								width="100%"
							>
								<Icon as={IoLogoApple} mr="8px" fontSize={22} />
								Continuar com Apple
							</Button>
							<Button
								bg="secondary"
								_hover={{
									filter: 'brightness(0.9)',
									transition: 'filter 0.5s',
								}}
								width="100%"
							>
								Continuar com E-mail
							</Button>
						</VStack>
						<Text fontSize="14px" display="flex" alignItems="center">
							Não possui conta?
							<Button
								variant="ghost"
								px="8px"
								cursor="pointer"
								_hover={{}}
								as="strong"
								onClick={() => {
									setOpenSignUpModalOpen(false);
									setOpenLoginModal(true);
								}}
							>
								Faça seu login.
							</Button>
						</Text>
						<Text fontSize="14px">
							Ao continuar, você concorda com os nossos{' '}
							<Text as="strong">
								Termos de Serviço e Política de Privacidade.
							</Text>
						</Text>
					</VStack>
				</Modal>
				{/* <Modal
					variant="icon"
					icon={IoMdAddCircleOutline}
				/> */}
			</Box>
		</Flex>
	);
}
