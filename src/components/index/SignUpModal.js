import { Flex, Icon, VStack, Text, keyframes, InputRightAddon, InputGroup } from '@chakra-ui/react';
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
import userCreation from 'utils/userCreation';

export default function SignUpModal({
	isSignUpModalOpen,
	setIsSignUpModalOpen,
	setIsLogInModalOpen,
}) {
	const easeIn = keyframes`
	from {opacity: 0}
	to {opacity: 1}
  `;
	const [showEmailInputs, setShowEmailInputs] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const signUpFormSchema = yup.object({
		name: yup.string().required('Nome obrigatório'),
		username: yup.string().required('Nome de usuário obrigatório'),
		email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
		password: yup.string().required('Senha obrigatória'),
		confirm_password: yup
			.string()
			.required('Confirmação de senha obrigatório')
			.oneOf([yup.ref('password'), null], 'Senhas não coincidem'),
	});
	const { register, handleSubmit, formState } = useForm({
		resolver: yupResolver(signUpFormSchema),
	});
	const { errors } = formState;

	const handleSignUp = async (values, event) => {
		event.preventDefault();
		const { name, username, email, password } = values;

		const cleanName = DOMPurify.sanitize(name);
		const cleanUsername = DOMPurify.sanitize(username);
		const cleanEmail = DOMPurify.sanitize(email);
		const cleanPassword = DOMPurify.sanitize(password);
		const user_created = await userCreation({
			name: cleanName,
			username: cleanUsername,
			email: cleanEmail,
			password: cleanPassword,
		});
		if (user_created) {
			await signIn('credentials', { email, password });
		}
	};

	useEffect(() => {
		if (!isSignUpModalOpen) {
			setShowEmailInputs(false);
		}
	}, [isSignUpModalOpen]);

	return (
		<Modal
			variant="styled"
			ModalTitle="Cadastro"
			isOpen={isSignUpModalOpen}
			setIsOpen={setIsSignUpModalOpen}
		>
			<VStack textAlign="center" spacing={showEmailInputs ? '0px' : '16px'} mb="16px">
				<VStack color="white" width="100%">
					{showEmailInputs ? (
						<>
							<Flex
								as="form"
								width="100%"
								animation={`${easeIn} 1s`}
								onSubmit={handleSubmit(handleSignUp)}
							>
								<VStack spacing="12px" color="gray" width="100%" _dark={{ color: 'gray.200' }}>
									<Input placeholder="Nome completo" {...register('name')} error={errors.name} />
									<Input
										autoComplete="off"
										placeholder="Nome de usuário"
										{...register('username')}
										error={errors.username}
									/>
									<Input
										autoComplete="off"
										placeholder="E-mail"
										{...register('email')}
										error={errors.email}
									/>
									<InputGroup>
										<Input
											placeholder="Senha"
											type={showPassword ? 'text' : 'password'}
											{...register('password')}
											error={errors.password}
										/>
										<InputRightAddon
											cursor="pointer"
											onClick={() => setShowPassword(!showPassword)}
										>
											{showPassword ? <IoMdEyeOff /> : <IoMdEye />}
										</InputRightAddon>
									</InputGroup>
									<InputGroup>
										<Input
											placeholder="Confirmar senha"
											type={showConfirmPassword ? 'text' : 'password'}
											{...register('confirm_password')}
											error={errors.confirm_password}
										/>
										<InputRightAddon
											cursor="pointer"
											onClick={() => setShowConfirmPassword(!showConfirmPassword)}
										>
											{showConfirmPassword ? <IoMdEyeOff /> : <IoMdEye />}
										</InputRightAddon>
									</InputGroup>
									<Button variant="styled" width="100%" type="submit">
										Criar conta
									</Button>
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
								Continuar com E-mail
							</Button>
						</>
					)}
				</VStack>
				<Text display="flex" alignItems="center" justifyContent="center">
					Possui conta?
					<Button
						variant="unstyled"
						px="4px"
						mr="0"
						onClick={() => {
							setIsSignUpModalOpen(false);
							setIsLogInModalOpen(true);
						}}
					>
						Faça seu login.
					</Button>
				</Text>
			</VStack>
		</Modal>
	);
}
