import { useState, useEffect } from 'react';
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
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useToast,
  VStack,
  HStack,
} from '@chakra-ui/react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function EditProfile() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    university: '',
    major: '',
    year: ''
  });
  
  // Check authentication
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  // Load user data
  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || '',
        email: session.user.email || '',
        bio: session.user.bio || '',
        university: session.user.university || '',
        major: session.user.major || '',
        year: session.user.year || ''
      });
    }
  }, [session]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Mock update process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: 'Profile Updated',
        description: 'Your profile has been successfully updated',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      router.push('/profile');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update profile',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

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
    return null;
  }

  return (
    <>
      <Navbar />
      <Container maxW={'4xl'} py={12}>
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading as="h1" size="xl" mb={2}>
              Edit Profile
            </Heading>
            <Text color="gray.600">
              Update your personal information and preferences
            </Text>
          </Box>

          <Box
            borderWidth="1px"
            borderRadius="lg"
            p={8}
            bg="white"
            shadow="md"
          >
            <VStack spacing={6} align="center" mb={8}>
              <Avatar
                size="2xl"
                name={session.user.name}
              />
              <Button variant="outline" size="sm">
                Change Photo
              </Button>
            </VStack>

            <form onSubmit={handleSubmit}>
              <VStack spacing={6}>
                <HStack spacing={4} w="full">
                  <FormControl isRequired>
                    <FormLabel>Full Name</FormLabel>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                    />
                  </FormControl>
                  
                  <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                    />
                  </FormControl>
                </HStack>

                <FormControl>
                  <FormLabel>Bio</FormLabel>
                  <Textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    placeholder="Tell us about yourself"
                    rows={4}
                  />
                </FormControl>

                <HStack spacing={4} w="full">
                  <FormControl>
                    <FormLabel>University</FormLabel>
                    <Input
                      name="university"
                      value={formData.university}
                      onChange={handleInputChange}
                      placeholder="Your university"
                    />
                  </FormControl>
                  
                  <FormControl>
                    <FormLabel>Major</FormLabel>
                    <Input
                      name="major"
                      value={formData.major}
                      onChange={handleInputChange}
                      placeholder="Your major"
                    />
                  </FormControl>
                </HStack>

                <FormControl>
                  <FormLabel>Academic Year</FormLabel>
                  <Input
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    placeholder="e.g., Senior, Junior, etc."
                  />
                </FormControl>

                <Divider />

                <HStack spacing={4} justify="end" w="full">
                  <Button
                    variant="ghost"
                    onClick={() => router.push('/profile')}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    colorScheme="blue"
                    isLoading={isLoading}
                    loadingText="Saving..."
                  >
                    Save Changes
                  </Button>
                </HStack>
              </VStack>
            </form>
          </Box>
        </VStack>
      </Container>
      <Footer />
    </>
  );
} 