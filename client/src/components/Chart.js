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


  class Chart extends Component {
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
          show : true,
          datak : []
      };    
    }


    handle5dayResult = e => {

      // alert(e);


         var myHeaders1 = new Headers();
          myHeaders1.append("Authorization", `Bearer ${tokensdata}`);    

          var formdata = new FormData();
          formdata.append("stockName", stokNme);

          var requestOp = {
            method: 'POST',
            headers: myHeaders1,
            body: formdata,
            redirect: 'follow'
          };


          fetch(`https://apis.tradetipsapp.com/api/getcsvfile/getstockjsonfile`, requestOp)
         .then(response => response.json())
          .then(results => {

         var stocktime = [];
         var stockhigh = [];
         var stocklow = [];
         var newdatekk = [];
         var totalreslt = [];
         var dataaaf = [];

         var ress = results.slice(Math.max(results.length - 5, 0));
         console.log(ress);

           for(var i=0; i< ress.length; i++){
            newdatekk.push(ress[i]);
            stockhigh.push(ress[i].Close);
            stocklow.push(ress[i].Close);
               

          }


      dataaaf = newdatekk;


      this.setState({

        stockhighvalds : stockhigh ,
        stocklowvalds : stocklow ,
        contactds : dataaaf

      })

     });

    }

    handle1mnthResult = e => {

      // alert(e);
          var myHeaders1 = new Headers();
          myHeaders1.append("Authorization", `Bearer ${tokensdata}`);    

          var formdata = new FormData();
          formdata.append("stockName", stokNme);

          var requestOp = {
            method: 'POST',
            headers: myHeaders1,
            body: formdata,
            redirect: 'follow'
          };


          fetch(`https://apis.tradetipsapp.com/api/getcsvfile/getstockjsonfile`, requestOp)
          .then(response => response.json())
          .then(results => {
        
           var stockhigh = [];
           var stocklow = [];
           var newdate = [];
           var dataaaf = [];
           var ress = results.slice(Math.max(results.length - 30, 0));
           console.log(ress);

           for(var i=0; i< ress.length; i++){
            newdate.push(ress[i]);
            stockhigh.push(ress[i].Close);
            stocklow.push(ress[i].Close);
               

          }
           dataaaf = newdate;


      this.setState({

        stockhighval1mnth : stockhigh ,
        stocklowval1mnth : stocklow ,
        contact1mnth : dataaaf

      })

       // console.log(dataaaf);

     });

    }

    handle3mnthResult = e => {

      // alert(e);

         var myHeaders1 = new Headers();
          myHeaders1.append("Authorization", `Bearer ${tokensdata}`);    

          var formdata = new FormData();
          formdata.append("stockName", stokNme);

          var requestOp = {
            method: 'POST',
            headers: myHeaders1,
            body: formdata,
            redirect: 'follow'
          };


          fetch(`https://apis.tradetipsapp.com/api/getcsvfile/getstockjsonfile`, requestOp)
          .then(response => response.json())
          .then(results => {
             // alert("call data");
            // alert(results);

         var stocktime = [];
         var stockhigh = [];
         var stocklow = [];

         var newdate = [];
         var dataaaf = [];


          var ress = results.slice(Math.max(results.length - 90, 0));
          console.log(ress);

           for(var i=0; i< ress.length; i++){
            newdate.push(ress[i]);
            stockhigh.push(ress[i].Close);
            stocklow.push(ress[i].Close);
               

          }
           dataaaf = newdate;


      this.setState({

        stockhighval3mnth : stockhigh ,
        stocklowval3mnth : stocklow ,
        contact3mnth : dataaaf

      })

      // console.log(dataaaf);

     });

    }

    handle6mnthResult = e => {

      // alert(e);

          var myHeaders1 = new Headers();
          myHeaders1.append("Authorization", `Bearer ${tokensdata}`);    

          var formdata = new FormData();
          formdata.append("stockName", stokNme);

          var requestOp = {
            method: 'POST',
            headers: myHeaders1,
            body: formdata,
            redirect: 'follow'
          };


          fetch(`https://apis.tradetipsapp.com/api/getcsvfile/getstockjsonfile`, requestOp)
          .then(response => response.json())
          .then(results => {
             // alert("call data");
            // alert(results);

         var stocktime = [];
         var stockhigh = [];
         var stocklow = [];

         var totalreslt = [];
         var dataaaf = [];


          var ress = results.slice(Math.max(results.length - 180, 0));
          console.log(ress);

           for(var i=0; i< ress.length; i++){
            totalreslt.push(ress[i]);
            stockhigh.push(ress[i].Close);
            stocklow.push(ress[i].Close);
               

          }
           dataaaf = totalreslt;


      this.setState({

        stockhighval6mnth : stockhigh ,
        stocklowval6mnth : stocklow ,
        contact6mnth : dataaaf

      })

      // console.log(dataaaf);

     });

    }

    handle1yearResult = e => {

      // alert(e);

          var myHeaders1 = new Headers();
          myHeaders1.append("Authorization", `Bearer ${tokensdata}`);    

          var formdata = new FormData();
          formdata.append("stockName", stokNme);

          var requestOp = {
            method: 'POST',
            headers: myHeaders1,
            body: formdata,
            redirect: 'follow'
          };


          fetch(`https://apis.tradetipsapp.com/api/getcsvfile/getstockjsonfile`, requestOp)
          .then(response => response.json())
          .then(results => {
             // alert("call data");
            // alert(results);

         var stocktime = [];
         var stockhigh = [];
         var stocklow = [];

         var totalresltk = [];
         var dataaaf = [];


         var ress = results.slice(Math.max(results.length - 365, 0));
         console.log(ress);

           for(var i=0; i< ress.length; i++){
            totalresltk.push(ress[i]);
            stockhigh.push(ress[i].Close);
            stocklow.push(ress[i].Close);
               

          }
           dataaaf = totalresltk;


      this.setState({

        stockhighval1year : stockhigh ,
        stocklowval1year : stocklow ,
        contact1year : dataaaf

      })

      // console.log(dataaaf);

     });

    }
   
   
   
   

     async componentDidMount() {

       endTime = new Date();
   
    // document.getElementById("timeToRender").innerHTML = "Time to Render: " + (endTime - startTime) + "ms";
      
      const id = this.props.location.search;

      this.setState({tokendata:id})

      var myHeaders = new Headers();
      myHeaders.append("Cookie", "ctoken=dd44d368ddc944ddb0cf27de108f0e56");

      var requestOp = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      const response = await fetch(`https://cloud.iexapis.com/stable/stock/${stokNme}/chart/1d?token=pk_dd324da3fb5f4428a47b05ab12f23ce2`, requestOp)

      const results = await response.json();

       

         var stocktime = [];
         var stockhigh = [];
         var stocklow = [];

         var totalreslt = [];
         var dataaa = [];


          for(var i=0; i< results.length; i++){

            stocktime.push(results[i].minute);
            stockhigh.push(results[i].high);
            stocklow.push(results[i].low);
               

          }

           totalreslt = results.length;
           dataaa = results;

 
      this.setState({

        stocklist: stocktime ,
        stockhighval : stockhigh ,
        stocklowval : stocklow ,
        newstockval : totalreslt ,
        contacts : dataaa

      })

     

    }

  

    render() {

      

    const a = null

    function filter_array(test_array) {
    var index = -1,
        arr_length = test_array ? test_array.length : 0,
        resIndex = -1,
        result = [];

    while (++index < arr_length) {
        var value = test_array[index];

        if (value) {
            result[++resIndex] = value;
        }
    }

    return result;
   }
   
   // console.log(this.state.newstockval);

    // console.log(this.state.contacts);
    var arraydata = this.state.contacts;
    arraydata = arraydata.filter(function (n) { return n.high !== null });
    var highvaldata = this.state.stockhighval;
    var lowvaldata = this.state.stocklowval;
    var dataakhigh = Math.max.apply(null, highvaldata);
    var filtered = filter_array(lowvaldata);
    var dataaklow = Math.min.apply(null, filtered);
          var y ;    
          var data = [];
          var dataSeries = { type: "line" };
          var dataPoints = [];
            for (var i = 0 ; i < arraydata.length; i ++) {
              dataPoints.push({
              x: i,
              label : arraydata[i].label,
              y: arraydata[i].low
            });
          }
       dataSeries.dataPoints = dataPoints;
       data.push(dataSeries);
       // console.log(dataPoints);
   
    
    const spanStyle = {
      fontSize: '20px', 
      fontWeight: 'bold', 
      backgroundColor: '#d85757',
      padding: '2px 4px',
      color: '#ffffff'
    }
    
    const options = {
      zoomEnabled: true,
      animationEnabled: true,
      title: {
        text: stokNme 
      },
      subtitles: [{
       text: "High Value :"+ dataakhigh 
      },
      {text: "Low Value :"+ dataaklow
      },
      {text: "Current Value :"+ currentprice
      },],
      axisY: {
        includeZero: false
      },
      data: data  // random data
    }

   

//////////////////////////////5d//////////////////////////////
         // const GetDays = (d,Mention_today=false)=>{
         //    //Mention today mean the array will have today date 
         //    var DateArray = [];
         //    var days=d;
         //    for(var i=0;i<days;i++){
         //    if(!Mention_today && i==0){i=1;days+=1}
         //    var date = new Date();
         //    var last = new Date(date.getTime() - (i * 24 * 60 * 60 * 1000));
         //    var day =last.getDate();
         //    var month=last.getMonth()+1;
         //    var year=last.getFullYear();
         //    var fulld = Number(year) + '-' + (Number(month) < 10 ? '0' : '') + Number(month) + '-' + (Number(day) < 10 ? '0' : '') + Number(day);
         //    DateArray.push(fulld);
         //    }
         //    return DateArray;
         //    }

         //    alert(GetDays(5)) ;//Will get the past 5 days formated YY-mm-dd
   
    var days = 5;
    var date = new Date();
    var res = date.setTime(date.getTime() - (days * 24 * 60 * 60 * 1000));
    var todayres = date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var d = new Date(res);
    var month = d.getMonth() + 1;
    var day = d.getDate();

    var output = d.getFullYear() + '-' +
        (month < 10 ? '0' : '') + month + '-' +
        (day < 10 ? '0' : '') + day;

    var dtodayres = new Date(todayres);
    var month = dtodayres.getMonth() + 1;
    var day = dtodayres.getDate();

    var outputtodayres = dtodayres.getFullYear() + '-' +
        (month < 10 ? '0' : '') + month + '-' +
        (day < 10 ? '0' : '') + day;

   
    var arraydatak = this.state.contactds;
    var highvaldatads = this.state.stockhighvalds;
    var lowvaldatads = this.state.stocklowvalds;
    var dataakhighds = Math.max.apply(null, highvaldatads);
    var filteredds = filter_array(lowvaldatads);
    var dataaklowds = Math.min.apply(null, filteredds);

          var y;
          var datak = [];
          var dataSeries = { type: "line" };
          var dataPoints = [];
            for (var j = 0 ; j < arraydatak.length; j ++) {
              // console.log(arraydatak[j].Date);

              dataPoints.push({
              x: j,
              label : arraydatak[j].Date,
              y: JSON.parse(arraydatak[j].Close)
            });
          }

          
       dataSeries.dataPoints = dataPoints;
       datak.push(dataSeries);
       // console.log(dataPoints);

    const spanStyle1 = {
      fontSize: '20px', 
      fontWeight: 'bold', 
      backgroundColor: '#d85757',
      padding: '2px 4px',
      color: '#ffffff'
    }
    
    const options1 = {
      zoomEnabled: true,
      animationEnabled: true,
      title: {
        text: stokNme
      },
      subtitles: [{
       text: "High Value :"+ dataakhighds 
      },
      {text: "Low Value :"+ dataaklowds
      },
      {text: "Current Value :"+ currentprice
      },],
      axisY: {
        includeZero: false
      },
      data: datak  // random data
    }


/////////////////////////////////1month///////////////////////////////

   var arraydata1mnth = this.state.contact1mnth;
    var highvaldata1mnth = this.state.stockhighval1mnth;
    var lowvaldata1mnth = this.state.stocklowval1mnth;
    var dataakhigh1mnth = Math.max.apply(null, highvaldata1mnth);
    var filtered1mnth = filter_array(lowvaldata1mnth);
    var dataaklow1mnth = Math.min.apply(null, filtered1mnth);
          var y;
          var dataks = [];
          var dataSeries = { type: "line" };
          var dataPoints = [];
            for (var i = 0 ; i < arraydata1mnth.length; i ++) {
              dataPoints.push({
              x: i,
              label : arraydata1mnth[i].Date,
              y: JSON.parse(arraydata1mnth[i].Close)
            });
          }
       dataSeries.dataPoints = dataPoints;
       dataks.push(dataSeries);

    const spanStyle1mnth = {
      fontSize: '20px', 
      fontWeight: 'bold', 
      backgroundColor: '#d85757',
      padding: '2px 4px',
      color: '#ffffff'
    }
    
    const options1mnth = {
      zoomEnabled: true,
      animationEnabled: true,
      title: {
        text: stokNme
      },
      subtitles: [{
       text: "High Value :"+ dataakhigh1mnth 
      },
      {text: "Low Value :"+ dataaklow1mnth
      },
      {text: "Current Value :"+ currentprice
      },],
      axisY: {
        includeZero: false
      },
      data: dataks  // random data
    }

/////////////////////////////////3month///////////////////////////////

    var arraydata3mnth = this.state.contact3mnth;
    var highvaldata3mnth = this.state.stockhighval3mnth;
    var lowvaldata3mnth = this.state.stocklowval3mnth;
    var dataakhigh3mnth = Math.max.apply(null, highvaldata3mnth);
    var filtered3mnth = filter_array(lowvaldata3mnth);
    var dataaklow3mnth = Math.min.apply(null, filtered3mnth);
          var y;
          var dataks3mnth = [];
          var dataSeries = { type: "line" };
          var dataPoints = [];
            for (var i = 0 ; i < arraydata3mnth.length; i ++) {
              dataPoints.push({
              x: i,
              label : arraydata3mnth[i].Date,
              y: JSON.parse(arraydata3mnth[i].Close)
            });
          }
       dataSeries.dataPoints = dataPoints;
       dataks3mnth.push(dataSeries);

    const spanStyle3mnth = {
      fontSize: '20px', 
      fontWeight: 'bold', 
      backgroundColor: '#d85757',
      padding: '2px 4px',
      color: '#ffffff'
    }
    
    const options3mnth = {
      zoomEnabled: true,
      animationEnabled: true,
      title: {
        text: stokNme
      },
      subtitles: [{
       text: "High Value :"+ dataakhigh3mnth 
      },
      {text: "Low Value :"+ dataaklow3mnth
      },
      {text: "Current Value :"+ currentprice
      },],
      axisY: {
        includeZero: false
      },
      data: dataks3mnth  // random data
    }

/////////////////////////////////6month///////////////////////////////

   var arraydata6mnth = this.state.contact6mnth;
    var highvaldata6mnth = this.state.stockhighval6mnth;
    var lowvaldata6mnth = this.state.stocklowval6mnth;
    var dataakhigh6mnth = Math.max.apply(null, highvaldata6mnth);
    var filtered6mnth = filter_array(lowvaldata6mnth);
    var dataaklow6mnth = Math.min.apply(null, filtered6mnth);
          var y;
          var dataks6mnth = [];
          var dataSeries = { type: "line" };
          var dataPoints = [];
            for (var i = 0 ; i < arraydata6mnth.length; i ++) {
              dataPoints.push({
              x: i,
              label : arraydata6mnth[i].Date,
              y: JSON.parse(arraydata6mnth[i].Close)
            });
          }
       dataSeries.dataPoints = dataPoints;
       dataks6mnth.push(dataSeries);

    const spanStyle6mnth = {
      fontSize: '20px', 
      fontWeight: 'bold', 
      backgroundColor: '#d85757',
      padding: '2px 4px',
      color: '#ffffff'
    }
    
    const options6mnth = {
      zoomEnabled: true,
      animationEnabled: true,
      title: {
        text: stokNme
      },
      subtitles: [{
       text: "High Value :"+ dataakhigh6mnth 
      },
      {text: "Low Value :"+ dataaklow6mnth
      },
      {text: "Current Value :"+ currentprice
      },],
      axisY: {
        includeZero: false
      },
      data: dataks6mnth  // random data
    }

    /////////////////////////////////3month///////////////////////////////

    var arraydata1year = this.state.contact1year;
    var highvaldata1year = this.state.stockhighval1year;
    var lowvaldata1year = this.state.stocklowval1year;
    var dataakhigh1year = Math.max.apply(null, highvaldata1year);
    var filtered1year = filter_array(lowvaldata1year);
    var dataaklow1year = Math.min.apply(null, filtered1year);
          var y ;
          var dataks1year = [];
          var dataSeries = { type: "line" };
          var dataPoints = [];
            for (var i = 0 ; i < arraydata1year.length; i ++) {
              dataPoints.push({
              x: i,
              label : arraydata1year[i].Date,
              y: JSON.parse(arraydata1year[i].Close)
            });
          }
       dataSeries.dataPoints = dataPoints;
       dataks1year.push(dataSeries);

    const spanStyle1year = {
      fontSize: '20px', 
      fontWeight: 'bold', 
      backgroundColor: '#d85757',
      padding: '2px 4px',
      color: '#ffffff'
    }
    
    const options1year = {
      zoomEnabled: true,
      animationEnabled: true,
      title: {
        text: stokNme
      },
      subtitles: [{
       text: "High Value :"+ dataakhigh1year 
      },
      {text: "Low Value :"+ dataaklow1year
      },
      {text: "Current Value :"+ currentprice
      },],
      axisY: {
        includeZero: false
      },
      data: dataks1year  // random data
    }
    
    startTime = new Date();

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

                  <Tabs>
                    <TabList>
                      <Tab>1d</Tab>
                      <Tab onClick={this.handle5dayResult.bind(this, "5d")}>5d</Tab>
                      <Tab onClick={this.handle1mnthResult.bind(this, "1m")}>1m</Tab>
                      <Tab onClick={this.handle3mnthResult.bind(this, "3m")}>3m</Tab>
                      <Tab onClick={this.handle6mnthResult.bind(this, "6m")}>6m</Tab>
                      <Tab onClick={this.handle1yearResult.bind(this, "1y")}>1y</Tab>
                    </TabList>

                    <span id="highValue"></span>
                    <span id="lowValue"></span>
                 
                    <TabPanel>
                       <CanvasJSChart options = {options} 
                       onRef={ref => this.chart = ref}
                      />


                    </TabPanel>
                    <TabPanel>
                      <CanvasJSChart options = {options1} 
                       onRef={ref => this.chart = ref}
                      />


                    </TabPanel>
                    <TabPanel>
                      <CanvasJSChart options = {options1mnth} 
                       onRef={ref => this.chart = ref}
                      />


                    </TabPanel>
                    <TabPanel>
                       <CanvasJSChart options = {options3mnth} 
                       onRef={ref => this.chart = ref}
                      />

                    </TabPanel>
                    <TabPanel>
                       <CanvasJSChart options = {options6mnth} 
                       onRef={ref => this.chart = ref}
                      />

                    </TabPanel>
                    <TabPanel>
                       <CanvasJSChart options = {options1year} 
                       onRef={ref => this.chart = ref}
                      />

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

export default Chart
