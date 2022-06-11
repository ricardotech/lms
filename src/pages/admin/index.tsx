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
import { BiImageAdd } from "react-icons/bi";

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

  const { isOpen, onOpen, onClose } = useDisclosure();

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
        <Option title="Criar seu primeiro curso" />
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

      <Flex flexDir="column" w="100vw" h="100vh" bg="#fff" p="6">
        <Flex flexDir="column" maxW={1000} mx="auto" w="100%">
          <Text color="#31343A" fontWeight="bold" fontSize={["2xl", "3xl"]}>
            Por onde gostaria de começar?
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
