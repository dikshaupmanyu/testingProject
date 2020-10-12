import React, {Input, PureComponent, Fragment, Component,useState, useEffect } from 'react';
import datalink from 'react';
import { Button } from 'react-bootstrap';
import Select from 'react-select';
import Player from './player';
import HomeTwo from './HomeTwo';
import Stock from './Stock';
import AITips from './AITips';
import TipDetail from './TipDetail';

import 'bootstrap/dist/css/bootstrap.min.css';

var FormData = require('form-data');
var url_string = window.location.href;
var urls = new URL(url_string);
var tokens = urls.searchParams.get("accessToken");
var tokensdata = urls.searchParams.get("tokendata");
var userid = urls.searchParams.get("uname");
var streamIotoken = urls.searchParams.get("streamtoken");
var userMainid = urls.searchParams.get("uid");
var userStramData = urls.searchParams.get("streamdatatoken");



  class Home extends Component {
    constructor() {
      super()
      this.state = {
          contacts: [],
          tokendata : "",
          tokensdata : "",
          list: [],
          stocklist: null,
          aistocklist: null,
          aitipStocklist : null,
          dataaa : [],
          tipval : [],
          show : true
      };    
    }

   async newfucntiondemo(){
      var myHeaders = new Headers();
       myHeaders.append("Authorization", `Bearer ${tokensdata}`);

      var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          redirect: 'follow'
        };

      const response = await fetch(`https://apistest.tradetipsapp.com/api/stockDetail/getAllStockOfUserByUserName?userName=${userid}`, requestOptions)

      const result = await response.json();
         

      this.setState({aiStocklist:result})


      if(result.length > 0){

          let users = [];

          for(var i= result.length - 1; i >= 0 ; i--){

           // console.log(result[i].stockSymbol)

            var myHeaders1 = new Headers();
            myHeaders1.append("Authorization", `Bearer ${tokensdata}`);    

            var formdata = new FormData();
            formdata.append("stockSymbol", result[i].stockSymbol);

            var requestOp = {
              method: 'POST',
              headers: myHeaders1,
              body: formdata,
              redirect: 'follow'
            };

            const responseone = await fetch(`https://apistest.tradetipsapp.com/api/sectorNewsSentiment/getSentimentandSMAByStockSymbolResultSet`, requestOp);

            const responsetwo = await responseone.json();

            // console.log(responsetwo)

           this.setState({aitipStocklist:responsetwo})

         }

      } else {

       this.setState({ aitipStocklist: null })

      }

    }

    async demaoFun(){

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${tokensdata}`);

      var formdata = new FormData();
      formdata.append("offset", "0");
      formdata.append("limit", "100");

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      const responseone = await fetch("https://apistest.tradetipsapp.com/api/tip/getAllTipFeaturePaginationForUser", requestOptions)
     
      const responsetwo = await responseone.json();
       
        if(responsetwo.length >= 0){

          this.setState({ contacts: responsetwo })

        } else {

          this.setState({contacts: null })
        }

        const id = this.props.location.search;

      this.setState({tokendata:id})

    }

    componentDidMount() {

      this.demaoFun();
      this.newfucntiondemo();
     
    }

    afun = () =>{
     
      this.demaoFun();

    }

    anewfun = () =>{
     
      this.newfucntiondemo();

    }

    newhandleMentorResult = e => {

       // alert(e);

            var tdss = tokensdata;
            var tds1 = streamIotoken;
            var tds2 = userid;
            var tds3 = userMainid;
            var stockName = e;

      window.location.href = "/filtermentor?tokendata="+tdss+"&streamtoken="+tds1+"&uname="+tds2+"&uid="+tds3;  

    }

    newhandleAITipResult = e => {

       // alert(e);

            var tdss = tokensdata;
            var tds1 = streamIotoken;
            var tds2 = userid;
            var tds3 = userMainid;
            var stockName = e;

      window.location.href = "/filteraitip?tokendata="+tdss+"&streamtoken="+tds1+"&uname="+tds2+"&uid="+tds3;  

    }

     newhandleBothResult = e => {

       // alert(e);

            var tdss = tokensdata;
            var tds1 = streamIotoken;
            var tds2 = userid;
            var tds3 = userMainid;
            var stockName = e;

      window.location.href = "/home?tokendata="+tdss+"&streamtoken="+tds1+"&uname="+tds2+"&uid="+tds3;  

    }



    


    render() {

      const a = null

      return (
        <div className="container-fluid" style={{background: "#263b66"}}>  
          <div className="row" style={{background: "#263b66"}}>
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

                <div className="col-md-7" style={{overflowY: "none" , height: "100%" }}>

                  <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModalfilter">Filter</button>

                  <div id="myModalfilter" class="modal fade" role="dialog">
                    <div class="modal-dialog">

                       <div class="modal-content">
                         <div class="modal-body">
                          <p style={{textAlign : "center"}} onClick={this.newhandleBothResult.bind(this, "Both")}>Tips Filter</p>
                          <p style={{textAlign : "center"}} onClick={this.newhandleAITipResult.bind(this, "AI")}><b>AI Tip</b></p>
                          <p style={{textAlign : "center"}} onClick={this.newhandleMentorResult.bind(this, "Mentor")}><b>Mentor Tip</b></p>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                      </div>

                    </div>
                  </div>
                  <br/>

                  <br/>
                         
                  <AITips />

                  {

                    this.state.contacts ?
                 
                      <div><br/>

                        {
                         
                          this.state.contacts.filter(person => person.entryPoint != 0).map((item, i) =>                  
                           
                            <HomeTwo item={item} afun ={this.afun} />
                           
                        )}

                      </div>

                    :<div className="card text-white mb-3 testtoo">
                      <div className="card-header">
                      </div>
                      <div className="card-body" style={{padding:"4px"}}>
                        <h5 style={{color : "black"}}>No Data Found</h5>
                      </div>
                    </div>

                  }            

                </div>      
             
                <div className="col-md-5">
                 
                  <div className="container-fluid">

                      <span><Player /></span>

                      <div className="card heading" style={{background: "#263b66" , color : "white" , border : "none"}}>

                        <table>
                          <td className="nname">Company Name</td>
                          <td>Price</td>
                          <td>Change</td>
                        </table>
                       
                      </div>


                    <Stock />
                 
                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        )

      }

  }

export default Home
