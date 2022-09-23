import { AddIcon } from '@chakra-ui/icons';
import {
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	Divider,
	Flex,
	Stack,
	Text,
} from '@chakra-ui/react';

export default function FAQ() {
	const faqs = [
		{
			question: 'O Metagame é pago?',
			answer: 'Não, o Metagame é totalmente gratuito.',
		},
		{
			question: 'Por que devo usar o Metagame?',
			answer:
				'O Metagame é a MELHOR ferramenta para você organizar e acompanhar suas metas de consumo de mídia. Você pode criar metas para filmes, livros ou jogos e acompanhar seu progresso na meta.',
		},
		{
			question: 'Posso criar quantas metas eu quiser?',
			answer: 'Sim, você pode criar quantas metas quiser.',
		},
		{
			question: 'Existe uma versão mobile do Metagame?',
			answer: 'Não, por enquanto o Metagame só está disponível na versão web.',
		},
		{
			question: 'Com quantos amigos posso compartilhar uma meta?',
			answer: 'Você pode compartilhar uma meta com até quantos amigos quiser.',
		},
	];
	return (
		<>
			<Stack
				mx="10rem"
				direction="row"
				justify="space-evenly"
				align="center"
				color="primary"
				py="16"
			>
				<Flex align="flex-start" justify="center" flexDir="column" maxW="40%">
					<Text>Perguntas frequentes</Text>
					<Text as="h2" fontWeight="bold" fontSize="3em" textAlign="left  ">
						Ficou com alguma dúvida?
					</Text>
				</Flex>
				<Accordion w="50%">
					{faqs.map((faq, index) => (
						<AccordionItem key={index} border="none">
							<AccordionButton py="4">
								<AddIcon />
								<Text pl="4" textAlign="left" fontWeight="600">
									{faq.question}
								</Text>
							</AccordionButton>
							<AccordionPanel>{faq.answer}</AccordionPanel>
						</AccordionItem>
					))}
				</Accordion>
			</Stack>
			<Divider w="80%" mx="auto" opacity="1" mb="8" />
		</>
	);
}
