import { useState } from 'react';
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
  Text,
  useToast,
  Link,
  Flex,
} from '@chakra-ui/react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Check if passwords match
      if (password !== confirmPassword) {
        toast({
          title: 'Error',
          description: 'Passwords do not match',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        setIsLoading(false);
        return;
      }

      // Send data to server
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      // Registration successful
      toast({
        title: 'Account created',
        description: 'You have successfully registered',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Redirect to signin page
      router.push('/auth/signin');
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message || 'Registration failed',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Container maxW="lg" py={{ base: 12, md: 16 }}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading
              fontSize={'4xl'}
              bgGradient="linear(to-r, brand.500, accent.500)"
              bgClip="text"
            >
              Sign up for an account
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to start your journey with Exchange Campus ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={'white'}
            boxShadow={'lg'}
            p={8}
          >
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
                <FormControl id="name" isRequired>
                  <FormLabel>Full Name</FormLabel>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
                <FormControl id="confirmPassword" isRequired>
                  <FormLabel>Confirm Password</FormLabel>
                  <Input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </FormControl>
                <Stack spacing={10}>
                  <Button
                    type="submit"
                    bg={'brand.500'}
                    color={'white'}
                    _hover={{
                      bg: 'brand.600',
                    }}
                    isLoading={isLoading}
                  >
                    Sign up
                  </Button>
                </Stack>
                <Flex justify="center" mt={4}>
                  <Text mr={1}>Already have an account?</Text>
                  <Link
                    color={'brand.500'}
                    href="/auth/signin"
                  >
                    Sign in
                  </Link>
                </Flex>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Container>
      <Footer />
    </>
  );
} 