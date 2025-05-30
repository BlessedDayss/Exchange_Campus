import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import Link from 'next/link';

export default function ErrorPage() {
  const router = useRouter();
  const { error } = router.query;

  let errorMessage = 'An unknown error occurred';
  let errorDescription = 'Please try again later or contact support.';

  switch (error) {
    case 'Configuration':
      errorMessage = 'Server configuration error';
      errorDescription = 'There is a problem with the server authentication configuration.';
      break;
    case 'AccessDenied':
      errorMessage = 'Access Denied';
      errorDescription = 'You do not have permission to access this page.';
      break;
    case 'Verification':
      errorMessage = 'Invalid sign-in link';
      errorDescription = 'The link may have expired or has already been used.';
      break;
    case 'CredentialsSignin':
      errorMessage = 'Sign-in error';
      errorDescription = 'Invalid credentials. Please check your email and password.';
      break;
    default:
      if (typeof error === 'string') {
        errorMessage = error;
      }
      break;
  }

  return (
    <Container maxW="lg" py={{ base: 12, md: 24 }}>
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow="lg"
        rounded="xl"
        p={8}
      >
        <Stack spacing={6}>
          <Alert
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
            rounded="md"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              {errorMessage}
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              {errorDescription}
            </AlertDescription>
          </Alert>

          <Stack spacing={4} direction={{ base: 'column', sm: 'row' }} justify="center">
            <Button
              colorScheme="brand"
              size="lg"
              as={Link}
              href="/auth/signin"
            >
              Return to Sign In
            </Button>
            <Button
              variant="outline"
              size="lg"
              as={Link}
              href="/"
            >
              Go to Homepage
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
} 