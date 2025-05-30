import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Stack,
  Alert,
  AlertIcon,
  VStack,
  Divider,
  Code,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Grid,
  GridItem,
  SimpleGrid,
} from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RecentActivity from '../components/RecentActivity';
import MyMaterials from '../components/MyMaterials';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    // Get users information on page load
    const getUsers = async () => {
      try {
        const response = await fetch('/api/auth/get-users');
        const data = await response.json();
        if (data.users) {
          setUsers(data.users);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    
    if (session) {
      getUsers();
    }
  }, [session]);

  const resetUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/create-test-users');
      const data = await response.json();
      setUserData(data);
      setMessage('Users successfully updated');
      
      // Update list after reset
      if (data.users) {
        setUsers(data.users);
      }
    } catch (error) {
      setMessage('Error updating users');
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <>
        <Navbar />
        <Container maxW="7xl" py={12}>
          <Text>Loading...</Text>
        </Container>
        <Footer />
      </>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <>
      <Navbar />
      <Container maxW="7xl" py={12}>
        <VStack spacing={8} align="stretch">
          <Heading>Admin Dashboard</Heading>

          {/* Dashboard Overview */}
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
            <RecentActivity />
            <MyMaterials />
          </SimpleGrid>

          <Divider />

          {/* User Management Section */}
          <Box p={6} borderWidth="1px" borderRadius="lg" shadow="md">
            <Heading size="md" mb={4}>User Management</Heading>
            <Button 
              colorScheme="blue" 
              onClick={resetUsers} 
              isLoading={loading}
              mb={4}
            >
              Update Test Users
            </Button>

            {message && (
              <Alert status={userData ? 'success' : 'error'} mb={4}>
                <AlertIcon />
                {message}
              </Alert>
            )}

            <Box mt={4}>
              <Heading size="sm" mb={3}>Current Users in System:</Heading>
              <TableContainer borderWidth="1px" borderRadius="md">
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>ID</Th>
                      <Th>Name</Th>
                      <Th>Email</Th>
                      <Th>Password</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {users.map(user => (
                      <Tr key={user.id}>
                        <Td>{user.id}</Td>
                        <Td>{user.name}</Td>
                        <Td>{user.email}</Td>
                        <Td>{user.password || 'hidden'}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>

            {userData && (
              <Box mt={4} p={4} borderWidth="1px" borderRadius="md">
                <Heading size="sm" mb={2}>API Response:</Heading>
                <Code p={2} display="block" whiteSpace="pre" overflowX="auto">
                  {JSON.stringify(userData, null, 2)}
                </Code>
              </Box>
            )}
          </Box>

          <Divider />

          {/* Session Information */}
          <Box p={6} borderWidth="1px" borderRadius="lg" shadow="md">
            <Heading size="md" mb={4}>Session Information</Heading>
            <Box mt={4} p={4} borderWidth="1px" borderRadius="md">
              <Heading size="sm" mb={2}>Current User:</Heading>
              <Code p={2} display="block" whiteSpace="pre" overflowX="auto">
                {JSON.stringify(session, null, 2)}
              </Code>
            </Box>
          </Box>
        </VStack>
      </Container>
      <Footer />
    </>
  );
} 