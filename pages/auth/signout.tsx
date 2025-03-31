import { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

export default function SignOut() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/');
    }
  }, [session, router]);

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: '/' });
  };

  return (
    <Container maxW="lg" py={{ base: 12, md: 24 }}>
      <Box
        bg={useColorModeValue('white', 'gray.800')}
        boxShadow="lg"
        rounded="xl"
        p={8}
        textAlign="center"
      >
        <Stack spacing={6}>
          <Heading
            fontSize="2xl"
            color={useColorModeValue('brand.500', 'brand.300')}
          >
            Sign Out
          </Heading>
          <Text fontSize="md" color={useColorModeValue('gray.600', 'gray.400')}>
            Are you sure you want to sign out?
          </Text>

          <Stack spacing={4} direction={{ base: 'column', sm: 'row' }} justify="center">
            <Button
              colorScheme="brand"
              size="lg"
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
} 