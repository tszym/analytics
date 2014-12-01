// https://github.com/tmcw/simple-statistics
(function(){var e={};if(typeof module!=="undefined"){exports=module.exports=e}else{this.ss=e}e.linear_regression=function(){var e={},t=[];e.data=function(n){if(!arguments.length)return t;t=n.slice();return e};e.line=function(){if(t.length==1){s=0;o=t[0][1]}else{var e=0,n=0,r=0,i=0,s,o;for(var u=0;u<t.length;u++){e+=t[u][0];n+=t[u][1];r+=t[u][0]*t[u][0];i+=t[u][0]*t[u][1]}s=(t.length*i-e*n)/(t.length*r-e*e);o=n/t.length-s*e/t.length}return function(e){return o+s*e}};return e};e.r_squared=function(e,t){if(e.length<2)return 1;var n=0,r;for(var i=0;i<e.length;i++){n+=e[i][1]}r=n/e.length;var s=0;for(var o=0;o<e.length;o++){s+=Math.pow(r-e[o][1],2)}var u=0;for(var a=0;a<e.length;a++){u+=Math.pow(e[a][1]-t(e[a][0]),2)}return 1-u/s};e.bayesian=function(){var e={},t=0,n={};e.train=function(e,r){if(!n[r])n[r]={};for(var i in e){var s=e[i];if(n[r][i]===undefined)n[r][i]={};if(n[r][i][s]===undefined)n[r][i][s]=0;n[r][i][e[i]]++}t++};e.score=function(e){var r={},i;for(var s in e){var o=e[s];for(i in n){if(r[i]===undefined)r[i]={};if(n[i][s]){r[i][s+"_"+o]=(n[i][s][o]||0)/t}else{r[i][s+"_"+o]=0}}}var u={};for(i in r){for(var a in r[i]){if(u[i]===undefined)u[i]=0;u[i]+=r[i][a]}}return u};return e};e.sum=function(e){var t=0;for(var n=0;n<e.length;n++){t+=e[n]}return t};e.mean=function(t){if(t.length===0)return null;return e.sum(t)/t.length};e.geometric_mean=function(e){if(e.length===0)return null;var t=1;for(var n=0;n<e.length;n++){if(e[n]<=0)return null;t*=e[n]}return Math.pow(t,1/e.length)};e.average=e.mean;e.min=function(e){var t;for(var n=0;n<e.length;n++){if(e[n]<t||t===undefined)t=e[n]}return t};e.max=function(e){var t;for(var n=0;n<e.length;n++){if(e[n]>t||t===undefined)t=e[n]}return t};e.variance=function(t){if(t.length===0)return null;var n=e.mean(t),r=[];for(var i=0;i<t.length;i++){r.push(Math.pow(t[i]-n,2))}return e.mean(r)};e.standard_deviation=function(t){if(t.length===0)return null;return Math.sqrt(e.variance(t))};e.sum_squared_deviations=function(t){if(t.length<=1)return null;var n=e.mean(t),r=0;for(var i=0;i<t.length;i++){r+=Math.pow(t[i]-n,2)}return r};e.sample_variance=function(t){var n=e.sum_squared_deviations(t);if(n===null)return null;return n/(t.length-1)};e.sample_standard_deviation=function(t){if(t.length<=1)return null;return Math.sqrt(e.sample_variance(t))};e.sample_covariance=function(t,n){if(t.length<=1||t.length!=n.length){return null}var r=e.mean(t),i=e.mean(n),s=0;for(var o=0;o<t.length;o++){s+=(t[o]-r)*(n[o]-i)}return s/(t.length-1)};e.sample_correlation=function(t,n){var r=e.sample_covariance(t,n),i=e.sample_standard_deviation(t),s=e.sample_standard_deviation(n);if(r===null||i===null||s===null){return null}return r/i/s};e.median=function(e){if(e.length===0)return null;var t=e.slice().sort(function(e,t){return e-t});if(t.length%2===1){return t[(t.length-1)/2]}else{var n=t[t.length/2-1];var r=t[t.length/2];return(n+r)/2}};e.mode=function(e){if(e.length===0)return null;else if(e.length===1)return e[0];var t=e.slice().sort(function(e,t){return e-t});var n=t[0],r,i=0,s=1;for(var o=1;o<t.length+1;o++){if(t[o]!==n){if(s>i){i=s;s=1;r=n}n=t[o]}else{s++}}return r};e.t_test=function(t,n){var r=e.mean(t);var i=e.standard_deviation(t);var s=Math.sqrt(t.length);return(r-n)/(i/s)};e.quantile=function(e,t){if(e.length===0)return null;if(t>=1||t<=0)return null;var n=e.slice().sort(function(e,t){return e-t});var r=n.length*t;if(r%1!==0){return n[Math.ceil(r)-1]}else if(e.length%2===0){return(n[r-1]+n[r])/2}else{return n[r]}};e.jenksMatrices=function(e,t){var n=[],r=[],i,s,o=0;for(i=0;i<e.length+1;i++){var u=[],a=[];for(s=0;s<t+1;s++){u.push(0);a.push(0)}n.push(u);r.push(a)}for(i=1;i<t+1;i++){n[1][i]=1;r[1][i]=0;for(s=2;s<e.length+1;s++){r[s][i]=Infinity}}for(var f=2;f<e.length+1;f++){var l=0,c=0,h=0,p=0;for(var d=1;d<f+1;d++){var v=f-d+1,m=e[v-1];h++;l+=m;c+=m*m;o=c-l*l/h;p=v-1;if(p!==0){for(s=2;s<t+1;s++){if(r[f][s]>=o+r[p][s-1]){n[f][s]=v;r[f][s]=o+r[p][s-1]}}}}n[f][1]=1;r[f][1]=o}return{lower_class_limits:n,variance_combinations:r}};e.jenks=function(t,n){t=t.slice().sort(function(e,t){return e-t});var r=e.jenksMatrices(t,n),i=r.lower_class_limits,s=t.length-1,o=[],u=n;o[n]=t[t.length-1];o[0]=t[0];while(u>1){o[u-1]=t[i[s][u]-2];s=i[s][u]-1;u--}return o};e.mixin=function(){function r(t){return function(){var n=Array.prototype.slice.apply(arguments);n.unshift(this);return e[t].apply(e,n)}}var t=!!(Object.defineProperty&&Object.defineProperties);if(!t)throw new Error("without defineProperty, simple-statistics cannot be mixed in");var n=["median","standard_deviation","sum","mean","min","max","quantile","geometric_mean"];for(var i=0;i<n.length;i++){Object.defineProperty(Array.prototype,n[i],{value:r(n[i]),configurable:true,enumerable:false,writable:true})}}})(this)
