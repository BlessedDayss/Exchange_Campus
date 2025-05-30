import { useState } from 'react';
import { signIn, getCsrfToken } from 'next-auth/react';
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
  useColorModeValue,
  Alert,
  AlertIcon,
  Link as ChakraLink,
  InputGroup,
  InputRightElement,
  IconButton
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import Link from 'next/link';

interface SignInProps {
  csrfToken?: string;
}

export default function SignIn({ csrfToken }: SignInProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const router = useRouter();
  const { callbackUrl } = router.query;

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
      callbackUrl: callbackUrl as string || '/'
    });

    setIsLoading(false);

    if (result?.error) {
      setError(result.error);
    } else if (result?.url) {
      router.push(result.url);
    }
  };

  return (
    <Container maxW="lg" py={{ base: 12, md: 24 }}>
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow="lg"
        rounded="xl"
        p={8}
      >
        <Stack spacing={8}>
          <Stack align="center">
            <Heading
              fontSize="2xl"
              color={useColorModeValue('brand.500', 'brand.300')}
            >
              Sign in to Exchange Campus
            </Heading>
            <Text fontSize="md" color={useColorModeValue('gray.600', 'gray.400')}>
              Sign in to access the university materials marketplace
            </Text>
          </Stack>

          {error && (
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              {error}
            </Alert>
          )}

          <Box as="form" onSubmit={handleSignIn}>
            <Stack spacing={4}>
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                />
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                      variant="ghost"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Button
                colorScheme="brand"
                size="lg"
                type="submit"
                isLoading={isLoading}
                loadingText="Signing in..."
                w="100%"
                mt={4}
              >
                Sign in
              </Button>
            </Stack>
          </Box>

          <Stack pt={6} direction="row" justify="center">
            <Text align="center">
              Don't have an account?{' '}
              <ChakraLink as={Link} href="/auth/signup" color="brand.500">
                Register
              </ChakraLink>
            </Text>
          </Stack>

          <Box textAlign="center" mt={4}>
            <Text fontSize="sm" color="gray.600">
              Demo users:
            </Text>
            <Stack direction="column" spacing={1} fontSize="sm" mt={2}>
              <Text>
                <strong>John:</strong> john@example.com / password123
              </Text>
              <Text>
                <strong>Alice:</strong> alice@example.com / alice123
              </Text>
              <Text>
                <strong>Admin:</strong> admin@example.com / admin123
              </Text>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
}

export async function getServerSideProps(context: any) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
} 