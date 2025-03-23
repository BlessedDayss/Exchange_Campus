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
} from '@chakra-ui/react';
import { FaBookOpen } from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export default function Problem() {
  return (
    <Box id="problem" py={20}>
      <Container maxW={'7xl'}>
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          spacing={{ base: 10, md: 16 }}
          align={'center'}
        >
          <MotionBox
            flex={1}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Stack spacing={6}>
              <Flex
                align={'center'}
                justify={'flex-start'}
                fontWeight={600}
              >
                <Icon as={FaBookOpen} color={'brand.500'} boxSize={6} mr={2} />
                <Text
                  fontSize={'lg'}
                  fontWeight={'bold'}
                  bgGradient="linear(to-r, brand.300, brand.600)"
                  bgClip="text"
                >
                  THE PROBLEM
                </Text>
              </Flex>
              <Heading
                lineHeight={1.2}
                fontWeight={700}
                fontSize={{ base: '2xl', sm: '3xl', lg: '4xl' }}
              >
                What happens to your materials after the semester ends?
              </Heading>
              <Text
                color={useColorModeValue('gray.600', 'gray.400')}
                fontSize={{ base: 'md', lg: 'lg' }}
              >
                Students often buy books and materials that they only need for a semester.
                After that, they're stuck with unused resources—and no easy way to sell or share them.
              </Text>
              <Text
                color={useColorModeValue('gray.600', 'gray.400')}
                fontSize={{ base: 'md', lg: 'lg' }}
              >
                This leads to wasted money, unused resources, and environmental impact from
                producing new materials when perfectly good ones sit unused.
              </Text>
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
                height={{ base: '300px', lg: '400px' }}
                rounded={'xl'}
                boxShadow={'2xl'}
                width={'full'}
                overflow={'hidden'}
                backgroundColor={'gray.100'}
              >
                <Image
                  alt={'Student with too many books'}
                  fit={'cover'}
                  align={'center'}
                  w={'100%'}
                  h={'100%'}
                  src={
                    'https://images.unsplash.com/photo-1519682577862-22b62b24e493?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
                  }
                />
                <Box
                  position={'absolute'}
                  bottom={0}
                  left={0}
                  right={0}
                  height={'30%'}
                  bgGradient={'linear(to-t, blackAlpha.700, transparent)'}
                />
              </Box>
            </Flex>
          </MotionBox>
        </Stack>
      </Container>
    </Box>
  );
} 