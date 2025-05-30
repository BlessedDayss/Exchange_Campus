import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Avatar,
  Flex,
  Divider,
  Button,
  Grid,
  GridItem,
  VStack,
  HStack,
  Badge,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiUpload, FiDownload, FiStar, FiBookOpen, FiTrendingUp } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const StatCard = ({ title, value, icon, color }) => {
  return (
    <Box
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      bg="white"
      shadow="sm"
      _hover={{ shadow: 'md' }}
      transition="all 0.2s"
    >
      <Flex align="center" justify="space-between">
        <Box>
          <Text fontSize="sm" color="gray.500" mb={1}>
            {title}
          </Text>
          <Text fontSize="2xl" fontWeight="bold" color={color}>
            {value}
          </Text>
        </Box>
        <Icon as={icon} w={8} h={8} color={color} />
      </Flex>
    </Box>
  );
};

const ActivityItem = ({ action, time, color }) => {
  return (
    <HStack spacing={3} p={3} borderRadius="md" bg="gray.50">
      <Box w={2} h={2} borderRadius="full" bg={color} />
      <VStack align="start" spacing={0} flex={1}>
        <Text fontSize="sm" fontWeight="medium">
          {action}
        </Text>
        <Text fontSize="xs" color="gray.500">
          {time}
        </Text>
      </VStack>
    </HStack>
  );
};

export default function Profile() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  // Check authentication
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <>
        <Navbar />
        <Container maxW={'7xl'} py={12}>
          <Text>Loading...</Text>
        </Container>
        <Footer />
      </>
    );
  }

  if (!session) {
    return null; // Will be redirected by useEffect
  }

  const recentActivities = [
    { action: 'Downloaded Mathematics Workbook.pdf', time: '2 hours ago', color: 'blue.500' },
    { action: 'Uploaded Physics Lab Report', time: '1 day ago', color: 'green.500' },
    { action: 'Added Chemistry Notes to favorites', time: '2 days ago', color: 'yellow.500' },
    { action: 'Downloaded Biology Textbook.pdf', time: '3 days ago', color: 'blue.500' },
    { action: 'Commented on Statistics Guide', time: '1 week ago', color: 'purple.500' },
  ];

  return (
    <>
      <Navbar />
      <Container maxW={'7xl'} py={12}>
        <Grid templateColumns={{ base: '1fr', lg: '1fr 2fr' }} gap={8}>
          {/* Profile Sidebar */}
          <GridItem>
            <Box
              borderWidth="1px"
              borderRadius="lg"
              p={6}
              bg="white"
              shadow="md"
              position="sticky"
              top="20px"
            >
              <VStack spacing={6}>
                <Avatar
                  size="2xl"
                  name={session.user.name}
                />
                <VStack spacing={2}>
                  <Heading as="h3" size="lg" textAlign="center">
                    {session.user.name}
                  </Heading>
                  <Text color="gray.500" textAlign="center">
                    {session.user.email}
                  </Text>
                  <Badge colorScheme="blue" px={3} py={1} borderRadius="full">
                    Student
                  </Badge>
                </VStack>
                
                <Divider />
                
                <VStack spacing={3} w="full">
                  <Button
                    as="a"
                    href="/profile/edit"
                    colorScheme="blue"
                    variant="outline"
                    size="sm"
                    w="full"
                  >
                    Edit Profile
                  </Button>
                  <Button
                    colorScheme="green"
                    size="sm"
                    w="full"
                    leftIcon={<FiUpload />}
                  >
                    Upload Materials
                  </Button>
                </VStack>
              </VStack>
            </Box>
          </GridItem>

          {/* Main Dashboard */}
          <GridItem>
            <VStack spacing={8} align="stretch">
              <Box>
                <Heading as="h2" size="lg" mb={6}>
                  My Dashboard
                </Heading>
                
                {/* Stats Grid */}
                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(4, 1fr)' }} gap={4} mb={8}>
                  <StatCard
                    title="Materials Uploaded"
                    value="12"
                    icon={FiUpload}
                    color="green.500"
                  />
                  <StatCard
                    title="Downloads"
                    value="256"
                    icon={FiDownload}
                    color="blue.500"
                  />
                  <StatCard
                    title="Favorites"
                    value="18"
                    icon={FiStar}
                    color="yellow.500"
                  />
                  <StatCard
                    title="Total Views"
                    value="1.2k"
                    icon={FiTrendingUp}
                    color="purple.500"
                  />
                </Grid>
              </Box>

              {/* Recent Activity */}
              <Box
                borderWidth="1px"
                borderRadius="lg"
                p={6}
                bg="white"
                shadow="md"
              >
                <Heading as="h3" size="md" mb={4} display="flex" alignItems="center">
                  <Icon as={FiBookOpen} mr={2} />
                  Recent Activity
                </Heading>
                <VStack spacing={3} align="stretch">
                  {recentActivities.map((activity, index) => (
                    <ActivityItem
                      key={index}
                      action={activity.action}
                      time={activity.time}
                      color={activity.color}
                    />
                  ))}
                </VStack>
                <Button variant="ghost" size="sm" w="full" mt={4}>
                  View All Activity
                </Button>
              </Box>

              {/* My Materials */}
              <Box
                borderWidth="1px"
                borderRadius="lg"
                p={6}
                bg="white"
                shadow="md"
              >
                <HStack justify="space-between" mb={4}>
                  <Heading as="h3" size="md">
                    My Materials
                  </Heading>
                  <Button
                    colorScheme="blue"
                    size="sm"
                    leftIcon={<FiUpload />}
                  >
                    Upload New
                  </Button>
                </HStack>
                
                <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={4}>
                  <Box p={4} borderWidth="1px" borderRadius="md" bg="gray.50">
                    <VStack align="start" spacing={2}>
                      <Text fontWeight="medium" fontSize="sm">
                        Mathematics Workbook
                      </Text>
                      <Text fontSize="xs" color="gray.600">
                        Uploaded 1 week ago
                      </Text>
                      <HStack>
                        <Badge size="sm" colorScheme="blue">PDF</Badge>
                        <Text fontSize="xs" color="gray.500">45 downloads</Text>
                      </HStack>
                    </VStack>
                  </Box>
                  
                  <Box p={4} borderWidth="1px" borderRadius="md" bg="gray.50">
                    <VStack align="start" spacing={2}>
                      <Text fontWeight="medium" fontSize="sm">
                        Physics Lab Report
                      </Text>
                      <Text fontSize="xs" color="gray.600">
                        Uploaded 3 days ago
                      </Text>
                      <HStack>
                        <Badge size="sm" colorScheme="green">DOCX</Badge>
                        <Text fontSize="xs" color="gray.500">23 downloads</Text>
                      </HStack>
                    </VStack>
                  </Box>
                </Grid>
                
                <Button variant="ghost" size="sm" w="full" mt={4}>
                  View All Materials
                </Button>
              </Box>
            </VStack>
          </GridItem>
        </Grid>
      </Container>
      <Footer />
    </>
  );
} 