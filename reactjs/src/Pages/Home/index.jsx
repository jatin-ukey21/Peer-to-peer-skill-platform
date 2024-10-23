import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const [value, setValue] = useState();
    const navigate = useNavigate();
    const handleRoomJoin = useCallback(() => {
        navigate(`/room/${value}`) //Passing the value which is room id entered by the client to room page 
    }, [navigate, value]);
    return(
        <div>
            <input value={value} onChange={e => setValue(e.target.value)} type="text" placeholder="Enter Room code" />
            <button onClick={handleRoomJoin}>Join</button>
        </div>
    );
}

export default HomePage;