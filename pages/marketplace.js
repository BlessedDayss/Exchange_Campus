import { useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Grid,
  GridItem,
  VStack,
  HStack,
  Button,
  Input,
  Select,
  Badge,
  Avatar,
  Icon,
  InputGroup,
  InputLeftElement,
  Flex,
  Divider,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiSearch, FiStar, FiDownload, FiHeart, FiFilter, FiDollarSign, FiEye, FiShoppingCart } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import AboutUs from '../components/AboutUs';

const materialsData = [
  {
    id: 1,
    title: 'Advanced Calculus Solutions Manual',
    description: 'Complete solutions for all chapters with detailed explanations and step-by-step solving methods.',
    category: 'Mathematics',
    price: 29.99,
    originalPrice: 45.00,
    seller: {
      name: 'Sarah Johnson',
      rating: 4.8,
      avatar: 'SJ',
      verified: true,
      totalSales: 156
    },
    downloadCount: 324,
    rating: 4.7,
    reviewCount: 89,
    uploadDate: '2024-11-10',
    fileSize: '15.2 MB',
    pages: 580,
    format: 'PDF',
    condition: 'Excellent',
    tags: ['calculus', 'solutions', 'mathematics', 'university'],
    preview: true,
    bestseller: true
  },
  {
    id: 2,
    title: 'Organic Chemistry Lab Manual 2024',
    description: 'Updated lab procedures, safety protocols, and experimental data sheets for organic chemistry courses.',
    category: 'Chemistry',
    price: 24.99,
    originalPrice: 35.00,
    seller: {
      name: 'Dr. Michael Chen',
      rating: 4.9,
      avatar: 'MC',
      verified: true,
      totalSales: 203
    },
    downloadCount: 198,
    rating: 4.8,
    reviewCount: 67,
    uploadDate: '2024-11-08',
    fileSize: '8.7 MB',
    pages: 245,
    format: 'PDF',
    condition: 'New',
    tags: ['chemistry', 'lab', 'organic', 'experiments'],
    preview: true,
    bestseller: false
  },
  {
    id: 3,
    title: 'Physics Problem Sets with Solutions',
    description: 'Comprehensive physics problems covering mechanics, thermodynamics, and electromagnetism.',
    category: 'Physics',
    price: 19.99,
    originalPrice: 28.00,
    seller: {
      name: 'Emma Davis',
      rating: 4.6,
      avatar: 'ED',
      verified: false,
      totalSales: 89
    },
    downloadCount: 156,
    rating: 4.5,
    reviewCount: 43,
    uploadDate: '2024-11-05',
    fileSize: '12.4 MB',
    pages: 320,
    format: 'PDF',
    condition: 'Good',
    tags: ['physics', 'problems', 'mechanics', 'solutions'],
    preview: false,
    bestseller: false
  },
  {
    id: 4,
    title: 'Computer Science Data Structures Guide',
    description: 'Complete guide to data structures and algorithms with coding examples in Python and Java.',
    category: 'Computer Science',
    price: 34.99,
    originalPrice: 49.99,
    seller: {
      name: 'Alex Rodriguez',
      rating: 4.7,
      avatar: 'AR',
      verified: true,
      totalSales: 127
    },
    downloadCount: 267,
    rating: 4.6,
    reviewCount: 95,
    uploadDate: '2024-11-12',
    fileSize: '22.1 MB',
    pages: 425,
    format: 'PDF',
    condition: 'Excellent',
    tags: ['computer science', 'algorithms', 'programming', 'data structures'],
    preview: true,
    bestseller: true
  },
  {
    id: 5,
    title: 'Biology Cell Structure Atlas',
    description: 'High-resolution microscopy images and detailed diagrams of cellular components.',
    category: 'Biology',
    price: 27.99,
    originalPrice: 40.00,
    seller: {
      name: 'Dr. Lisa Park',
      rating: 4.9,
      avatar: 'LP',
      verified: true,
      totalSales: 178
    },
    downloadCount: 145,
    rating: 4.8,
    reviewCount: 52,
    uploadDate: '2024-11-07',
    fileSize: '18.6 MB',
    pages: 195,
    format: 'PDF',
    condition: 'New',
    tags: ['biology', 'cells', 'microscopy', 'atlas'],
    preview: true,
    bestseller: false
  },
  {
    id: 6,
    title: 'Statistics and Probability Handbook',
    description: 'Essential formulas, distributions, and statistical methods for data analysis.',
    category: 'Mathematics',
    price: 22.99,
    originalPrice: 32.00,
    seller: {
      name: 'James Wilson',
      rating: 4.5,
      avatar: 'JW',
      verified: false,
      totalSales: 74
    },
    downloadCount: 89,
    rating: 4.4,
    reviewCount: 29,
    uploadDate: '2024-11-03',
    fileSize: '9.3 MB',
    pages: 180,
    format: 'PDF',
    condition: 'Good',
    tags: ['statistics', 'probability', 'data analysis', 'mathematics'],
    preview: false,
    bestseller: false
  }
];

