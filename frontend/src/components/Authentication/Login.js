
import { Button, FormControl, FormHelperText, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'; // Correct import



const Login = () => {
 
  const [email,setEmail] =useState();
  const [password, setPassword] = useState();
  const [show,setShow] = useState(false);
  const [loading, setLoading]=useState(false);

  const toast = useToast();
  const history = useHistory();
  console.log("History object login:", history);

   const handleclick = () => setShow(!show);

   const submitHandler = async () => {
    setLoading(true);
    if(!email || !password){
        toast({
            title: "please fill all the fields",
            status:"warning",
            duration:5000,
            isClosable: true,
            position:"bottom",
        })
        setLoading(false);
        return;
    }
    try{
        const config = {
            Headers:{
                "Content-type":"application/json",
            },
        };
        const{data} = await axios.post(
            "/api/user/login",{email,password},config
        );
        toast({
            title: "Login Successful",
            status:"success",
            duration:5000,
            isClosable: true,
            position:"bottom",
        })
        localStorage.setItem("userInfo",JSON.stringify(data));
        setLoading(false);
        history.push("/chats");
    }catch(error){
        toast({
            title: "error occured !",
            description: error.response.data.message,
            status:"error",
            duration:5000,
            isClosable: true,
            position:"bottom",
        })
    }
   }
  return (
   <VStack spacing= '5px'>
    
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

   

    <Button
     colorScheme='blue'
     width='100%'
     style={
        { marginTop :15}
     }
     onClick={submitHandler}
     isLoading={loading}
    >
        Login
    </Button>

    <Button
     variant="solid"
     colorScheme="red"
     width='100%'
     style={
        { marginTop :15}
     }
     onClick={() => {
        setEmail('guest@example.com');
        setPassword('123456')
     }}
    >
       Get Guest User Credentials
    </Button>
   </VStack>
  )
}

export default Login;


// import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
// import React, { useState } from 'react'
// import axios from 'axios'
// import { useToast } from '@chakra-ui/react'
// import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [show, setShow] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const toast = useToast();
//   const history = useHistory();

//   const handleClick = () => setShow(!show);

//   const submitHandler = async () => {
//     setLoading(true);
//     if (!email || !password) {
//       toast({
//         title: "Please fill all the fields",
//         status: "warning",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       setLoading(false);
//       return;
//     }
  
//     try {
//       const config = {
//         headers: {
//           "Content-type": "application/json",
//         },
//       };
//       console.log(email, password); // Add this before the axios POST request

//       const { data } = await axios.post("/api/user/login", { email, password }, config);
//       toast({
//         title: "Login Successful",
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       localStorage.setItem("userInfo", JSON.stringify(data));
//       setLoading(false);
//       history.push("/chats");
//     } catch (error) {
//       toast({
//         title: "Error occurred!",
//         description: error.response?.data?.message || "An unknown error occurred.",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//       setLoading(false); // Ensure loading stops on error
//     }
//   };

//   return (
//     <VStack spacing="5px">
//       <FormControl id="email" isRequired>
//         <FormLabel>Email</FormLabel>
//         <Input
//           placeholder="Enter your Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </FormControl>

//       <FormControl id="password" isRequired>
//         <FormLabel>Password</FormLabel>
//         <InputGroup>
//           <Input
//             type={show ? "text" : "password"}
//             placeholder="Enter your Password" // Corrected the placeholder
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <InputRightElement width="4.5rem">
//             <Button h="1.75rem" size="sm" onClick={handleClick}>
//               {show ? "Hide" : "Show"}
//             </Button>
//           </InputRightElement>
//         </InputGroup>
//       </FormControl>

//       <Button
//         colorScheme="blue"
//         width="100%"
//         style={{ marginTop: 15 }}
//         onClick={submitHandler}
//         isLoading={loading}
//       >
//         Login
//       </Button>

//       <Button
//         variant="solid"
//         colorScheme="red"
//         width="100%"
//         style={{ marginTop: 15 }}
//         onClick={() => {
//           setEmail("guest@example.com");
//           setPassword("123456");
//         }}
//       >
//         Get Guest User Credentials
//       </Button>
//     </VStack>
//   );
// };

// export default Login;
