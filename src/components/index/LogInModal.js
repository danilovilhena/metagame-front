import {
	Icon,
	VStack,
	Text,
	Flex,
	Alert,
	AlertIcon,
	AlertDescription,
	keyframes,
} from '@chakra-ui/react';
import { IoLogoGoogle, IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import DOMPurify from 'dompurify';

import Modal from 'components/common/Modal';
import Button from 'components/common/Button';
import { Input } from 'components/common/Input';

export default function LogInModal({
	isLogInModalOpen,
	setIsLogInModalOpen,
	setIsSignUpModalOpen,
}) {
	const easeIn = keyframes`
	from {opacity: 0}
	to {opacity: 1}
  `;
	const [showEmailInputs, setShowEmailInputs] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [signInError, setSignInError] = useState('');

	const LogInFormSchema = yup.object({
		email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
		password: yup.string().required('Senha obrigatória'),
	});

	const { register, handleSubmit, formState } = useForm({
		resolver: yupResolver(LogInFormSchema),
	});
	const { errors } = formState;

	const handleLogIn = async ({ email, password }, event) => {
		event.preventDefault();
		const cleanEmail = DOMPurify.sanitize(email);
		const cleanPassword = DOMPurify.sanitize(password);
		const response = await signIn('credentials', {
			email: cleanEmail,
			password: cleanPassword,
			redirect: true,
		});
		if (response && response.status === 403) {
			setSignInError('Usuário ou senha inválidos.');
		}
	};

	useEffect(() => {
		if (!isLogInModalOpen) {
			setShowEmailInputs(false);
		}
	}, [isLogInModalOpen]);

	return (
		<Modal
			variant="unstyled"
			ModalTitle="Login"
			isOpen={isLogInModalOpen}
			setIsOpen={setIsLogInModalOpen}
		>
			<VStack
				textAlign="center"
				spacing={showEmailInputs ? '0px' : '16px'}
				mb="16px"
				alignItems="center"
			>
				<VStack color="white" width="100%">
					{showEmailInputs ? (
						<>
							<Flex
								flexDirection="column"
								width="100%"
								animation={`${easeIn} 1s`}
								onSubmit={handleSubmit(handleLogIn)}
							>
								<VStack as="form" spacing="12px" color="gray" _dark={{ color: 'gray.200' }}>
									<Input
										placeholder="E-mail ou nome de usuário"
										{...register('email')}
										error={errors.email}
									/>
									<Input
										placeholder="Senha"
										type={showPassword ? 'text' : 'password'}
										rightIconAction={() => setShowPassword(!showPassword)}
										rightIcon={showPassword ? IoMdEyeOff : IoMdEye}
										{...register('password')}
										error={errors.password}
									/>
									<Button variant="styled" width="100%" type="submit">
										Entrar
									</Button>
									{signInError && (
										<Alert status="error" borderRadius="0.375em" justifyContent="center">
											<AlertIcon />
											<AlertDescription color="black">{signInError}</AlertDescription>
										</Alert>
									)}
								</VStack>
							</Flex>
							<Text
								color="black"
								display="flex"
								justifyContent="center"
								alignItems="center"
								_dark={{ color: 'gray.200' }}
							>
								Esqueceu senha?
								<Button variant="unstyled" fontWeight="bold" hover={{}} px="1">
									Recupere-a
								</Button>
							</Text>
						</>
					) : (
						<>
							<Button variant="styled" width="100%" onClick={() => signIn('google')}>
								<Icon as={IoLogoGoogle} mr="8px" fontSize={22} />
								Continuar com Google
							</Button>
							{/* <Button variant="styled" width="100%">
								<Icon as={IoLogoApple} mr="8px" fontSize={22} />
								Continuar com Apple
							</Button> */}
							<Button variant="styled" width="100%" onClick={() => setShowEmailInputs(true)}>
								Continuar com e-mail
							</Button>
						</>
					)}
				</VStack>
				<Text display="flex" alignItems="center" justifyContent="center">
					Não possui conta?
					<Button
						variant="unstyled"
						px="4px"
						mr="0"
						onClick={() => {
							setIsLogInModalOpen(false);
							setIsSignUpModalOpen(true);
						}}
						hover={{}}
					>
						Faça seu cadastro.
					</Button>
				</Text>
			</VStack>
		</Modal>
	);
}
