import React, {useEffect, useState} from "react";
import axios from "axios";
  
function App() {
  const [message, setMessage] = useState("");

  async function getMessage(){
    try{
      const response = await axios.get("http://localhost:4000");
      console.log(response.data.message);
      setMessage(response.data.message);
    } catch(error){
      console.log("Error fetching message: ", error);
    }
  }

  useEffect(() => {
    getMessage();
  }, []);

  return(
    <div>
      <h1>{message}</h1>
    </div>
  )
}

export default App;
