import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Button,
  Stack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  useColorModeValue,
  HStack,
  useToast,
} from '@chakra-ui/react';
import { DeleteIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Mock user data
const mockUsers = [
  {
    id: '1',
    name: 'John',
    email: 'john@example.com',
    role: 'user',
    university: 'Stanford University',
    createdAt: '2023-01-15'
  },
  {
    id: '2',
    name: 'Alice',
    email: 'alice@example.com',
    role: 'user',
    university: 'MIT',
    createdAt: '2023-02-20'
  },
  {
    id: '3',
    name: 'Admin',
    email: 'admin@example.com',
    role: 'admin',
    university: 'Harvard',
    createdAt: '2023-01-01'
  }
];

// Mock listing data
const mockListings = [
  {
    id: 1,
    title: 'Economics Textbook, 3rd Edition',
    price: 45,
    seller: 'John',
    status: 'active',
    university: 'Stanford University',
    createdAt: '2023-05-15'
  },
  {
    id: 2,
    title: 'Advanced Mathematics Notes',
    price: 20,
    seller: 'Alice',
    status: 'active',
    university: 'MIT',
    createdAt: '2023-06-20'
  }
];

// Mock review data
const mockReviews = [
  {
    id: 1,
    reviewer: 'John',
    recipient: 'Alice',
    content: 'Great seller! Fast delivery',
    rating: 5,
    createdAt: '2023-06-25'
  },
  {
    id: 2,
    reviewer: 'Alice',
    recipient: 'John',
    content: 'Everything was in good condition as described in the listing',
    rating: 4,
    createdAt: '2023-07-01'
  }
];

export default function AdminPanel() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const toast = useToast();
  
  // Redirect non-admins
  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role !== 'admin') {
      toast({
        title: 'Access Denied',
        description: 'You do not have permission to access this page',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      router.push('/');
    } else if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/admin');
    }
  }, [status, session, router, toast]);
  
  if (status === 'loading') {
    return <Text p={8} textAlign="center">Loading...</Text>;
  }
  
  if (!session || session.user.role !== 'admin') {
    return null;
  }
  
  const handleDeleteUser = (userId: string) => {
    toast({
      title: 'User Deleted',
      description: `User with ID ${userId} has been successfully deleted`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };
  
  const handleToggleListingStatus = (listingId: number, newStatus: string) => {
    toast({
      title: 'Listing Status Changed',
      description: `Listing ${listingId} has been ${newStatus === 'active' ? 'activated' : 'deactivated'}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };
  
  const handleDeleteReview = (reviewId: number) => {
    toast({
      title: 'Review Deleted',
      description: `Review with ID ${reviewId} has been successfully deleted`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };
  
  return (
    <>
      <Navbar />
      <Container maxW="container.xl" py={8}>
        <Stack spacing={8}>
          <Box>
            <Heading size="lg" mb={2}>Admin Panel</Heading>
            <Text color="gray.600">
              Welcome, {session.user.name}! You have administrative access.
            </Text>
          </Box>
          
          <Tabs 
            variant="enclosed" 
            colorScheme="brand"
            index={activeTab}
            onChange={setActiveTab}
          >
            <TabList>
              <Tab>Users</Tab>
              <Tab>Listings</Tab>
              <Tab>Reviews</Tab>
              <Tab>Statistics</Tab>
            </TabList>
            
            <TabPanels>
              <TabPanel>
                <Box 
                  overflowX="auto" 
                  bg={useColorModeValue('white', 'gray.800')} 
                  shadow="md" 
                  rounded="lg"
                >
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>ID</Th>
                        <Th>Name</Th>
                        <Th>Email</Th>
                        <Th>University</Th>
                        <Th>Role</Th>
                        <Th>Registration Date</Th>
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {mockUsers.map((user) => (
                        <Tr key={user.id}>
                          <Td>{user.id}</Td>
                          <Td>{user.name}</Td>
                          <Td>{user.email}</Td>
                          <Td>{user.university}</Td>
                          <Td>
                            <Badge 
                              colorScheme={user.role === 'admin' ? 'purple' : 'blue'}
                            >
                              {user.role === 'admin' ? 'Administrator' : 'User'}
                            </Badge>
                          </Td>
                          <Td>{user.createdAt}</Td>
                          <Td>
                            <HStack spacing={2}>
                              <Button
                                size="sm"
                                colorScheme="red"
                                variant="ghost"
                                onClick={() => handleDeleteUser(user.id)}
                                isDisabled={user.id === session.user.id} // Don't allow deleting yourself
                              >
                                <DeleteIcon />
                              </Button>
                            </HStack>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </TabPanel>
              
              <TabPanel>
                <Box 
                  overflowX="auto" 
                  bg={useColorModeValue('white', 'gray.800')} 
                  shadow="md" 
                  rounded="lg"
                >
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>ID</Th>
                        <Th>Title</Th>
                        <Th>Price</Th>
                        <Th>Seller</Th>
                        <Th>University</Th>
                        <Th>Status</Th>
                        <Th>Created At</Th>
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {mockListings.map((listing) => (
                        <Tr key={listing.id}>
                          <Td>{listing.id}</Td>
                          <Td>{listing.title}</Td>
                          <Td>${listing.price}</Td>
                          <Td>{listing.seller}</Td>
                          <Td>{listing.university}</Td>
                          <Td>
                            <Badge 
                              colorScheme={listing.status === 'active' ? 'green' : 'red'}
                            >
                              {listing.status === 'active' ? 'Active' : 'Inactive'}
                            </Badge>
                          </Td>
                          <Td>{listing.createdAt}</Td>
                          <Td>
                            <HStack spacing={2}>
                              <Button
                                size="sm"
                                colorScheme={listing.status === 'active' ? 'red' : 'green'}
                                variant="ghost"
                                onClick={() => handleToggleListingStatus(
                                  listing.id, 
                                  listing.status === 'active' ? 'inactive' : 'active'
                                )}
                              >
                                {listing.status === 'active' ? <CloseIcon /> : <CheckIcon />}
                              </Button>
                            </HStack>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </TabPanel>
              
              <TabPanel>
                <Box 
                  overflowX="auto" 
                  bg={useColorModeValue('white', 'gray.800')} 
                  shadow="md" 
                  rounded="lg"
                >
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>ID</Th>
                        <Th>Reviewer</Th>
                        <Th>Recipient</Th>
                        <Th>Content</Th>
                        <Th>Rating</Th>
                        <Th>Created At</Th>
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {mockReviews.map((review) => (
                        <Tr key={review.id}>
                          <Td>{review.id}</Td>
                          <Td>{review.reviewer}</Td>
                          <Td>{review.recipient}</Td>
                          <Td maxW="300px" isTruncated>{review.content}</Td>
                          <Td>
                            <Badge colorScheme="yellow">
                              {review.rating}/5
                            </Badge>
                          </Td>
                          <Td>{review.createdAt}</Td>
                          <Td>
                            <Button
                              size="sm"
                              colorScheme="red"
                              variant="ghost"
                              onClick={() => handleDeleteReview(review.id)}
                            >
                              <DeleteIcon />
                            </Button>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </TabPanel>
              
              <TabPanel>
                <SimpleGridStats />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Container>
      <Footer />
    </>
  );
}

function SimpleGridStats() {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      shadow="md"
      rounded="lg"
      p={6}
    >
      <Heading size="md" mb={6}>Platform Statistics</Heading>
      
      <Stack spacing={4}>
        <Flex justify="space-between" align="center">
          <Text fontWeight="medium">Total Users:</Text>
          <Text fontWeight="bold">3</Text>
        </Flex>
        
        <Flex justify="space-between" align="center">
          <Text fontWeight="medium">Active Listings:</Text>
          <Text fontWeight="bold">2</Text>
        </Flex>
        
        <Flex justify="space-between" align="center">
          <Text fontWeight="medium">Completed Transactions:</Text>
          <Text fontWeight="bold">1</Text>
        </Flex>
        
        <Flex justify="space-between" align="center">
          <Text fontWeight="medium">Average Review Rating:</Text>
          <Text fontWeight="bold">4.5/5</Text>
        </Flex>
        
        <Flex justify="space-between" align="center">
          <Text fontWeight="medium">Most Active Universities:</Text>
          <Text fontWeight="bold">Stanford, MIT</Text>
        </Flex>
        
        <Flex justify="space-between" align="center">
          <Text fontWeight="medium">Total Reviews:</Text>
          <Text fontWeight="bold">2</Text>
        </Flex>
      </Stack>
    </Box>
  );
} 