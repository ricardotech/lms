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
import { Context } from "../../../contexts/ContextProvider";
import { useRouter } from "next/router";
import axios from "axios";
import { api } from "../../../services/apiClient";

import { MdDarkMode, MdTouchApp } from "react-icons/md";

import ReactMarkdown from "react-markdown";

import Header from "../../../components/Header";
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
import Loading from "../../../components/Loading";
import { useWindowSize } from "../../../utils/useWindowSize";
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

  useEffect(() => {
    onOpen();
  }, []);

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
              onOpen();
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

      <Flex flexDir="column" w="100vw" h="100vh" bg="#fff" p="6"></Flex>

      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerCloseButton
          _hover={{
            color: "#333",
          }}
          zIndex={2000}
          bg="#e0e0e0"
          color="#333"
        />
        <DrawerContent borderTopLeftRadius="15" borderTopRightRadius="15">
          <DrawerHeader fontSize="2xl" borderBottomWidth="1px" color="#333">
            Criar curso
          </DrawerHeader>
          <DrawerBody>
            <Flex align="center" w="100%" justify="space-between">
              <Text color="#333" my="2" fontSize={isWideVersion ? "xl" : "md"}>
                Capa
              </Text>
              {preview && (
                <Text
                  onClick={() => setPreview(undefined)}
                  cursor="pointer"
                  textDecorationLine="underline"
                  color="#333"
                  my="2"
                  fontSize={isWideVersion ? "lg" : "md"}
                >
                  Remover capa
                </Text>
              )}
            </Flex>
            <label>
              {preview ? (
                <Image src={preview} />
              ) : (
                <Flex
                  cursor="pointer"
                  flexDir="column"
                  bg="#eee"
                  borderRadius="5"
                  py="10"
                  justify="center"
                  align="center"
                >
                  <Flex bg="#aaa" p="5" borderRadius="full">
                    <Icon as={BiImageAdd} fontSize="xl" color="#999`" />
                  </Flex>
                  <Text color="#aaa" mt="4" fontSize="lg">
                    Clique para adicionar uma capa ao seu curso
                  </Text>
                </Flex>
              )}
              <input
                onChange={handleImage}
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
                  background: "#eee",
                  borderRadius: 5,
                  display: "none",
                }}
                type="file"
              />
            </label>

            <Text color="#333" my="2" fontSize={isWideVersion ? "xl" : "md"}>
              Nome
            </Text>
            <Input
              borderRadius="5"
              style={{
                padding: 10,
                border: "1px solid #a0a0a0",
                height: 50,
                color: "#333",
              }}
            />
            <Text color="#333" my="2" fontSize={isWideVersion ? "xl" : "md"}>
              Descrição
            </Text>
            <textarea
              name="description"
              style={{
                padding: 10,
                color: "#333",
                width: "100%",
                border: "1px solid #a0a0a0",
              }}
              cols={9}
              rows={9}
            ></textarea>
            <Flex
              cursor="pointer"
              mb="4"
              w="100%"
              borderRadius="5"
              bg="#f00066"
              justify="center"
              align="center"
              py="4"
              mt="4"
            >
              <Text fontWeight="bold" color="#FFF">
                Adicionar curso
              </Text>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
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
