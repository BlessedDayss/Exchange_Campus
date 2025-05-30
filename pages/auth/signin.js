import { useState } from 'react';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
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
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        setError('Invalid email or password');
        toast({
          title: 'Error',
          description: 'Invalid email or password',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else {
        // Successful login, redirect to homepage
        router.push('/');
      }
    } catch (error) {
      setError('Something went wrong');
      toast({
        title: 'Error',
        description: 'Something went wrong',
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
              Sign in to your account
            </Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our platform's features ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={'white'}
            boxShadow={'lg'}
            p={8}
          >
            {error && (
              <Alert status="error" mb={4}>
                <AlertIcon />
                {error}
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <Stack spacing={4}>
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
                    Sign in
                  </Button>
                </Stack>
                <Flex justify="center" mt={4}>
                  <Text mr={1}>Don't have an account?</Text>
                  <Link
                    color={'brand.500'}
                    href="/auth/signup"
                  >
                    Sign up
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