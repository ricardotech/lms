import { Flex, Spinner, Text, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Loading from "../../../components/Loading";
import { Context } from "../../../contexts/ContextProvider";
import { api } from "../../../services/apiClient";

export default function Success() {
  const { user, loading } = useContext(Context);

  const router = useRouter();
  const { _id } = router.query;

  const [courseExists, setCourseExists] = useState(false);

  const toast = useToast();

  useEffect(() => {
    validateCourseCreated();
  }, [_id]);

  async function validateCourseCreated() {
    try {
      await api.get(`/content/course/${_id}`).then((res) => {
        if (res.data.models.length > 0) {
        } else {
          setCourseExists(false);
        }
      });
    } catch (e) {
      router.push("/");
    }
  }

  const [message, setMessage] = useState(
    "Aguarde enquanto configuramos o seu projeto"
  );

  useEffect(() => {
    setTimeout(() => {
      setMessage("Estamos preparando o seu ambiente");
    }, 5000);
    setTimeout(() => {
      setMessage("Estamos quase lá...");
    }, 9500);
    setTimeout(() => {
      setMessage("Será esse o começo de algo grande?");
    }, 15500);
    setTimeout(() => {
      setMessage("Seu projeto foi criado com sucesso! 😜");
      router.push(`/content/curso/${_id}`);
    }, 20000);
  }, []);

  return (
    <Flex
      flexDir="column"
      h="100vh"
      w="100vw"
      bg="#000"
      justify="center"
      align="center"
    >
      <Spinner color="#FFF" size="xl" />
      <Text color="#FFF" mt="4" fontSize="xl">
        {message}
      </Text>
    </Flex>
  );
}
