import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
  Flex,
  Image,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export default function Hero() {
  return (
    <Box 
      bg={useColorModeValue('gray.50', 'gray.900')}
      position="relative"
      overflow="hidden"
    >
      {/* Decorative background elements */}
      <Box
        position="absolute"
        top="-10%"
        left="-5%"
        width="300px"
        height="300px"
        bg="brand.50"
        borderRadius="full"
        filter="blur(70px)"
        opacity="0.6"
        zIndex="0"
      />
      <Box
        position="absolute"
        bottom="-5%"
        right="-5%"
        width="250px"
        height="250px"
        bg="accent.50"
        borderRadius="full"
        filter="blur(70px)"
        opacity="0.6"
        zIndex="0"
      />
      
      <Container maxW={'7xl'} py={{ base: 16, md: 28 }} position="relative" zIndex="1">
        <Stack
          direction={{ base: 'column', md: 'row' }}
          spacing={{ base: 10, md: 16 }}
          align={'center'}
        >
          <Stack flex={1} spacing={{ base: 6, md: 8 }}>
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Heading
                lineHeight={1.1}
                fontWeight={700}
                fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
              >
                <Text
                  as={'span'}
                  position={'relative'}
                  bgGradient="linear(to-r, brand.400, brand.600)"
                  bgClip="text"
                >
                  Exchange Campus
                </Text>
                <br />
                <Text as={'span'} fontSize={{ base: '2xl', sm: '3xl', lg: '4xl' }} color={'gray.700'}>
                  University Materials Marketplace
                </Text>
              </Heading>
            </MotionBox>
            
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Text color={'gray.600'} fontSize={{ base: 'md', lg: 'xl' }} maxW={'550px'}>
                A student-to-student platform for buying, selling, and exchanging textbooks, 
                notes, and academic resources. Save money and connect with peers at your campus.
              </Text>
            </MotionBox>
            
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={{ base: 'column', sm: 'row' }}
              >
                <Button
                  rounded={'md'}
                  size={'lg'}
                  fontWeight={'medium'}
                  px={8}
                  colorScheme={'brand'}
                  bg={'brand.500'}
                  _hover={{ bg: 'brand.600' }}
                >
                  Join the Marketplace
                </Button>
                <Button
                  rounded={'md'}
                  size={'lg'}
                  fontWeight={'medium'}
                  px={8}
                  leftIcon={<PlayIcon h={4} w={4} color={'gray.500'} />}
                  href={'#how-it-works'}
                  as={'a'}
                  variant={'outline'}
                  borderColor={'brand.500'}
                  color={'brand.500'}
                  _hover={{
                    bg: 'brand.50',
                  }}
                >
                  Learn How It Works
                </Button>
              </Stack>
            </MotionBox>
          </Stack>
          
          <MotionBox
            flex={1}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Flex
              justify={'center'}
              align={'center'}
              position={'relative'}
              w={'full'}
            >
              <Box
                position={'relative'}
                height={{ base: '350px', lg: '450px' }}
                rounded={'2xl'}
                boxShadow={'2xl'}
                width={'full'}
                overflow={'hidden'}
              >
                <Image
                  alt={'Students exchanging books on campus'}
                  fit={'cover'}
                  align={'center'}
                  w={'100%'}
                  h={'100%'}
                  src={
                    'https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80'
                  }
                />
                <Box
                  position={'absolute'}
                  bottom={0}
                  left={0}
                  right={0}
                  bg={'brand.500'}
                  p={4}
                  opacity={0.85}
                >
                  <Text color={'white'} fontWeight={'medium'}>
                    Join over 5,000 students already saving up to 70% on textbooks and materials
                  </Text>
                </Box>
              </Box>
            </Flex>
          </MotionBox>
        </Stack>
      </Container>
    </Box>
  );
}

const PlayIcon = createIcon({
  displayName: 'PlayIcon',
  viewBox: '0 0 58 58',
  d:
    'M28.9999 0.562988C13.3196 0.562988 0.562378 13.3202 0.562378 29.0005C0.562378 44.6808 13.3196 57.438 28.9999 57.438C44.6801 57.438 57.4374 44.6808 57.4374 29.0005C57.4374 13.3202 44.6801 0.562988 28.9999 0.562988ZM39.2223 30.272L23.5749 39.7247C23.3506 39.8591 23.0946 39.9314 22.8332 39.9342C22.5717 39.9369 22.3142 39.8701 22.0871 39.7406C21.86 39.611 21.6715 39.4234 21.5408 39.1969C21.4102 38.9705 21.3421 38.7133 21.3436 38.4519V19.5491C21.3421 19.2877 21.4102 19.0305 21.5408 18.8041C21.6715 18.5776 21.86 18.3899 22.0871 18.2604C22.3142 18.1308 22.5717 18.064 22.8332 18.0668C23.0946 18.0696 23.3506 18.1419 23.5749 18.2763L39.2223 27.729C39.4404 27.8619 39.6207 28.0486 39.7458 28.2713C39.8709 28.494 39.9366 28.7451 39.9366 29.0005C39.9366 29.2559 39.8709 29.507 39.7458 29.7297C39.6207 29.9523 39.4404 30.1391 39.2223 30.272Z',
}); 