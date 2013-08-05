var q = {html: {}};
q.html.fileLoader = {};
q.html.fileLoader.load = function (url, preLoadAction, postLoadHandler, 
    parentNode, async) {
  var scriptEl, preLoadResult, loadError, oldOnError, doPostLoad;
  
  doPostLoad = function () {
    postLoadHandler(url, loadError);
    
    if (oldOnError) {
      window.onerror = oldOnError;
    }
  };
  
  //try to run the preLoadAction.
  try {
    if (preLoadAction) {
      preLoadResult = preLoadAction(url);
    }
  } catch (e) {
    preLoadResult = false;
  } finally {
    if (preLoadResult !== false) {
      //create the javascript element.
      scriptEl = q.html.fileLoader.createScriptEl(url, async);
      //assign the post load handler to run when it has loaded, 
      //if it exists.
      if (postLoadHandler) {
        scriptEl.onload = doPostLoad;
        scriptEl.onreadystatechange = function () {
          if ((this.readyState === "complete") || 
              (this.readyState === "loading")) {
            setTimeout(doPostLoad, 1);
          }
        };
      }
      if (!parentNode) {
        parentNode = window.document.getElementsByTagName("head")[0];
      }
      
      if (window.onerror) {
        oldOnError = window.onerror;
      }
      window.onerror = function (reason, url, lineNumber) {
        loadError = {
          reason: reason,
          url: url,
          lineNumber: lineNumber
        };
        return true;
      };
      
      parentNode.appendChild(scriptEl);
      //The script is not loaded until it is added to the script.
      
    }
  }
};
q.html.fileLoader.createScriptEl = function (path, async, forceReload) {
  var scriptEl = document.createElement("script");
  scriptEl.type = "text/javascript";
  scriptEl.src = q.html.fileLoader.tidyUrl(path) + 
    (forceReload ? ("?" + new Date().getTime()) : "");
  //Makes FF (version < 4) behave like IE/WebKit 
  //(this is on bydefault on FF4+)
  //See: https://developer.mozilla.org/en/html/element/script
  if (async !== false) {
    scriptEl.async = "true";
    scriptEl.defer = "true";
  } else {
    //TODO investigate whether scriptEl.async = false is enough in all browsers
    //in that case we don't need this mysterious if statement
    scriptEl.async = "false";
    if (scriptEl.async !== false) {
      scriptEl.async = false;
    }
    scriptEl.defer = "false";
  }
  return scriptEl;
};

q.html.fileLoader.tidyUrl = function (path) {
  if (path.substring(0, 5) === 'http:') {
    return path;
  }
  if (path.substring(0, 6) === 'https:') {
    return path;
  }
  return "//" + path;
};

q.html.PostData = function (url, data, type) {
  
  var xhr, agent, isIe, isOldIe;  
  agent = navigator.userAgent.toLowerCase();
  isIe = agent.indexOf("msie") !== -1;
  isOldIe = ((agent.indexOf('msie 7') !== -1) || 
    (agent.indexOf('msie 6') !== -1));
  url = ("https:" === document.location.protocol ? "https:" : "http:") + url;
  if (isOldIe) {
    q.html.fileLoader.load(url);
    return;
  } 
  try {
    type = type ? type : "POST";
    xhr = null;


    try {
      xhr = new XMLHttpRequest();
    } catch (e1) {
      
    }

    if (xhr && !isIe) {
      xhr.open(type, url, true);
    } else if (typeof XDomainRequest !== "undefined") {
      xhr = new XDomainRequest();
      xhr.open(type, url);
      //IE9 may abort requests without this
      xhr.onload = function () {};
    } else {
      xhr = null;
    }

    try {
      xhr.withCredentials = false;
    } catch (e2) {
    
    }
    if (xhr.setRequestHeader) {
      xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    }
      xhr.send(data);

  } catch (err) {
    try {
      try {
        q.html.fileLoader.load(url);
      } catch (err2) {
        if (window.console && window.console.log) {
          window.console.log(err);
        }
      }
    } catch (e) {
    }
  }
};

var getRandomId = function () {
  var cookieId = new Date().getTime().toString();
  cookieId = cookieId + "." + Math.floor(Math.random() * 999999);
  return cookieId;
};
var readCookie = function (name) {
  var r, cookie, value, cookies, nameSearchString, i, ii;
  nameSearchString = name + "=";
  cookies = document.cookie.split(';');
  r = /^\s+|\s+$/g;
  for (i = 0, ii = cookies.length; i < ii; i += 1) {
    cookie = cookies[i].replace(r, '');
    if (cookie.indexOf(nameSearchString) === 0) {
      value = unescape(cookie.substring(nameSearchString.length));
      if (value.length === 0) {
        return null;
      }
      return value;
    }
  }
  return null;
};
var query, param, params, i, ii, clientId, pongUrl, newParams, id, newScript;
query = query = location.href.substring(location.href.indexOf("?") + 1);
params = query.split("&");
i, ii;
clientId;
pongUrl;
newParams = [];
for (i = 0, ii = params.length; i < ii; i += 1) {
  param = params[i];
  if (param.indexOf("cdt=") === 0) {
    clientId = decodeURIComponent(param.substring(4));
    newParams.push(param);
  }
  else if (param.indexOf("pongUrl=") !== 0) {
    if (param.indexOf("ping=") === 0) {
      newParams.push("ping=3");
    } else {
      newParams.push(param);
    }
  } 
  else {
    pongUrl = decodeURIComponent(param.substring(8));
  }
}
if (clientId && pongUrl) {
  id = readCookie("cdid_" + clientId);
  if (!id) {
    id = getRandomId();
  }
  document.cookie = "cdid_" + clientId + "=" + id + "; expires=" + 
    new Date(new Date().getTime() + 2 * 365 * 24 * 60 * 60 * 1000).toGMTString();
  q.html.PostData("//" + pongUrl + "?cdid=" + id + "&" + newParams.join("&"), "", "GET");
}

