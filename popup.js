var foo=localStorage.getItem("myvar") || 0;
foo++;
//chrome.extension.sendRequest({"data":"Test String Request"});
str=localStorage.getItem("hist") || "No data";
//chrome.tabs.create({index:0 , url:"http://www.google.com",pinned:true});
str+="<br/>\n";
var d={};
try{
    d=JSON.parse(localStorage.getItem("histdb"))
}
catch(e){
    d={};
}
if(!d)d={};
ar=[];
for (var x in d){
    ar.push([parseInt(d[x]),x]);
}
function sfunc(a,b){
    return -a[0]+b[0];
}
ar=ar.sort(sfunc);
for (i=0;i<ar.length;i++){
    str+=ar[i][0]+"  #  "+ar[i][1]+"<br/>\n";
}
document.getElementById("content").innerHTML=str;
