import {
  Box,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  Circle,
  Icon,
  useColorModeValue,
  Divider,
  SimpleGrid,
  Image,
  Button,
  Badge,
} from '@chakra-ui/react';
import { 
  FaUserPlus, 
  FaClipboardList, 
  FaExchangeAlt, 
  FaUniversity, 
  FaCamera, 
  FaShieldAlt, 
  FaHandshake 
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

export default function HowItWorks() {
  return (
    <Box 
      id="how-it-works" 
      py={20} 
      bg={useColorModeValue('gray.50', 'gray.900')}
      position="relative"
      overflow="hidden"
    >
      {/* Decorative elements */}
      <Box
        position="absolute"
        left="-15%"
        bottom="-5%"
        width="350px"
        height="350px"
        bg="brand.50"
        borderRadius="full"
        filter="blur(90px)"
        opacity="0.4"
        zIndex={0}
      />
      
      <Container maxW={'7xl'} position="relative" zIndex={1}>
        <Stack spacing={{ base: 12, md: 16 }}>
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            textAlign="center"
          >
            <Badge 
              colorScheme="accent" 
              p={2} 
              rounded="full" 
              fontSize="sm" 
              textTransform="uppercase"
              mb={3}
            >
              Simple Process
            </Badge>
            <Heading
              lineHeight={1.2}
              fontWeight={700}
              fontSize={{ base: '2xl', sm: '3xl', lg: '4xl' }}
              mb={4}
            >
              How Exchange Campus Works
            </Heading>
            <Text
              color={useColorModeValue('gray.600', 'gray.400')}
              fontSize={{ base: 'md', lg: 'lg' }}
              maxW="3xl"
              mx="auto"
            >
              Start saving money and helping other students in just three simple steps.
              Our platform makes exchanging university materials safe, easy, and efficient.
            </Text>
          </MotionBox>
          
          {/* Main steps */}
          <Box>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 10, md: 5 }}>
              <ProcessStep 
                number="1" 
                title="Create Your Profile" 
                description="Sign up with your university email for instant verification. Complete your profile with your courses, campus, and study interests."
                icon={FaUserPlus}
                delay={0.1}
              />
              
              <ProcessStep 
                number="2" 
                title="List or Browse Materials" 
                description="Add your unused textbooks, notes, or study guides. Or browse what other students from your university are offering."
                icon={FaClipboardList}
                delay={0.2}
              />
              
              <ProcessStep 
                number="3" 
                title="Connect & Exchange" 
                description="Chat with potential buyers or sellers, negotiate prices, and arrange campus meetups to exchange materials safely."
                icon={FaExchangeAlt}
                delay={0.3}
              />
            </SimpleGrid>
            
            <MotionBox
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              mt={16}
            >
              <Flex
                direction={{ base: 'column', md: 'row' }}
                bg={useColorModeValue('white', 'gray.800')}
                rounded="xl"
                overflow="hidden"
                boxShadow="xl"
              >
                <Image
                  src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80"
                  alt="Students exchanging materials"
                  w={{ base: '100%', md: '40%' }}
                  h={{ base: '200px', md: 'auto' }}
                  objectFit="cover"
                />
                <Box p={{ base: 6, md: 8 }} w={{ base: '100%', md: '60%' }}>
                  <Heading size="lg" mb={4} color="accent.500">
                    Tips for a Successful Exchange
                  </Heading>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                    <ExchangeTip 
                      icon={FaUniversity} 
                      title="Meet on campus" 
                      text="Choose public places like the library or student center"
                    />
                    <ExchangeTip 
                      icon={FaCamera} 
                      title="Verify materials" 
                      text="Check condition and edition before completing the exchange"
                    />
                    <ExchangeTip 
                      icon={FaShieldAlt} 
                      title="Use secure payment" 
                      text="Cash or our secure in-app payment system"
                    />
                    <ExchangeTip 
                      icon={FaHandshake} 
                      title="Be respectful" 
                      text="Communication is key to a smooth transaction"
                    />
                  </SimpleGrid>
                  <Button 
                    mt={6} 
                    size="md" 
                    colorScheme="accent" 
                    variant="outline"
                  >
                    View Safety Guidelines
                  </Button>
                </Box>
              </Flex>
            </MotionBox>
          </Box>
          
          {/* Testimonial */}
          <MotionBox
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Box 
              bg={useColorModeValue('brand.50', 'gray.700')} 
              p={{ base: 6, md: 8 }} 
              rounded="xl"
              borderLeft="4px solid"
              borderColor="brand.500"
            >
              <Text fontSize={{ base: 'lg', md: 'xl' }} fontStyle="italic" mb={4}>
                "Exchange Campus saved me over $300 on textbooks in just one semester. The process was so easy, 
                and I met other students from my major who've given me great study advice too!"
              </Text>
              <Text fontWeight="bold">— Sophia Martinez, Biology Major</Text>
              <Text fontSize="sm" color="gray.500">University of California, Berkeley</Text>
            </Box>
          </MotionBox>
        </Stack>
      </Container>
    </Box>
  );
}

function ProcessStep({ number, title, description, icon, delay }) {
  const bgColor = useColorModeValue('white', 'gray.800');
  
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      h="100%"
    >
      <Stack 
        spacing={4} 
        p={6} 
        rounded="xl" 
        bg={bgColor} 
        boxShadow="lg"
        h="100%"
        _hover={{
          transform: 'translateY(-5px)',
          boxShadow: 'xl',
          transition: 'all 0.3s ease',
        }}
      >
        <Flex position="relative">
          <Circle 
            size="60px" 
            bg="brand.500" 
            color="white" 
            fontWeight="bold"
            fontSize="xl"
          >
            {number}
          </Circle>
          <Circle 
            size="36px" 
            bg="white" 
            color="brand.500" 
            position="absolute"
            top="-5px"
            right="-5px"
            border="2px solid"
            borderColor="brand.500"
          >
            <Icon as={icon} w={4} h={4} />
          </Circle>
        </Flex>
        <Heading fontSize="xl" fontWeight="bold">
          {title}
        </Heading>
        <Text color={useColorModeValue('gray.600', 'gray.400')}>
          {description}
        </Text>
      </Stack>
    </MotionBox>
  );
}

function ExchangeTip({ icon, title, text }) {
  return (
    <Flex align="start">
      <Box 
        p={2}
        bg="accent.50"
        color="accent.500"
        rounded="md"
        mr={3}
        mt={1}
      >
        <Icon as={icon} />
      </Box>
      <Box>
        <Text fontWeight="semibold">{title}</Text>
        <Text fontSize="sm" color="gray.600">{text}</Text>
      </Box>
    </Flex>
  );
} 