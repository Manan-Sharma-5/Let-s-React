import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import io from "socket.io-client";
import axios from "axios";
import { useEffect } from "react";
import { useContext } from "react";
import { CredentialsContext } from "../App";

const socket = io.connect("https://socket-react-lets.onrender.com");


const Chat = () => {

    const [credentials] = useContext(CredentialsContext);
    const username = credentials ? credentials.username : null;

    const [message, setMessage] = React.useState("");
    const [chat, setChat] = React.useState([]);
    const [title, setTitle] = React.useState("");
    const [id, setId] = React.useState("");

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const title = urlParams.get("title");
        setTitle(title);
    }, []);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");
        setId(id);
    }, []);

    const handleChange = (e) => {
        e.preventDefault();
        setMessage(e.target.value);
    };

    const sendMessage = (e) => {
        e.preventDefault();
        socket.emit("chat", { message, username });
        axios.post("https://react-lets.onrender.com/messages", { message, username, id });
        setMessage("");
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");
      
        socket.emit("join", { id });

        socket.on("chat", (payload) => {
            setChat((prevChat) => [...prevChat, payload]); 
            console.log(payload)
        });
      
        axios
          .get(`https://react-lets.onrender.com/messages?id=${id}`)
          .then((response) => {
            setChat(response.data); 
          })
          .catch((error) => {
            console.error(error);
          });

          return () => {
            socket.off("chat");
          };
        // eslint-disable-next-line
      }, []);

    return (
        <div className="flex flex-col min-h-screen bg-[#191825]">
            <div>
                <h1 className="text-white bg-[#08D9D6] text-center text-2xl p-2">{title}</h1>
            </div>
            <div className="flex-grow text-white pt-2 pb-16 px-3 flex flex-col overflow-y-auto">
            {chat.map((payload, index) => {
                const isSender = payload.username === username;
                const name = isSender ? "You" : payload.username;
                const bubbleStyle = isSender ? 'self-end' : 'self-start';
                const bubbleColor = isSender ? 'bg-green-700' : 'bg-green-400';

                return (
                    <div key={index} className={`inline-block w-1/2 ${bubbleColor} ${bubbleStyle} mb-5 mt-5 px-3 py-2 rounded-2xl flex flex-col`}>
                        <span className="text-xs text-white">{name}</span>
                        {payload.message}
                    </div>
                );
            })}

            </div>
            <div className="fixed bottom-0 left-0 right-0 p-3 gap-2 flex">
                    <input type="text" className="flex-grow p-2 rounded-2xl outline-none" placeholder="Send Message" name="chat" value={message} onChange={handleChange} />
                    <button className="text-white hover:text-[#08D9D6]" onClick={sendMessage}>
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
            </div>
        </div>
    );
};

export default Chat;
