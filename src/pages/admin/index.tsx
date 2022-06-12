import { GetServerSideProps } from "next";

import {
  Box,
  Button,
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Icon,
  IconButton,
  Img,
  Input,
  Drawer,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  useDisclosure,
  DrawerOverlay,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
  DrawerContent,
  DrawerCloseButton,
  SimpleGrid,
  Spinner,
  Text,
  useBreakpointValue,
  useEditableControls,
  useEditableState,
  useToast,
  Checkbox,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Image,
  Tooltip,
} from "@chakra-ui/react";
import ReactPlayer from "react-player";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { Context } from "../../contexts/ContextProvider";
import { useRouter } from "next/router";
import axios from "axios";
import { api } from "../../services/apiClient";

import { MdDarkMode, MdTouchApp } from "react-icons/md";

import ReactMarkdown from "react-markdown";

import Header from "../../components/Header";
import {
  RiAddBoxFill,
  RiCloseLine,
  RiDiscordFill,
  RiEyeLine,
  RiGithubFill,
  RiInstagramFill,
  RiLinkedinBoxFill,
  RiPauseFill,
  RiPlayFill,
  RiPlayLine,
  RiTwitterFill,
  RiYoutubeFill,
} from "react-icons/ri";
import Head from "next/head";
import { Html, Main, NextScript } from "next/document";
import Loading from "../../components/Loading";
import { useWindowSize } from "../../utils/useWindowSize";
import {
  BiChevronDown,
  BiEditAlt,
  BiImageAdd,
  BiTrashAlt,
} from "react-icons/bi";

