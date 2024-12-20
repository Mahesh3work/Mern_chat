import { Box, Container, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import React from 'react'
import SignUp from '../components/Authentication/SignUp';
import Login from '../components/Authentication/Login';

const HomePage = () => {
  return <Container maxW='xl' centerContent>
    <Box 
     p={3}
     bg={'white'}
     w="100%"
     display="flex"
     justifyContent="center"
     m="40px 0 15px 0"
     borderRadius='lg'
     borderWidth='1px'
    
    >
      
      <Text fontSize="xxx-large" fontFamily="work sans" color="black">
        Talk-a-Tive
      </Text>
    </Box>
    <Box bg={'white'}  w="100%" p={4} borderRadius="lg" borderWidth='1px'>
    <Tabs variant='soft-rounded' colorScheme='green'>
  <TabList mb="1em">
    <Tab w="50%">Login</Tab>
    <Tab w="50%">Sign Up!</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <Login/>
    </TabPanel>
    <TabPanel>
      <SignUp/>
    </TabPanel>
  </TabPanels>
</Tabs>

    </Box>

  </Container>
}

export default HomePage
