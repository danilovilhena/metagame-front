import { Icon, VStack, Text, Flex, keyframes } from '@chakra-ui/react';
import { IoLogoGoogle, IoLogoApple, IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

export function LogInModal({
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

	const LogInFormSchema = yup.object({
		email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
		password: yup.string().required('Senha obrigatória'),
	});

	const { register, handleSubmit, formState } = useForm({
		resolver: yupResolver(LogInFormSchema),
	});
	const { errors } = formState;

	const handleLogIn = (values, event) => {
		event.preventDefault();
		console.log(values);
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
								<VStack as="form" spacing="12px" color="gray">
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
								</VStack>
							</Flex>
							<Text
								color="black"
								display="flex"
								justifyContent="center"
								alignItems="center"
							>
								Esqueceu senha?
								<Button variant="unstyled" fontWeight="bold" hover={{}} px="1">
									Recupere-a
								</Button>
							</Text>
						</>
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
				<Text display="flex" alignItems="center" justifyContent="center">
					Não possui conta?
					<Button
						variant="unstyled"
						px="4px"
						onClick={() => {
							setIsLogInModalOpen(false);
							setIsSignUpModalOpen(true);
						}}
						hover={{}}
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
