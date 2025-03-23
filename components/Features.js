import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  useColorModeValue,
  Link,
  Button,
  Badge,
} from '@chakra-ui/react';
import { 
  FaSearch, 
  FaUserShield, 
  FaCommentAlt, 
  FaDollarSign,
  FaStar,
  FaBookOpen,
  FaMobileAlt,
  FaChevronRight
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export default function Features() {
  return (
    <Box 
      id="features" 
      py={20} 
      bg={useColorModeValue('white', 'gray.900')}
      position="relative"
      overflow="hidden"
    >
      {/* Decorative element */}
      <Box
        position="absolute"
        right="-10%"
        top="20%"
        width="300px"
        height="300px"
        bg="brand.50"
        borderRadius="full"
        filter="blur(70px)"
        opacity="0.5"
        zIndex={0}
      />
      
      <Container maxW={'7xl'} position="relative" zIndex={1}>
        <VStack spacing={{ base: 12, md: 16 }}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            textAlign="center"
            w="full"
          >
            <Badge 
              colorScheme="brand" 
              p={2} 
              rounded="full" 
              fontSize="sm" 
              textTransform="uppercase"
              mb={3}
            >
              Built for students
            </Badge>
            <Heading
              lineHeight={1.2}
              fontWeight={700}
              fontSize={{ base: '2xl', sm: '3xl', lg: '4xl' }}
              mb={4}
            >
              Everything you need in one platform
            </Heading>
            <Text
              color={useColorModeValue('gray.600', 'gray.400')}
              fontSize={{ base: 'md', lg: 'lg' }}
              maxW="3xl"
              mx="auto"
            >
              Exchange Campus is designed with students in mind, making it easy to list, 
              find, and exchange university materials safely and efficiently.
            </Text>
          </MotionBox>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} w="full">
            <FeatureCard 
              icon={FaSearch} 
              title="Smart Search & Filters"
              text="Find exactly what you need with course-specific search, professor filters, and material type categories. Our smart recommendations show you materials relevant to your courses."
              delay={0.1}
              gradient="linear(to-r, blue.400, blue.600)"
            />
            <FeatureCard 
              icon={FaUserShield} 
              title="Verified Student Profiles"
              text="Connect only with verified students from your university. Every account is linked to a student email, creating a trusted community for safe exchanges."
              delay={0.2}
              gradient="linear(to-r, secondary.400, secondary.600)"
            />
            <FeatureCard 
              icon={FaCommentAlt} 
              title="Secure Messaging System"
              text="Communicate directly with buyers or sellers through our encrypted messaging system. Schedule meetups, negotiate prices, and arrange exchanges safely."
              delay={0.3}
              gradient="linear(to-r, purple.400, accent.600)"
            />
            <FeatureCard 
              icon={FaDollarSign} 
              title="No Hidden Fees"
              text="Keep 100% of your earnings when you sell. Unlike other platforms, we don't take any commission on your exchanges, making it truly student-to-student."
              delay={0.4}
              gradient="linear(to-r, accent.400, red.500)"
            />
          </SimpleGrid>
          
          {/* Additional Features Section */}
          <MotionBox
            w="full"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Box 
              bg={useColorModeValue('gray.50', 'gray.800')} 
              rounded="xl" 
              p={{ base: 6, md: 8 }}
              boxShadow="lg"
            >
              <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
                <AdditionalFeature 
                  icon={FaBookOpen}
                  title="Digital Materials"
                  text="Share and sell digital notes, summaries, and study guides alongside physical textbooks."
                />
                <AdditionalFeature 
                  icon={FaStar}
                  title="Rating System"
                  text="Build your reputation with our rating system. Trusted sellers get more visibility."
                />
                <AdditionalFeature 
                  icon={FaMobileAlt}
                  title="Mobile App"
                  text="Access Exchange Campus on the go with our mobile app for iOS and Android."
                />
              </SimpleGrid>
              
              <Flex justify="center" mt={10}>
                <Button 
                  variant="outline" 
                  colorScheme="brand" 
                  size="lg"
                  rightIcon={<FaChevronRight />}
                  as={Link}
                  href="#"
                >
                  Explore all features
                </Button>
              </Flex>
            </Box>
          </MotionBox>
        </VStack>
      </Container>
    </Box>
  );
}

function FeatureCard({ icon, title, text, delay, gradient }) {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        p={8}
        rounded={'xl'}
        boxShadow={'xl'}
        bg={useColorModeValue('white', 'gray.800')}
        _hover={{
          transform: 'translateY(-5px)',
          boxShadow: '2xl',
          transition: 'all 0.3s ease',
        }}
        height="100%"
        borderTop="4px solid"
        borderColor={useColorModeValue('brand.500', 'brand.400')}
      >
        <Flex
          w={16}
          h={16}
          align={'center'}
          justify={'center'}
          rounded={'full'}
          bgGradient={gradient}
          color={'white'}
          mb={{ base: 4, lg: 0 }}
          mr={{ lg: 6 }}
          flexShrink={0}
        >
          <Icon as={icon} w={8} h={8} />
        </Flex>
        <Stack flex={1}>
          <Heading
            fontSize={'xl'}
            fontWeight={700}
          >
            {title}
          </Heading>
          <Text color={useColorModeValue('gray.600', 'gray.400')} fontSize="md">
            {text}
          </Text>
        </Stack>
      </Stack>
    </MotionBox>
  );
}

function AdditionalFeature({ icon, title, text }) {
  return (
    <Stack align="center" textAlign="center">
      <Box
        rounded="full"
        p={3}
        bg={useColorModeValue('brand.50', 'gray.700')}
        color="brand.500"
        mb={4}
      >
        <Icon as={icon} w={6} h={6} />
      </Box>
      <Heading size="md" mb={2}>{title}</Heading>
      <Text color={useColorModeValue('gray.600', 'gray.400')}>{text}</Text>
    </Stack>
  );
} 