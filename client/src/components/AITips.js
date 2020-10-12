import React, {Input, PureComponent, Fragment, Component, useState, useEffect } from 'react';
import datalink from 'react';
import Demo from './Demo';
import { Button, Modal } from 'react-bootstrap';
import { MDBIcon } from "mdbreact";
import 'bootstrap/dist/css/bootstrap.min.css';

var FormData = require('form-data');
var url_string = window.location.href;
var urls = new URL(url_string);
var tokens = urls.searchParams.get("accessToken");
var tokensdata = urls.searchParams.get("tokendata");
var userid = urls.searchParams.get("uname");

const imagesPath = {
      minus: "like.jpeg",
      plus: "unnamed.png"
    }

  class AITips extends Component {
    constructor(props) {
      super(props)
        this.state = {
          contacts: [],
          tokendata : "",
          tokensdata : "",
          list: null,
          stocklistF: [],
          stocklistdataF: [],
          aitipStocklist: null,
          tipLatestprice: null,
          dataaa : [],
          tipval : [],
          tipId : "",
          item: this.props.item,
          show : true,
          tipval : [],
          tipId : "",
          userid : "",
          status : "",
          commentDetails : "",
          open: true,
          showHide: false,

        };

      // this.delete = this.delete.bind(this);

    }



    getImageName = () => this.state.open ? 'plus' : 'minus'

    async componentDidMount() {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${tokensdata}`);

          var myHeaders1 = new Headers();
          myHeaders1.append("Cookie", "ctoken=dd44d368ddc944ddb0cf27de108f0e56");


        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          redirect: 'follow'
        };

        const response = await fetch(`https://apistest.tradetipsapp.com/api/stockDetail/getAllStockOfUserByUserName?userName=${userid}`, requestOptions)

        const result = await response.json();

        // console.log(result);

        this.setState({aiStocklist:result})

        // if(result.length != 0){

        //         let users = [];
        //         let usersStock = [];


        //       for(var i= 0; i < result.length ; i++){

               
        //         var formdata = new FormData();
        //         formdata.append("stockSymbol", result[i].stockSymbol);

        //         var requestOp = {
        //           method: 'POST',
        //           headers: myHeaders,
        //           body: formdata,
        //           redirect: 'follow'
        //         };

        //         const responseone = await fetch(`https://apis.tradetipsapp.com/api/sectorNewsSentiment/getSentimentandSMAByStockSymbolResultSet`, requestOp);
                 
        //         const responsetwo = await responseone.json();

        //           users.push(responsetwo);


        //         var requestOp1 = {
        //           method: 'GET',
        //           headers: myHeaders1,
        //           redirect: 'follow'
        //         };
        

        //       const responseone1 = await fetch(`https://cloud.iexapis.com/stable/stock/market/batch?types=quote&token=pk_dd324da3fb5f4428a47b05ab12f23ce2&symbols=${result[i].stockSymbol}`, requestOp1);

        //       const responsetwo1 = await responseone1.json();

        //          usersStock.push(responsetwo1);

        //       } 

        //       console.log(usersStock);

        //       console.log(users);

              
       
        //   this.setState({stocklistF:users , stocklistdataF : usersStock })

        //   } else {

        //      this.setState({ stocklistF: null , stocklistdataF : null })

        //   }
               

          if(result.length > 0){

            let users = [];

            let stckusers = [];

            let stckdata = [];

          for(var i= result.length - 1; i >= 0 ; i--){

            users.push(result[i].stockSymbol);

             // console.log(users);


          var myHeaders1 = new Headers();
          myHeaders1.append("Authorization", `Bearer ${tokensdata}`);    

          var formdata = new FormData();
          formdata.append("stockSymbol", result[i].stockSymbol);

          var requestOptions = {
            method: 'POST',
            headers: myHeaders1,
            body: formdata,
            redirect: 'follow'
          };


          const responseonek = await fetch(`https://apistest.tradetipsapp.com/api/sectorNewsSentiment/getSentimentandSMAByStockSymbolResultSet`, requestOptions);
                 
          const responsetwok = await responseonek.json();

           // console.log(responsetwok);

           // console.log(responsetwok.status == 500);

           if(responsetwok.status == 500){

           }else{

             var filtered = responsetwok.filter(function (el) {
              return el.status != 500;
            });

           }
            

          if(filtered.length > 0){

             // console.log(filtered);

             stckusers.push(filtered); 


          }


           // console.log(responsetwok);


          var myHeaders = new Headers();
          myHeaders.append("Cookie", "ctoken=dd44d368ddc944ddb0cf27de108f0e56");

          var requestOp = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
          };


          const responseone = await fetch(`https://cloud.iexapis.com/stable/stock/market/batch?types=quote&token=pk_dd324da3fb5f4428a47b05ab12f23ce2&symbols=${result[i].stockSymbol}`, requestOp);

          const responsetwo = await responseone.json();

           
           if(filtered.length > 0){

            // console.log(responsetwo[result[i].stockSymbol].quote.companyName);

            stckdata.push(responsetwo[result[i].stockSymbol].quote);


          }
               
          }

          // console.log(stckdata);

          this.setState({stocklistF:stckusers , stocklistdataF : stckdata})

         }else{

          this.setState({ stocklistF: null , stocklistdataF : null })

         }

       
    }

    render() {

  
        return (
       
          <div>

            {

              this.state.stocklistF ?

                <div>
            
                  {

                  Object.keys(this.state.stocklistF && this.state.stocklistdataF).map((items , key) =>

                  <div className="card text-white mb-3 testtoo"  data-toggle="modal" data-target={`#exampleModal${this.state.stocklistF[items][0].id}`}>

                    <div>
                 
                      <div> 


                         <div className="card-header">  
   
                            <ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{margin: "0px" , padding:"0px"}}>
                             
                              <li><img src="ailogo.png" alt="pic" width="40" height="40" />&nbsp;&nbsp;<span>TradeTips AI</span></li>
                                {
                                  this.state.stocklistF[items][0].rsiResult == "buy" ?
                                  <li className="suggestion"><span className="Buy">BUY</span></li>
                                  :  this.state.stocklistF[items][0].rsiResult == "sell" ?
                                  <li className="suggestion"><span className="Sell">SELL</span></li>
                                  :<li className="suggestion"><span className="Avoid">AVOID</span></li>
                                }
                    
                            </ul> 
                            <div class="modal fade bs-example-modal-xl custom-modal" id={`exampleModal${this.state.stocklistF[items][0].id}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                              <div class="modal-dialog modal-xl" role="document">
                               <div class="modal-content modal-xl" id="datamodel">
                                <div className="modal-body modal-xl">
                                  <div className="card-header">
                                    <ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{margin: "0px" , padding:"0px"}} data-toggle="modal" data-target={`#exampleModal${this.state.stocklistF[items][0].id}`}>
                             
                                      <li><img src="ailogo.png" alt="pic" width="40" height="40" />&nbsp;&nbsp;<span>TradeTips AI</span></li>
                                        {
                                          this.state.stocklistF[items][0].rsiResult == "buy" ?
                                          <li className="suggestion"><span className="Buy">BUY</span></li>
                                          :  this.state.stocklistF[items][0].rsiResult == "sell" ?
                                          <li className="suggestion"><span className="Sell">SELL</span></li>
                                          :<li className="suggestion"><span className="Avoid">AVOID</span></li>
                                        }
                            
                                    </ul>
                                  </div>
                                  <div className="card-body" style={{padding:"4px"}}>  

                                      <ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{paddingTop:"5px"}}>
                                        <li><h5 style={{color: "black"}}>{this.state.stocklistdataF[items].symbol}</h5>{this.state.stocklistdataF[items].companyName}</li>

                                        <li><h6 className="hclass"><span>$</span>{parseFloat(this.state.stocklistdataF[items].latestPrice).toFixed(2)}</h6>
                                         {
                                              this.state.stocklistdataF[items].change > 0 ?
                                              <h6 className="green"><span>{(this.state.stocklistdataF[items].change).toFixed(2)}</span><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
                                                <path fill-rule="evenodd" d="M7.646 2.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8 3.707 5.354 6.354a.5.5 0 1 1-.708-.708l3-3z"/>
                                                </svg>
                                              </h6> :
                                              <h6 className="red">{Math.abs(this.state.stocklistdataF[items].change).toFixed(2)}<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                <path fill-rule="evenodd" d="M4.646 9.646a.5.5 0 0 1 .708 0L8 12.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z"/>
                                                <path fill-rule="evenodd" d="M8 2.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0V3a.5.5 0 0 1 .5-.5z"/>
                                                </svg>
                                              </h6>
                                            }  
                                       </li>  

                                      </ul>  

                                     <ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{margin: "0px" , padding:"0px"}}>

                                        <li style={{color: "black"}}>Moving Averages</li> 
                                         
                                      </ul> 

                                      <ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{margin: "0px" , padding:"0px"}}>


                                        <li>10 Days<br/>
                                         {
                                          this.state.stocklistF[items][0].avg10days < parseFloat(this.state.stocklistdataF[items].latestPrice).toFixed(2) ?
                                          <h6 style={{color: "green"}}><span>{">"}$</span>{parseFloat(this.state.stocklistF[items][0].avg10days).toFixed(2)}</h6>
                                          :  this.state.stocklistF[items][0].avg10days > parseFloat(this.state.stocklistdataF[items].latestPrice).toFixed(2) ?
                                           <h6 style={{color: "red"}}><span>{"<"}$</span>{parseFloat(this.state.stocklistF[items][0].avg10days).toFixed(2)}</h6>
                                          :<h6 style={{color: "red"}}><span>{"<"}$</span>{parseFloat(this.state.stocklistF[items][0].avg10days).toFixed(2)}</h6>
                                          } 
                                          
                                       
                                        </li>
                                        <li>50 Days<br/>
                                       
                                          {
                                          this.state.stocklistF[items][0].avg50days < parseFloat(this.state.stocklistdataF[items].latestPrice).toFixed(2) ?
                                          <h6 style={{color: "green"}}><span>{">"}$</span>{parseFloat(this.state.stocklistF[items][0].avg50days).toFixed(2)}</h6>
                                          :  this.state.stocklistF[items][0].avg50days > parseFloat(this.state.stocklistdataF[items].latestPrice).toFixed(2) ?
                                           <h6 style={{color: "red"}}><span>{"<"}$</span>{parseFloat(this.state.stocklistF[items][0].avg50days).toFixed(2)}</h6>
                                          :<h6 style={{color: "red"}}><span>{"<"}$</span>{parseFloat(this.state.stocklistF[items][0].avg50days).toFixed(2)}</h6>
                                          }  
                                        </li>
                                        <li>200 Days<br/>
                                       
                                         {
                                          this.state.stocklistF[items][0].avg200days < parseFloat(this.state.stocklistdataF[items].latestPrice).toFixed(2) ?
                                          <h6 style={{color: "green"}}><span>{">"}$</span>{parseFloat(this.state.stocklistF[items][0].avg200days).toFixed(2)}</h6>
                                          :  this.state.stocklistF[items][0].avg200days > parseFloat(this.state.stocklistdataF[items].latestPrice).toFixed(2) ?
                                           <h6 style={{color: "red"}}><span>{"<"}$</span>{parseFloat(this.state.stocklistF[items][0].avg200days).toFixed(2)}</h6>
                                          :<h6 style={{color: "red"}}><span>{"<"}$</span>{parseFloat(this.state.stocklistF[items][0].avg200days).toFixed(2)}</h6>
                                          } 
                                        </li>

                                        <li>

                                        </li>
                                          
                                      </ul>

                                      <ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{margin: "0px" , padding:"0px"}}>
                                        
                                            

                                        {
                                          
                                          this.state.stocklistF[items][0].news_sector_sentiment == "Positive" ?

                                          <li style={{width : "65%"}}><h6>{this.state.stocklistF[items][0].sector_name} Sector News <span className="news" style={{color : "green"}}><br/><p style={{color : "#a3b1ad" , fontSize : "12px"}}>(Sentiment Based On {this.state.stocklistF[items][0].sector_news} News Source)</p>Positive</span></h6></li>
                                          :  this.state.stocklistF[items][0].news_sector_sentiment == "Negative"?
                                          <li style={{width : "65%"}}><h6>{this.state.stocklistF[items][0].sector_name} Sector News <span className="news" style={{color : "red"}}><br/><p style={{color : "#a3b1ad" , fontSize : "12px"}}>(Sentiment Based On {this.state.stocklistF[items][0].sector_news} News Source)</p>Negative</span></h6></li>
                                          :  this.state.stocklistF[items][0].news_sector_sentiment == "Neutral"?
                                          <li style={{width : "65%"}}><h6>{this.state.stocklistF[items][0].sector_name} Sector News <span className="news" style={{color : "black"}}><br/><p style={{color : "#a3b1ad" , fontSize : "12px"}}>(Sentiment Based On {this.state.stocklistF[items][0].sector_news} News Source)</p>Neutral</span></h6></li>
                                          :<li style={{width : "69%"}}><h6>{this.state.stocklistF[items][0].sector_name} Sector News <span className="news" style={{color : "red"}}><br/><p style={{color : "#a3b1ad" , fontSize : "12px"}}>(Sentiment Based On {this.state.stocklistF[items][0].sector_news} News Source)</p>Very Negative</span></h6></li>

                                        } 

                                      </ul>

                                      <ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{margin: "0px" , padding:"0px"}}>
                                        
                                        <li>{this.state.stocklistF[items][0].news_source_name} <span style={{marginLeft : "40rem"}}>{this.state.stocklistF[items][0].news_publish_date}</span><br/>
                                          <a target="_blank" style={{textDecoration : "none"}} href={this.state.stocklistF[items][0].sector_news_url}><h5 style={{color : "blue"}}>{this.state.stocklistF[items][0].news_title}</h5><br/>
                                          <h6 style={{marginTop : "-2rem" , color : "#6c757d"}}>{this.state.stocklistF[items][0].news_summary}</h6></a>
                                        </li>

                                      </ul>
                                       <ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{margin: "0px" , padding:"0px"}}>
                                        
                                          <li>{this.state.stocklistF[items][1].news_source_name} <span style={{marginLeft : "40rem"}}>{this.state.stocklistF[items][1].news_publish_date}</span><br/>
                                            <a target="_blank" style={{textDecoration : "none"}} href={this.state.stocklistF[items][1].sector_news_url}><h5 style={{color : "blue"}}>{this.state.stocklistF[items][1].news_title}</h5><br/>
                                            <h6 style={{marginTop : "-2rem" , color : "#6c757d"}}>{this.state.stocklistF[items][1].news_summary}</h6></a>                                 
                                          </li>
                                       </ul>
                                      <ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{margin: "0px" , padding:"0px"}}>
                                        
                                        <li>{this.state.stocklistF[items][2].news_source_name} <span style={{marginLeft : "40rem"}}>{this.state.stocklistF[items][2].news_publish_date}</span><br/>
                                          <a target="_blank" style={{textDecoration : "none"}} href={this.state.stocklistF[items][2].sector_news_url}><h5 style={{color : "blue"}}>{this.state.stocklistF[items][2].news_title}</h5><br/>
                                          <h6 style={{marginTop : "-2rem" , color : "#6c757d"}}>{this.state.stocklistF[items][2].news_summary}</h6></a>
                                        </li>
                                      </ul>
                                      <ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{margin: "0px" , padding:"0px"}}>
                                        
                                        <li>{this.state.stocklistF[items][3].news_source_name} <span style={{marginLeft : "40rem"}}>{this.state.stocklistF[items][3].news_publish_date}</span><br/>
                                          <a target="_blank" style={{textDecoration : "none"}} href={this.state.stocklistF[items][3].sector_news_url}><h5 style={{color : "blue"}}>{this.state.stocklistF[items][3].news_title}</h5><br/>
                                          <h6 style={{marginTop : "-2rem" , color : "#6c757d"}}>{this.state.stocklistF[items][3].news_summary}</h6></a>
                                        </li>
                                      </ul>
                                      <ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{margin: "0px" , padding:"0px"}}>
                                        
                                        <li>{this.state.stocklistF[items][4].news_source_name} <span style={{marginLeft : "40rem"}}>{this.state.stocklistF[items][4].news_publish_date}</span><br/>
                                          <a target="_blank" style={{textDecoration : "none"}} href={this.state.stocklistF[items][3].sector_news_url}><h5 style={{color : "blue"}}>{this.state.stocklistF[items][4].news_title}</h5><br/>
                                          <h6 style={{marginTop : "-2rem" , color : "#6c757d"}}>{this.state.stocklistF[items][4].news_summary}</h6></a>
                                        </li>
                                        
                                      </ul>
                             
                                   </div>
                                </div>                      
                               </div>
                              </div>
                            </div> 
                         </div>                         

                          <div className="card-body" style={{padding:"4px"}}>  
                          
                            <ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{paddingTop:"5px"}}>
                              <li><h5 style={{color: "black"}}>{this.state.stocklistdataF[items].symbol}</h5>{this.state.stocklistdataF[items].companyName}</li>

                              <li><h6 className="hclass"><span>$</span>{parseFloat(this.state.stocklistdataF[items].latestPrice).toFixed(2)}</h6>
                               {
                                    this.state.stocklistdataF[items].change > 0 ?
                                    <h6 className="green"><span>{(this.state.stocklistdataF[items].change).toFixed(2)}</span><svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                      <path fill-rule="evenodd" d="M8 3.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
                                      <path fill-rule="evenodd" d="M7.646 2.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8 3.707 5.354 6.354a.5.5 0 1 1-.708-.708l3-3z"/>
                                      </svg>
                                    </h6> :
                                    <h6 className="red">{Math.abs(this.state.stocklistdataF[items].change).toFixed(2)}<svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-down" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                      <path fill-rule="evenodd" d="M4.646 9.646a.5.5 0 0 1 .708 0L8 12.293l2.646-2.647a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 0-.708z"/>
                                      <path fill-rule="evenodd" d="M8 2.5a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0V3a.5.5 0 0 1 .5-.5z"/>
                                      </svg>
                                    </h6>
                                  }  
                             </li>  

                            </ul>  

                           <ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{margin: "0px" , padding:"0px"}}>

                              <li style={{color: "black"}}>Moving Averages</li> 
                               
                            </ul> 

                            <ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{margin: "0px" , padding:"0px"}}>


                              <li>10 Days<br/>
                               {
                                this.state.stocklistF[items][0].avg10days < parseFloat(this.state.stocklistdataF[items].latestPrice).toFixed(2) ?
                                <h6 style={{color: "green"}}><span>{">"}$</span>{parseFloat(this.state.stocklistF[items][0].avg10days).toFixed(2)}</h6>
                                :  this.state.stocklistF[items][0].avg10days > parseFloat(this.state.stocklistdataF[items].latestPrice).toFixed(2) ?
                                 <h6 style={{color: "red"}}><span>{"<"}$</span>{parseFloat(this.state.stocklistF[items][0].avg10days).toFixed(2)}</h6>
                                :<h6 style={{color: "red"}}><span>{"<"}$</span>{parseFloat(this.state.stocklistF[items][0].avg10days).toFixed(2)}</h6>
                                } 
                                
                             
                              </li>
                              <li>50 Days<br/>
                             
                                {
                                this.state.stocklistF[items][0].avg50days < parseFloat(this.state.stocklistdataF[items].latestPrice).toFixed(2) ?
                                <h6 style={{color: "green"}}><span>{">"}$</span>{parseFloat(this.state.stocklistF[items][0].avg50days).toFixed(2)}</h6>
                                :  this.state.stocklistF[items][0].avg50days > parseFloat(this.state.stocklistdataF[items].latestPrice).toFixed(2) ?
                                 <h6 style={{color: "red"}}><span>{"<"}$</span>{parseFloat(this.state.stocklistF[items][0].avg50days).toFixed(2)}</h6>
                                :<h6 style={{color: "red"}}><span>{"<"}$</span>{parseFloat(this.state.stocklistF[items][0].avg50days).toFixed(2)}</h6>
                                }  
                              </li>
                              <li>200 Days<br/>
                             
                               {
                                this.state.stocklistF[items][0].avg200days < parseFloat(this.state.stocklistdataF[items].latestPrice).toFixed(2) ?
                                <h6 style={{color: "green"}}><span>{">"}$</span>{parseFloat(this.state.stocklistF[items][0].avg200days).toFixed(2)}</h6>
                                :  this.state.stocklistF[items][0].avg200days > parseFloat(this.state.stocklistdataF[items].latestPrice).toFixed(2) ?
                                 <h6 style={{color: "red"}}><span>{"<"}$</span>{parseFloat(this.state.stocklistF[items][0].avg200days).toFixed(2)}</h6>
                                :<h6 style={{color: "red"}}><span>{"<"}$</span>{parseFloat(this.state.stocklistF[items][0].avg200days).toFixed(2)}</h6>
                                } 
                              </li>

                              <li>

                              </li>
                                
                            </ul>

                            <ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{margin: "0px" , padding:"0px"}}>
                              
                              {
                                
                                this.state.stocklistF[items][0].news_sector_sentiment == "Positive" ?

                                <li style={{width : "65%"}}><h6>{this.state.stocklistF[items][0].sector_name} News <span className="news" style={{color : "green"}}>Positive</span></h6></li>
                                :  this.state.stocklistF[items][0].news_sector_sentiment == "Negative"?
                                <li style={{width : "65%"}}><h6>{this.state.stocklistF[items][0].sector_name} News <span className="news" style={{color : "red"}}>Negative</span></h6></li>
                                :  this.state.stocklistF[items][0].news_sector_sentiment == "Neutral"?
                                <li style={{width : "65%"}}><h6>{this.state.stocklistF[items][0].sector_name} News <span className="news" style={{color : "black"}}>Neutral</span></h6></li>
                                :<li style={{width : "69%"}}><h6>{this.state.stocklistF[items][0].sector_name} News <span className="news" style={{color : "red"}}>Very Negative</span></h6></li>

                              } 

                            </ul>

                            <ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{margin: "0px" , padding:"0px"}}>
                              
                              <li>{this.state.stocklistF[items][0].news_source_name}<br/>
                                <h6>{this.state.stocklistF[items][0].news_title}</h6>
                              </li>

                            </ul>

                            <ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{margin: "0px" , padding:"0px"}}>
                              
                              <li>{this.state.stocklistF[items][1].news_source_name}<br/>
                                <h6>{this.state.stocklistF[items][1].news_title}</h6>
                              </li>

                            </ul>
                            <ul className="list-unstyled d-flex justify-content-between font-small text-muted mb-0" style={{margin: "0px" , padding:"0px"}}>
                              
                              <li>{this.state.stocklistF[items][2].news_source_name}<br/>
                                <h6>{this.state.stocklistF[items][2].news_title}</h6>
                              </li>

                            </ul>
                           
                          </div>

                      </div>


                    </div>

                  </div>

                  )}

                </div>:  <h2>No Stock Added</h2>

            }
          </div>:null


        )

    }

}              


export default AITips 
