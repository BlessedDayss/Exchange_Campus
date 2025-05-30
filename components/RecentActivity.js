import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Avatar,
  Badge,
  Divider,
  Icon,
} from '@chakra-ui/react';
import { FiUser, FiUpload, FiDownload, FiEdit3, FiTrash2, FiStar, FiMessageCircle } from 'react-icons/fi';

const generateRandomActivities = () => {
  const users = [
    'Admin', 'John Smith', 'Emily Johnson', 'Michael Brown', 'Sarah Davis', 
    'David Wilson', 'Lisa Anderson', 'James Taylor', 'Maria Garcia', 'Robert Lee'
  ];
  
  const materials = [
    'Mathematics Workbook.pdf', 'Physics Notes.pdf', 'Chemistry Lab Guide.pdf',
    'Biology Textbook.pdf', 'Computer Science Handbook.pdf', 'History Essays.docx',
    'Literature Analysis.pdf', 'Economics Study Guide.pdf', 'Philosophy Papers.pdf',
    'Statistics Formulas.pdf', 'Calculus Solutions.pdf', 'Organic Chemistry Notes.pdf'
  ];

  const actionTypes = [
    {
      type: 'upload',
      action: 'Uploaded new material',
      icon: FiUpload,
      color: 'green'
    },
    {
      type: 'download',
      action: 'Downloaded material',
      icon: FiDownload,
      color: 'blue'
    },
    {
      type: 'edit',
      action: 'Updated material description',
      icon: FiEdit3,
      color: 'orange'
    },
    {
      type: 'user',
      action: 'Created new user account',
      icon: FiUser,
      color: 'purple'
    },
    {
      type: 'delete',
      action: 'Removed outdated material',
      icon: FiTrash2,
      color: 'red'
    },
    {
      type: 'favorite',
      action: 'Added to favorites',
      icon: FiStar,
      color: 'yellow'
    },
    {
      type: 'comment',
      action: 'Commented on material',
      icon: FiMessageCircle,
      color: 'teal'
    }
  ];

  const timeOptions = [
    '5 minutes ago', '15 minutes ago', '1 hour ago', '2 hours ago', '4 hours ago',
    '6 hours ago', '1 day ago', '2 days ago', '3 days ago', '1 week ago'
  ];

  const activities = [];
  for (let i = 0; i < 12; i++) {
    const actionType = actionTypes[Math.floor(Math.random() * actionTypes.length)];
    const user = users[Math.floor(Math.random() * users.length)];
    const material = materials[Math.floor(Math.random() * materials.length)];
    const time = timeOptions[Math.floor(Math.random() * timeOptions.length)];
    
    let item = material;
    if (actionType.type === 'user') {
      item = `${user.toLowerCase().replace(' ', '.')}@university.edu`;
    }

    activities.push({
      id: i + 1,
      type: actionType.type,
      user: user,
      action: actionType.action,
      item: item,
      time: time,
      icon: actionType.icon,
      color: actionType.color
    });
  }

  return activities.sort(() => Math.random() - 0.5);
};

export default function RecentActivity() {
  const activityData = generateRandomActivities();

  return (
    <Box p={6} borderWidth="1px" borderRadius="lg" shadow="md">
      <Heading size="md" mb={4}>Recent Activity</Heading>
      <VStack spacing={4} align="stretch" maxH="400px" overflowY="auto">
        {activityData.map((activity, index) => (
          <Box key={activity.id}>
            <HStack spacing={4} align="start">
              <Box
                p={2}
                borderRadius="full"
                bg={`${activity.color}.100`}
                color={`${activity.color}.600`}
              >
                <Icon as={activity.icon} w={4} h={4} />
              </Box>
              <VStack align="start" spacing={1} flex={1}>
                <HStack>
                  <Text fontWeight="medium">{activity.user}</Text>
                  <Badge colorScheme={activity.color} size="sm">
                    {activity.type}
                  </Badge>
                </HStack>
                <Text color="gray.600" fontSize="sm">
                  {activity.action}: <Text as="span" fontWeight="medium">{activity.item}</Text>
                </Text>
                <Text color="gray.400" fontSize="xs">{activity.time}</Text>
              </VStack>
            </HStack>
            {index < activityData.length - 1 && <Divider mt={4} />}
          </Box>
        ))}
      </VStack>
    </Box>
  );
} 