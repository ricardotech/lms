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
import { BiEditAlt, BiImageAdd, BiTrashAlt } from "react-icons/bi";

export default function Index() {
  const { user, signOut, loading } = useContext(Context);

  const [playing, setPlaying] = useState(true);

  const [banner, setBanner] = useState(false);

  const size = useWindowSize();

  const router = useRouter();

  const [over, setOver] = useState("");

  const [preview, setPreview] = useState(undefined);

  const handleImage = (e) => {
    setPreview(window.URL.createObjectURL(e.target.files[0]));
  };

  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchInstructorCourses();
  }, []);

  const fetchInstructorCourses = async () => {
    await api.get("/course/courses/instructor").then((res) => {
      setCourses(res.data);
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
        fetchInstructorCourses();
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
        <Flex
          _hover={{
            boxShadow: "rgba(0,0,0,0.1) 0 0 10px",
          }}
          onClick={() => {
            if (title === "Criar seu primeiro curso") {
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
          bg="#fff"
          boxShadow="rgba(0,0,0,0.1) 0 0 5px"
          p="6"
          align="center"
        >
          <Icon as={RiAddBoxFill} mr="6" color="green.500" fontSize="xl" />
          <Text color="#333">{title}</Text>
        </Flex>
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
          flexDir="column"
          mr="2"
          borderRadius="5"
          border="1px solid #eee"
          style={{
            width: 200,
          }}
        >
          <Flex position="absolute" w={180} justify="flex-end" mt="2" ml="2">
            <Tooltip
              bg="#FFF"
              color="#333"
              borderRadius="5"
              py="2"
              border="1px solid #eee"
              label="Excluir"
            >
              <Flex
                onClick={() => handleDeleteCourse(id)}
                ml="2"
                bg="#FFF"
                cursor="pointer"
                borderRadius="full"
                justify="center"
                align="center"
                style={{
                  height: 25,
                  width: 25,
                }}
              >
                <Icon as={BiTrashAlt} color="#333" fontSize="10" />
              </Flex>
            </Tooltip>
            <Tooltip
              bg="#FFF"
              color="#333"
              borderRadius="5"
              py="2"
              border="1px solid #eee"
              label="Editar"
            >
              <Flex
                ml="2"
                bg="#FFF"
                cursor="pointer"
                borderRadius="full"
                justify="center"
                align="center"
                style={{
                  height: 25,
                  width: 25,
                }}
              >
                <Icon as={BiEditAlt} color="#333" fontSize="10" />
              </Flex>
            </Tooltip>
            <Tooltip
              bg="#FFF"
              color="#333"
              borderRadius="5"
              py="2"
              border="1px solid #eee"
              label="Visualizar"
            >
              <Flex
                onClick={() => router.push(`/content/course/${id}`)}
                ml="2"
                bg="#FFF"
                cursor="pointer"
                borderRadius="full"
                justify="center"
                align="center"
                style={{
                  height: 25,
                  width: 25,
                }}
              >
                <Icon as={RiEyeLine} color="#333" fontSize="10" />
              </Flex>
            </Tooltip>
          </Flex>
          <Image
            borderTopLeftRadius="5"
            borderTopRightRadius="5"
            src={image.Location}
            style={{
              width: 200,
              height: 150,
            }}
          />
          <Flex p="4" justify="space-between" align="center">
            <Text color="#333">{name}</Text>
          </Flex>
        </Flex>
      );
    }

    return (
      <Flex
        maxW={1000}
        bg="#FFF"
        flexDir="row"
        display="grid"
        gridGap="10px"
        gridTemplateColumns="200px 200px"
        py="4"
      >
        {courses &&
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
          })}
      </Flex>
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

      <Flex flexDir="column" w="100vw" h="100vh" bg="#fff" px="6">
        <Flex flexDir="column" maxW={1000} mx="auto" w="100%">
          <InstructorCourses />

          <Text color="#31343A" fontWeight="bold" fontSize={["2xl", "3xl"]}>
            Ações rápidas
          </Text>
          <StarterOptions />
        </Flex>
      </Flex>
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
