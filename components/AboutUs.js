import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  SimpleGrid,
  Stack,
  Avatar,
  useColorModeValue,
  Icon,
  Image,
} from '@chakra-ui/react';
import { FaGraduationCap, FaLightbulb, FaHandshake } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export default function AboutUs() {
  return (
    <Box id="about-us" py={20}>
      <Container maxW={'7xl'}>
        <Stack spacing={12}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            textAlign="center"
          >
            <Text
              fontSize={'lg'}
              fontWeight={'bold'}
              bgGradient="linear(to-r, accent.400, accent.600)"
              bgClip="text"
              mb={2}
            >
              ABOUT US
            </Text>
            <Heading
              lineHeight={1.2}
              fontWeight={700}
              fontSize={{ base: '2xl', sm: '3xl', lg: '4xl' }}
              mb={6}
            >
              Our mission is to help students succeed
            </Heading>
            <Text
              color={useColorModeValue('gray.600', 'gray.400')}
              fontSize={{ base: 'md', lg: 'lg' }}
              maxW="3xl"
              mx="auto"
            >
              Exchange Campus was founded by students who experienced firsthand the high costs of educational 
              materials. We believe that education should be accessible to all, and that starts with making 
              study materials affordable.
            </Text>
          </MotionBox>
          
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
              <ValueCard 
                icon={FaGraduationCap} 
                title="Education First" 
                description="We believe in making education accessible to all students regardless of their financial background."
                delay={0.1}
                gradient="linear(to-r, blue.400, blue.600)"
              />
              <ValueCard 
                icon={FaLightbulb} 
                title="Innovation" 
                description="We continuously improve our platform to create the best experience for students on all campuses."
                delay={0.2}
                gradient="linear(to-r, accent.400, accent.600)"
              />
              <ValueCard 
                icon={FaHandshake} 
                title="Community" 
                description="We foster a trusted community where students help each other succeed through resource sharing."
                delay={0.3}
                gradient="linear(to-r, secondary.400, secondary.600)"
              />
            </SimpleGrid>
          </MotionBox>
          
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Flex 
              direction={{ base: 'column', md: 'row' }}
              bg={useColorModeValue('gray.50', 'gray.800')}
              rounded="xl"
              overflow="hidden"
              boxShadow="xl"
            >
              <Box flex={{ base: '1', md: '1.5' }}>
                <Image
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1742&q=80"
                  alt="Our team"
                  h="100%"
                  w="100%"
                  objectFit="cover"
                />
              </Box>
              <Flex 
                flex="1" 
                direction="column" 
                justifyContent="center" 
                p={{ base: 8, md: 12 }}
              >
                <Heading 
                  size="lg" 
                  mb={4}
                  bgGradient="linear(to-r, brand.500, accent.500)"
                  bgClip="text"
                >
                  Our Story
                </Heading>
                <Text fontSize="md" color={useColorModeValue('gray.600', 'gray.400')} mb={6}>
                  Exchange Campus started in 2021 at a small college dormitory when three friends realized 
                  that they were spending thousands on textbooks that would only be used for one semester. 
                  They created a simple solution: a platform where students could buy and sell used textbooks directly.
                </Text>
                <Text fontSize="md" color={useColorModeValue('gray.600', 'gray.400')}>
                  Today, we've expanded to over 50 campuses nationwide, helping more than 25,000 students save 
                  money on their educational materials. Our mission remains the same: make education more affordable 
                  by connecting students directly.
                </Text>
              </Flex>
            </Flex>
          </MotionBox>
        </Stack>
      </Container>
    </Box>
  );
}

function ValueCard({ icon, title, description, gradient, delay }) {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Stack
        p={6}
        rounded={'lg'}
        boxShadow={'lg'}
        bg={useColorModeValue('white', 'gray.800')}
        height="100%"
        align="center"
        textAlign="center"
      >
        <Flex
          w={16}
          h={16}
          align={'center'}
          justify={'center'}
          rounded={'full'}
          bgGradient={gradient}
          color={'white'}
          mb={5}
        >
          <Icon as={icon} w={8} h={8} />
        </Flex>
        <Heading
          fontSize={'xl'}
          fontWeight={600}
          mb={2}
        >
          {title}
        </Heading>
        <Text color={useColorModeValue('gray.600', 'gray.400')}>
          {description}
        </Text>
      </Stack>
    </MotionBox>
  );
} 