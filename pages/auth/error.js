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
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function ErrorPage() {
  const router = useRouter();
  const { error } = router.query;

  const getErrorMessage = (errorType) => {
    switch (errorType) {
      case 'Configuration':
        return 'Server configuration error. Please contact administrator.';
      case 'AccessDenied':
        return 'Access denied. You do not have permission to access this page.';
      case 'Verification':
        return 'Email verification link has expired or was already used.';
      case 'CredentialsSignin':
        return 'Invalid email or password. Please check your credentials.';
      default:
        return 'An authentication error occurred. Please try again later.';
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
              bgGradient="linear(to-r, red.500, orange.500)"
              bgClip="text"
            >
              Authentication Error
            </Heading>
          </Stack>

          <Alert
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
            borderRadius="md"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              An Error Occurred
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              {getErrorMessage(error)}
            </AlertDescription>
          </Alert>

          <Box display="flex" justifyContent="center">
            <Button
              onClick={() => router.push('/auth/signin')}
              colorScheme="blue"
              size="md"
            >
              Return to Sign In
            </Button>
          </Box>
        </Stack>
      </Container>
      <Footer />
    </>
  );
} 