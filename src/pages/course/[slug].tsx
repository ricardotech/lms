import {
  Button,
  Flex,
  Icon,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useBreakpointValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../../components/Header";
import { api } from "../../services/apiClient";
import { string } from "yup";
import TopNav from "../../components/TopNav";
import { RiDeleteBin4Line, RiEditLine, RiShareLine } from "react-icons/ri";
import { BiChevronDown } from "react-icons/bi";
import { useWindowSize } from "../../utils/useWindowSize";
import { Context } from "../../contexts/ContextProvider";
import Loading from "../../components/Loading";

export default function UserId() {
  const { loading, setLoading } = useContext(Context);

  const [courseLoading, setCourseLoading] = useState(true);

  const [darkMode, setDarkMode] = useState(false);

  const router = useRouter();
  const { slug } = router.query;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [addModule, setAddModule] = useState(false);

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
  });

  const size = useWindowSize();
  const toast = useToast();

  type Course = {
    _id: string;
    creator: {
      _id: string;
    };
    name: string;
    description?: string;
    requisites?: [string];
    models: [string];
  };

  const [course, setCourse] = useState<Course | null>();

  const [module, setModule] = useState({});
  const [modules, setModules] = useState([]);

  useEffect(() => {
    handleGetCourseBySlug();
  }, [slug]);

  async function handleGetCourseBySlug() {
    try {
      if (slug) {
        setLoading(true);
        await api.get(`/course/${slug}`).then((res) => {
          if (res.status === 200) {
            setCourse(res.data);
            setLoading(false);
          } else if (res.status === 500) {
            // toast({
            //   status: "error",
            //   description: "Curso não encontrado",
            // });
          }
        });
        // setCourse(response.data);
        setCourseLoading(false);
        setLoading(false);
      } else {
        toast({
          status: "error",
          description: "Curso não encontrado",
        });
        router.push("/admin");
      }
    } catch (err) {
      // toast({
      //   status: "error",
      //   description: "Curso não encontrado",
      // });
      router.push("/");
    }
  }

  function CourseModules() {
    function Module({ title }) {
      return (
        <Flex
          style={{
            height: 150,
            width: 200,
          }}
          borderRadius="5"
        >
          <Text color={darkMode ? "#333" : "#FFF"}>{title}</Text>
        </Flex>
      );
    }
    return (
      <Flex w="100%">
        <Text color={darkMode ? "#FFF" : "#333"}>Seus modulos</Text>
        {modules.map((module, id) => {
          return <Module title={module.name} />;
        })}
      </Flex>
    );
  }

  function CreateModule() {
    return (
      <Flex
        flexDir="column"
        w="100%"
        justify="center"
        align="center"
        mt="6"
        p="10"
        bg={darkMode ? "#444" : "#333"}
      >
        <Text color={darkMode ? "#eee" : "#333"} fontSize="2xl">
          Seu curso ainda nao possui modulo
        </Text>
        <Text color={darkMode ? "#eee" : "#333"}>Criar modulo</Text>
        <Flex
          onClick={() => {
            onOpen();
          }}
          _hover={{
            backgroundColor: darkMode ? "#222" : "#AAA",
          }}
          cursor="pointer"
          mt="5"
          borderRadius="5"
          bg={darkMode ? "#333" : "#EEE"}
          py="3"
          px="6"
        >
          <Text color={darkMode ? "#eee" : "#333"}>Criar modulo</Text>
        </Flex>
      </Flex>
    );
  }

  if (courseLoading) {
    return <Loading />;
  }

  return (
    <>
      <TopNav />

      <Flex
        bg={darkMode ? "#333" : "#eee"}
        maxW={1000}
        w="100%"
        mx="auto"
        style={{
          paddingTop: 100,
        }}
      >
        {isWideVersion ? (
          <Flex flexDir="column" px="4" w="100%">
            <Flex align="center" justify="space-between" w="100%">
              <Image
                mt="4"
                borderRadius="5"
                src="https://img-c.udemycdn.com/course/480x270/3874004_9d64.jpg"
                style={{
                  width: 250,
                }}
              />
              <Icon
                cursor="pointer"
                as={RiShareLine}
                color="#333"
                fontSize="3xl"
              />
            </Flex>

            <Text
              mt="4"
              color={darkMode ? "#FFF" : "#000"}
              fontWeight="bold"
              fontSize={isWideVersion ? "5xl" : "xl"}
            >
              {course && course.name}
            </Text>

            <Text
              color={darkMode ? "#FFF" : "#000"}
              fontWeight="thin"
              fontSize={isWideVersion ? "2xl" : "xl"}
            >
              {course && course.description}
            </Text>

            <Flex mt="4" justify="space-between" w="100%">
              <Flex>
                <Flex
                  mr="2"
                  cursor="pointer"
                  bg={darkMode ? "#FFF" : "#333"}
                  borderRadius="5"
                  justify="center"
                  align="center"
                  px="6"
                  py="4"
                >
                  <Text color={darkMode ? "#333" : "#FFF"} fontWeight="bold">
                    Adicionar modulo
                  </Text>
                </Flex>
                <Flex
                  mr="2"
                  cursor="pointer"
                  bg={darkMode ? "#FFF" : "#333"}
                  borderRadius="5"
                  justify="center"
                  align="center"
                  px="6"
                  py="4"
                >
                  <Text color={darkMode ? "#333" : "#FFF"} fontWeight="bold">
                    Adicionar usuario
                  </Text>
                </Flex>
              </Flex>
              <Flex>
                <Flex
                  mr="2"
                  cursor="pointer"
                  bg={darkMode ? "#FFF" : "#333"}
                  borderRadius="5"
                  justify="center"
                  align="center"
                  px="6"
                  py="4"
                >
                  <Text
                    color={darkMode ? "#333" : "#FFF"}
                    mr="3"
                    fontWeight="bold"
                  >
                    Editar dados
                  </Text>
                  <Icon
                    as={RiEditLine}
                    color={darkMode ? "#333" : "#FFF"}
                    fontSize="lg"
                  />
                </Flex>
                <Flex
                  mr="2"
                  cursor="pointer"
                  bg="tomato"
                  borderRadius="5"
                  justify="center"
                  align="center"
                  px="6"
                  py="4"
                >
                  <Text color="#FFF" fontWeight="bold">
                    Deletar curso
                  </Text>
                  <Icon
                    ml="3"
                    cursor="pointer"
                    as={RiDeleteBin4Line}
                    color="#FFF"
                    fontSize="lg"
                  />
                </Flex>
              </Flex>
            </Flex>

            {modules.length > 0 ? <CourseModules /> : <CreateModule />}
          </Flex>
        ) : (
          <>
            <Text color="#333" fontSize="xl">
              {course && course.name}
            </Text>
          </>
        )}
      </Flex>
      <Modal
        isCentered={true}
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setModule({});
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#333">Adicionar modulo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              style={{
                width: 200,
              }}
              placeholder="Nome do modulo"
              borderRadius="5"
              color="#333"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setModule({
                  name: e.target.value,
                });
              }}
            />
          </ModalBody>

          <ModalFooter>
            <Button onClick={() => {}} colorScheme="blue" mr={3}>
              Adicionar
            </Button>
            <Button bg="tomato">Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
