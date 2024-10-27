// import React, { useState } from 'react';
// import { Button, Container, Typography, Box, TextField } from '@mui/material';
// import axios from 'axios';
// import { useSelector, useDispatch } from 'react-redux';
// import { setLoading } from '../store/AuthSlice';

// const Home = () => {
//   const token = useSelector((state) => state.auth.token);
//   const [prediction, setPrediction] = useState(null);
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState('');
//   const [response, setResponse] = useState('');
//   const [chatHistory, setChatHistory] = useState([]); // For storing conversation history

// const handleFileUpload = async (file) => {
//     const formData = new FormData();
//     formData.append('file', file);
  
//     try {
//       console.log(token)
//       const response = await axios.post('http://127.0.0.1:8000/api/upload/', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           Authorization: `Token ${token}`,  // if using token authentication
//         },
//       });
//       console.log('File uploaded successfully:', response.data);
//     } catch (error) {
//       console.error('Error uploading file:', error);
//     }
//   };

//   const handleSendMessage = async () => {
//     try {
//       const res = await axios.post(
//         'http://127.0.0.1:8000/api/predict/',
//         { message },
//         {
//           headers: {
//             Authorization: `Token ${token}`,
//             'Content-Type': 'application/json',
//           },
//         }
//       );

    
//       const result = res.data.response.result; // Safely access response.result
//       // console.log(result); // Log to check if we get the result
//       // setResponse(result);


//       setChatHistory((prevHistory) => [
//         ...prevHistory,
//         { question: message, response: result }
//       ]);

//       // Clear the message input
//       setMessage('');




//     } catch (error) {
//       console.error('Error sending message:', error);
//     }
//   };

//   return (
//     <Container maxWidth="md">
      // <Box display="flex" flexDirection="row" sx={{ mt: 4 }}>
      //   {/* File Reader Component */}
      //   <Box sx={{ flexGrow: 1, mr: 4 }}>
      //     <input type="file" onChange={handleFileUpload} />
      //   </Box>

//         {/* Main Chat Interface */}
//         <Box sx={{ flexGrow: 3 }}>
//           <Box sx={{ border: '1px solid #ccc', borderRadius: '4px', p: 2, height: '400px', width:'600px', overflowY: 'scroll' }}>
//             {/* Chat messages */}
//             {chatHistory.map((chat, index) => (
//               <Box key={index} sx={{ mb: 2 }}>
//                 <Typography variant="body1">
//                   <strong>You:</strong> {chat.question}
//                 </Typography>
//                 <Typography variant="body1" > 
//                   {/* sx={{ ml: 2 }} */}
//                   <strong>Bot:</strong> {chat.response}
//                 </Typography>
//               </Box>
//             ))}
//           </Box>
//           <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
//             <TextField 
//               fullWidth 
//               label="Type a message..." 
//               value={message} 
//               onChange={(e) => setMessage(e.target.value)} 
//             />
//             <Button variant="contained" color="primary" sx={{ ml: 2 }} onClick={handleSendMessage}>
//               Send
//             </Button>
             
//           </Box>
//         </Box>
//       </Box>

//       {/* {response && <div className="response">{response}</div>} */}

//     </Container>
//   );
// };

// export default Home;


import React, { useState, useEffect } from 'react';
import { Button, Container, Typography, Box, TextField } from '@mui/material';
import axios from 'axios';
import { useSelector } from 'react-redux';

const Home = () => {
  const token = useSelector((state) => state.auth.token); // Get token from Redux store
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]); // For storing conversation history

  // Fetch chat history from the backend when component loads
  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/chats/', {
          headers: {
            Authorization: `Token ${token}`,  // Authenticate request with token
          },
        });

        // Assuming response contains an array of chat messages
        setChatHistory(response.data); // Store chat history in state

      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };

    fetchChatHistory(); // Call function to load chats on component mount
  }, [token]); // Only fetch when the token changes



  const handleFileUpload = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      
      const response = await axios.post('http://127.0.0.1:8000/api/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token ${token}`,  // if using token authentication
        },
      });
      console.log('File uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };


  // Handle sending a new message
  const handleSendMessage = async () => {
    try {
      const res = await axios.post(
        'http://127.0.0.1:8000/api/predict/', // API for message prediction
        { message }, // Send the message as payload
        {
          headers: {
            Authorization: `Token ${token}`, // Token authentication
            'Content-Type': 'application/json',
          },
        }
      );

      const result = res.data.response.result; // Get the result from the response

      // Update chat history with the new message and response
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { message: message, result: result }
      ]);

      // Save new message to the backend
      await axios.post('http://127.0.0.1:8000/api/chats/', {
        message: message,
        result: result
      }, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      });

      // Clear the input field
      setMessage('');

    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <Container maxWidth="md">
       <Box display="flex" flexDirection="row" sx={{ mt: 4 }}>
        {/* File Reader Component */}
        <Box sx={{ flexGrow: 1, mr: 4 }}>
          <input type="file" onChange={(e) => handleFileUpload(e.target.files[0])}/>
        </Box>


        
        {/* Main Chat Interface */}
        <Box sx={{ flexGrow: 3 }}>
          <Box sx={{ border: '1px solid #ccc', borderRadius: '4px', p: 2, height: '400px', width: '600px', overflowY: 'scroll' }}>
            {/* Loop through chatHistory and display the messages */}
            {chatHistory.map((chat, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="body1">
                  <strong>You:</strong> {chat.message}
                </Typography>
                <Typography variant="body1">
                  <strong>Bot:</strong> {chat.result}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Message input box */}
          <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
            <TextField 
              fullWidth 
              label="Type a message..." 
              value={message} 
              onChange={(e) => setMessage(e.target.value)} 
            />
            <Button variant="contained" color="primary" sx={{ ml: 2 }} onClick={handleSendMessage}>
              Send
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Home;