export default function Index() {
  const { user, signOut, loading, setLoading } = useContext(Context);

  const [playing, setPlaying] = useState(true);

  const [banner, setBanner] = useState(false);

  const size = useWindowSize();

  const router = useRouter();

  const [over, setOver] = useState("");

  const [preview, setPreview] = useState(undefined);

  const [deleting, setDeleting] = useState({
    id: "",
    name: "",
    isOpen: false,
  });

  const handleImage = (e) => {
    setPreview(window.URL.createObjectURL(e.target.files[0]));
  };

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchInstructorCourses();
  }, []);

  const fetchInstructorCourses = async () => {
    setLoading(true);
    await api.get("/course/courses/instructor").then((res) => {
      setCourses(res.data);
      setLoading(false);
    });
  };

  const handleDeleteCourse = async (id) => {
    try {
      const res = await api.delete(`/course/${id}`);
      if (res.data.message === "Curso deletado com sucesso!") {
        toast({
          duration: 2000,
          status: "success",
          description: "Curso deletado com sucesso",
        });
        fetchInstructorCourses().then(() => {
          setDeleting({
            id: "",
            name: "",
            isOpen: false,
          });
        });
      } else {
        toast({
          duration: 2000,
          status: "error",
          description: "Tente novamente em alguns instantes.",
        });
      }
    } catch (err) {
      toast({
        duration: 2000,
        status: "error",
        description: "Tente novamente em alguns instantes.",
      });
    }
  };

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
  });

  function StarterOptions() {
    function Option({ title }) {
      return (
        <Tooltip
          bg="#FFF"
          color="#333"
          label={
            title === "Criar seu primeiro curso"
              ? "Clique para criar seu primeiro curso"
              : title === "Criar novo curso"
              ? "Clique para criar um novo curso"
              : null
          }
        >
          <Flex
            _hover={{
              boxShadow: "rgba(0,0,0,0.1) 0 0 10px",
            }}
            onClick={() => {
              if (
                title === "Criar seu primeiro curso" ||
                title === "Criar novo curso"
              ) {
                router.push("/create/course");
              }
            }}
            borderRadius="5"
            cursor="pointer"
            style={{
              minWidth: 270,
              width: isWideVersion ? "30%" : null,
            }}
            mb={isWideVersion ? null : "4"}
            p="6"
            bg="#FFF"
            align="center"
          >
            <Icon as={RiAddBoxFill} mr="6" color="green.500" fontSize="xl" />
            <Text color="#333">{title}</Text>
          </Flex>
        </Tooltip>
      );
    }

    return (
      <Flex
        mt="6"
        flexDir={isWideVersion ? "row" : "column"}
        justify={isWideVersion ? "space-between" : "center"}
      >
        <Option
          title={
            courses.length > 0 ? "Criar novo curso" : "Criar seu primeiro curso"
          }
        />
      </Flex>
    );
  }

  function InstructorReports() {
    type ReportType = {
      title: string;
      subtitle?: string;
      value: number;
      icon?: string;
      last?: boolean;
    };

    function Report({
      title,
      subtitle,
      value,
      icon,
      last = false,
    }: ReportType) {
      return (
        <Tooltip bg="#FFF" color="#333" label={title}>
          <Flex
            _hover={{
              boxShadow: "rgba(0,0,0,0.1) 0 0 10px",
            }}
            w="100%"
            cursor="pointer"
            mr={!last && "4"}
            flexDir="column"
            borderRadius="5"
            mt="4"
            p="2"
            bg="#FFF"
          >
            <Stat p="2">
              <StatLabel mt="2" color="#333" fontSize={["md", "lg", "xl"]}>
                {title}
              </StatLabel>
              <StatNumber color="#000" fontSize={["2xl", "3xl", "4xl"]}>
                {value}
              </StatNumber>
              <StatHelpText fontSize="lg" color="#444">
                <StatArrow type={value > 0 ? "increase" : "decrease"} />
                {
                  // compare data in the last week and make a percentage relation between
                  // this week / last week
                }
                {value * 100}%
              </StatHelpText>
            </Stat>
          </Flex>
        </Tooltip>
      );
    }

    return (
      <Flex w="100%" flexDir={size.width < 500 ? "column" : "row"}>
        <Report title="Novos assinantes" subtitle="eai" value={1} />
        <Report title="Visitas no seu perfil" subtitle="vai" value={1} last />
      </Flex>
    );
  }

  function InstructorCourses() {
    type CourseType = {
      id: string;
      name: string;
      slug: string;
      image: {
        ETag: string;
        VersionId: string;
        Location: string;
      };
      description: string;
    };

    function Course({ id, name, slug, image, description }: CourseType) {
      return (
        <Flex
          onClick={() => router.push(`/course/${slug}`)}
          _hover={{
            boxShadow: "rgba(0,0,0,0.1) 0 0 10px",
          }}
          cursor="pointer"
          flexDir="column"
          mr="2"
          borderRadius="5"
          bg="#FFF"
          border="1px solid #eee"
          style={{
            width: "100%",
          }}
        >
          <Image
            borderTopLeftRadius="5"
            borderTopRightRadius="5"
            src={image.Location}
            style={{
              width: "100%",
              height: size.width < 800 ? 250 : size.width < 1000 ? 300 : 400,
            }}
          />
          <Flex p="4" flexDir="column" justify="space-between">
            <Text fontWeight="medium" color="#333">
              {name}
            </Text>
          </Flex>
        </Flex>
      );
    }

    return (
      <SimpleGrid
        columns={size.width < 500 ? 1 : 2}
        gridGap="4"
        maxW={1000}
        flexDir="row"
        my="4"
      >
        {courses.length > 0 ? (
          courses.map((course, i) => {
            return (
              <Course
                id={course._id}
                name={course.name}
                image={course.image}
                slug={course.slug}
                description={course.description}
              />
            );
          })
        ) : (
          <Flex
            borderRadius="5"
            bg="#fff"
            px="4"
            py="6"
            justify="center"
            align="center"
            w="100%"
            my="2"
          >
            <Text color="#333" w="100%" textAlign="center" fontSize="lg">
              Você ainda não possui nenhum curso :/
            </Text>
          </Flex>
        )}
      </SimpleGrid>
    );
  }

  if (!user) {
    return <Loading />;
  } else {
    if (loading) {
      return <Loading />;
    }
  }

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>

      <Header none={false} />

      <Flex flexDir="column" w="100vw" px="6" py="4">
        <Flex flexDir="column" maxW={1000} mx="auto" w="100%">
          <Flex w="100%" justify="space-between" align="center">
            <Text color="#31343A" fontWeight="bold" fontSize={["xl", "2xl"]}>
              Seus relatórios
            </Text>
            <Tooltip
              bg="#FFF"
              color="#333"
              label="Clique para mudar a data de seus relatórios"
            >
              <Flex
                _hover={{
                  boxShadow: "rgba(0,0,0,0.1) 0 0 10px",
                }}
                cursor="pointer"
                borderRadius="5"
                justify="center"
                align="center"
                px="3"
                py="2"
                bg="#FFF"
              >
                <Text color="#333">7 dias</Text>
                <Icon as={BiChevronDown} ml="2" fontSize="sm" color="#333" />
              </Flex>
            </Tooltip>
          </Flex>
          <InstructorReports />

          <Text
            mt="8"
            color="#31343A"
            fontWeight="bold"
            fontSize={["xl", "2xl"]}
          >
            Ações rápidas
          </Text>
          <StarterOptions />

          <Text
            mt="8"
            color="#31343A"
            fontWeight="bold"
            fontSize={["xl", "2xl"]}
          >
            Seus cursos
          </Text>
          <InstructorCourses />
        </Flex>
      </Flex>

      {
        // delete alert
      }
      <AlertDialog
        isOpen={deleting.isOpen}
        leastDestructiveRef={cancelRef}
        onClose={() =>
          setDeleting({
            id: "",
            name: "",
            isOpen: false,
          })
        }
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader color="#333" fontSize="md" fontWeight="normal">
              Você está prestes a excluir o curso
              <Text fontWeight="bold" fontSize="xl">
                {deleting.name}
              </Text>
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text color="#333" fontSize="sm" mb="4">
                Você tem certeza que deseja excluir o curso {deleting.name}?
              </Text>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                _hover={{
                  backgroundColor: "#444",
                }}
                bg="#333"
                ref={cancelRef}
                onClick={() =>
                  setDeleting({
                    id: "",
                    name: "",
                    isOpen: false,
                  })
                }
              >
                Cancelar
              </Button>
              <Button
                colorScheme="red"
                onClick={() => handleDeleteCourse(deleting.id)}
                ml="2"
              >
                Excluir
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  return {
    props: {},
  };
};
