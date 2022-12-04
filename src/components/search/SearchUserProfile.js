import { Flex, Avatar, Text } from '@chakra-ui/react';
import Button from 'components/common/Button';
import { useRouter } from 'next/router';
export default function SearchUserProfile({ user, ...rest }) {
	const router = useRouter();
	const {
		username,
		first_name,
		last_name,
		userinfo: { image_url },
	} = user;

	const goToProfile = () => {
		router.push(`/profile/${username}`);
	};

	return (
		<Flex
			align="center"
			justify="space-between"
			background="#FFFFFF"
			color="primary"
			minW="50%"
			borderRadius="8px"
			p="3"
			pb="4"
			{...rest}
			_dark={{ bg: 'gray.700', color: 'gray.200' }}
		>
			<Flex align="center" gap="4" w="100%" justifyContent="space-between">
				<Flex gap="4" align="center">
					<Avatar
						w="3rem"
						h="3rem"
						src={image_url}
						referrerPolicy="no-referrer"
						name={first_name + ' ' + last_name}
						borderRadius="8"
					/>
					<Text as="strong">
						{first_name + ' ' + last_name}{' '}
						<Text as="span" fontWeight="normal">
							({username})
						</Text>
					</Text>
				</Flex>
				<Button variant="styled" justifySelf="flex-end" onClick={goToProfile}>
					Ver perfil
				</Button>
			</Flex>
		</Flex>
	);
}
