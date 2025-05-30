import { useState } from 'react';
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Button,
  Grid,
  GridItem,
  Icon,
  Badge,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  useToast,
} from '@chakra-ui/react';
import { FiFile, FiDownload, FiEdit3, FiTrash2, FiPlus, FiMoreVertical, FiUpload } from 'react-icons/fi';

const materialsData = [
  {
    id: 1,
    title: 'Mathematics Workbook',
    description: 'Complete calculus exercises and solutions',
    category: 'Mathematics',
    uploadDate: '2024-11-15',
    downloads: 45,
    fileSize: '2.4 MB',
    fileType: 'pdf'
  },
  {
    id: 2,
    title: 'Physics Lab Manual',
    description: 'Laboratory experiments and procedures',
    category: 'Physics',
    uploadDate: '2024-11-10',
    downloads: 32,
    fileSize: '5.1 MB',
    fileType: 'pdf'
  },
  {
    id: 3,
    title: 'Chemistry Study Guide',
    description: 'Organic chemistry concepts and reactions',
    category: 'Chemistry',
    uploadDate: '2024-11-08',
    downloads: 28,
    fileSize: '3.7 MB',
    fileType: 'pdf'
  }
];

export default function MyMaterials() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [materials, setMaterials] = useState(materialsData);
  const [newMaterial, setNewMaterial] = useState({
    title: '',
    description: '',
    category: '',
    file: null
  });
  const toast = useToast();

  const handleUpload = async () => {
    if (!newMaterial.title || !newMaterial.category || !newMaterial.file) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Mock upload process
    const newId = materials.length + 1;
    const uploadedMaterial = {
      id: newId,
      title: newMaterial.title,
      description: newMaterial.description,
      category: newMaterial.category,
      uploadDate: new Date().toISOString().split('T')[0],
      downloads: 0,
      fileSize: (newMaterial.file.size / (1024 * 1024)).toFixed(1) + ' MB',
      fileType: newMaterial.file.name.split('.').pop()
    };

    setMaterials([uploadedMaterial, ...materials]);
    setNewMaterial({ title: '', description: '', category: '', file: null });
    onClose();

    toast({
      title: 'Success',
      description: 'Material uploaded successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleDelete = (id) => {
    setMaterials(materials.filter(material => material.id !== id));
    toast({
      title: 'Material deleted',
      description: 'The material has been removed successfully',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Mathematics': 'blue',
      'Physics': 'green',
      'Chemistry': 'purple',
      'Biology': 'orange',
      'Computer Science': 'teal'
    };
    return colors[category] || 'gray';
  };

  return (
    <>
      <Box p={6} borderWidth="1px" borderRadius="lg" shadow="md">
        <HStack justify="space-between" mb={4}>
          <Heading size="md">My Materials</Heading>
          <Button leftIcon={<FiPlus />} colorScheme="blue" onClick={onOpen}>
            Upload Material
          </Button>
        </HStack>

        <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={4}>
          {materials.map((material) => (
            <GridItem key={material.id}>
              <Box p={4} borderWidth="1px" borderRadius="md" _hover={{ shadow: 'md' }} transition="all 0.2s">
                <HStack justify="space-between" mb={2}>
                  <Icon as={FiFile} color="blue.500" />
                  <Menu>
                    <MenuButton as={Button} size="sm" variant="ghost">
                      <FiMoreVertical />
                    </MenuButton>
                    <MenuList>
                      <MenuItem icon={<FiDownload />}>Download</MenuItem>
                      <MenuItem icon={<FiEdit3 />}>Edit</MenuItem>
                      <MenuItem icon={<FiTrash2 />} onClick={() => handleDelete(material.id)}>Delete</MenuItem>
                    </MenuList>
                  </Menu>
                </HStack>

                <VStack align="start" spacing={2}>
                  <Text fontWeight="bold" fontSize="sm" noOfLines={2}>
                    {material.title}
                  </Text>
                  <Text fontSize="xs" color="gray.600" noOfLines={2}>
                    {material.description}
                  </Text>
                  <Badge colorScheme={getCategoryColor(material.category)} size="sm">
                    {material.category}
                  </Badge>
                  <HStack justify="space-between" w="full">
                    <Text fontSize="xs" color="gray.500">{material.fileSize}</Text>
                    <Text fontSize="xs" color="gray.500">{material.downloads} downloads</Text>
                  </HStack>
                  <Text fontSize="xs" color="gray.400">Uploaded: {material.uploadDate}</Text>
                </VStack>
              </Box>
            </GridItem>
          ))}
        </Grid>
      </Box>

      {/* Upload Material Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload New Material</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                  value={newMaterial.title}
                  onChange={(e) => setNewMaterial({...newMaterial, title: e.target.value})}
                  placeholder="Enter material title"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  value={newMaterial.description}
                  onChange={(e) => setNewMaterial({...newMaterial, description: e.target.value})}
                  placeholder="Brief description of the material"
                  rows={3}
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Category</FormLabel>
                <Select
                  value={newMaterial.category}
                  onChange={(e) => setNewMaterial({...newMaterial, category: e.target.value})}
                  placeholder="Select category"
                >
                  <option value="Mathematics">Mathematics</option>
                  <option value="Physics">Physics</option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Biology">Biology</option>
                  <option value="Computer Science">Computer Science</option>
                </Select>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>File</FormLabel>
                <Input
                  type="file"
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                  onChange={(e) => setNewMaterial({...newMaterial, file: e.target.files[0]})}
                  p={1}
                />
                <Text fontSize="xs" color="gray.500" mt={1}>
                  Supported formats: PDF, DOC, DOCX, PPT, PPTX (Max 10MB)
                </Text>
              </FormControl>

              <HStack spacing={3} w="full" justify="end">
                <Button variant="ghost" onClick={onClose}>Cancel</Button>
                <Button colorScheme="blue" leftIcon={<FiUpload />} onClick={handleUpload}>
                  Upload Material
                </Button>
              </HStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
} 