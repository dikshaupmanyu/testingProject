import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Faq from 'react-faq-component';


var FormData = require('form-data');
var url_string = window.location.href;
var urls = new URL(url_string);
var tokens = urls.searchParams.get("accessToken");
var tokensdata = urls.searchParams.get("tokendata");
var userid = urls.searchParams.get("uname");
// alert(userid);
var userMainid = urls.searchParams.get("uid");

const data = {
  title: "FAQs",
  rows: [
    {
      title: "Can you trade on TradeTips?",
      content: "No, you cannot trade on TradeTips today. We are far more interested in giving you the tools to help you become a successful investor, than getting you access to the stock market. Use TradeTips as a companion to your trading app"
    },
    {
      title: "What is a TradeTips Mentor?",
      content: "TradeTips is a technology platform that allows the aggregation of investing coaches and trading experts, we call Mentors.<br/>They all must go through a strong vetting process before being allowed to join TradeTips as a Mentor, and are the only ones allowed to create and post stock tips on the app."
    },
    {
      title: "Can I talk directly to a Mentor?",
      content: "Yes, we strongly encourage you to reach out to Mentors with your questions and comments.<br/>There are several ways to communicate with a Mentor: <br/>1. Click on a Mentor’s Tip and leave a comment for them on the Tip Detail. <br/>2. Ask them a question in the Public Chat Room. <br/>3. Take a Mentor’s group class in a their own chat room. <br/>4. Book time with a Mentor in 1-on-1 training sessions."
    },
    {
      title: "Can I become a TradeTips Mentor?",
      content: "Yes, we would like our members who are serious about investing and who have a great track record to reach out to us"
    },
    {
      title: "Can I communicate with friends on the app?",
      content: "Yes, you can connect with friends on TradeTips.<br/>1. Click on a Mentor’s Tip and leave a comment for them on the Tip Detail.<br/>2. Communicate with them in the Public Chat Room.<br/>3. Take a Mentor’s group class together with your friends.<br/>4. Tweet a mentor tip to your own Twitter feed and get advice on the stock tip from friends there.<br/>5. Follow friends who are on the app and share ideas on tips."
    },
    {
      title: "Can I learn to invest on the app?",
      content: "Yes, we designed the app to help people who do not know much about investing, get started and take charge of their financial lives.<br/> You can begin to learn by asking questions in the Chat Room One and on Mentor Tips. Then we recommend taking a class with a Mentor or sign up for a 1-on-1 session with a Mentor."
    },
    {
      title: "What do I get for my subscription?",
      content: "1. Continued access to all the Mentor tips and AI generated Tips.<br/>2. Access to Mentor’s 1-on-1 sessions and classes.<br/>3. Access to other chat rooms and exclusive app only events.<br/>4. Automatic track and notify you when the stocks you choose are in a position to buy or sell.<br/>5. Access to 5-Day AI Predictions for all stocks.<br/>Most importantly, you get a community of members and Mentors who are dedicated to helping you make money from the stock market … we want you to make money … you … yes you, specifically. That’s our goal."
    },
    {
      title: "What if I want a refund?",
      content: "You can receive a refund. You are eligible to receive a refund for any reason up to the end of the 1st week of subscription only."
    },
    {
      title: "Can I start a chat room?",
      content: "Nope, only Mentors can start chat rooms. You can ask a Mentor to start a chat room with a topic for you though."
    },
    {
      title: "Can I follow someone on the app?",
      content: "Yes. Click on any user’s profile icon or photo or their name. Then on their profile screen click the button that says “Follow”. If the button says “Following” you are then following that user.<br/>You can also look at their Following tab on their profile and see who they are Following … if you would like to expand your network."
    },
    {
      title: "Can I change my username?",
      content: "No, your username is set once you create the account. Please reach out to us on TradeTipsApp.com if you have an issue with your username."
    },
    {
      title: "Can I change my user photo?",
      content: "Yes. Click on the profile icon or the edit text on your profile screen.<br/> Then give TradeTips access to your camera and photos to provide us with a photo of you."
    },
    {
      title: "What about sharing on social media?",
      content: "We currently allow sharing of Mentor Tips on Twitter through the app.<br/> We would like to extend this to other social media applications. If you would like us to share information on a specific platform, let us know which ones by contacting us at <a>sayhello@tradetipsapp.com.</a> "
    },]
}


