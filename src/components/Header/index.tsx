import {
  Avatar,
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tooltip,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { BiHelpCircle, BiLogOut, BiStore, BiWallet } from "react-icons/bi";
import { MdDarkMode } from "react-icons/md";
import {
  RiCloseCircleFill,
  RiCloseFill,
  RiCloseLine,
  RiEye2Fill,
  RiEyeLine,
  RiUserLine,
} from "react-icons/ri";
import { Context } from "../../contexts/ContextProvider";

export default function Header({ none = false }) {
  const { user, signOut } = useContext(Context);

  const [menu, setMenu] = useState(false);

  const router = useRouter();

  // LUMCuagNtbEyvS4 mdb
  // dimitrious mdb.user
  // rXK9z3eU9MZbhPRE mdb.password

  // ricardofsdomene@icloud.com
  // Azd202020

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
  });

  return (
    <>
      {menu && (
        <Flex
          zIndex="2"
          position="absolute"
          h="calc(100vh - 80px)"
          style={{ marginTop: 80 }}
          w="100vw"
          bg="#eee"
        ></Flex>
      )}
      <Flex
        align="center"
        borderBottom="1px solid #e7e7e7"
        p="4"
        bg="#eee"
        w="100vw"
        style={{ height: 80 }}
      >
        <Flex justify="space-between" align="center" w="100%">
          <Flex align="center">
            <Image
              cursor="pointer"
              onClick={() => {
                router.push("/");
              }}
              borderRadius="5"
              src="/logo.png"
              w="42"
              h="42"
              mr="2"
            />
            <Flex flexDir="column">
              <Text fontSize="lg" color="#F00066" fontWeight="bold">
                Oraculu
              </Text>
              <Text fontSize="xs" color="#F00066">
                Learning Management System
              </Text>
            </Flex>
          </Flex>

          <Menu>
            <MenuButton>
              {!none && (
                <Avatar
                  style={{
                    width: 45,
                    height: 45,
                  }}
                  name={user ? user.name : "Usuário"}
                />
              )}
            </MenuButton>
            <MenuList
              bg="#FFF"
              border="1px solid #eee"
              boxShadow="rgba(0,0,0,0.1) 0 0 5px"
            >
              <Flex
                flexDir="column"
                justify="center"
                align="center"
                px="4"
                py="4"
              >
                <Avatar
                  style={{
                    width: 60,
                    height: 60,
                  }}
                  name={user ? user.name : "Usuário"}
                />
                <Text mt="4" fontWeight="medium" color="#333">
                  {user && user.name}
                </Text>
              </Flex>
              <Flex
                borderTop="1px solid #fafafa"
                py="1"
                w="100%"
                borderBottom="1px solid #fafafa"
                justifyContent="center"
                px="2"
                mb="4"
              >
                <Tooltip
                  bg="#333"
                  color="#FFF"
                  px="3"
                  label="Ir até o marketplace"
                >
                  <Flex
                    _hover={{
                      boxShadow: "rgba(0,0,0,0.1) 0 0 10px",
                    }}
                    cursor="pointer"
                    borderRadius="full"
                    style={{
                      height: 30,
                      width: 30,
                    }}
                    justify="center"
                    align="center"
                  >
                    <Icon as={BiStore} fontSize="sm" color="#333" />
                  </Flex>
                </Tooltip>
                <Tooltip
                  bg="#333"
                  color="#FFF"
                  px="3"
                  label="Visualizar seu perfil"
                >
                  <Flex
                    _hover={{
                      boxShadow: "rgba(0,0,0,0.1) 0 0 10px",
                    }}
                    cursor="pointer"
                    borderRadius="full"
                    style={{
                      height: 30,
                      width: 30,
                    }}
                    justify="center"
                    align="center"
                  >
                    <Icon as={RiEyeLine} fontSize="sm" color="#333" />
                  </Flex>
                </Tooltip>
                <Tooltip
                  bg="#333"
                  color="#FFF"
                  px="3"
                  label="Configurações de pagamento"
                >
                  <Flex
                    _hover={{
                      boxShadow: "rgba(0,0,0,0.1) 0 0 10px",
                    }}
                    cursor="pointer"
                    borderRadius="full"
                    style={{
                      height: 30,
                      width: 30,
                    }}
                    justify="center"
                    align="center"
                  >
                    <Icon as={BiWallet} fontSize="sm" color="#333" />
                  </Flex>
                </Tooltip>
                <Tooltip bg="#333" color="#FFF" px="3" label="Central de ajuda">
                  <Flex
                    _hover={{
                      boxShadow: "rgba(0,0,0,0.1) 0 0 10px",
                    }}
                    cursor="pointer"
                    borderRadius="full"
                    style={{
                      height: 30,
                      width: 30,
                    }}
                    justify="center"
                    align="center"
                  >
                    <Icon as={BiHelpCircle} fontSize="sm" color="#333" />
                  </Flex>
                </Tooltip>
              </Flex>
              <Flex flexDir="column" px="2">
                <Flex
                  _hover={{
                    backgroundColor: "#fafafa",
                  }}
                  cursor="pointer"
                  p="2"
                  w="100%"
                  borderRadius="5"
                  align="center"
                >
                  <Icon as={RiUserLine} color="#333" fontSize="sm" />
                  <Text color="#333" fontSize="sm" ml="2">
                    Seus dados
                  </Text>
                </Flex>
                <Flex
                  onClick={signOut}
                  _hover={{
                    backgroundColor: "#fafafa",
                  }}
                  cursor="pointer"
                  p="2"
                  w="100%"
                  borderRadius="5"
                  align="center"
                >
                  <Icon as={BiLogOut} color="#333" fontSize="sm" />
                  <Text color="#333" fontSize="sm" ml="2">
                    Sair da sua conta
                  </Text>
                </Flex>
              </Flex>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </>
  );
}
