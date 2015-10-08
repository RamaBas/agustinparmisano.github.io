(function(h){function p(){return Array.prototype.slice.call(arguments,1)}var q=h.pick,n=h.wrap,r=h.extend,o=HighchartsAdapter.fireEvent,k=h.Axis,s=h.Series;r(k.prototype,{isInBreak:function(f,d){var a=f.repeat||Infinity,c=f.from,b=f.to-f.from,a=d>=c?(d-c)%a:a-(c-d)%a;return f.inclusive?a<=b:a<b&&a!==0},isInAnyBreak:function(f,d){if(!this.options.breaks)return!1;for(var a=this.options.breaks,c=a.length,b=!1,e=!1;c--;)this.isInBreak(a[c],f)&&(b=!0,e||(e=q(a[c].showPoints,this.isXAxis?!1:!0)));return b&&
d?b&&!e:b}});n(k.prototype,"setTickPositions",function(f){f.apply(this,Array.prototype.slice.call(arguments,1));if(this.options.breaks){var d=this.tickPositions,a=this.tickPositions.info,c=[],b;if(!(a&&a.totalRange>=this.closestPointRange)){for(b=0;b<d.length;b++)this.isInAnyBreak(d[b])||c.push(d[b]);this.tickPositions=c;this.tickPositions.info=a}}});n(k.prototype,"init",function(f,d,a){if(a.breaks&&a.breaks.length)a.ordinal=!1;f.call(this,d,a);if(this.options.breaks){var c=this;c.doPostTranslate=
!0;this.val2lin=function(b){var e=b,a,d;for(d=0;d<c.breakArray.length;d++)if(a=c.breakArray[d],a.to<=b)e-=a.len;else if(a.from>=b)break;else if(c.isInBreak(a,b)){e-=b-a.from;break}return e};this.lin2val=function(b){var e,a;for(a=0;a<c.breakArray.length;a++)if(e=c.breakArray[a],e.from>=b)break;else e.to<b?b+=e.to-e.from:c.isInBreak(e,b)&&(b+=e.to-e.from);return b};this.setExtremes=function(b,c,a,d,f){for(;this.isInAnyBreak(b);)b-=this.closestPointRange;for(;this.isInAnyBreak(c);)c-=this.closestPointRange;
k.prototype.setExtremes.call(this,b,c,a,d,f)};this.setAxisTranslation=function(b){k.prototype.setAxisTranslation.call(this,b);var a=c.options.breaks,b=[],d=[],f=0,j,g,l=c.userMin||c.min,m=c.userMax||c.max,i,h;for(h in a)g=a[h],j=g.repeat||Infinity,c.isInBreak(g,l)&&(l+=g.to%j-l%j),c.isInBreak(g,m)&&(m-=m%j-g.from%j);for(h in a){g=a[h];i=g.from;for(j=g.repeat||Infinity;i-j>l;)i-=j;for(;i<l;)i+=j;for(;i<m;i+=j)b.push({value:i,move:"in"}),b.push({value:i+(g.to-g.from),move:"out",size:g.breakSize})}b.sort(function(a,
b){return a.value===b.value?(a.move==="in"?0:1)-(b.move==="in"?0:1):a.value-b.value});a=0;i=l;for(h in b){g=b[h];a+=g.move==="in"?1:-1;if(a===1&&g.move==="in")i=g.value;a===0&&(d.push({from:i,to:g.value,len:g.value-i-(g.size||0)}),f+=g.value-i-(g.size||0))}c.breakArray=d;o(c,"afterBreaks");c.transA*=(m-c.min)/(m-l-f);c.min=l;c.max=m}}});n(s.prototype,"generatePoints",function(f){f.apply(this,p(arguments));var d=this.xAxis,a=this.yAxis,c=this.points,b,e=c.length;if(d&&a&&(d.options.breaks||a.options.breaks))for(;e--;)if(b=
c[e],d.isInAnyBreak(b.x,!0)||a.isInAnyBreak(b.y,!0))c.splice(e,1),this.data[e]&&this.data[e].destroyElements()});n(h.seriesTypes.column.prototype,"drawPoints",function(f){f.apply(this);var f=this.points,d=this.yAxis,a=d.breakArray||[],c,b,e,h,k;for(e=0;e<f.length;e++){c=f[e];k=c.stackY||c.y;for(h=0;h<a.length;h++)if(b=a[h],k<b.from)break;else k>b.to?o(d,"pointBreak",{point:c,brk:b}):o(d,"pointInBreak",{point:c,brk:b})}})})(Highcharts);