class Tip extends Component {
  constructor() {
    super()

      this.state = {
        tokendata : "",
        selectedFile: null,
        file: null
      };

    this.onFileChange = this.onFileChange.bind(this)
      
  }

  componentDidMount() {

    const id = this.props.location.search;
    this.setState({tokendata:id})

  }

  onFileChange = event => { 
     
    this.setState({ selectedFile: event.target.files[0] }); 

    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    })
     
  }; 

  onFileUpload = () => { 
     
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${tokensdata}`);

    var formdata = new FormData();
    formdata.append("appUserName", userid);
    formdata.append("file", this.state.selectedFile, this.state.selectedFile.name);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://apistest.tradetipsapp.com/api/appUser/uploadUserImageByUserName", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

  }; 

  render() {

    return (
      <div className="container-fluid" style={{background : "rgb(38, 59, 102)", color: "rgb(255, 255, 255)", height:"1000px"}}>  
        <div className="row">
          <div className="col-md-3">
              <nav id="sidebar" className="sidebar-wrapper" style={{marginTop : "-8px" , marginLeft : "-15px"}}>
                <div className="sidebar-content">
                   <div className="sidebar-menu">
                     <ul style={{background: "#202842",height: "100%" , width : "300px" , fontSize : "larger" , position : "fixed"}}>
                     <li className="sidebar-dropdown" style={{padding: "10px", display: "inherit"}}>
                       
                          &nbsp;
                          <h1 style={{color: "white"}}><b>TradeTips</b></h1>
                                   
                      </li>

                     <li className="sidebar-dropdown" style={{padding: "10px", display: "inherit"}}>
                        <a href={`/home${this.state.tokendata}`}>
                          &nbsp;
                          <span style={{color: "white"}}><b>Dashboard</b></span>
                        </a>              
                      </li> 
                      
                     <li style={{padding: "10px", display: "inherit"}}>
                        <a href={`/room${this.state.tokendata}`}>
                         &nbsp;
                          <span style={{color: "white"}}><b>Chat Room</b></span>
                        </a>
                      </li>

                    
                       <li style={{padding: "10px", display: "inherit"}}>
                          <a href={`/tip${this.state.tokendata}`}>
                           &nbsp;
                            <span style={{color: "white"}}><b>Settings</b></span>
                          </a>
                        </li>
                      <li style={{padding: "10px", display: "inherit"}}>
                        <a href="/">
                         &nbsp;
                          <span style={{color: "white"}}><b>Logout</b></span>
                        </a>
                      </li>
                    </ul>
                  </div>
                  </div>
                </nav>
          </div>
          <div className="col-md-9">   

            <div className="row" style={{marginTop : "20px" , overflow : "hidden"}}>
                  
                  <div className="col-md-10" style={{overflowY: "none" , height: "100%" }}>

                    <Tabs>
                      <TabList>
                        <Tab>Profile</Tab>
                        <Tab>FAQs</Tab>
                      </TabList>
                   
                      <TabPanel>
                      <br/>
                         
                        <center>
              
                        <div className="card" style={{background : "rgb(38, 59, 102)", color: "rgb(255, 255, 255)", width:"400px"}}>  

                          <center>

                            {

                              this.state.file == null ?
                              
                              <img src={`https://apistest.tradetipsapp.com/api/appUser/getImageByAppUserId?appUserId=${userMainid}`} alt="pic" width="150" height="150" class="rounded-circle" />  
                              : <img src={this.state.file} alt="pic" width="150" height="150" class="rounded-circle" />
                            
                            }
                            <h5>{userid}</h5>

                            <div className="card-body">

                              <input style={{float: "right"}} type="file" onChange={this.onFileChange} />      
                              <br/> <br/>
                              <Button variant="primary" onClick={this.onFileUpload}>Edit Photo</Button>

                            </div>

                          </center>

                        </div>
                      </center>

                      </TabPanel>
                      <TabPanel>
                      <br/>

                      <div>
                        <Faq data={data} styles={{ titleTextColor: "white", rowContentColor: "white",rowTitleColor: "white", arrowColor: "white" }} />
                      </div>

                      </TabPanel>
                      
                    </Tabs>
                       
                     
                  </div>
      
            </div>

          </div>
        </div>   
      </div>
    )
  }
}

export default Tip  