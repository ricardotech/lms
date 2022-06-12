import {
  Avatar,
  Flex,
  Icon,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { MdDarkMode } from "react-icons/md";
import { RiCloseFill, RiUserLine } from "react-icons/ri";
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
              bg="#FEFEFE"
              border="1px solid #eee"
              boxShadow="rgba(0,0,0,0.1) 0 0 10px"
            >
              <Flex justify="center" align="center" px="4" py="6">
                <Avatar
                  style={{
                    width: 45,
                    height: 45,
                  }}
                  name={user ? user.name : "Usuário"}
                />
              </Flex>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </>
  );
}
