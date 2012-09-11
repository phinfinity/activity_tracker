// Called when the user clicks on the browser action.
/*
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.executeScript(null, {code:"document.body.style.background='red !important'"});
    chrome.tabs.captureVisibleTab(undefined,function(dataUrl){
        alert("You just screwed the Background :D\n"+dataUrl);
    });
});
*/

chrome.browserAction.setBadgeBackgroundColor({color:[0, 200, 0, 100]});

var i = 0;

/*
   chrome.extension.onRequest.addListener(function(req,sender,resp){
   globstr=String(req.data);
   });
   */
var curval=0;
cnt=0;
window.setInterval(function() {
    cnt++;

    cur="";
    chrome.tabs.query({"active":true},function(t){
        if(typeof t !="undefined")
    {
        var hdb={};
        if(cnt%10==0){
            hdb=JSON.parse(localStorage.getItem("histdb"));
            if(hdb==null)hdb={};
        }
        for(i=0;i<t.length;i++){
            cur+=String(t[i].url)+"\n<br/>";
            if(cnt%10==0){
                tmp=0;
                var domain=t[i].url.match(/:\/\/(.[^/]+)/)[1];

                try{tmp=hdb[domain];}catch(e){}
                tmp++;
                hdb[domain]=tmp;
                curval=tmp;
            }
        }
        if(cnt%10==0){
            localStorage.setItem("histdb",JSON.stringify(hdb));
        }
        localStorage.setItem("hist",cur);
        i=t.length;
    }
    });
    chrome.browserAction.setBadgeText({text:String(curval)});

}, 100);
