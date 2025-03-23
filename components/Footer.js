import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Link,
  useColorModeValue,
  Heading,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  HStack,
} from '@chakra-ui/react';
import { 
  FaTwitter, 
  FaFacebook, 
  FaInstagram, 
  FaLinkedin,
  FaCube,
  FaRegLightbulb,
  FaUsers,
  FaUniversity,
  FaChevronRight,
} from 'react-icons/fa';
import { useState } from 'react';

export default function Footer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalContent, setModalContent] = useState({
    title: '',
    content: ''
  });
  
  const handleLinkClick = (e, title, content) => {
    e.preventDefault(); // Prevent default link behavior (scrolling to top)
    setModalContent({ title, content });
    onOpen();
  };
  
  return (
    <Box
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      borderTopWidth={1}
      borderStyle="solid"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <Container as={Stack} maxW={'7xl'} py={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr', md: '1fr 2fr' }}
          spacing={8}
        >
          <Stack align={'flex-start'} spacing={4}>
            <Heading
              size="md"
              bgGradient="linear(to-r, brand.400, brand.600)"
              bgClip="text"
              fontWeight="bold"
              mb={2}
            >
              Platform
            </Heading>
            
            <FooterLink icon={FaCube} href="#features">
              Features
            </FooterLink>
            
            <FooterLink icon={FaRegLightbulb} href="#how-it-works">
              How It Works
            </FooterLink>
            
            <FooterLink icon={FaUsers} href="#about-us">
              About Us
            </FooterLink>
            
            <FooterLink 
              icon={FaUniversity} 
              href="#"
              onClick={(e) => handleLinkClick(
                e,
                'Universities', 
                'Exchange Campus is currently active at over 300 universities worldwide. We\'re rapidly expanding to new campuses every month. Students from participating universities can access campus-specific listings and connect with peers from their institution.'
              )}
            >
              Universities
            </FooterLink>
          </Stack>
          <Stack spacing={6}>
            <Heading
              size="md"
              bgGradient="linear(to-r, brand.500, accent.500)"
              bgClip="text"
              fontWeight="bold"
            >
              Exchange Campus
            </Heading>
            <Text fontSize="sm" lineHeight="tall">
              The student-to-student marketplace for university materials.
              Buy, sell, and exchange textbooks, notes, and study resources
              with other students at your campus.
            </Text>
            <Stack direction="row" spacing={5}>
              <SocialButton label={'Twitter'} href={'#'}>
                <FaTwitter />
              </SocialButton>
              <SocialButton label={'Facebook'} href={'#'}>
                <FaFacebook />
              </SocialButton>
              <SocialButton label={'Instagram'} href={'#'}>
                <FaInstagram />
              </SocialButton>
              <SocialButton label={'LinkedIn'} href={'#'}>
                <FaLinkedin />
              </SocialButton>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
      <Box
        borderTopWidth={1}
        borderStyle="solid"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
      >
        <Container
          as={Stack}
          maxW={'7xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}
        >
          <Text fontSize="sm">© 2025 Exchange Campus. All rights reserved</Text>
          <Stack direction="row" spacing={6}>
            <Link 
              href={'#'}
              fontSize="sm"
              onClick={(e) => handleLinkClick(
                e,
                'Privacy Policy', 
                'At Exchange Campus, we take your privacy seriously. We collect only the information necessary to provide our services and connect you with other students. Your personal data is securely stored and never shared with third parties without your explicit consent. You maintain control over your information and can request its deletion at any time.'
              )}
            >
              Privacy Policy
            </Link>
            <Link 
              href={'#'}
              fontSize="sm"
              onClick={(e) => handleLinkClick(
                e,
                'Terms of Service', 
                'By using Exchange Campus, you agree to our Terms of Service. Users must be enrolled students at a participating university. All listings must be for legitimate educational materials. Users are responsible for the accuracy of their listings. Exchange Campus facilitates connections between users but is not responsible for the condition of items or the completion of transactions.'
              )}
            >
              Terms of Service
            </Link>
            <Link 
              href={'#'}
              fontSize="sm"
              onClick={(e) => handleLinkClick(
                e,
                'Cookies', 
                'Exchange Campus uses cookies to enhance your browsing experience and provide personalized services. We use essential cookies for site functionality, analytical cookies to improve our services, and optional cookies for personalization. You can manage your cookie preferences at any time through your account settings.'
              )}
            >
              Cookies
            </Link>
          </Stack>
        </Container>
      </Box>
      
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="brand.500">{modalContent.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{modalContent.content}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="brand" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

const FooterLink = ({ children, icon, href, onClick }) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      display="flex"
      alignItems="center"
      fontSize="md"
      fontWeight="500"
      _hover={{
        textDecor: 'none',
        color: 'brand.500',
        transform: 'translateX(4px)',
      }}
      transition="all 0.2s"
    >
      <HStack spacing={2}>
        <Icon as={icon} color="brand.400" />
        <Text>{children}</Text>
        <Icon 
          as={FaChevronRight} 
          color="brand.300" 
          boxSize={3} 
          opacity={0.7}
        />
      </HStack>
    </Link>
  );
};

const SocialButton = ({ children, label, href }) => {
  return (
    <Link
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      color={useColorModeValue('gray.600', 'gray.300')}
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
        color: useColorModeValue('brand.500', 'brand.300'),
      }}
    >
      <Icon aria-label={label}>{children}</Icon>
    </Link>
  );
};
 