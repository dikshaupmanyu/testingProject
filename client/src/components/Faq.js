import React, {Input, PureComponent, Fragment, Component,useState, useEffect } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
import datalink from 'react';
import { Button } from 'react-bootstrap';
import Select from 'react-select';
import {Bar} from 'react-chartjs-2';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import 'bootstrap/dist/css/bootstrap.min.css';

var FormData = require('form-data');
var url_string = window.location.href;
var urls = new URL(url_string);
var tokens = urls.searchParams.get("accessToken");
var tokensdata = urls.searchParams.get("tokendata");
var userid = urls.searchParams.get("uname");
var userMainid = urls.searchParams.get("uid");
var stokNme = urls.searchParams.get("stokNme");
var currentprice = urls.searchParams.get("currentprice");
var startTime = 0, endTime = 0;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var streamIotoken = urls.searchParams.get("streamtoken");
var userStramData = urls.searchParams.get("streamdatatoken");



  class Tip extends Component {
    constructor() {
      super()
      this.state = {
          contacts: [],
          contactds : [],
          contact1mnth : [],
          contact3mnth : [],
          contact6mnth : [],
          contact1year : [],
          tokendata : "",
          tokensdata : "",
          list: [],
          stocklist: null,
          stockhighval: null,
          stocklowval : null,
          newstockval : null,
          dataaa : [],
          tipval : [],
          tipparticluarCommentval : [],
          tipsaveval : [],
          tipcommentval : [],
          show : true,
          datak : [],
          latestpriceStock : [],
          latestpriceStockAll : [],
          currntdatess : [],
          currntdatessSave : [],
          currntdatessComent : []
          

      };    
    }

     addDefaultSrc(ev){

        ev.target.src = '133-1332476_crowd-of-users-transparent-user-icon-png-clipart.png'
             
     }

     addDefaultTip(ev){

      ev.target.src = 'white.jpg'
     
    }


    //  handleResult = e => {

    //   // alert(e);


    //   //       var tdss = tokensdata;
    //   //       var tds1 = streamIotoken;
    //   //       var tds2 = userid;
    //   //       var tds3 = userMainid;
    //   //       var tipId = e;

    //   // window.location.href = "/tipdetail?tokendata="+tdss+"&streamtoken="+tds1+"&uname="+tds2+"&uid="+tds3+"&tipcurrentid="+tipId;  


    //   var myHeaders = new Headers();
    //   myHeaders.append("Authorization", `Bearer ${tokensdata}`);

    //   var formdata = new FormData();
    //   formdata.append("tipId", e);
    //   formdata.append("limit", "100");
    //   formdata.append("offset", "0");

    //   var requestOptions = {
    //     method: 'POST',
    //     headers: myHeaders,
    //     body: formdata,
    //     redirect: 'follow'
    //   };


    //   fetch("https://apis.tradetipsapp.com/api/comment/getCommentsByTipIdPagination", requestOptions)
    //   .then(response => response.json())
    //   .then(response => {
    //    // alert(response);
    //       var newtipdd = [];

    //    for(var i=0; i< response.length; i++){

    //       newtipdd.push(response[i]);
             
    //     }

    //      // console.log(newtipdd);

    //     this.setState({
    //       tipparticluarCommentval: newtipdd
    //     });

    //  });
   
    // }


        newhandlefollowapi = e => {

          // alert(e);

       var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${tokensdata}`);

      var formdata = new FormData();
      formdata.append("followUserName", e);
      formdata.append("status", "");
      formdata.append("description", "");

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch("https://apis.tradetipsapp.com/api/followUserList/addFollowUser", requestOptions)
        .then(response => response.json())
          .then(result => {

           window.location.reload();
         
          // alert(JSON.stringify(result));

       });


    }

     newhandleunfollowapi = e => {

         // alert(e);

       var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${tokensdata}`);

     var formdata = new FormData();
      formdata.append("followUserName", e);
      formdata.append("status", "");
      formdata.append("description", "");

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch("https://apis.tradetipsapp.com/api/followUserList/AddUnFollowUser", requestOptions)
        .then(response => response.json())
          .then(result => {
         
         // alert(JSON.stringify(result.message));

         window.location.reload();

       });


    }


    flagCommnetrue = e => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${tokensdata}`);

    var formdata = new FormData();
    formdata.append("commentId", e);
    formdata.append("userId", this.currntIdUser.value);
    formdata.append("isFlag", "true");
    formdata.append("flagReason", "");

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://apis.tradetipsapp.com/api/tipCommentFlag/addCommentFlag", requestOptions)
      .then(response => response.json())
        .then(result => {
       
       // alert(JSON.stringify(result.message));

     });

  }


     async componentDidMount() {
  
      const id = this.props.location.search;

      this.setState({tokendata:id})

      // console.log(tokensdata);

       

      var myHeaders1 = new Headers();
      myHeaders1.append("Authorization", `Bearer ${tokensdata}`);

      var formdata = new FormData();
      formdata.append("limit", "100");
      formdata.append("offset", "0");
       var currntPrices = [] ;
       var stockss = [];

      var requestOptions = {
        method: 'POST',
        headers: myHeaders1,
        body: formdata,
        redirect: 'follow'
      };

      var myHeadersFs = new Headers();
      myHeadersFs.append("Cookie", "ctoken=dd44d368ddc944ddb0cf27de108f0e56");

      var requestOps = {
        method: 'GET',
        headers: myHeadersFs,
        redirect: 'follow'
      };


        const response = await fetch(`https://apis.tradetipsapp.com/api/timeline/getTimeLineWithPaginationForUser`, requestOptions)

        const responses = await response.json();

        var newtip = [];

        var data = [];

        var currntdate = [];

         // console.log(responses);


         var newtipid = [];


       for(var i=0; i< responses.length; i++){

          newtip.push(responses[i]);

          // if(responses[i].tipResponse != null){

          //    newtipid.push(responses[i].tipResponse.tip.id);

          //      var myHeaders1t = new Headers();
          //         myHeaders1t.append("Authorization", `Bearer ${tokensdata}`);

          //          var formdata = new FormData();
          //             formdata.append("tipId", responses[i].tipResponse.tip.id);
          //             formdata.append("limit", "100");
          //             formdata.append("offset", "0");

          //             var requestOptionstn = {
          //               method: 'POST',
          //               headers: myHeaders1t,
          //               body: formdata,
          //               redirect: 'follow'
          //             };
                    
          //           const responset1 = await fetch(`https://apis.tradetipsapp.com/api/comment/getCommentsByTipIdPagination`, requestOptionstn)

          //           const responsest1 = await responset1.json();

          //             var commentdataa = [];

          //            for(var i=0; i< responsest1.length; i++){

          //               commentdataa.push(responsest1[i]);

          //             }

          //             console.log(commentdataa);

          // }
        

          data.push(responses[i].modifiedTime);

          // alert(data);


           var date = new Date(responses[i].modifiedTime);
           var options = {year: "numeric", month: "long", day: "numeric"};

           var newdate = date.toGMTString('en-US', options);           

          currntdate.push(newdate);

          

          if(responses[i].activityType == "TipPin"){

           
           stockss = responses[i].tipResponse.tip.stockName;


          const responseones = await fetch(`https://cloud.iexapis.com/stable/stock/market/batch?types=quote&token=pk_dd324da3fb5f4428a47b05ab12f23ce2&symbols=${stockss}`, requestOps);

           const responsetwos = await responseones.json();

             // console.log(responsetwos);

             currntPrices.push(responsetwos[stockss].quote);
              // [stockss].quote.latestPrice

          }

               
        }


        // const response = await fetch(`https://apis.tradetipsapp.com/api/comment/getCommentsByTipIdPagination`, requestOptions)

        // const responses = await response.json();


          // console.log(newtip);

           // console.log(newtipid);



           


        this.setState({
          tipval: newtip , latestpriceStockAll : currntPrices , currntdatess : currntdate
        });

   
