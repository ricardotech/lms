import {
  Flex,
  Icon,
  Image,
  Spinner,
  Text,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useContext } from "react";
import {
  RiDiscordFill,
  RiFacebookFill,
  RiGithubFill,
  RiLinkedinFill,
} from "react-icons/ri";
import { Context } from "../../contexts/ContextProvider";
import TopNav from "../TopNav";

type LoadingProps = {
  title?: string;
};

export default function Loading({ title }: LoadingProps) {
  const { user } = useContext(Context);

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
  });

  const toast = useToast();

  function Header({ none }) {
    return (
      <Flex
        align="center"
        boxShadow="rgba(0,0,0,0.1) 0 0 10px"
        p="4"
        bg={!none && "#333"}
        w="100vw"
        style={{ height: 80 }}
      >
        <Flex justify="space-between" align="center" w="100%">
          <Flex align="center">
            <Image
              borderRadius="full"
              src="http://localhost:5556/images/inconformedia.png"
              w="45"
              h="45"
              mr="2"
            />
          </Flex>
        </Flex>
      </Flex>
    );
  }

  function Footer() {
    return (
      <Flex
        mt="10"
        flexDir="row"
        p="4"
        w="100%"
        boxShadow="rgba(0,0,0,0.1) 0 0 10px"
        borderRadius="5"
        align="center"
        justifyContent="space-between"
      >
        <Flex flexDir="column">
          <Link
            href="https://dribbble.com/shots/14468614-404-Illustration"
            passHref={true}
          >
            <Text
              cursor="pointer"
              color="#333"
              fontSize="lg"
              fontWeight="bold"
              fontFamily="'Quicksand', sans-serif"
            >
              Oraculu
            </Text>
          </Link>
          <Link href="https://dribbble.com/natashakukhalskaya" passHref={true}>
            <Text
              cursor="pointer"
              color="#333"
              fontWeight="regular"
              fontSize="xs"
              fontFamily="'Quicksand', sans-serif"
            >
              Feito por e para você ❤️
            </Text>
          </Link>
        </Flex>
        {/* <Flex align="center">
          <Icon
            onClick={() => {
              toast({
                status: "warning",
                description: "Em breve teremos nosso servidor no discord",
              });
            }}
            cursor="pointer"
            as={RiDiscordFill}
            mr={isWideVersion ? "6" : "4"}
            color="#744cc6"
            fontSize="4xl"
          />
          <Link href="https://linkedin.com/in/uppernodes" passHref={true}>
            <Icon
              cursor="pointer"
              as={RiLinkedinFill}
              mr={isWideVersion ? "6" : "4"}
              color="#744CC6"
              fontSize="4xl"
            />
          </Link>
          <Link href="https://facebook.com/uppernodes" passHref={true}>
            <Icon
              cursor="pointer"
              as={RiFacebookFill}
              mr={isWideVersion ? "6" : "4"}
              color="#744CC6"
              fontSize="4xl"
            />
          </Link>
          <Link href="https://github.com/uppernodes" passHref={true}>
            <Icon
              cursor="pointer"
              as={RiGithubFill}
              mr={isWideVersion ? "6" : "4"}
              color="#744CC6"
              fontSize="4xl"
            />
          </Link>
        </Flex> */}
      </Flex>
    );
  }

  return (
    <Flex
      flex="1"
      flexDir="column"
      h="100vh"
      position="absolute"
      zIndex="1000"
      justifyContent="space-between"
      bg="#EEE"
    >
      <Header none />
      <Flex
        flexDir="column"
        justifyContent="center"
        w="100%"
        h="50%"
        align="center"
      >
        <Spinner color="#333" size="xl" />
        <Text
          color="#333"
          mt="10"
          fontWeight="thin"
          w="100%"
          textAlign="center"
          fontSize="xl"
        >
          Aguarde enquanto carregamos seu conteúdo
        </Text>
      </Flex>
      <Footer />
    </Flex>
  );
}
