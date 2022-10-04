import {
	Flex,
	Image,
	InputGroup,
	InputLeftElement,
	Input,
	Icon,
	HStack,
	Avatar,
} from '@chakra-ui/react';
import { IoMdSearch, IoMdAddCircleOutline } from 'react-icons/io';
import { AiOutlineFire } from 'react-icons/ai';
import { MdHome, MdOutlineHome } from 'react-icons/md';
import { Button } from 'components/common/Button';

import { useRouter } from 'next/router';

export function HeaderComponent() {
	const router = useRouter();

	return (
		<Flex
			as="header"
			justify="space-between"
			mx={['1em', '2.5em', '5em']}
			h="5em"
			align="center"
		>
			<Image src="/logo.svg" alt="Metagame" />
			<InputGroup
				border="grey"
				color="grey"
				maxWidth="256px"
				alignItems="center"
			>
				<InputLeftElement pointerEvents="none">
					<Icon as={IoMdSearch} />
				</InputLeftElement>

				<Input type="text" placeholder="Buscar" fontSize="1em" />
			</InputGroup>
			<HStack color="primary" spacing="0.5em">
				<Button variant="unstyled">
					<Icon as={IoMdAddCircleOutline} fontSize={22} />
				</Button>
				<Button variant="unstyled">
					{router.pathname === '/home' ? (
						<Icon as={MdHome} color="secondary" fontSize={22} />
					) : (
						<Icon as={MdOutlineHome} fontSize={22} />
					)}
				</Button>
				<Button variant="unstyled">
					<Icon
						as={AiOutlineFire}
						color={router.pathname === '/tops' && 'secondary'}
						fontSize={22}
					/>
				</Button>
				<Button variant="unstyled">
					<Icon
						as={AiOutlineFire}
						color={router.pathname === '/goals' && 'secondary'}
						fontSize={22}
					/>
				</Button>
				<Button variant="unstyled">
					<Avatar name="Jon Doe" src="" size="sm" />
				</Button>
			</HStack>
		</Flex>
	);
}
