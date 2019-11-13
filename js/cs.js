console.log("chrome works!");
console.log("cs.js Started .. ");
var textCtcValue = "0";
chrome.runtime.onMessage.addListener(function(request, sender) {
  var json = JSON.parse(request.action); //
  textCtcValue = json["ctcvalue"];
  console.log(textCtcValue);
  var objrecord = {};
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.status == 200) {
      var data = xhttp.responseText;
      var jsonResponse = JSON.parse(data);
      for (var k in jsonResponse) {
        if (textCtcValue <= parseInt(jsonResponse[k].var)) {
          objrecord = jsonResponse[k];
          break;
        }
      }
    }
  };
  xhttp.open("GET", "http://localhost:8080/employees", false);
  xhttp.send();

  var basicPer = "";
  var hraPer = "";
  var pfPer = "";
  var tolatFiexedComponents = "";
  var variablePer = "";
  var fixedpayper = "";
  var pfvalue = "";
  var ctc = textCtcValue;
  basicPer = objrecord.basic;
  hraPer = objrecord.homeal;
  variablePer = objrecord.varper;
  pfvalue = objrecord.pf;
  pfvaluea = objrecord.pfa;
  pfvalueb = objrecord.pfb;
  pfvaluec = objrecord.pfc;

  var mothlyGrass = ctc / 12;
  //var salaryBasis = json.ctcvalue;
  basicAmt = (mothlyGrass * basicPer) / 100;
  basicPer = objrecord.basic;
  hraPer = objrecord.homeal;
  variablePer = objrecord.varper;
  if (basicAmt >= pfvalue) {
    pfPer = (basicPer * 12) / 100;
  } else if (basicAmt < pfvalue) {
    if (basicAmt < pfvalue) {
      if (
        basicAmt +
          mothlyGrass * ((100 - basicPer - hraPer - variablePer) / 100) >
        pfvaluea
      ) {
        pfPer = pfvalueb / mothlyGrass;
      } else {
        pfPer = pfvaluec;
      }
    }
  }
  tolatFiexedComponents =
    parseFloat(basicPer) + parseFloat(hraPer) + parseFloat(pfPer);
  // =100%-F16-F18
  fixedpayper = 100 - (tolatFiexedComponents + parseFloat(variablePer));

  document.getElementById("CUSTOM_1090").value = mothlyGrass.toFixed(2);
  document.getElementById("CUSTOM_1080").value = (
    (mothlyGrass * basicPer) /
    100
  ).toFixed(2);
  document.getElementById("CUSTOM_1092").value = (
    (mothlyGrass * hraPer) /
    100
  ).toFixed(2);
  document.getElementById("CUSTOM_1095").value = (
    (mothlyGrass * pfPer) /
    100
  ).toFixed(2);
  document.getElementById("CUSTOM_1094").value = (
    (mothlyGrass * variablePer) /
    100
  ).toFixed(2);
  document.getElementById("CUSTOM_1097").value = (
    (mothlyGrass * fixedpayper) /
    100
  ).toFixed(2);
  document.getElementById("CUSTOM_1098").value = ctc;

  return;
});

//chrome.runtime.onMessage.addListener(
//  function(request, sender) {
//    console.log('inside csjs');
//}
//);
