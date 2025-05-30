import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Textarea,
  Select,
  FormErrorMessage,
  useToast,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  InputGroup,
  InputLeftElement,
  Spinner,
  Center,
} from '@chakra-ui/react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

// Mock listings for demo
const mockListings = [
  {
    id: 1,
    title: 'Economics Textbook, 3rd Edition',
    description: 'Great condition economics textbook with all pages intact. Perfect for introductory economics courses.',
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
    description: 'Comprehensive notes covering calculus, linear algebra, and differential equations. Very organized and easy to follow.',
    price: 20,
    condition: 'new',
    university: 'MIT',
    course: 'Mathematics 201',
    image: 'https://images.unsplash.com/photo-1512977851705-67ee4bf294f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
    createdAt: '2023-06-20'
  }
];

export default function EditListing() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = router.query;
  const toast = useToast();

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    condition: '',
    course: '',
    imageUrl: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch listing data when the component mounts
  useEffect(() => {
    if (!id) return;

    const fetchListing = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        // For demo purposes, we'll use mock data
        const listingId = parseInt(id as string);
        const listing = mockListings.find(l => l.id === listingId);

        if (listing) {
          setFormData({
            title: listing.title,
            description: listing.description || '',
            price: listing.price,
            condition: listing.condition,
            course: listing.course,
            imageUrl: listing.image || '',
          });
        } else {
          // Listing not found
          toast({
            title: 'Listing not found',
            description: 'The requested listing could not be found',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
          router.push('/dashboard');
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load listing data',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchListing();
  }, [id, router, toast]);

  // Redirect unauthenticated users
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin?callbackUrl=/dashboard');
    }
  }, [status, router]);

  if (status === 'loading' || isLoading) {
    return (
      <>
        <Navbar />
        <Center minH="60vh">
          <Spinner size="xl" color="brand.500" />
        </Center>
        <Footer />
      </>
    );
  }

  if (!session) {
    return null;
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleNumberInputChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (formData.price <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }

    if (!formData.condition) {
      newErrors.condition = 'Condition is required';
    }

    if (!formData.course.trim()) {
      newErrors.course = 'Course is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // In a real application, this would be an API call to update the listing
      // For now, we'll simulate a successful update
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: 'Listing updated',
        description: 'Your listing has been successfully updated',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      router.push('/dashboard');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error updating your listing',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <Container maxW="container.md" py={8}>
        <Box
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p={8}
          boxShadow="lg"
          bg="white"
        >
          <Stack spacing={6}>
            <Heading size="lg">Edit Listing</Heading>

            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl isRequired isInvalid={!!errors.title}>
                  <FormLabel>Title</FormLabel>
                  <Input
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="E.g., Statistics Textbook, 5th Edition"
                  />
                  <FormErrorMessage>{errors.title}</FormErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.description}>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your item in detail"
                    rows={4}
                  />
                  <FormErrorMessage>{errors.description}</FormErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.price}>
                  <FormLabel>Price ($)</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      fontSize="1.2em"
                    >
                      $
                    </InputLeftElement>
                    <NumberInput
                      min={0}
                      value={formData.price}
                      onChange={(value) => handleNumberInputChange('price', value)}
                      width="full"
                    >
                      <NumberInputField paddingLeft="2rem" />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </InputGroup>
                  <FormErrorMessage>{errors.price}</FormErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.condition}>
                  <FormLabel>Condition</FormLabel>
                  <Select
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    placeholder="Select condition"
                  >
                    <option value="new">New</option>
                    <option value="like-new">Like New</option>
                    <option value="good">Good Condition</option>
                    <option value="acceptable">Acceptable</option>
                  </Select>
                  <FormErrorMessage>{errors.condition}</FormErrorMessage>
                </FormControl>

                <FormControl isRequired isInvalid={!!errors.course}>
                  <FormLabel>Course</FormLabel>
                  <Input
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    placeholder="E.g., Economics 101"
                  />
                  <FormErrorMessage>{errors.course}</FormErrorMessage>
                </FormControl>

                <FormControl>
                  <FormLabel>Image URL (optional)</FormLabel>
                  <Input
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    placeholder="Enter an image URL"
                  />
                </FormControl>

                <Stack direction="row" spacing={4} pt={4}>
                  <Button
                    colorScheme="brand"
                    isLoading={isSubmitting}
                    type="submit"
                    size="lg"
                  >
                    Update Listing
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => router.push('/dashboard')}
                    size="lg"
                  >
                    Cancel
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Stack>
        </Box>
      </Container>
      <Footer />
    </>
  );
} 