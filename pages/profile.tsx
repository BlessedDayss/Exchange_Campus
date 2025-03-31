import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Button,
  Avatar,
  Stack,
  Badge,
  Divider,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  useColorModeValue,
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // Redirect unauthenticated users
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/profile');
    }
  }, [status, router]);
  
  if (status === 'loading') {
    return <Text p={8} textAlign="center">Loading...</Text>;
  }
  
  if (!session) {
    return null;
  }
  
  return (
    <>
      <Navbar />
      <Container maxW="container.xl" py={8}>
        <Stack spacing={8}>
          <Flex 
            direction={{ base: 'column', md: 'row' }}
            bg={useColorModeValue('white', 'gray.800')}
            boxShadow="lg"
            rounded="lg"
            p={6}
            overflow="hidden"
          >
            <Flex 
              w={{ base: 'full', md: '40%' }}
              h={{ base: 'auto', md: 'auto' }}
              align="center"
              justify="center"
              p={6}
            >
              <Avatar 
                size="2xl"
                name={session.user.name || "User"}
                src={session.user.image || ""}
                bg="brand.500"
                color="white"
              />
            </Flex>
            
            <Stack flex={1} spacing={5} p={6}>
              <Heading fontSize="2xl">{session.user.name}</Heading>
              
              <Stack spacing={3}>
                <Box>
                  <Text fontSize="sm" color="gray.500" fontWeight="500">Email</Text>
                  <Text>{session.user.email}</Text>
                </Box>
                
                <Box>
                  <Text fontSize="sm" color="gray.500" fontWeight="500">University</Text>
                  <Text>{session.user.university || "Not specified"}</Text>
                </Box>
                
                <Box>
                  <Text fontSize="sm" color="gray.500" fontWeight="500">Role</Text>
                  <Badge colorScheme={session.user.role === 'admin' ? 'purple' : 'blue'}>
                    {session.user.role === 'admin' ? 'Administrator' : 'User'}
                  </Badge>
                </Box>
              </Stack>
              
              <Button
                colorScheme="brand"
                alignSelf={{ base: 'center', md: 'start' }}
                width={{ base: 'full', md: 'auto' }}
              >
                Edit Profile
              </Button>
            </Stack>
          </Flex>
          
          <Box py={4}>
            <Heading size="lg" mb={6}>Activity</Heading>
            
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              <Card>
                <CardHeader pb={1}>
                  <Heading size="md">My Listings</Heading>
                </CardHeader>
                <Divider />
                <CardBody>
                  <Text fontSize="3xl" fontWeight="bold" color="brand.500">0</Text>
                  <Text>Active listings</Text>
                </CardBody>
              </Card>
              
              <Card>
                <CardHeader pb={1}>
                  <Heading size="md">Messages</Heading>
                </CardHeader>
                <Divider />
                <CardBody>
                  <Text fontSize="3xl" fontWeight="bold" color="brand.500">0</Text>
                  <Text>Unread messages</Text>
                </CardBody>
              </Card>
              
              <Card>
                <CardHeader pb={1}>
                  <Heading size="md">Reviews</Heading>
                </CardHeader>
                <Divider />
                <CardBody>
                  <Text fontSize="3xl" fontWeight="bold" color="brand.500">0</Text>
                  <Text>Received reviews</Text>
                </CardBody>
              </Card>
            </SimpleGrid>
          </Box>
          
          <Box>
            <Heading size="lg" mb={6}>Recent Activity</Heading>
            <Flex
              direction="column"
              bg={useColorModeValue('white', 'gray.800')}
              boxShadow="lg"
              rounded="lg"
              p={6}
            >
              <Text color="gray.500" textAlign="center">
                Your activity history will be displayed here
              </Text>
            </Flex>
          </Box>
        </Stack>
      </Container>
      <Footer />
    </>
  );
} 