//////////////////////////////save tip data ///////////////////////////////

     


     var formdata = new FormData();
      formdata.append("limit", "100");
      formdata.append("offset", "0");
      formdata.append("activityType", "TipPin");
      var cmpanyName = [] ;
      var currntPrice = [] ;

      var requestOptions = {
        method: 'POST',
        headers: myHeaders1,
        body: formdata,
        redirect: 'follow'
      };


     var myHeadersF = new Headers();
      myHeadersF.append("Cookie", "ctoken=dd44d368ddc944ddb0cf27de108f0e56");

      var requestOp = {
        method: 'GET',
        headers: myHeadersF,
        redirect: 'follow'
      };


      const responsek = await fetch(`https://apis.tradetipsapp.com/api/timeline/getTimeLineWithPaginationForUser`, requestOptions)

        const responsesd = await responsek.json();

        var newsavetip = [];
        var stocks = [];
         var data = [];

        var currntdate = [];

       for(var i=0; i< responsesd.length; i++){

          newsavetip.push(responsesd[i]);

           data.push(responsesd[i].modifiedTime);


           var date = new Date(responsesd[i].modifiedTime);
           var options = {year: "numeric", month: "long", day: "numeric"};

           var newdate = date.toGMTString('en-US', options);           

          currntdate.push(newdate);

          stocks = responsesd[i].tipResponse.tip.stockName;


          const responseone = await fetch(`https://cloud.iexapis.com/stable/stock/market/batch?types=quote&token=pk_dd324da3fb5f4428a47b05ab12f23ce2&symbols=${stocks}`, requestOp);

          const responsetwo = await responseone.json();

             currntPrice.push(responsetwo[stocks].quote.latestPrice);
             
         }

         // console.log(currntPrice);

         this.setState({
          tipsaveval: newsavetip, latestpriceStock : currntPrice , currntdatessSave : currntdate
        });



