
import { Template } from 'meteor/templating';
import { Currencies } from '../../lib/database/Currencies.js';

Template.currencyDetail.onCreated(function bodyOnCreated() {
  var self = this
  self.autorun(function(){
    self.subscribe('approvedcurrencies');
  })
});

Template.currencyDetail.onRendered(function (){
  testvar = Currencies.findOne({_id: FlowRouter.getParam("_id")}).currencyName;
    var ctx = document.getElementById("distribution").getContext('2d');
  ctx.canvas.width = 200;
  ctx.canvas.height = 260;
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'doughnut',


        // The data for our dataset
        data: {
            labels: ["Founder(s) share: " + this.data.premine, "Mined coins: " + this.data.circulating, "Not yet mined: " + (this.data.maxCoins - this.data.circulating)],
            datasets: [{
                data: [(((this.data.premine / this.data.maxCoins) * 100).toFixed()), ((((this.data.circulating - this.data.premine) / this.data.maxCoins) * 100).toFixed()), ((((this.data.maxCoins - this.data.circulating)/this.data.maxCoins) * 100).toFixed())],
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f"]
            }]
        },

        // Configuration options go here
        options: {
          tooltips: {enabled: false},
          responsive: false,
          maintainAspectRatio: false,
          title: {display: false},
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              boxWidth: 15
            }
          }
        }
    });

  var radar = document.getElementById("radar").getContext('2d');
  radar.canvas.width = 1000;
  radar.canvas.height = 1000;
    var radarchart = new Chart(radar, {
        type: 'radar',
        data: {
          labels: ["Ongoing Development", "Code Quality", "Community", "Hash Power", "Ease of Use", "Coin Distribution", "Transactions"],
          datasets: [
            {
              label: "1950",
              fill: true,
              backgroundColor: "rgba(255,120,50,0.2)",
              borderColor: "#FF6600",
              pointBorderColor: "#fff",
              pointStyle: "dot",
              pointBackgroundColor: "#FF0000",
              data: [6,7,2,2,8,1,3]
            },
            {
              label: "2",
              fill: false,
              backgroundColor: "#fff",
              borderColor: "#ccc",
              pointBorderColor: "#fff",
              borderWidth: 4,
              pointRadius: 0,
              pointBackgroundColor: "#fff",
              data: [10,10,10,10,10,10,10]
            },
            {
              label: "3",
              fill: false,
              backgroundColor: "#fff",
              borderColor: "#fff",
              borderWidth: 1,
              pointBorderColor: "#fff",
              pointBackgroundColor: "#fff",
              data: [0,0,0,0,0,0,0]
            }
          ]
        },
          options: {
            responsive: false,
            defaultFontColor: 'red',
          tooltips: {enabled: false},
          maintainAspectRatio: false,
          title: {display: false},
          legend: {
            display: false,
            position: 'bottom',
            labels: {
              fontColor: 'red',
              display: true,
            }
          },
          scale: {

          // Hides the scale
          display: true
      }
        }
    });
});

Template.currencyDetail.events({});

Template.currencyDetail.helpers({
  thiscurrency () {
    return Currencies.findOne({_id: FlowRouter.getParam("_id")});
  },
  currencyName () {
    return Currencies.findOne({_id: FlowRouter.getParam("_id")}).currencyName;
  },


    finalValue () {
      if (this.maxCoins && this.marketCap) {
      return Math.round(this.marketCap / this.maxCoins).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
      return "calculating..."
    }
    },
    marketCap () {
      return Math.round(this.marketCap).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    circulating () {
      return Math.round(this.circulating).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    launchDate () {
      if (this.genesisTimestamp) {
      return "Launched " + moment(this.genesisTimestamp).fromNow();
    } else {
      return "";
    }
    },
    link () {
      if (this.genesisTimestamp) {
      return "#";
    } else {
      return "/currency/" + this._id + "?edit=launchdate";
    }
    },
    linktext () {
      if (this.genesisTimestamp) {
        return "";
      } else {
        return "Add the " + this.currencyName + " launch date!"
      }
    }

});
