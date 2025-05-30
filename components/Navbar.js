import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Link,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from '@chakra-ui/icons';

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <Box 
      position="sticky" 
      top="0" 
      zIndex="sticky" 
      bg={useColorModeValue('white', 'gray.800')} 
      borderBottom={1} 
      borderStyle="solid" 
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      shadow="md"
    >
      <Flex
        className="container"
        minH="70px"
        py={{ base: 3 }}
        px={{ base: 4 }}
        align="center"
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant="ghost"
            aria-label="Toggle Navigation"
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            as="a"
            href="/"
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily="heading"
            fontWeight="bold"
            fontSize={{ base: 'xl', md: '2xl' }}
            bgGradient="linear(to-r, brand.500, accent.500)"
            bgClip="text"
            cursor="pointer"
            _hover={{
              textDecoration: 'none',
              transform: 'scale(1.05)',
            }}
            transition="transform 0.2s"
          >
            Exchange Campus
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 1 }}
          justify="flex-end"
          direction="row"
          spacing={6}
        >
          {session ? (
            <Menu>
              <MenuButton
                as={Button}
                rounded="full"
                variant="link"
                cursor="pointer"
                minW={0}
              >
                <Flex align="center">
                  <Avatar 
                    size="sm" 
                    name={session.user.name}
                    mr={2}
                  />
                  <Text display={{ base: 'none', md: 'block' }}>{session.user.name}</Text>
                </Flex>
              </MenuButton>
              <MenuList>
                <MenuItem as="a" href="/profile">Profile</MenuItem>
                <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <>
              <Button
                as="a"
                fontSize="sm"
                fontWeight={600}
                variant="ghost"
                color="gray.600"
                href="/auth/signin"
                _hover={{
                  color: 'brand.500',
                }}
              >
                Sign In
              </Button>
              <Button
                as="a"
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize="sm"
                fontWeight={600}
                color="white"
                bg="brand.500"
                href="/auth/signup"
                _hover={{
                  bg: 'brand.600',
                }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('brand.500', 'white');

  return (
    <Stack direction="row" spacing={6}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Link
            p={2}
            href={navItem.href ?? '#'}
            fontSize="sm"
            fontWeight={500}
            color={linkColor}
            _hover={{
              textDecoration: 'none',
              color: linkHoverColor,
            }}
          >
            {navItem.label}
          </Link>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, href }) => {
  return (
    <Stack spacing={4}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify="space-between"
        align="center"
        _hover={{
          textDecoration: 'none',
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
        >
          {label}
        </Text>
      </Flex>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: 'Marketplace',
    href: '/marketplace',
  },
  {
    label: 'Features',
    href: '#features',
  },
  {
    label: 'How It Works',
    href: '#how-it-works',
  },
  {
    label: 'About Us',
    href: '#about-us',
  },
]; 