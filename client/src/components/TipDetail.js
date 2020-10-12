import React, {Input, PureComponent, Fragment, Component,useState, useEffect } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
import datalink from 'react';
import Select from 'react-select';
import {Bar} from 'react-chartjs-2';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Button, Modal } from 'react-bootstrap';
import Player from './player';
import Stock from './Stock';

import 'react-tabs/style/react-tabs.css';

import 'bootstrap/dist/css/bootstrap.min.css';

var FormData = require('form-data');
var url_string = window.location.href;
var urls = new URL(url_string);
var tokens = urls.searchParams.get("accessToken");
var tokensdata = urls.searchParams.get("tokendata");
var userid = urls.searchParams.get("uname");
var userMainid = urls.searchParams.get("uid");
var tipIds = urls.searchParams.get("tipcurrentid");
// alert(tipIds);
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


  class TipDetail extends Component {
    constructor(props) {
      super(props)
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
          item: this.props.item,
          tipparticluarCommentval : [],
          tipsaveval : [],
          tipcommentval : [],
          show : true,
          open: true,
          isLoaded: false,
          index: 0,
          datak : [],
          latestpriceStock : [],
          latestpriceStockAll : [],
          currntdatess : [],
          currntdatessSave : [],
          currntdatessComent : []
      };   

       // this.handleIndex = this.handleIndex.bind(this) 
    }

  //    handleIndex(event){
  //   this.setState({index: event.target.value})
  // }

     addDefaultSrc(ev){

        ev.target.src = '133-1332476_crowd-of-users-transparent-user-icon-png-clipart.png'
             
     }

     addDefaultTip(ev){

      ev.target.src = 'white.jpg'
     
    }

    getImageName = () => this.state.open ? 'plus' : 'minus'


     newhandleunPinResult = e => {

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${tokensdata}`);

      var formdata = new FormData();
      formdata.append("tipId", e);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch("https://apistest.tradetipsapp.com/api/tipFeature/tipUnPinForUser", requestOptions)
        .then(response => response.json())
          .then(result => {

        // this.props.afun(true);

        window.location.reload();

    });

  }


  newhandlePinResult = e => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${tokensdata}`);

    var formdata = new FormData();
    formdata.append("tipId", e);

    var requestOptionsf = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://apistest.tradetipsapp.com/api/tipFeature/tipPinForUser", requestOptionsf)
      .then(response => response.json())
        .then(result => {

        // this.props.afun(true);

         window.location.reload();

    });
   
  }


    newhandlelikeResult = e => {

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${tokensdata}`);

      var formdata = new FormData();
      formdata.append("tipId", e);

      var requestOptionsf = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch("https://apistest.tradetipsapp.com/api/tipFeature/tipLikeForUser", requestOptionsf)
        .then(response => response.json())
          .then(result => {
       
        // this.props.afun(true);

         window.location.reload();

    });
   
  }

    newhandleunlikeResult = e => {
   
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${tokensdata}`);

      var formdata = new FormData();
      formdata.append("tipId", e);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch("https://apistest.tradetipsapp.com/api/tipFeature/tipUnLikeForUser", requestOptions)
        .then(response => response.json())
          .then(result => {

        // this.props.afun(true);

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

    fetch("https://apistest.tradetipsapp.com/api/tipCommentFlag/addCommentFlag", requestOptions)
      .then(response => response.json())
        .then(result => {
       
       // alert(JSON.stringify(result.message));

     });

  }


  copyClipboard = e => {

      var copyText = document.getElementById("divClipboard"+e);
      var textArea = document.createElement("textarea");
      textArea.value = copyText.textContent;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("Copy");
      textArea.remove();
    
    }


     newhandleRemoveTipResult = e => {

        this.setState({showHide:true})

     
    }


    newhandleRemoveTipResultData = e => {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${tokensdata}`);

        var formdata = new FormData();
        formdata.append("tipId", e);

        var requestOptionsf = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
        };

      fetch("https://apistest.tradetipsapp.com/api/tipFeature/tipHideForUser", requestOptionsf)
        .then(response => response.json())
          .then(result => {

          window.location.reload();

      });

     
    }

     handleModalShowHide(){

      this.setState({showHide:false})

    }


     onSubmit = e => {

      e.preventDefault()

      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${tokensdata}`);

      var formdata = new FormData();
      formdata.append("tipId", this.id.value);
      formdata.append("commentDetails", this.state.commentDetails);
      formdata.append("status", "Pending");
      formdata.append("userid", this.currntIdUser.value);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      fetch("https://apistest.tradetipsapp.com/api/comment/addCommentOnTip", requestOptions)
        .then(response => response.json())
        .then(result => {

         var formdata = new FormData();
          formdata.append("tipId", result.tipId);
          formdata.append("limit", "100");
          formdata.append("offset", "0");

          var requestOptionst = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
          };


        fetch("https://apistest.tradetipsapp.com/api/comment/getCommentsByTipIdPagination", requestOptionst)
          .then(response => response.json())
            .then(response => {
           
            var newtipdd = [];


          for(var i=0; i< response.length; i++){

            newtipdd.push(response[i]);
               
          }

            this.setState({ tipparticluarCommentval: newtipdd});

            this.setState({ commentDetails: ""});

        });

      });

    }


     async demaoFun(){

       var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${tokensdata}`);

      var formdata = new FormData();
      formdata.append("tipId", tipIds);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
        redirect: 'follow'
      };

      const responseone = await fetch("https://apistest.tradetipsapp.com/api/tip/getAllTipFeatureDetailsByTipId", requestOptions)
     
      const responsetwo = await responseone.json();

      console.log(responsetwo);

       // var date = new Date(responsetwo.tip.modifiedOn);

      // var date = new Date(responsetwo.tip.modifiedOn);

      var date = responsetwo.tip.modifiedOn;

       // var options = {year: "numeric", month: "long", day: "numeric"};

       // var newdate = date.toLocaleDateString('en-US', options);           

       // currntdate.push(newdate);

      console.log(date);

        
      this.setState({ isLoaded: true, tipval: responsetwo , currntdatess : date })

       var formdatakk = new FormData();
      formdatakk.append("tipId", tipIds);
      formdatakk.append("limit", "100");
      formdatakk.append("offset", "0");

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdatakk,
        redirect: 'follow'
      };


      fetch("https://apistest.tradetipsapp.com/api/comment/getCommentsByTipIdPagination", requestOptions)
      .then(response => response.json())
      .then(response => {
       // alert(response);
          var newtipdd = [];

       for(var i=0; i< response.length; i++){

          newtipdd.push(response[i]);
             
        }

          // console.log(newtipdd);

        this.setState({
          tipparticluarCommentval: newtipdd
        });

     });


      // console.log(this.state.tipval.tip.stockName);



        var myHeaders = new Headers();
      myHeaders.append("Cookie", "ctoken=dd44d368ddc944ddb0cf27de108f0e56");

      var myHeaders1 = new Headers();
      myHeaders1.append("Authorization", `Bearer ${tokensdata}`);    

      var requestOp = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      var formdata = new FormData();
      formdata.append("stockSymbol", this.state.tipval.tip.stockName);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders1,
        body: formdata,
        redirect: 'follow'
      };

      const responseonek = await fetch(`https://cloud.iexapis.com/stable/stock/market/batch?types=quote&token=pk_dd324da3fb5f4428a47b05ab12f23ce2&symbols=${this.state.tipval.tip.stockName}`, requestOp);

      const responsetwok = await responseonek.json();

      // console.log(responsetwo);
     
      this.setState({

         stocklist: responsetwok[this.state.tipval.tip.stockName].quote,
         tipLatestprice : responsetwok[this.state.tipval.tip.stockName].quote.latestPrice
        
      })

      const id = this.props.location.search;

      this.setState({tokendata:id})

     }


     async componentDidMount() {
  
      this.demaoFun();

       }

       afun = () =>{
        
        alert("hii");
     
        this.demaoFun();

      }

      /////////////////////////////////////////////////////////////////
  

    render() {

       const {item} = this.props;

         const imageName = this.getImageName();

      

      const { isLoaded, tipval , stocklist , index} = this.state;

      // alert(isLoaded)

       // console.log(this.state.currntdatess);

      // console.log(this.state.tipval.tip)

       // console.log(this.state.tipLatestprice)

       // console.log(this.state.stocklist.latestPrice)

      // console.log(this.state.tipval.tip.createTipPrice)

      // var minusValues = this.state.tipLatestprice - this.state.tipval.tip.createTipPrice;

      // var values = Number(minusValues).toFixed(2);
   

     // const selected = tipval [index] || tipval[0]

     // alert(selected)

     // console.log(this.state.tipval)



      if (!isLoaded) {

      return <div>Loading...</div>;

     } else {

     

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
                        <a href={`/faq${this.state.tokendata}`}>
                         &nbsp;
                          <span style={{color: "white"}}><b>Timeline</b></span>
                        </a>
                      </li>
                   <li style={{padding: "10px", display: "inherit"}}>
                        <a href={`/follower${this.state.tokendata}`}>
                         &nbsp;
                          <span style={{color: "white"}}><b>Followers</b></span>
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
   
            <div className="col-md-9" style={{background: "#263b66" , height : "100%"}}>

              <br/>

              <p class="text-right" style={{color : "white"}}>{new Date(this.state.currntdatess).toString()}</p>
                           
              <div className="card-header" style={{background : "white" ,  border : "none" ,marginTop : "20px" , overflow : "hidden"}}>  
                <div className="row">
                  <div className="col-md-6">

                      <ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{margin: "0px" , padding:"0px"}}>
                         <li><img src={`https://apis.tradetipsapp.com/api/appUser/getImageByAppUserId?appUserId=${this.state.tipval.tip.appUser.id}`} onError={this.addDefaultSrc} alt="pic" width="50" height="50" class="rounded-circle" />&nbsp;&nbsp;<span>{this.state.tipval.tip.appUser.userName}</span></li>
                          {
                            this.state.tipval.tip.stockSuggestion == "Buy" ?
                            <li className="suggestion"><span className="Buy">BUY</span></li>
                            :  this.state.tipval.tip.stockSuggestion == "Sell" ?
                            <li className="suggestion"><span className="Sell">SELL</span></li>
                            :<li className="suggestion"><span className="Avoid">AVOID</span></li>
                          }                      
                      </ul>
                      <ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{margin: "0px" , padding:"0px"}}>
                        <li><h5 style={{color: "black"}}>{this.state.tipval.tip.stockName}</h5></li>
                      </ul>

                      <ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{margin: "0px" , padding:"0px"}}>
                        <li>ENTRY<br/>
                          {
                            this.state.tipval.tip.entryPoint <=  this.state.tipval.tip.createTipPrice && this.state.tipval.tip.stockSuggestion == "Buy" ?
                          <h6 style={{color : "green"}}><span>$</span>{parseFloat(this.state.tipval.tip.entryPoint).toFixed(2)}</h6>
                          :  this.state.tipval.tip.entryPoint >= this.state.tipval.tip.createTipPrice && this.state.tipval.tip.stockSuggestion == "Sell" ?
                           <h6 style={{color : "green"}}><span>$</span>{parseFloat(this.state.tipval.tip.entryPoint).toFixed(2)}</h6>
                          :<h6 style={{color : "black"}}><span>$</span>{parseFloat(this.state.tipval.tip.entryPoint).toFixed(2)}</h6>
                          }
                          </li>
                          <li>EXIT<br/>
                          {
                            this.state.tipval.tip.entryPoint <= this.state.tipval.tip.createTipPrice && this.state.tipval.tip.stockSuggestion == "Buy" ?
                          <h6 style={{color : "green"}}><span>$</span>{parseFloat(this.state.tipval.tip.exitPoint).toFixed(2)}</h6>
                          :  this.state.tipval.tip.entryPoint >= this.state.tipval.tip.createTipPrice && this.state.tipval.tip.stockSuggestion == "Sell" ?
                           <h6 style={{color : "green"}}><span>$</span>{parseFloat(this.state.tipval.tip.exitPoint).toFixed(2)}</h6>
                          :<h6 style={{color : "black"}}><span>$</span>{parseFloat(this.state.tipval.tip.exitPoint).toFixed(2)}</h6>
                          }
                          </li>
                          <li>STOP<br/>
                          {
                            this.state.tipval.tip.stockSuggestion == "Buy" && this.state.tipval.tip.createTipPrice < this.state.tipval.tip.createTipPrice && this.state.tipval.tip.createTipPrice <= this.state.tipval.tip.stopPoint ?
                          <h6 style={{color : "red"}}><span>$</span>{parseFloat(this.state.tipval.tip.stopPoint).toFixed(2)}</h6>
                          :  this.state.tipval.tip.stockSuggestion == "Sell"  && this.state.tipval.tip.createTipPrice < this.state.tipval.tip.createTipPrice && this.state.tipval.tip.createTipPrice >= this.state.tipval.tip.stopPoint ?
                           <h6 style={{color : "black"}}><span>$</span>{parseFloat(this.state.tipval.tip.stopPoint).toFixed(2)}</h6>
                          :<h6 style={{color : "black"}}><span>$</span>{parseFloat(this.state.tipval.tip.stopPoint).toFixed(2)}</h6>
                          }  
                          </li>
                          <li className="tip">AT TIME OF TIP<br/><h6 className="hclass"><span>$</span>{Number(this.state.tipval.tip.createTipPrice).toFixed(2)}</h6></li>  
                          </ul>
                          <ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{margin: "0px" , padding:"0px"}}>
                              <li style={{width : "65%"}}><h6>{this.state.tipval.tip.comment}</h6></li>
                                                      
                          </ul>

                          <ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{margin: "0px" , padding:"0px"}}>
                            <li><img src={`https://apis.tradetipsapp.com/api/appUser/getImageByTipId?tipId=${this.state.tipval.tip.id}`} alt="pic" width="250" height="150" onError={this.addDefaultTip} class="img-responsive"/></li>
                          </ul>


                           
                  <ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{margin: "0px" , padding:"0px"}}>

                    <li><img src={process.env.PUBLIC_URL + '/comment.jpeg'} style={{cursor: "pointer"}} className="image-responsive" height="18" width="20"/>&nbsp;<span>{this.state.tipval.commentCount}</span></li>
                                       
                     {
                        this.state.tipval.userPinStatus === true ?
                        <li onClick={this.newhandleunPinResult.bind(this, this.state.tipval.tip.id)}><img src={process.env.PUBLIC_URL + '/savetip.png'} style={{height : "15px", cursor: "pointer"}} />&nbsp;{this.state.tipval.pinCount}</li>
                       :<li onClick={this.newhandlePinResult.bind(this, this.state.tipval.tip.id)}><img src={process.env.PUBLIC_URL + '/show.jpeg'} style={{height : "15px", cursor: "pointer"}} />&nbsp;{this.state.tipval.pinCount}</li>
                      }    

                      {
                        this.state.tipval.userLikeStatus === true ?
                        <li onClick={this.newhandleunlikeResult.bind(this, this.state.tipval.tip.id)}><img src={process.env.PUBLIC_URL + '/unnamed.png'} style={{height : "15px", cursor: "pointer"}} />&nbsp;{this.state.tipval.likeCount}</li>  
                       :<li onClick={this.newhandlelikeResult.bind(this, this.state.tipval.tip.id)}><img src={process.env.PUBLIC_URL + '/like.jpeg'} style={{height : "15px", cursor: "pointer"}} />&nbsp;{this.state.tipval.likeCount}</li>
                      }  

                     <li data-toggle="modal" data-target={`#myModalinfo${this.state.tipval.tip.id}`}><img src={process.env.PUBLIC_URL + '/info.jpeg'} style={{height : "15px", cursor: "pointer"}} />&nbsp;</li>                  
                      <div id={`myModalinfo${this.state.tipval.tip.id}`} class="modal fade" role="dialog" tabindex="-1">
                        <div class="modal-dialog">
                          <div class="modal-content">
                           <div class="modal-body">
                              <li style={{textAlign: "center" , border: "1px solid #0000007a" , color : "#007bffc4" , height : "50px" , paddingTop : "5px"}}><img src="/IMG-20200819-WA0007.jpg" class="img-responsive" width="12"/> Share Tip      <button onClick={this.copyClipboard.bind(this, this.state.tipval.tip.id)}  type="button" class="btn btn-primary" data-toggle="modal"  data-target="#myModalclipdata" data-dismiss="modal">Copy to Clipboard</button></li>
                              <span id={`divClipboard${this.state.tipval.tip.id}`}  style={{position : "absolute" , opacity : ".01" , height : "0" , overflow : "hidden"}}>
                                ${this.state.tipval.tip.stockName} Current price: ${parseFloat( this.state.tipLatestprice).toFixed(2)} Suggested entry: ${parseFloat(this.state.tipval.tip.entryPoint).toFixed(2)} exit: ${parseFloat(this.state.tipval.tip.exitPoint).toFixed(2)} stop: ${parseFloat(this.state.tipval.tip.stopPoint).toFixed(2)} Stock tip by {this.state.tipval.tip.appUser.userName} on TradeTips. Download at TradeTipsApp.com
                               </span>                            
                              <li style={{color: "red" , textAlign: "center" , border: "1px solid #0000007a" , height : "50px" , paddingTop : "12px"}} onClick={this.newhandleRemoveTipResult.bind(this, this.state.tipval.tip.id)}><i class="fa fa-trash" aria-hidden="true"></i> Remove Tip</li>
                              <li data-dismiss="modal" style={{textAlign: "center" , border: "1px solid #0000007a" , color : "#007bffc4" , height : "50px" , paddingTop : "12px"}}> Cancel</li>
                            </div>
                         </div>
                       </div>
                      </div>

                      <div id="myModalclipdata" class="modal fade" role="dialog"  tabindex="-1">
                        <div class="modal-dialog">
                          <div class="modal-content">
                           <div class="modal-body">
                              <li style={{textAlign: "center" , border: "1px solid #0000007a" , color : "#007bffc4" , height : "50px" , paddingTop : "5px"}}><i class="fa fa-share" aria-hidden="true"></i> Share Tip      <button class="btn btn-success">Copied</button></li>
                              <li data-dismiss="modal" style={{textAlign: "center" , border: "1px solid #0000007a" , color : "#007bffc4" , height : "50px" , paddingTop : "12px"}}> Cancel</li>
                            </div>
                           </div>
                         </div>
                      </div>
                      <Modal size="sm" show={this.state.showHide}>
                        <Modal.Body><center><h4><b>Remove Tip</b></h4></center><br/><center><h6><b>It'll be gone forever</b></h6></center><br/>
                         <Modal.Footer style={{display: "inline" , marginLeft : "4.5rem" , padding : "0px"}}>
                          <Button className="btn btn-primary" variant="secondary" onClick={this.newhandleRemoveTipResultData.bind(this, this.state.tipval.tip.id)}>
                            Ok
                          </Button>
                          <Button className="btn btn-primary" variant="secondary" onClick={() => this.handleModalShowHide()}>
                            Cancel
                          </Button>
                          </Modal.Footer>
                        </Modal.Body>
                      </Modal>
                  </ul>
                   
                  </div>
                  <div className="col-md-6">
                    <ul class="list-group" style={{overflowY : "scroll" , height : "300px"}}>
                                 

                         {this.state.tipparticluarCommentval.reverse().map((itemd, i) =>

                        <li class="list-group-item">
                          <div class="row">
                            <div class="col-xs-2 col-md-2">
                              <img src={`https://apis.tradetipsapp.com/api/appUser/getImageByAppUserId?appUserId=${itemd.userId}`} onError={this.addDefaultSrc} alt="pic" width="50" height="50" class="rounded-circle" /></div>
                            
                            <div class="col-xs-9 col-md-9">
                              <div style={{color : "blue"}}>
                                {itemd.appUser.userName}
                              </div>
                              <div class="comment-text" style={{color: "black"}}>
                                {itemd.commentDetails}
                              </div>                    
                            </div>
                            <div class="col-xs-1 col-md-1">
                              <input type="hidden" name="secondId" value={itemd.userId} id="secondId" ref={(input) => { this.secondId = input }} />
                              <input type="hidden" name="fristid" value={itemd.id} id="fristid" ref={(input) => { this.fristid = input }} />
                             
                              <a onClick={this.flagCommnetrue.bind(itemd.userId,itemd.id)} ><img src="flag.png" width="20" height="20" /></a>
                           
                            </div>
                          </div>
                        </li>

                     
                          )}
                     </ul>  
                    <form noValidate onSubmit={this.onSubmit}>
                      <input type="hidden" name="id" value={this.state.tipval.tip.id} ref={(input) => { this.id = input }} />
                      <input type="hidden" name="userId" value={this.state.tipval.tip.userId} id="currntIdUser" ref={(input) => { this.currntIdUser = input }} />
                      <input type="hidden" name="status" value="Pending"/>
                      <textarea className="form-control" name="commentDetails" value={this.state.commentDetails} placeholder="Enter Comment" onChange={(event) => { this.setState({ commentDetails: event.target.value }) }}></textarea>
                      <br></br>
                      <input type="submit" className="btn btn-primary" value="Add"/> &nbsp;&nbsp;
                      <a href={`/faq${this.state.tokendata}`}><input type="button" className="btn btn-primary" value="Back"/></a>
                    </form>                                        
                  </div>
                </div>                                    
              </div>
                  
                       
              
              </div>

            </div>

          </div>

        )

       }

      }

  }

export default TipDetail
