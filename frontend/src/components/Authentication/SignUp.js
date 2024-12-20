

import { Button, FormControl, FormHelperText, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useToast } from '@chakra-ui/react'
import axios from "axios";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';


const SignUp = () => {
  const [name, setName] = useState() // Define state to store the name input
  const [email,setEmail] =useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [pic, setPic] = useState();
  const [show,setShow] = useState(false);
  const [loading,setLoading] = useState(false);
  const history = useHistory();   
  const toast = useToast()
   const handleclick = () => setShow(!show);
   const postDetails = (pics) => {
    setLoading(true);
    if(pics === undefined ){
        toast({
            title: 'Account created.',
            description: "We've created your account for you.",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
          return;
    }

    if(pics.type ==="image/jpg" || pics.type==="image/png"){
        const uploadToCloudinary = async () => {
   try {
            const data = new FormData();
        data.append("file",pics);
        data.append("upload_preset","chat-app");
        data.append("cloud Name", "dzmr9dhqh");
            const response = await axios.post("https://api.cloudinary.com/v1_1/dzmr9dhqh/image/upload", data, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            });
        
            console.log("File uploaded successfully!", response.data);
            console.log("URL of uploaded image:", response.data.secure_url); // Get the URL of the uploaded image
            setPic(response.data.secure_url.toString());
            setLoading(false);

          } catch (error) {
            console.error("Error uploading file:", error);
            setLoading(false);
          }
        };
        uploadToCloudinary();
    }
    else{
        toast({
            title: 'please select the image! .',
            description: "We've created your account for you.",
            status: 'success',
            duration: 9000,
            isClosable: true,
          })

    }

    }
    
   

   const submitHandler = async () => {
     setLoading(true);
     if(!name || !email || !password || !confirmpassword){
        toast({
            title: 'please fill all the fields! .',
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
          setLoading(false);
          return;
     }
    if(password !== confirmpassword){
        toast({
            title: 'password do not match! .',
            status: 'warning',
            duration: 9000,
            isClosable: true,
          })
          return;
    }
    try{
        const config = {
            headers:{
                "Content-type": "application/json",
            },
        }
        const {data} = await axios.post("/api/user/register",{name,email,password,pic},config);
        toast({
            title: 'registration sucessful.',
            status: 'success',
            duration: 9000,
            isClosable: true,
          })
          localStorage.setItem("userInfo",JSON.stringify(data));
          setLoading(false)
          history.push("/chats");
    }
    catch(error) {
        toast({
            title: 'error occured! .',
            description: error.response.data.message,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
          setLoading(false)
    }
   }



  return (
   <VStack spacing= '5px'>
    <FormControl id='first-name' isRequireds>
        <FormLabel>
            Name
        </FormLabel>
        <Input 
            placeholder='Enter your name' 
            value={name} 
            onChange={(e) => setName(e.target.value)} // Corrected onChange handler
        />
    </FormControl>

    <FormControl id='email' isRequired>
        <FormLabel>
            Email
        </FormLabel>
        <Input 
            placeholder='Enter your Email' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} // Corrected onChange handler
        />
        
    </FormControl>

    <FormControl id='password' isRequired>
        <FormLabel>
            Password
        </FormLabel>
        <InputGroup>
        <Input 
        type={show? "text" : "password"}
        placeholder='Enter your Email' 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} // Corrected onChange handler
           />
        
        <InputRightElement width="4.5rem">
            <Button h='1.75rem' size='sm' onClick={handleclick}>
              {show ? "Hide" : "Show"}
            </Button>
        </InputRightElement>
        </InputGroup>
       
    </FormControl>

    <FormControl id='confirmpassword' isRequired>
        <FormLabel>
           confirm Password
        </FormLabel>
        <InputGroup>
        <Input 
        type={show? "text" : "password"}
        placeholder='confirm password' 
        value={confirmpassword} 
        onChange={(e) => setConfirmpassword(e.target.value)} // Corrected onChange handler
           />
        
        <InputRightElement width="4.5rem">
            <Button h='1.75rem' size='sm' onClick={handleclick}>
              {show ? "Hide" : "Show"}
            </Button>
        </InputRightElement>
        </InputGroup>
    </FormControl>

    <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input 
        type='file'
        p={1.5}
        accept='image/*'
        onChange={ (e) => postDetails(e.target.files[0])}
        />
    </FormControl>

    <Button
     colorScheme='blue'
     width='100%'
     style={
        { marginTop :15}
     }
     onClick={submitHandler}
     isLoading={loading}
    >
        Sign Up
    </Button>
   </VStack>
  )
};
export default SignUp;
