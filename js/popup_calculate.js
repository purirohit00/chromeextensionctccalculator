function clickHandler(e) {
  var ctcvalue = document.getElementById("ctcvalue").value;
  var ccode = document.getElementById("ccode").value;
  if (ccode == "kovclient") {
    if (ctcvalue == null || ctcvalue == "") {
      document.getElementById("demo").innerHTML = "* CTC  : Required Field ";
      return false;
    } else {
      var regex = /^[0-9]+$/;
      if (!ctcvalue.match(regex)) {
        document.getElementById("demo").innerHTML =
          "* Please enter Correct Value";
        return false;
      } else {
        var jsonObj2 = '{"ctcvalue" :"' + ctcvalue + '"}';
        chrome.extension.sendMessage({ action: jsonObj2 }, function(response) {
          this.close();
        });
      }
    }
  } else {
    document.getElementById("demo").innerHTML = "* CTC  : Required Field ";
  }
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("click-me").addEventListener("click", clickHandler);
});
