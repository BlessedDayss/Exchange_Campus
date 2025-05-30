import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
  Image,
  Badge,
  Button,
  SimpleGrid,
} from '@chakra-ui/react';
import { FaHandshake, FaBook, FaMoneyBillWave, FaUsers, FaChevronRight } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export default function Solution() {
  return (
    <Box 
      id="solution" 
      py={{ base: 12, md: 20 }}
      bg={useColorModeValue('white', 'gray.800')}
      position="relative"
      overflow="hidden"
    >
      {/* Decorative background element */}
      <Box
        position="absolute"
        top="-10%"
        right="-5%"
        width="300px"
        height="300px"
        borderRadius="full"
        bg="brand.50"
        zIndex={0}
      />
      <Box
        position="absolute"
        bottom="-10%"
        left="-5%"
        width="300px"
        height="300px"
        borderRadius="full"
        bg="accent.50"
        zIndex={0}
      />
      
      <Container maxW={'7xl'} position="relative" zIndex={1}>
        <Stack
          direction={{ base: 'column', lg: 'row-reverse' }}
          spacing={{ base: 10, md: 16 }}
          align={'center'}
        >
          <MotionBox
            flex={1}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Stack spacing={6}>
              <Badge 
                colorScheme="brand" 
                p={2} 
                fontSize="sm" 
                borderRadius="full"
                width="fit-content"
              >
                Our Solution
              </Badge>
              <Heading
                lineHeight={1.2}
                fontWeight={700}
                fontSize={{ base: '2xl', sm: '3xl', lg: '4xl' }}
                bgGradient="linear(to-r, brand.500, accent.500)"
                bgClip="text"
              >
                Exchange Campus Marketplace
              </Heading>
              <Text
                color={useColorModeValue('gray.600', 'gray.400')}
                fontSize={{ base: 'md', lg: 'lg' }}
              >
                We've created a platform where students can sell, buy, or exchange textbooks, 
                notes, and study materials directly with each other.
              </Text>
              
              <Stack spacing={4} mt={2}>
                <SolutionFeature
                  icon={FaBook}
                  title="Easy Material Discovery"
                  text="Find materials specific to your courses and university with advanced search filters."
                />
                <SolutionFeature
                  icon={FaMoneyBillWave}
                  title="Save up to 70% on Materials"
                  text="Buy used textbooks and resources at a fraction of the retail price."
                />
                <SolutionFeature
                  icon={FaUsers}
                  title="Connect With Peers"
                  text="Build your academic network while exchanging valuable resources."
                />
              </Stack>
              
              <Button
                as="a"
                href="/marketplace"
                rightIcon={<FaChevronRight />}
                colorScheme="brand"
                size="lg"
                fontWeight="bold"
                rounded="full"
                px={8}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                mt={2}
                cursor="pointer"
              >
                Start Exchanging
              </Button>
            </Stack>
          </MotionBox>
          
          <MotionBox
            flex={1}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Flex
              justify={'center'}
              position={'relative'}
              w={'full'}
            >
              <Box
                position={'relative'}
                height={{ base: '300px', lg: '450px' }}
                rounded={'xl'}
                boxShadow={'2xl'}
                width={'full'}
                overflow={'hidden'}
              >
                <Image
                  alt={'Students exchanging academic materials'}
                  fit={'cover'}
                  align={'center'}
                  w={'100%'}
                  h={'100%'}
                  src={
                    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80'
                  }
                />
                <Box
                  position={'absolute'}
                  bottom={0}
                  left={0}
                  right={0}
                  bg={'brand.500'}
                  py={3}
                  px={6}
                  color={'white'}
                  fontWeight={'bold'}
                >
                  <Text>Join 5,000+ students already saving money on campus</Text>
                </Box>
              </Box>
            </Flex>
          </MotionBox>
        </Stack>
      </Container>
    </Box>
  );
}

const SolutionFeature = ({ icon, title, text }) => {
  return (
    <Stack direction="row" align="center" spacing={4}>
      <Flex
        w={10}
        h={10}
        align="center"
        justify="center"
        rounded="full"
        bg={useColorModeValue('brand.50', 'brand.900')}
        color={useColorModeValue('brand.500', 'brand.300')}
      >
        <Icon as={icon} w={5} h={5} />
      </Flex>
      <Box>
        <Text fontWeight={600}>{title}</Text>
        <Text color={useColorModeValue('gray.600', 'gray.400')} fontSize="sm">{text}</Text>
      </Box>
    </Stack>
  );
}; 