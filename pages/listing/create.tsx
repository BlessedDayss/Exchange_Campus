import { useState } from 'react';
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
} from '@chakra-ui/react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function CreateListing() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const toast = useToast();

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

  // Redirect unauthenticated users
  if (status === 'unauthenticated') {
    router.push('/auth/signin?callbackUrl=/listing/create');
    return null;
  }

  if (status === 'loading') {
    return <Text p={8} textAlign="center">Loading...</Text>;
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
      // In a real application, this would be an API call to save the listing
      // For now, we'll simulate a successful save
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: 'Listing created',
        description: 'Your listing has been successfully created',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      router.push('/dashboard');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error creating your listing',
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
            <Heading size="lg">Create New Listing</Heading>

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
                    Create Listing
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