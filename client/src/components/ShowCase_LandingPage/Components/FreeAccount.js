import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import ShowCaseVido from "../Images/showcase.mp4";
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
 
const steps = [
    {
        id: '0',
        message: 'Hey Geek!',
 
        // This calls the next id
        // i.e. id 1 in this case
        trigger: '1',
    }, {
        id: '1',
 
        // This message appears in
        // the bot chat bubble
        message: 'Please write your username',
        trigger: '2'
    }, {
        id: '2',
 
        // Here we want the user
        // to enter input
        user: true,
        trigger: '3',
    }, {
        id: '3',
        message: " hi {previousValue}, how can I help you?",
        trigger: 4
    }, {
        id: '4',
        options: [
             
            // When we need to show a number of
            // options to choose we create alist
            // like this
            { value: 1, label: 'View Courses' },
            { value: 2, label: 'Read Articles' },
 
        ],
        end: true
    }
];
 
// Creating our own theme
const theme = {
    background: '#C9FF8F',
    headerBgColor: '#197B22',
    headerFontSize: '20px',
    botBubbleColor: '#0F3789',
    headerFontColor: 'white',
    botFontColor: 'white',
    userBubbleColor: '#FF5733',
    userFontColor: 'white',
};
 
// Set some properties of the bot
const config = {
    botAvatar: "/capture.PNG",
    floating: true,
};
const FreeAccount = () => {
  const navigate = useNavigate();
  return (
    <>
      <section>
        <div className="container m-sud text-center">
          <h3 className="sud-small-head">set up your account for</h3>
          <h1 className="sud-big-head">FREE</h1>
          <button
            onClick={() => {
              navigate("/joinus");
            }}
            className="btn btn-primary sud-btn"
          >
            Sign Up
          </button>
        </div>
      </section>
      <ThemeProvider theme={theme}>
                <ChatBot
 
                    // This appears as the header
                    // text for the chat bot
                    headerTitle="ShowCase"
                    steps={steps}
                    {...config}
 
                />
            </ThemeProvider>
      <a href="#">
        <video
          className="video-fluid px-3 py-2"
          src={ShowCaseVido}
          controls
          autoPlay={true}
          loop
          muted
        ></video>
      </a>
    </>
  );
};

export default FreeAccount;
