import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
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
  Tooltip,
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
import {
  RiAddFill,
  RiArrowLeftLine,
  RiDeleteBin4Line,
  RiEditCircleLine,
  RiEditLine,
  RiShareLine,
  RiVideoUploadFill,
  RiVideoUploadLine,
} from "react-icons/ri";
import { BiChevronDown, BiTrash, BiTrashAlt } from "react-icons/bi";
import { useWindowSize } from "../../utils/useWindowSize";
import { Context } from "../../contexts/ContextProvider";
import Loading from "../../components/Loading";
import Sidebar from "../../components/Sidebar";
import { FcFullTrash } from "react-icons/fc";
import ReactMarkdown from "react-markdown";
import axios from "axios";

export default function UserId() {
  const { loading, setLoading, isSidebarOpen } = useContext(Context);

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
    slug: string;
    description?: string;
    requisites?: [string];
    models: [string];
  };

  const [course, setCourse] = useState<Course | null>();

  const [module, setModule] = useState({});
  const [modules, setModules] = useState([]);

  const cancelRef = React.useRef();

  const [deleting, setDeleting] = useState({
    id: "",
    name: "",
    isOpen: false,
  });

  type Lesson = {
    title: string;
    content: string;
    video: string;
  };

  const [lesson, setLesson] = useState<Lesson>();
  const [handleLessonVideoText, setHandleLessonVideoText] = useState(
    "Clique aqui para escolher o video"
  );
  const [uploading, setUploading] = useState(false);

  const handleCreateLesson = (e) => {
    e.preventDefault();
    console.log(lesson);
  };

  const handleLessonVideo = async (e) => {
    const file = e.target.files[0];
    setUploading(true);
    setHandleLessonVideoText(file.name);

    const videoData = new FormData();
    videoData.append("video", file);

    const res = await axios.post("/course/video-upload", videoData);

    alert(JSON.stringify(res.data));
    setLesson({ ...lesson, video: res.data });
    setUploading(false);
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
        router.push("/admin");
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
      router.push("/admin");
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
      <Sidebar />

      <Flex w="100%" h="100vh" mx="auto">
        {isSidebarOpen && (
          <Flex
            position="absolute"
            h="100%"
            w="100%"
            zIndex="2"
            style={{
              backgroundColor: isSidebarOpen ? "rgba(0, 0, 0, 0.2)" : "#eee",
            }}
          />
        )}
        <Flex
          flexDir="column"
          w="100%"
          style={{
            paddingTop: size.width > 700 ? 80 + 0 : 80 + 0,
            paddingLeft: size.width > 700 ? 80 + 10 : 10,
            paddingRight: 10,
          }}
        >
          {size.width < 1200 ? (
            <Flex flexDir="column" w="100%">
              <Flex flexDir="row" w="100%" py="5" justify="space-between">
                <Flex
                  cursor="pointer"
                  onClick={() => router.push("/admin")}
                  boxShadow="rgba(0, 0, 0, 0.1) 0 0 10px"
                  justify="center"
                  align="center"
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  borderRadius="5"
                >
                  <Icon as={RiArrowLeftLine} color="#333" fontSize="2xl" />
                </Flex>
                <Flex flexDir="row">
                  <Tooltip
                    bg="#FFF"
                    color="#333"
                    mr="2"
                    border="1px solid #f0f0f0"
                    borderRadius="5"
                    p="2"
                    label="Editar dados do seu curso"
                  >
                    <Flex
                      mr="2"
                      cursor="pointer"
                      onClick={() => router.push(`/edit/course/${course.slug}`)}
                      boxShadow="rgba(0, 0, 0, 0.1) 0 0 10px"
                      justify="center"
                      align="center"
                      style={{
                        height: 50,
                        width: 50,
                      }}
                      borderRadius="5"
                    >
                      <Icon as={RiEditCircleLine} color="#333" fontSize="2xl" />
                    </Flex>
                  </Tooltip>
                  <Tooltip
                    bg="#FFF"
                    color="#333"
                    mr="2"
                    border="1px solid #f0f0f0"
                    borderRadius="5"
                    p="2"
                    label="Adicionar módulo ao seu curso"
                  >
                    <Flex
                      cursor="pointer"
                      mr="2"
                      onClick={() => onOpen()}
                      boxShadow="rgba(0, 0, 0, 0.1) 0 0 10px"
                      justify="center"
                      align="center"
                      style={{
                        height: 50,
                        width: 50,
                      }}
                      borderRadius="5"
                    >
                      <Icon as={RiAddFill} color="#333" fontSize="2xl" />
                    </Flex>
                  </Tooltip>
                  <Tooltip
                    bg="#FFF"
                    color="#333"
                    mr="2"
                    border="1px solid #f0f0f0"
                    borderRadius="5"
                    p="2"
                    label="Excluir o seu curso"
                  >
                    <Flex
                      cursor="pointer"
                      onClick={() =>
                        setDeleting({
                          id: course._id,
                          name: course.name,
                          isOpen: true,
                        })
                      }
                      boxShadow="rgba(0, 0, 0, 0.1) 0 0 10px"
                      justify="center"
                      align="center"
                      style={{
                        height: 50,
                        width: 50,
                      }}
                      borderRadius="5"
                    >
                      <Icon as={BiTrash} color="#333" fontSize="2xl" />
                    </Flex>
                  </Tooltip>
                </Flex>
              </Flex>

              <Flex borderRadius="5" bg="#333" w="100%" h="250">
                <Flex position="absolute" w="90%" p="4">
                  <Flex
                    style={{
                      boxShadow: "rgba(255,255,255,0.1) 0 0 10px",
                    }}
                    zIndex="2"
                    p="4"
                    bg="rgba(0, 0, 0, 0.4)"
                    borderRadius="5"
                    position="absolute"
                  >
                    <Text color="#FFF" fontWeight="bold" fontSize="2xl">
                      {course.name}
                    </Text>
                  </Flex>
                </Flex>
                <Image
                  opacity={0.5}
                  borderRadius="5"
                  src="/classroom.png"
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                />
              </Flex>

              <Text color="#333" fontWeight="bold" mt="4" fontSize="xl">
                Descrição
              </Text>
              <Text color="#333">
                <ReactMarkdown children={course.description}></ReactMarkdown>
              </Text>
            </Flex>
          ) : (
            <Flex flexDir="column" w="100%" justify="space-between">
              <Flex flexDir="row" w="100%" py="5" justify="space-between">
                <Flex
                  cursor="pointer"
                  onClick={() => router.push("/admin")}
                  boxShadow="rgba(0, 0, 0, 0.1) 0 0 10px"
                  justify="center"
                  align="center"
                  style={{
                    height: 50,
                    width: 50,
                  }}
                  borderRadius="5"
                >
                  <Icon as={RiArrowLeftLine} color="#333" fontSize="2xl" />
                </Flex>
                <Flex flexDir="row">
                  <Tooltip
                    bg="#FFF"
                    color="#333"
                    mr="2"
                    border="1px solid #f0f0f0"
                    borderRadius="5"
                    p="2"
                    label="Editar dados do seu curso"
                  >
                    <Flex
                      mr="2"
                      cursor="pointer"
                      onClick={() => router.push(`/edit/course/${course.slug}`)}
                      boxShadow="rgba(0, 0, 0, 0.1) 0 0 10px"
                      justify="center"
                      align="center"
                      style={{
                        height: 50,
                        width: 50,
                      }}
                      borderRadius="5"
                    >
                      <Icon as={RiEditCircleLine} color="#333" fontSize="2xl" />
                    </Flex>
                  </Tooltip>
                  <Tooltip
                    bg="#FFF"
                    color="#333"
                    mr="2"
                    border="1px solid #f0f0f0"
                    borderRadius="5"
                    p="2"
                    label="Adicionar módulo ao seu curso"
                  >
                    <Flex
                      cursor="pointer"
                      mr="2"
                      onClick={() => onOpen()}
                      boxShadow="rgba(0, 0, 0, 0.1) 0 0 10px"
                      justify="center"
                      align="center"
                      style={{
                        height: 50,
                        width: 50,
                      }}
                      borderRadius="5"
                    >
                      <Icon as={RiAddFill} color="#333" fontSize="2xl" />
                    </Flex>
                  </Tooltip>
                  <Tooltip
                    bg="#FFF"
                    color="#333"
                    mr="2"
                    border="1px solid #f0f0f0"
                    borderRadius="5"
                    p="2"
                    label="Excluir o seu curso"
                  >
                    <Flex
                      cursor="pointer"
                      onClick={() =>
                        setDeleting({
                          id: course._id,
                          name: course.name,
                          isOpen: true,
                        })
                      }
                      boxShadow="rgba(0, 0, 0, 0.1) 0 0 10px"
                      justify="center"
                      align="center"
                      style={{
                        height: 50,
                        width: 50,
                      }}
                      borderRadius="5"
                    >
                      <Icon as={BiTrash} color="#333" fontSize="2xl" />
                    </Flex>
                  </Tooltip>
                </Flex>
              </Flex>

              <Flex borderRadius="5" bg="#333" w="100%" h="350">
                <Flex position="absolute" w="100%" p="4">
                  <Flex
                    style={{
                      boxShadow: "rgba(255,255,255,0.1) 0 0 10px",
                    }}
                    zIndex="2"
                    p="4"
                    bg="rgba(0, 0, 0, 0.4)"
                    borderRadius="5"
                    position="absolute"
                  >
                    <Text color="#FFF" fontWeight="bold" fontSize="2xl">
                      {course.name}
                    </Text>
                  </Flex>
                </Flex>
                <Image
                  opacity={0.5}
                  borderRadius="5"
                  src="/classroom.png"
                  style={{
                    height: "100%",
                    width: "100%",
                  }}
                />
              </Flex>
              <Flex
                borderRadius="5"
                bg="#fff"
                style={{
                  boxShadow: "rgba(0,0,0,0.1) 0 0 5px",
                  marginLeft: 10,
                  width: 700,
                }}
                h="350"
              ></Flex>
            </Flex>
          )}
        </Flex>
      </Flex>

      <Modal
        isCentered={true}
        isOpen={deleting.isOpen}
        onClose={() => {
          onClose();
          setModule({});
        }}
      >
        <ModalOverlay />
        <ModalContent
          style={{
            width: 400,
          }}
        >
          <ModalBody>
            <Flex flexDir="column" justify="space-between" h="100%">
              <Flex flexDir="column">
                <Text color="#333" fontSize="xl" mt="2">
                  Você está prestes a excluir o curso
                </Text>
                <Text color="#333" fontWeight="bold" fontSize="2xl">
                  {deleting.name}
                </Text>
              </Flex>
              <Flex flexDir="row" mt="6" mb="4" justify="flex-end">
                <Button
                  _hover={{
                    backgroundColor: "#FAFAFA",
                  }}
                  boxShadow="rgba(0, 0, 0, 0.1) 0 0 10px"
                  bg="#FFF"
                  color="#333"
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
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal
        isCentered={true}
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setDeleting({
            id: "",
            name: "",
            isOpen: false,
          });
        }}
      >
        <ModalOverlay />
        <ModalContent
          style={{
            width: 400,
          }}
        >
          <ModalHeader color="#333">Adicionar modulo</ModalHeader>
          <ModalBody>
            <Flex flexDir="column" justify="space-between" h="100%">
              <Input
                placeholder="Nome do modulo"
                borderRadius="5"
                color="#333"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setLesson({
                    ...lesson,
                    title: e.target.value,
                  });
                }}
              />

              <textarea
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>): void =>
                  setLesson({ ...lesson, content: e.target.value })
                }
                name="description"
                style={{
                  marginTop: 10,
                  padding: 10,
                  color: "#333",
                  width: "100%",
                  borderRadius: 5,
                  border: "1px solid #e0e0e0",
                }}
                cols={4}
                rows={4}
              ></textarea>

              <label
                style={{
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: 120,
                  marginTop: 10,
                  borderRadius: 5,
                  backgroundColor: "#fff",
                  border: "1px solid #e0e0e0",
                }}
              >
                <Icon as={RiVideoUploadLine} color="#333" fontSize="33" />
                <Text color="#333" fontSize="lg" mt="2">
                  {handleLessonVideoText}
                </Text>
                <input
                  onChange={handleLessonVideo}
                  type="file"
                  style={{
                    display: "none",
                  }}
                  accept="video/*"
                />
              </label>

              <Flex flexDir="row" mt="6" mb="4" justify="flex-end">
                <Button
                  _hover={{
                    backgroundColor: "#FAFAFA",
                  }}
                  boxShadow="rgba(0, 0, 0, 0.1) 0 0 10px"
                  bg="#FFF"
                  color="#333"
                  onClick={onClose}
                >
                  Cancelar
                </Button>
                <Button onClick={() => {}} colorScheme="blue" ml="2">
                  Adicionar
                </Button>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