///////////////////////////comment list ///////////////////////////////
     
     var formdata = new FormData();
      formdata.append("limit", "100");
      formdata.append("offset", "0");
      formdata.append("activityType", "Comment");

      var requestOptions = {
        method: 'POST',
        headers: myHeaders1,
        body: formdata,
        redirect: 'follow'
      };


      fetch("https://apis.tradetipsapp.com/api/timeline/getTimeLineWithPaginationForUser", requestOptions)
      .then(response => response.json())
      .then(response => {
          // console.log(response);
          var newcommenttip = [];
           var data = [];

          var currntdate = [];

       for(var i=0; i< response.length; i++){

          newcommenttip.push(response[i]);

           var date = new Date(response[i].modifiedTime);
           var options = {year: "numeric", month: "long", day: "numeric"};

           var newdate = date.toGMTString('en-US', options);           

           currntdate.push(newdate);
             
        }

        this.setState({
          tipcommentval: newcommenttip , currntdatessComent : currntdate
        });

     });



    }


  

    render() {
    

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
                
                <div className="col-md-10" style={{overflowY: "none" , height: "100%" }}>

                      <center>
              
                        <div className="card" style={{background : "rgb(38, 59, 102)", color: "rgb(255, 255, 255)", width:"400px"}}>  

                          <center>

                            <img src={`https://apis.tradetipsapp.com/api/appUser/getImageByAppUserId?appUserId=${userMainid}`} onError={this.addDefaultSrc} alt="pic" width="150" height="150" class="rounded-circle" />

                            <h5>{userid}</h5>

                            
                          </center>

                        </div>
                      </center>


                  <Tabs style={{background : "#263b66" , color : "white"}}>
                    <TabList>
                      <Tab>All</Tab>
                      <Tab>Saved Tips</Tab>
                      <Tab>Comments</Tab>
                     
                    </TabList>
                    <TabPanel>
                       { 

                        this.state.tipval != ""  ? 

                        <ul className="list-group">
                                     

                          { this.state.currntdatess && this.state.latestpriceStockAll && this.state.tipval.map((itemd, i) =>
                           <li className="list-group-item" style={{background : "#263b66" , color : "white" , border: "1px solid #fff"}}>
                              
                              <div className="row">
                                <div className="col-xs-2 col-md-2">
                                  <a href={`/followUserList${this.state.tokendata}&userid=${itemd.followUserName}&followUsrid=${itemd.followUserId}`} style={{textDecoration : "none"}} style={{textDecoration : "none"}}><img src={`https://apis.tradetipsapp.com/api/appUser/getImageByAppUserId?appUserId=${itemd.followUserId}`} onError={this.addDefaultSrc} alt="pic" width="50" height="50" class="rounded-circle" /></a></div>
                                    <div className="col-xs-6 col-md-6">
                                      
                                      <div class="comment-text">

                                       {
                                         itemd.activityType == "FollowUser" ?


                                         
                                         <p>{itemd.followUserName} followed you <br/>


                                             {
                                               itemd.userFollowing == true ?

                                             
                                             <a href="#" onClick={this.newhandleunfollowapi.bind(this, itemd.followUserName)}>
                                                 <input type="button" value="Following" className="nav-link"/>
                                             </a>

                                              : <a href="#" onClick={this.newhandlefollowapi.bind(this, itemd.followUserName)}>
                                                 <input type="button" value="Follow" className="nav-link"/>
                                             </a>

                                              }
                                         
                                        </p> 

                                        :  itemd.activityType == "Comment" ?

                                         

                                         <a href={`/tipdetail${this.state.tokendata}&tipcurrentid=${itemd.tipResponse.tip.id}`} style={{textDecoration : "none"}}><ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{margin: "0px" , padding:"0px"}}>

                                          <p style={{color: "white"}}> You commented on {itemd.tipResponse.tip.stockName}</p>

                                          <br/> 

                                          <li><img src={process.env.PUBLIC_URL + '/coment1.png'} style={{cursor: "pointer"}} className="image-responsive" height="18" width="20"/>&nbsp;<span>{itemd.tipResponse.commentCount}</span></li>
                                                             
                                            

                                          {
                                              itemd.tipResponse.userLikeStatus === true ?
                                              <li><img src={process.env.PUBLIC_URL + '/unnamed.png'} style={{height : "15px", cursor: "pointer"}} />&nbsp;{itemd.tipResponse.likeCount}</li>  
                                             :<li><img src={process.env.PUBLIC_URL + '/like1.png'} style={{height : "15px", cursor: "pointer"}} />&nbsp;{itemd.tipResponse.likeCount}</li>
                                           } 

                                          <li></li>
                                          <li></li> 

                                          
                                        </ul></a>

                                        :  itemd.activityType == "TipPin" ?

                                          

                                       <div className="card-header" style={{background : "#fff" , color : "black"}}>      
                                            
                                           
                                            <p>Saved Tips</p> 
                                           

                                            <ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{margin: "0px" , padding:"0px"}}>

                                               <li><a href={`/followUserList${this.state.tokendata}&userid=${itemd.tipResponse.tip.appUser.userName}&followUsrid=${itemd.tipResponse.tip.appUser.id}`} style={{textDecoration : "none"}}><img src={`https://apis.tradetipsapp.com/api/appUser/getImageByAppUserId?appUserId=${itemd.tipResponse.tip.userId}`} onError={this.addDefaultSrc} alt="pic" width="50" height="50" class="rounded-circle" />&nbsp;&nbsp;<span>{itemd.tipResponse.tip.appUser.userName}</span></a></li>
                                               <li><h6 className="hclass" style={{margin : "10px"}}><span>$</span>{Number(itemd.tipResponse.tip.createTipPrice).toFixed(2)}</h6></li>  
                                            
                                               {
                                                  itemd.tipResponse.tip.stockSuggestion == "Buy" ?
                                                  <li className="suggestion"><span className="Buy">BUY</span></li>
                                                  :  itemd.tipResponse.tip.stockSuggestion == "Sell" ?
                                                  <li className="suggestion"><span className="Sell">SELL</span></li>
                                                  :<li className="suggestion"><span className="Avoid">AVOID</span></li>
                                                }

                                                 
                                            </ul>



                                            <a href={`/tipdetail${this.state.tokendata}&tipcurrentid=${itemd.tipResponse.tip.id}`} style={{textDecoration : "none"}}><ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{margin: "0px" , padding:"0px"}}>
                                              <li><h5 style={{color: "black"}}>{itemd.tipResponse.tip.stockName}</h5></li>

                                            </ul></a>

                                            <a href={`/tipdetail${this.state.tokendata}&tipcurrentid=${itemd.tipResponse.tip.id}`} style={{textDecoration : "none"}}><ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{margin: "0px" , padding:"0px"}}>
                                              <li>ENTRY<br/>
                                              {
                                                itemd.tipResponse.tip.entryPoint <=  itemd.tipResponse.tip.createTipPrice && itemd.tipResponse.tip.stockSuggestion == "Buy" ?
                                              <h6 style={{color : "green"}}><span>$</span>{parseFloat(itemd.tipResponse.tip.entryPoint).toFixed(2)}</h6>
                                              :  itemd.tipResponse.tip.entryPoint >= itemd.tipResponse.tip.createTipPrice && itemd.tipResponse.tip.stockSuggestion == "Sell" ?
                                               <h6 style={{color : "green"}}><span>$</span>{parseFloat(itemd.tipResponse.tip.entryPoint).toFixed(2)}</h6>
                                              :<h6 style={{color : "black"}}><span>$</span>{parseFloat(itemd.tipResponse.tip.entryPoint).toFixed(2)}</h6>
                                              }
                                              </li>
                                              <li>EXIT<br/>
                                              {
                                                itemd.tipResponse.tip.entryPoint <= itemd.tipResponse.tip.createTipPrice && itemd.tipResponse.tip.stockSuggestion == "Buy" ?
                                              <h6 style={{color : "green"}}><span>$</span>{parseFloat(itemd.tipResponse.tip.exitPoint).toFixed(2)}</h6>
                                              :  itemd.tipResponse.tip.entryPoint >= itemd.tipResponse.tip.createTipPrice && itemd.tipResponse.tip.stockSuggestion == "Sell" ?
                                               <h6 style={{color : "green"}}><span>$</span>{parseFloat(itemd.tipResponse.tip.exitPoint).toFixed(2)}</h6>
                                              :<h6 style={{color : "black"}}><span>$</span>{parseFloat(itemd.tipResponse.tip.exitPoint).toFixed(2)}</h6>
                                              }
                                              </li>
                                              <li>STOP<br/>
                                              {
                                                itemd.tipResponse.tip.stockSuggestion == "Buy" && itemd.tipResponse.tip.createTipPrice < itemd.tipResponse.tip.createTipPrice && itemd.tipResponse.tip.createTipPrice <= itemd.tipResponse.tip.stopPoint ?
                                              <h6 style={{color : "red"}}><span>$</span>{parseFloat(itemd.tipResponse.tip.stopPoint).toFixed(2)}</h6>
                                              :  itemd.tipResponse.tip.stockSuggestion == "Sell"  && itemd.tipResponse.tip.createTipPrice < itemd.tipResponse.tip.createTipPrice && itemd.tipResponse.tip.createTipPrice >= itemd.tipResponse.tip.stopPoint ?
                                               <h6 style={{color : "black"}}><span>$</span>{parseFloat(itemd.tipResponse.tip.stopPoint).toFixed(2)}</h6>
                                              :<h6 style={{color : "black"}}><span>$</span>{parseFloat(itemd.tipResponse.tip.stopPoint).toFixed(2)}</h6>
                                              }  
                                              </li>
                                            </ul></a>

                                            <a href={`/tipdetail${this.state.tokendata}&tipcurrentid=${itemd.tipResponse.tip.id}`} style={{textDecoration : "none"}}><ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{margin: "0px" , padding:"0px"}}>

                                              <li><img src={process.env.PUBLIC_URL + '/comment.jpeg'} style={{cursor: "pointer"}} className="image-responsive" height="18" width="20"/>&nbsp;<span>{itemd.tipResponse.commentCount}</span></li>
                                                                 
                                                 

                                              {
                                                  itemd.tipResponse.userLikeStatus === true ?
                                                  <li><img src={process.env.PUBLIC_URL + '/unnamed.png'} style={{height : "15px", cursor: "pointer"}} />&nbsp;{itemd.tipResponse.likeCount}</li>  
                                                 :<li><img src={process.env.PUBLIC_URL + '/like.jpeg'} style={{height : "15px", cursor: "pointer"}} />&nbsp;{itemd.tipResponse.likeCount}</li>
                                               } 

                                              <li></li>
                                              <li></li> 

                                              
                                            </ul></a>

                                           

                                           
                                        </div>
                                         



                                        : null

                                       }
                                      </div>                    
                                    </div>
                                    <div class="col-xs-4 col-md-4">
                                     
                                      <a>{this.state.currntdatess[i]}</a>
                                   
                                    </div>
                              </div>
                           </li>

                     
                          )}
                        </ul>
                        :
                        <ul class="list-group" style={{listStyle : "none"}}>
                         <h5 style={{color : "white"}}>It's Your Time Now!</h5>
                         <br/>
                         <li><h5><b>1. Track </b> the comments you've made on Mentor tips.</h5> </li>
                         <br/>
                         <li><h5><b>2. Save</b> tips and see their progress here.</h5> </li>
                         <br/>
                         <li><h5><b>3. Share</b> tips and chat with your Mentors & followers.</h5> </li>
                         <br/>
                         <li><h5><b>Hint:</b> See how others make on their profiles!</h5> </li>
                        </ul>

                       }  
                    </TabPanel>
                    <TabPanel>
                       { 

                        this.state.tipsaveval != ""  ?

                       <ul class="list-group">
                                     

                          {this.state.currntdatessSave && this.state.tipsaveval.map((itemd, i) =>

                           <li class="list-group-item" style={{background : "#263b66" , color : "white" , border: "1px solid #fff"}}>
                              <div class="row">
                                <div class="col-xs-2 col-md-2">
                                  <img src={`https://apis.tradetipsapp.com/api/appUser/getImageByAppUserId?appUserId=${itemd.followUserId}`} onError={this.addDefaultSrc} alt="pic" width="50" height="50" class="rounded-circle" /></div>
                                <div class="col-xs-6 col-md-6">
                                  
                                  <div class="comment-text">

                                   {
                                     itemd.activityType == "FollowUser" ?
                                     
                                    <p>{itemd.followUserName} followed you <br/>

                                     <a href="#">
                                         <input type="button" value="Follow" className="nav-link"/>
                                     </a>
                                     
                                    </p> 



                                    :  itemd.activityType == "Comment" ?

                                     <p> You commented on {itemd.tipResponse.tip.stockName}</p>

                                    :  itemd.activityType == "TipPin" ?



                                     <a href={`/tipdetail${this.state.tokendata}&tipcurrentid=${itemd.tipResponse.tip.id}`} style={{textDecoration : "none"}}><div className="card-header" style={{background : "#fff" , color : "black"}}>      

                                        <ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{margin: "0px" , padding:"0px"}}>

                                           <li><img src={`https://apis.tradetipsapp.com/api/appUser/getImageByAppUserId?appUserId=${itemd.tipResponse.tip.userId}`} onError={this.addDefaultSrc} alt="pic" width="50" height="50" class="rounded-circle" />&nbsp;&nbsp;<span>{itemd.tipResponse.tip.appUser.userName}</span></li>
                                           <li><h6 className="hclass" style={{margin : "10px"}}><span>$</span>{Number(itemd.tipResponse.tip.createTipPrice).toFixed(2)}</h6></li>                                             

                                            {
                                              itemd.tipResponse.tip.stockSuggestion == "Buy" ?
                                              <li className="suggestion"><span className="Buy">BUY</span></li>
                                              :  itemd.tipResponse.tip.stockSuggestion == "Sell" ?
                                              <li className="suggestion"><span className="Sell">SELL</span></li>
                                              :<li className="suggestion"><span className="Avoid">AVOID</span></li>
                                            }

                                        </ul>
                                        <ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{margin: "0px" , padding:"0px"}}>
                                          <li><h5 style={{color: "black"}}>{itemd.tipResponse.tip.stockName}</h5></li>

                                        </ul>

                                        <ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{margin: "0px" , padding:"0px"}}>
                                          <li>ENTRY<br/>
                                          {
                                            itemd.tipResponse.tip.entryPoint <=  this.state.latestpriceStockAll[i] && itemd.tipResponse.tip.stockSuggestion == "Buy" ?
                                          <h6 style={{color : "green"}}><span>$</span>{parseFloat(itemd.tipResponse.tip.entryPoint).toFixed(2)}</h6>
                                          :  itemd.tipResponse.tip.entryPoint >= this.state.latestpriceStockAll[i] && itemd.tipResponse.tip.stockSuggestion == "Sell" ?
                                           <h6 style={{color : "green"}}><span>$</span>{parseFloat(itemd.tipResponse.tip.entryPoint).toFixed(2)}</h6>
                                          :<h6 style={{color : "black"}}><span>$</span>{parseFloat(itemd.tipResponse.tip.entryPoint).toFixed(2)}</h6>
                                          }
                                          </li>
                                          <li>EXIT<br/>
                                          {
                                            itemd.tipResponse.tip.entryPoint <= this.state.latestpriceStockAll[i] && itemd.tipResponse.tip.stockSuggestion == "Buy" ?
                                          <h6 style={{color : "green"}}><span>$</span>{parseFloat(itemd.tipResponse.tip.exitPoint).toFixed(2)}</h6>
                                          :  itemd.tipResponse.tip.entryPoint >= this.state.latestpriceStockAll[i] && itemd.tipResponse.tip.stockSuggestion == "Sell" ?
                                           <h6 style={{color : "green"}}><span>$</span>{parseFloat(itemd.tipResponse.tip.exitPoint).toFixed(2)}</h6>
                                          :<h6 style={{color : "black"}}><span>$</span>{parseFloat(itemd.tipResponse.tip.exitPoint).toFixed(2)}</h6>
                                          }
                                          </li>
                                          <li>STOP<br/>
                                          {
                                            itemd.tipResponse.tip.stockSuggestion == "Buy" && this.state.latestpriceStockAll[i] < itemd.tipResponse.tip.createTipPrice && this.state.latestpriceStockAll[i] <= itemd.tipResponse.tip.stopPoint ?
                                          <h6 style={{color : "red"}}><span>$</span>{parseFloat(itemd.tipResponse.tip.stopPoint).toFixed(2)}</h6>
                                          :  itemd.tipResponse.tip.stockSuggestion == "Sell"  && itemd.tipResponse.tip.createTipPrice < this.state.latestpriceStockAll[i] && this.state.latestpriceStockAll[i] >= itemd.tipResponse.tip.stopPoint ?
                                           <h6 style={{color : "black"}}><span>$</span>{parseFloat(itemd.tipResponse.tip.stopPoint).toFixed(2)}</h6>
                                          :<h6 style={{color : "black"}}><span>$</span>{parseFloat(itemd.tipResponse.tip.stopPoint).toFixed(2)}</h6>
                                          }  
                                          </li>
                                        </ul>
                                        <ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{margin: "0px" , padding:"0px"}}>

                                          <li><img src={process.env.PUBLIC_URL + '/comment.jpeg'} style={{cursor: "pointer"}} className="image-responsive" height="18" width="20"/>&nbsp;<span>{itemd.tipResponse.commentCount}</span></li>
                                                             
                                             

                                          {
                                              itemd.tipResponse.userLikeStatus === true ?
                                              <li><img src={process.env.PUBLIC_URL + '/unnamed.png'} style={{height : "15px", cursor: "pointer"}} />&nbsp;{itemd.tipResponse.likeCount}</li>  
                                             :<li><img src={process.env.PUBLIC_URL + '/like.jpeg'} style={{height : "15px", cursor: "pointer"}} />&nbsp;{itemd.tipResponse.likeCount}</li>
                                           } 

                                          <li></li>
                                          <li></li> 

                                          
                                       </ul>
                                                 
                                     </div></a>

                                    : null

                                   }
                                  </div>                    
                                </div>
                                <div class="col-xs-4 col-md-4">
                                 
                                  <a>{this.state.currntdatessSave[i]}</a>
                               
                                </div>
                              </div>
                           </li>

                     
                          )}
                       </ul>
                       :
                        <ul class="list-group" style={{listStyle : "none"}}>
                         <h5 style={{color : "white"}}>It's Your Time Now!</h5>
                         <br/>
                         <li><h5><b>1. Track </b> the comments you've made on Mentor tips.</h5> </li>
                         <br/>
                         <li><h5><b>2. Save</b> tips and see their progress here.</h5> </li>
                         <br/>
                         <li><h5><b>3. Share</b> tips and chat with your Mentors & followers.</h5> </li>
                         <br/>
                         <li><h5><b>Hint:</b> See how others make on their profiles!</h5> </li>
                        </ul>

                       }  
                    </TabPanel>
                    <TabPanel>
                       { 

                        this.state.tipcommentval != ""  ?

                       <ul class="list-group">
                                     

                          {this.state.currntdatessComent && this.state.tipcommentval.map((itemd, i) =>

                           <li class="list-group-item" style={{background : "#263b66" , color : "white" , border: "1px solid #fff"}}>
                              <div class="row">
                                <div class="col-xs-2 col-md-2">
                                  <img src={`https://apis.tradetipsapp.com/api/appUser/getImageByAppUserId?appUserId=${itemd.followUserId}`} onError={this.addDefaultSrc} alt="pic" width="50" height="50" class="rounded-circle" /></div>
                                <div class="col-xs-6 col-md-6">
                                 
                                  <div class="comment-text">

                                   {
                                     itemd.activityType == "FollowUser" ?
                                     
                                    <p>{itemd.followUserName} followed you</p>


                                    :  itemd.activityType == "Comment" ?

                                      <a href={`/tipdetail${this.state.tokendata}&tipcurrentid=${itemd.tipResponse.tip.id}`} style={{textDecoration : "none"}}><ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{margin: "0px" , padding:"0px"}}>

                                          <p style={{color: "white"}}> You commented on {itemd.tipResponse.tip.stockName}</p>

                                          <br/> 

                                          <li><img src={process.env.PUBLIC_URL + '/coment1.png'} style={{cursor: "pointer"}} className="image-responsive" height="18" width="20"/>&nbsp;<span>{itemd.tipResponse.commentCount}</span></li>
                                                             
                                            

                                          {
                                              itemd.tipResponse.userLikeStatus === true ?
                                              <li><img src={process.env.PUBLIC_URL + '/unnamed.png'} style={{height : "15px", cursor: "pointer"}} />&nbsp;{itemd.tipResponse.likeCount}</li>  
                                             :<li><img src={process.env.PUBLIC_URL + '/like1.png'} style={{height : "15px", cursor: "pointer"}} />&nbsp;{itemd.tipResponse.likeCount}</li>
                                           } 

                                          <li></li>
                                          <li></li> 

                                          
                                        </ul></a>



                                    :  itemd.activityType == "TipPin" ?

                                     <p> You commented on {itemd.tipResponse.tip.stockName}</p>

                                    : null

                                   }
                                  </div>                    
                                </div>
                                <div class="col-xs-4 col-md-4">
                                 
                                  <a>{this.state.currntdatessComent[i]}</a>
                               
                                </div>
                              </div>
                           </li>

                     
                          )}
                       </ul> 
                       :
                        <ul class="list-group" style={{listStyle : "none"}}>
                         <h5 style={{color : "white"}}>It's Your Time Now!</h5>
                         <br/>
                         <li><h5><b>1. Track </b> the comments you've made on Mentor tips.</h5> </li>
                         <br/>
                         <li><h5><b>2. Save</b> tips and see their progress here.</h5> </li>
                         <br/>
                         <li><h5><b>3. Share</b> tips and chat with your Mentors & followers.</h5> </li>
                         <br/>
                         <li><h5><b>Hint:</b> See how others make on their profiles!</h5> </li>
                        </ul>

                        }
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
