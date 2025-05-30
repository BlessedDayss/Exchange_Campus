import {
  Box,
  Container,
  Heading,
  Text,
  Grid,
  VStack,
  HStack,
  Button,
  Badge,
  Avatar,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiStar, FiDownload, FiShoppingCart, FiArrowRight } from 'react-icons/fi';

const featuredMaterials = [
  {
    id: 1,
    title: 'Advanced Calculus Solutions Manual',
    description: 'Complete solutions for all chapters with detailed explanations.',
    category: 'Mathematics',
    price: 29.99,
    originalPrice: 45.00,
    seller: {
      name: 'Sarah Johnson',
      rating: 4.8,
      avatar: 'SJ',
      verified: true
    },
    downloadCount: 324,
    rating: 4.7,
    reviewCount: 89,
    bestseller: true
  },
  {
    id: 2,
    title: 'Organic Chemistry Lab Manual 2024',
    description: 'Updated lab procedures and safety protocols.',
    category: 'Chemistry',
    price: 24.99,
    originalPrice: 35.00,
    seller: {
      name: 'Dr. Michael Chen',
      rating: 4.9,
      avatar: 'MC',
      verified: true
    },
    downloadCount: 198,
    rating: 4.8,
    reviewCount: 67,
    bestseller: false
  },
  {
    id: 3,
    title: 'Computer Science Data Structures Guide',
    description: 'Complete guide to data structures and algorithms.',
    category: 'Computer Science',
    price: 34.99,
    originalPrice: 49.99,
    seller: {
      name: 'Alex Rodriguez',
      rating: 4.7,
      avatar: 'AR',
      verified: true
    },
    downloadCount: 267,
    rating: 4.6,
    reviewCount: 95,
    bestseller: true
  }
];

const MaterialPreviewCard = ({ material }) => {
  const discountPercent = Math.round(((material.originalPrice - material.price) / material.originalPrice) * 100);

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={6}
      bg="white"
      shadow="md"
      _hover={{ shadow: 'xl', transform: 'translateY(-4px)' }}
      transition="all 0.3s"
      position="relative"
    >
      {material.bestseller && (
        <Badge
          position="absolute"
          top={3}
          right={3}
          colorScheme="orange"
          variant="solid"
          fontSize="xs"
        >
          BESTSELLER
        </Badge>
      )}
      
      <VStack align="stretch" spacing={4}>
        <VStack align="start" spacing={2}>
          <Badge colorScheme="blue" size="sm">
            {material.category}
          </Badge>
          <Text fontWeight="bold" fontSize="lg" noOfLines={2}>
            {material.title}
          </Text>
          <Text fontSize="sm" color="gray.600" noOfLines={2}>
            {material.description}
          </Text>
        </VStack>

        <HStack justify="space-between" align="center">
          <VStack align="start" spacing={0}>
            <HStack>
              <Text fontSize="xl" fontWeight="bold" color="green.600">
                ${material.price}
              </Text>
              <Text
                fontSize="sm"
                color="gray.500"
                textDecoration="line-through"
              >
                ${material.originalPrice}
              </Text>
            </HStack>
            <Badge colorScheme="red" size="sm">
              {discountPercent}% OFF
            </Badge>
          </VStack>
        </HStack>

        <HStack spacing={3}>
          <Avatar size="sm" name={material.seller.name}>
            {material.seller.avatar}
          </Avatar>
          <VStack align="start" spacing={0} flex={1}>
            <HStack>
              <Text fontSize="sm" fontWeight="medium">
                {material.seller.name}
              </Text>
              {material.seller.verified && (
                <Badge colorScheme="green" size="xs">
                  VERIFIED
                </Badge>
              )}
            </HStack>
            <HStack spacing={1}>
              <Icon as={FiStar} color="yellow.400" w={3} h={3} />
              <Text fontSize="xs" color="gray.600">
                {material.seller.rating} rating
              </Text>
            </HStack>
          </VStack>
        </HStack>

        <HStack justify="space-between" fontSize="xs" color="gray.500">
          <HStack>
            <Icon as={FiDownload} />
            <Text>{material.downloadCount} downloads</Text>
          </HStack>
          <HStack>
            <Icon as={FiStar} />
            <Text>{material.rating} ({material.reviewCount})</Text>
          </HStack>
        </HStack>

        <Button
          as="a"
          href="/marketplace"
          colorScheme="blue"
          size="sm"
          leftIcon={<Icon as={FiShoppingCart} />}
          cursor="pointer"
        >
          View Details - ${material.price}
        </Button>
      </VStack>
    </Box>
  );
};

export default function FeaturedMaterials() {
  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <Box bg={bgColor} py={16} id="featured-materials">
      <Container maxW="7xl">
        <VStack spacing={12}>
          <VStack spacing={4} textAlign="center">
            <Heading as="h2" size="xl">
              Featured Study Materials
            </Heading>
            <Text fontSize="lg" color="gray.600" maxW="2xl">
              Discover high-quality academic materials from verified sellers. 
              Get instant access to textbooks, study guides, and more at great prices.
            </Text>
          </VStack>

          <Grid
            templateColumns={{
              base: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)'
            }}
            gap={8}
            w="full"
          >
            {featuredMaterials.map((material) => (
              <MaterialPreviewCard key={material.id} material={material} />
            ))}
          </Grid>

          <VStack spacing={4}>
            <Text fontSize="lg" color="gray.600" textAlign="center">
              Over 10,000+ study materials available
            </Text>
            <Button
              as="a"
              href="/marketplace"
              size="lg"
              colorScheme="blue"
              rightIcon={<Icon as={FiArrowRight} />}
              cursor="pointer"
            >
              Browse All Materials
            </Button>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
} 