const MaterialCard = ({ material }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const discountPercent = Math.round(((material.originalPrice - material.price) / material.originalPrice) * 100);

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={6}
      bg="white"
      shadow="sm"
      _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
      transition="all 0.3s"
      position="relative"
    >
      {material.bestseller && (
        <Badge
          position="absolute"
          top={3}
          left={3}
          colorScheme="orange"
          variant="solid"
          fontSize="xs"
        >
          BESTSELLER
        </Badge>
      )}
      
      <VStack align="stretch" spacing={4}>
        {/* Header with title and wishlist */}
        <HStack justify="space-between" align="start">
          <VStack align="start" spacing={1} flex={1}>
            <Text fontWeight="bold" fontSize="lg" noOfLines={2}>
              {material.title}
            </Text>
            <Badge colorScheme="blue" size="sm">
              {material.category}
            </Badge>
          </VStack>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsWishlisted(!isWishlisted)}
            color={isWishlisted ? "red.500" : "gray.400"}
          >
            <Icon as={FiHeart} fill={isWishlisted ? "currentColor" : "none"} />
          </Button>
        </HStack>

        {/* Description */}
        <Text fontSize="sm" color="gray.600" noOfLines={3}>
          {material.description}
        </Text>

        {/* Price section */}
        <HStack justify="space-between" align="center">
          <VStack align="start" spacing={0}>
            <HStack>
              <Text fontSize="2xl" fontWeight="bold" color="green.600">
                ${material.price}
              </Text>
              {material.originalPrice > material.price && (
                <Text
                  fontSize="sm"
                  color="gray.500"
                  textDecoration="line-through"
                >
                  ${material.originalPrice}
                </Text>
              )}
            </HStack>
            {discountPercent > 0 && (
              <Badge colorScheme="red" size="sm">
                {discountPercent}% OFF
              </Badge>
            )}
          </VStack>
        </HStack>

        {/* Seller info */}
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
                {material.seller.rating} ({material.seller.totalSales} sales)
              </Text>
            </HStack>
          </VStack>
        </HStack>

        {/* Stats */}
        <HStack justify="space-between" fontSize="xs" color="gray.500">
          <HStack>
            <Icon as={FiDownload} />
            <Text>{material.downloadCount} downloads</Text>
          </HStack>
          <HStack>
            <Icon as={FiStar} />
            <Text>{material.rating} ({material.reviewCount})</Text>
          </HStack>
          <HStack>
            <Icon as={FiEye} />
            <Text>{material.pages} pages</Text>
          </HStack>
        </HStack>

        {/* Action buttons */}
        <VStack spacing={2}>
          <Button
            colorScheme="blue"
            size="md"
            w="full"
            leftIcon={<Icon as={FiShoppingCart} />}
          >
            Add to Cart - ${material.price}
          </Button>
          {material.preview && (
            <Button variant="outline" size="sm" w="full">
              Preview Sample
            </Button>
          )}
        </VStack>
      </VStack>
    </Box>
  );
};

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const categories = ['All', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];
  const priceRanges = ['All Prices', 'Under $20', '$20-$30', '$30-$40', 'Over $40'];
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'downloads', label: 'Most Downloaded' }
  ];

  // Filter materials
  const filteredMaterials = materialsData.filter(material => {
    // Search filter
    const matchesSearch = !searchTerm || 
      material.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      material.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Category filter
    const matchesCategory = !selectedCategory || 
      selectedCategory === '' || 
      selectedCategory === 'All' || 
      material.category === selectedCategory;
    
    // Price filter
    let matchesPrice = true;
    if (priceRange && priceRange !== '' && priceRange !== 'All Prices') {
      if (priceRange === 'Under $20') {
        matchesPrice = material.price < 20;
      } else if (priceRange === '$20-$30') {
        matchesPrice = material.price >= 20 && material.price <= 30;
      } else if (priceRange === '$30-$40') {
        matchesPrice = material.price >= 30 && material.price <= 40;
      } else if (priceRange === 'Over $40') {
        matchesPrice = material.price > 40;
      }
    }

    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Sort filtered materials
  const sortedMaterials = [...filteredMaterials].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'downloads':
        return b.downloadCount - a.downloadCount;
      default:
        return 0;
    }
  });

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPriceRange('');
    setSortBy('newest');
  };

  return (
    <>
      <Navbar />
      <Container maxW="7xl" py={8}>
        <VStack spacing={8} align="stretch">
          {/* Header */}
          <Box textAlign="center">
            <Heading as="h1" size="2xl" mb={4}>
              Study Materials Marketplace
            </Heading>
            <Text fontSize="lg" color="gray.600">
              Browse and purchase high-quality academic materials from verified sellers
            </Text>
          </Box>

          {/* Search and Filters */}
          <Box
            p={6}
            borderWidth="1px"
            borderRadius="lg"
            bg="gray.50"
          >
            <VStack spacing={4}>
              <InputGroup size="lg">
                <InputLeftElement>
                  <Icon as={FiSearch} color="gray.400" />
                </InputLeftElement>
                <Input
                  placeholder="Search materials, subjects, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  bg="white"
                />
              </InputGroup>

              <Grid templateColumns={{ base: '1fr', md: 'repeat(4, 1fr)' }} gap={4} w="full">
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  bg="white"
                  placeholder="All Categories"
                >
                  {categories.map(category => (
                    <option key={category} value={category === 'All' ? '' : category}>
                      {category}
                    </option>
                  ))}
                </Select>

                <Select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  bg="white"
                  placeholder="All Prices"
                >
                  {priceRanges.map(range => (
                    <option key={range} value={range === 'All Prices' ? '' : range}>
                      {range}
                    </option>
                  ))}
                </Select>

                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  bg="white"
                >
                  {sortOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Select>

                <Button 
                  leftIcon={<Icon as={FiFilter} />} 
                  variant="outline"
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              </Grid>
            </VStack>
          </Box>

          {/* Results summary */}
          <HStack justify="space-between">
            <Text color="gray.600">
              {sortedMaterials.length} materials found
              {searchTerm && (
                <Text as="span" fontWeight="bold"> for "{searchTerm}"</Text>
              )}
            </Text>
            <HStack>
              <Text fontSize="sm" color="gray.500">Sort by:</Text>
              <Select size="sm" value={sortBy} onChange={(e) => setSortBy(e.target.value)} w="auto">
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </Select>
            </HStack>
          </HStack>

          {/* Active filters display */}
          {(selectedCategory || priceRange || searchTerm) && (
            <HStack spacing={2} flexWrap="wrap">
              <Text fontSize="sm" color="gray.500">Active filters:</Text>
              {selectedCategory && (
                <Badge
                  colorScheme="blue"
                  variant="solid"
                  borderRadius="full"
                  px={3}
                  py={1}
                  cursor="pointer"
                  onClick={() => setSelectedCategory('')}
                >
                  {selectedCategory} ✕
                </Badge>
              )}
              {priceRange && (
                <Badge
                  colorScheme="green"
                  variant="solid"
                  borderRadius="full"
                  px={3}
                  py={1}
                  cursor="pointer"
                  onClick={() => setPriceRange('')}
                >
                  {priceRange} ✕
                </Badge>
              )}
              {searchTerm && (
                <Badge
                  colorScheme="purple"
                  variant="solid"
                  borderRadius="full"
                  px={3}
                  py={1}
                  cursor="pointer"
                  onClick={() => setSearchTerm('')}
                >
                  "{searchTerm}" ✕
                </Badge>
              )}
            </HStack>
          )}

          {/* Materials Grid */}
          <Grid
            templateColumns={{
              base: '1fr',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(3, 1fr)'
            }}
            gap={6}
          >
            {sortedMaterials.map((material) => (
              <MaterialCard key={material.id} material={material} />
            ))}
          </Grid>

          {sortedMaterials.length === 0 && (
            <Box textAlign="center" py={12}>
              <Text fontSize="lg" color="gray.500" mb={4}>
                No materials found matching your criteria
              </Text>
              <VStack spacing={2}>
                <Text fontSize="sm" color="gray.400">
                  Try adjusting your search terms or filters
                </Text>
                <Button onClick={clearFilters} colorScheme="blue" variant="outline">
                  Clear All Filters
                </Button>
              </VStack>
            </Box>
          )}
        </VStack>
      </Container>
      
      {/* Additional Information Sections */}
      <Features />
      <HowItWorks />
      <AboutUs />
      
      <Footer />
    </>
  );
} 