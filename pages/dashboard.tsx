import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
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
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Image,
  Divider,
  Badge,
  useColorModeValue,
  Icon,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { AddIcon, ChatIcon, StarIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { FaUniversity, FaBookOpen } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Mock listing data
const initialMockListings = [
  {
    id: 1,
    title: 'Economics Textbook, 3rd Edition',
    price: 45,
    condition: 'good',
    university: 'Stanford University',
    course: 'Economics 101',
    image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80',
    createdAt: '2023-05-15'
  },
  {
    id: 2,
    title: 'Advanced Mathematics Notes',
    price: 20,
    condition: 'new',
    university: 'MIT',
    course: 'Mathematics 201',
    image: 'https://images.unsplash.com/photo-1512977851705-67ee4bf294f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    createdAt: '2023-06-20'
  }
];

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [listings, setListings] = useState(initialMockListings);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [listingToDelete, setListingToDelete] = useState<number | null>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const toast = useToast();
  
  // Redirect unauthenticated users
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/dashboard');
    }
  }, [status, router]);
  
  if (status === 'loading') {
    return <Text p={8} textAlign="center">Loading...</Text>;
  }
  
  if (!session) {
    return null;
  }
  
  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'new': return 'green';
      case 'like-new': return 'teal';
      case 'good': return 'blue';
      case 'acceptable': return 'orange';
      default: return 'gray';
    }
  };
  
  const getConditionLabel = (condition: string) => {
    switch (condition) {
      case 'new': return 'New';
      case 'like-new': return 'Like New';
      case 'good': return 'Good Condition';
      case 'acceptable': return 'Acceptable';
      default: return condition;
    }
  };

  const handleEditListing = (id: number) => {
    // In a real app, this would navigate to an edit page with the listing ID
    toast({
      title: 'Edit functionality',
      description: `Editing listing #${id}`,
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
    router.push(`/listing/edit/${id}`);
  };

  const handleDeleteClick = (id: number) => {
    setListingToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (listingToDelete) {
      // Remove the listing from the state
      setListings(listings.filter(listing => listing.id !== listingToDelete));
      
      // Close the dialog
      setIsDeleteDialogOpen(false);
      
      // Show success message
      toast({
        title: 'Listing deleted',
        description: 'The listing has been successfully removed',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };
  
  return (
    <>
      <Navbar />
      <Container maxW="container.xl" py={8}>
        <Stack spacing={8}>
          <Flex justify="space-between" align="center" wrap="wrap">
            <Heading size="lg">Dashboard</Heading>
            <Button
              leftIcon={<AddIcon />}
              colorScheme="brand"
              size="md"
              onClick={() => router.push('/listing/create')}
            >
              Add Listing
            </Button>
          </Flex>
          
          <Tabs 
            variant="enclosed" 
            colorScheme="brand"
            index={activeTab}
            onChange={setActiveTab}
          >
            <TabList>
              <Tab>My Listings</Tab>
              <Tab>Messages</Tab>
              <Tab>Favorites</Tab>
              <Tab>History</Tab>
            </TabList>
            
            <TabPanels>
              <TabPanel>
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  {listings.map((listing) => (
                    <Card 
                      key={listing.id} 
                      overflow="hidden"
                      boxShadow="md"
                      transition="transform 0.3s"
                      _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
                    >
                      <CardHeader p={0}>
                        <Image
                          src={listing.image}
                          alt={listing.title}
                          h="200px"
                          w="100%"
                          objectFit="cover"
                        />
                      </CardHeader>
                      <CardBody py={4}>
                        <Stack spacing={2}>
                          <Heading size="md" noOfLines={2}>{listing.title}</Heading>
                          <Text fontSize="xl" fontWeight="bold" color="brand.500">
                            ${listing.price}
                          </Text>
                          <Badge 
                            alignSelf="start" 
                            colorScheme={getConditionColor(listing.condition)}
                          >
                            {getConditionLabel(listing.condition)}
                          </Badge>
                          <Flex align="center" color="gray.600">
                            <Icon as={FaUniversity} mr={2} />
                            <Text fontSize="sm" noOfLines={1}>{listing.university}</Text>
                          </Flex>
                          <Flex align="center" color="gray.600">
                            <Icon as={FaBookOpen} mr={2} />
                            <Text fontSize="sm" noOfLines={1}>{listing.course}</Text>
                          </Flex>
                        </Stack>
                      </CardBody>
                      <Divider />
                      <CardFooter py={3} justify="space-between">
                        <Text fontSize="sm" color="gray.500">
                          Published: {listing.createdAt}
                        </Text>
                        <Stack direction="row" spacing={2}>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            colorScheme="brand"
                            leftIcon={<EditIcon />}
                            onClick={() => handleEditListing(listing.id)}
                          >
                            Edit
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            colorScheme="red"
                            leftIcon={<DeleteIcon />}
                            onClick={() => handleDeleteClick(listing.id)}
                          >
                            Delete
                          </Button>
                        </Stack>
                      </CardFooter>
                    </Card>
                  ))}
                </SimpleGrid>
                
                {listings.length === 0 && (
                  <Flex 
                    direction="column" 
                    align="center" 
                    justify="center" 
                    bg={useColorModeValue('white', 'gray.800')}
                    rounded="lg"
                    boxShadow="md"
                    p={10}
                    m={4}
                  >
                    <Text mb={4} fontSize="lg" color="gray.500">
                      You don't have any listings yet
                    </Text>
                    <Button 
                      leftIcon={<AddIcon />} 
                      colorScheme="brand"
                      onClick={() => router.push('/listing/create')}
                    >
                      Create Your First Listing
                    </Button>
                  </Flex>
                )}
              </TabPanel>
              
              <TabPanel>
                <Flex 
                  direction="column" 
                  align="center" 
                  justify="center" 
                  bg={useColorModeValue('white', 'gray.800')}
                  rounded="lg"
                  boxShadow="md"
                  p={10}
                  m={4}
                >
                  <Icon as={ChatIcon} w={12} h={12} color="gray.400" mb={4} />
                  <Text mb={4} fontSize="lg" color="gray.500">
                    You don't have any messages yet
                  </Text>
                </Flex>
              </TabPanel>
              
              <TabPanel>
                <Flex 
                  direction="column" 
                  align="center" 
                  justify="center" 
                  bg={useColorModeValue('white', 'gray.800')}
                  rounded="lg"
                  boxShadow="md"
                  p={10}
                  m={4}
                >
                  <Icon as={StarIcon} w={12} h={12} color="gray.400" mb={4} />
                  <Text mb={4} fontSize="lg" color="gray.500">
                    You don't have any favorite listings yet
                  </Text>
                </Flex>
              </TabPanel>
              
              <TabPanel>
                <Flex 
                  direction="column" 
                  align="center" 
                  justify="center" 
                  bg={useColorModeValue('white', 'gray.800')}
                  rounded="lg"
                  boxShadow="md"
                  p={10}
                  m={4}
                >
                  <Text mb={4} fontSize="lg" color="gray.500">
                    Your activity history will appear here
                  </Text>
                </Flex>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Stack>
      </Container>
      
      <AlertDialog
        isOpen={isDeleteDialogOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Listing
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete this listing? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      
      <Footer />
    </>
  );
} 