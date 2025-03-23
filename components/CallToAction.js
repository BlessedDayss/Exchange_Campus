import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  Icon,
  SimpleGrid,
} from '@chakra-ui/react';
import { FaArrowRight, FaBook, FaDollarSign, FaUsers } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export default function CallToAction() {
  return (
    <Box py={20} position="relative" overflow="hidden">
      {/* Decorative elements */}
      <Box
        position="absolute"
        top="5%"
        right="-10%"
        width="300px"
        height="300px"
        bg="brand.50"
        borderRadius="full"
        filter="blur(60px)"
        opacity="0.4"
        zIndex={0}
      />
      <Box
        position="absolute"
        bottom="5%"
        left="-5%"
        width="250px"
        height="250px"
        bg="accent.50"
        borderRadius="full"
        filter="blur(60px)"
        opacity="0.5"
        zIndex={0}
      />
      
      <Container maxW={'7xl'} position="relative" zIndex={1}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          {/* Stats Section */}
          <MotionBox
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Box p={8}>
              <Heading
                as="h3"
                fontSize={{ base: 'xl', md: '2xl' }}
                mb={8}
                fontWeight="bold"
                color="gray.700"
              >
                Students are already saving with Exchange Campus
              </Heading>
              
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={6}>
                <StatBox 
                  icon={FaBook} 
                  number="25,000+" 
                  label="Materials exchanged" 
                  color="brand.500"
                />
                <StatBox 
                  icon={FaUsers} 
                  number="5,000+" 
                  label="Active students" 
                  color="secondary.500"
                />
                <StatBox 
                  icon={FaDollarSign} 
                  number="70%" 
                  label="Average savings" 
                  color="accent.500"
                />
                <StatBox 
                  icon={FaUsers} 
                  number="50+" 
                  label="Campuses" 
                  color="purple.500"
                />
              </SimpleGrid>
            </Box>
          </MotionBox>
          
          {/* Main CTA Section */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Flex
              direction="column"
              align="flex-start"
              justify="center"
              p={{ base: 8, md: 10 }}
              h="100%"
              borderRadius="xl"
              boxShadow="2xl"
              bgGradient="linear(to-r, brand.600, brand.500)"
              color="white"
            >
              <Heading
                fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
                fontWeight="bold"
                mb={4}
                lineHeight="1.2"
              >
                Ready to start saving on university materials?
              </Heading>
              <Text
                fontSize={{ base: 'md', md: 'lg' }}
                mb={8}
                opacity={0.9}
                maxW="xl"
              >
                Join thousands of students already exchanging textbooks, notes, and study materials.
                Create your account today and start saving!
              </Text>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                spacing={{ base: 4, sm: 6 }}
                w={{ base: 'full', sm: 'auto' }}
              >
                <Button
                  size="lg"
                  bg="white"
                  color="brand.600"
                  _hover={{
                    bg: 'gray.100',
                  }}
                  rounded="md"
                  fontWeight="bold"
                  px={8}
                  rightIcon={<FaArrowRight />}
                >
                  Join Now - It's Free
                </Button>
                <Button
                  size="lg"
                  bg="transparent"
                  color="white"
                  _hover={{
                    bg: 'whiteAlpha.200',
                  }}
                  rounded="md"
                  border="2px solid"
                  borderColor="whiteAlpha.700"
                  fontWeight="bold"
                  px={8}
                >
                  Learn More
                </Button>
              </Stack>
            </Flex>
          </MotionBox>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

function StatBox({ icon, number, label, color }) {
  return (
    <Stack
      direction={{ base: 'row', md: 'column' }}
      spacing={3}
      align={{ base: 'center', md: 'flex-start' }}
      bg={useColorModeValue('white', 'gray.800')}
      p={5}
      rounded="lg"
      boxShadow="md"
      borderTop="3px solid"
      borderColor={color}
    >
      <Box
        p={2}
        bg={`${color}20`}
        color={color}
        rounded="lg"
      >
        <Icon as={icon} w={6} h={6} />
      </Box>
      <Box>
        <Text fontWeight="bold" fontSize="2xl" mb={0}>
          {number}
        </Text>
        <Text fontSize="sm" color="gray.500">
          {label}
        </Text>
      </Box>
    </Stack>
  );
} 