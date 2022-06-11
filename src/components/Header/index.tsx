import {
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
          bg="#FFF"
        ></Flex>
      )}
      <Flex
        align="center"
        borderBottom="1px solid #f0f0f0"
        p="4"
        bg="#FFF"
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
              borderRadius="full"
              src="http://localhost:5556/images/inconformedia.png"
              w="45"
              h="45"
              mr="2"
            />
          </Flex>
          {!none && (
            <Flex display={none ? "none" : null} align="center">
              <Link href={user && user._id ? "/admin" : "/auth/signup"}>
                <Flex
                  onClick={() => signOut()}
                  cursor="pointer"
                  bg="#F00066"
                  px="4"
                  py="2"
                  ml="4"
                  borderRadius="5"
                  justify="center"
                  align="center"
                >
                  <Text color="#FFF" fontSize="14" fontWeight="bold">
                    Sair da sua conta
                  </Text>
                </Flex>
              </Link>
            </Flex>
          )}
        </Flex>
      </Flex>
    </>
  );
}
