function welcomeFn(){var b=document.getElementById("userName").value;""==b?UIkit.notification({message:"<span uk-icon='icon: warning'></span> Error! Enter a Last.fm user name.",status:"danger"}):UIkit.notification({message:"<span uk-icon='icon: check'></span> Visualising your data now. Scroll down if on a mobile device.",status:"primary"}),$.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.getinfo&api_key=6e616452b7c762a15256272ddb774c56&user="+b+"&format=json",function(t){var c=t.user.realname,m="<b>"+t.user.playcount+"</b>",e=t.user.playcount,a=t.user.registered.unixtime,u=t.user.image[2]["#text"],n=new Date(1e3*a),o=n.getFullYear(),l="<b>"+["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][n.getMonth()]+" "+n.getDate()+", "+o+"</b>!",r=new Date(1e3*a),s=new Date,d="<b>"+Math.round(Math.abs((r.getTime()-s.getTime())/864e5))+"</b>",g="<b>"+(e/Math.round(Math.abs((r.getTime()-s.getTime())/864e5))).toFixed()+"</b>";$.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&api_key=6e616452b7c762a15256272ddb774c56&user="+b+"&format=json",function(t){var e=t.recenttracks.track[1].name,a=t.recenttracks.track[1].date["#text"];console.log(a);var n=t.recenttracks.track[1].url,o=t.recenttracks.track[1].image[2]["#text"],r=t.recenttracks.track[1].artist["#text"],s="<b>"+t.recenttracks.track[1].album["#text"]+"</b>";document.getElementById("welcome").innerHTML="Hi "+c,document.getElementById("totalScrobbles").innerHTML="You have heard a total of "+m+" songs since joining Last.fm on "+l+" It means "+d+" days have elapsed since then! Oh, it also means that you have listened to "+g+" songs per day! Keep it up.",document.getElementById("image").src=u,$.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&limit=10&api_key=6e616452b7c762a15256272ddb774c56&user="+b+"&format=json",function(t){var a="",e=t.toptracks.track[0].name,n=t.toptracks.track[0].artist.name,o=t.toptracks.track[0].image[2]["#text"],r=t.toptracks.track[0]["@attr"].rank;$.each(t.toptracks.track,function(t,e){a+="<li><b>"+e.name+"</b> - Play count : "+e.playcount+"</li>"}),document.getElementById("toptentracksLabel").innerHTML="Your Top 10 Most Played Songs: -",document.getElementById("toptentrackscard").hidden=!1,document.getElementById("mostplayedtrackimage").src=o,document.getElementById("mostplayedsongtitle").innerHTML=e,document.getElementById("mostplayedsongartist").innerHTML="by <i>"+n+"</i>",document.getElementById("mostplayedsongrank").innerHTML="Ranking : # "+r,$("#toptentracks").empty(),$("#toptentracks").append(a),$.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&limit=10&api_key=6e616452b7c762a15256272ddb774c56&user="+b+"&format=json",function(t){var a="",e=t.topartists.artist[0].name,n=t.topartists.artist[0].image[2]["#text"],o=t.topartists.artist[0]["@attr"].rank;$.each(t.topartists.artist,function(t,e){a+="<li><b>"+e.name+"</b> - Play count : "+e.playcount+"</li>"}),document.getElementById("toptenArtistsLabel").innerHTML="Your Top 10 Most Played Artists: -",document.getElementById("toptenartistscard").hidden=!1,document.getElementById("mostplayedartistimage").src=n,document.getElementById("mostplayedartist").innerHTML=e,document.getElementById("mostplayedartistrank").innerHTML="Ranking : # "+o,$("#toptenartists").empty(),$("#toptenartists").append(a),$.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&limit=10&api_key=6e616452b7c762a15256272ddb774c56&user="+b+"&format=json",function(t){var a="",e=t.topalbums.album[0].name,n=t.topalbums.album[0].artist.name,o=t.topalbums.album[0].image[2]["#text"],r=t.topalbums.album[0]["@attr"].rank;$.each(t.topalbums.album,function(t,e){a+="<li><b>"+e.name+"</b> - Play count : "+e.playcount+"</li>"}),document.getElementById("toptenAlbumsLabel").innerHTML="Your Top 10 Most Played Albums: -",document.getElementById("toptenalbumscard").hidden=!1,document.getElementById("mostplayedalbumimage").src=o,document.getElementById("mostplayedalbum").innerHTML=e,document.getElementById("mostplayedalbumartist").innerHTML="by <i>"+n+"</i>",document.getElementById("mostplayedalbumrank").innerHTML="Ranking : # "+r,$("#toptenalbums").empty(),$("#toptenalbums").append(a)})})});document.getElementById("recentTracks").innerHTML='<i class="fas fa-play"></i> Your last played song is : <b>'+e+"</b> by : <b>"+r+"</b> from the Album : "+s,document.getElementById("lastplayed").src=o,document.getElementById("lastplayedsongdetails").hidden=!1,document.getElementById("lastplayedsongtitle").innerHTML=e,document.getElementById("lastplayedsongtime").innerHTML="Played on : "+a,document.getElementById("lastplayedsongdescription").innerHTML="Artist : <b>"+r+"</b> Album : "+s+". To read more about the song, click the link below.",document.getElementById("lastplayedsonglink").href=n;var i=encodeURI("https://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=6e616452b7c762a15256272ddb774c56&username="+b+"&artist="+r+"&track="+e+"&format=json");$.getJSON(i,function(t){var e=t.track.userplaycount;document.getElementById("trackuserplaycount").innerHTML="You have played this song <b>"+e+"</b> times!"})})})}function drawChart(){var t=document.getElementById("userName").value;$.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&limit=20&api_key=6e616452b7c762a15256272ddb774c56&user="+t+"&format=json",function(t){var e=new google.visualization.DataTable;e.addColumn("string","Song Title"),e.addColumn("number","Play Count");for(var a=0;a<t.toptracks.track.length;a++){e.addRow([t.toptracks.track[a].name,parseInt(t.toptracks.track[a].playcount)]);new google.visualization.ColumnChart(document.getElementById("mostplayedtracks")).draw(e,{title:"Most Played Tracks. (Hover mouse to see the title.)",hAxis:{textPosition:"none"},chartArea:{width:"85%",height:"78%"},legend:{position:"bottom"}})}document.getElementById("top20tracksLabel").innerHTML="And here are your Top 20 Most Played Songs: -"}),$.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&limit=20&api_key=6e616452b7c762a15256272ddb774c56&user="+t+"&format=json",function(t){var e=new google.visualization.DataTable;e.addColumn("string","Artist"),e.addColumn("number","Play Count");for(var a=0;a<t.topartists.artist.length;a++){e.addRow([t.topartists.artist[a].name,parseInt(t.topartists.artist[a].playcount)]);new google.visualization.ColumnChart(document.getElementById("mostplayedartists")).draw(e,{title:"Most Heard Artists. (Hover mouse to see the title.)",chartArea:{width:"85%",height:"78%"},legend:"bottom",hAxis:{textPosition:"none"}})}document.getElementById("top20artistsLabel").innerHTML="And here are your Top 20 Most Heard Artists: -"}),$.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&limit=20&api_key=6e616452b7c762a15256272ddb774c56&user="+t+"&format=json",function(t){var e=new google.visualization.DataTable;e.addColumn("string","Album"),e.addColumn("number","Play Count");for(var a=0;a<t.topalbums.album.length;a++){e.addRow([t.topalbums.album[a].name,parseInt(t.topalbums.album[a].playcount)]);new google.visualization.ColumnChart(document.getElementById("mostplayedalbums")).draw(e,{title:"Most Heard Albums. (Hover mouse to see the title.)",chartArea:{width:"85%",height:"78%"},legend:"bottom",hAxis:{textPosition:"none"}})}document.getElementById("top20albumsLabel").innerHTML="And here are your Top 20 Most Heard Albums: -"}),$.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.gettoptags&limit=5&api_key=6e616452b7c762a15256272ddb774c56&user="+t+"&format=json",function(t){var e=new google.visualization.DataTable;e.addColumn("string","Tags/Genre"),e.addColumn("number","Count");for(var a=0;a<t.toptags.tag.length;a++){e.addRow([t.toptags.tag[a].name,parseInt(t.toptags.tag[a].count)]);new google.visualization.PieChart(document.getElementById("toptags")).draw(e,{title:"Top Tags/Genre. (Hover mouse to see the title.)",chartArea:{width:"85%",height:"95%"},pieSliceText:"label",legend:"none",pieHole:.4})}document.getElementById("toptagsLabel").innerHTML="Your Top Tags/Genre: -"})}function fetchNumber(){var a=document.getElementById("userName").value;$.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&api_key=6e616452b7c762a15256272ddb774c56&user="+a+"&format=json",function(t){$.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&api_key=6e616452b7c762a15256272ddb774c56&user="+a+"&format=json",function(t){$.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&api_key=6e616452b7c762a15256272ddb774c56&user="+a+"&format=json",function(t){var e=t.topalbums["@attr"].total;document.getElementById("numuniquealbums").innerHTML="Albums : "+e});var e=t.topartists["@attr"].total;document.getElementById("numuniqueartists").innerHTML="Artists : "+e+" "});var e=t.toptracks["@attr"].total;document.getElementById("numunique").innerHTML="In case you want to know how many distinct Tracks/Artists/Albums you have listened to, here the data is.",document.getElementById("numuniquetracks").innerHTML="Tracks :  "+e+" "})}function scrobblesDaily(){var t=document.getElementById("userName").value,e=(new Date).setUTCHours(0,0,0,0)/1e3;$.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&api_key=6e616452b7c762a15256272ddb774c56&user="+t+"&from="+e+"&format=json",function(t){var e="<b>"+t.recenttracks["@attr"].total+"</b>";document.getElementById("todaysscrobbles").innerHTML="You have listened to "+e+" songs today."})}function uniqueTracks(){var t="https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&limit=10&api_key=6e616452b7c762a15256272ddb774c56&user="+document.getElementById("userName").value+"&format=json",a=new XMLHttpRequest,o=new XMLHttpRequest;a.open("GET",t),o.open("GET","https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=6e616452b7c762a15256272ddb774c56&limit=10&format=json"),a.responseType="json",o.responseType="json";var r=[],s=[];a.onload=function(){for(var t=0;t<10;t++){var e=a.response.toptracks.track[t].name;r.push(e)}},a.send(),o.onload=function(){for(var t=0;t<10;t++){var e=o.response.tracks.track[t].name;s.push(e)}var a=$(s).not(r).get();document.getElementById("trackuniqueness").innerHTML="Unique-O-Meter",document.getElementById("diff").innerHTML="Your listening taste uniqueness quotient is <b>"+10*a.length+"</b>. It means "+(10-a.length)+" of your top 10 tracks match the global top 10!";var n=google.visualization.arrayToDataTable([["Label","Value"],["Uniqueness",10*a.length]]);new google.visualization.Gauge(document.getElementById("uniquetracksguage")).draw(n,{redFrom:90,redTo:100,yellowFrom:75,yellowTo:90,minorTicks:5})},o.send()}function uniqueArtists(){var t="https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&limit=10&api_key=6e616452b7c762a15256272ddb774c56&user="+document.getElementById("userName").value+"&format=json",a=new XMLHttpRequest,o=new XMLHttpRequest;a.open("GET",t),o.open("GET","https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=6e616452b7c762a15256272ddb774c56&limit=10&format=json"),a.responseType="json",o.responseType="json";var r=[],s=[];a.onload=function(){for(var t=0;t<10;t++){var e=a.response.topartists.artist[t].name;r.push(e)}},a.send(),o.onload=function(){for(var t=0;t<10;t++){var e=o.response.artists.artist[t].name;s.push(e)}var a=$(s).not(r).get();document.getElementById("artistuniqueness").innerHTML="Unique-O-Meter",document.getElementById("artist_diff").innerHTML="Your Artist/Singer uniqueness quotient is <b>"+10*a.length+"</b>. It means "+(10-a.length)+" of your top 10 Artists match the global top 10!";var n=google.visualization.arrayToDataTable([["Label","Value"],["Uniqueness",10*a.length]]);new google.visualization.Gauge(document.getElementById("uniqueartistsguage")).draw(n,{redFrom:90,redTo:100,yellowFrom:75,yellowTo:90,minorTicks:5})},o.send()}function firstSong(){var n=document.getElementById("userName").value;$.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&page=200000&api_key=6e616452b7c762a15256272ddb774c56&user="+n+"&format=json",function(t){var e=t.recenttracks["@attr"].totalPages,a="https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&api_key=6e616452b7c762a15256272ddb774c56&user="+n+"&page="+e+"&format=json";$.getJSON(a,function(t){var e=t.recenttracks.track[t.recenttracks.track.length-1].name,a=t.recenttracks.track[t.recenttracks.track.length-1].artist["#text"],n=t.recenttracks.track[t.recenttracks.track.length-1].album["#text"],o=t.recenttracks.track[t.recenttracks.track.length-1].date["#text"],r=t.recenttracks.track[t.recenttracks.track.length-1].image[2]["#text"];document.getElementById("firstsongmessage").innerHTML="<U>Details of your first scrobbled song.<U>",document.getElementById("firstsongname").innerHTML="<b>Title : </b>"+e,document.getElementById("firstartistname").innerHTML="<b>Artist : </b>"+a,document.getElementById("firstalbumname").innerHTML="<b>Album : </b>"+n,document.getElementById("firstsongdate").innerHTML="<b>Date : </b>"+o,document.getElementById("firstsongimage").src=r})})}function currentPlaying(){var t=document.getElementById("userName").value;$.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&nowplaying=true&page=1&api_key=6e616452b7c762a15256272ddb774c56&user="+t+"&format=json",function(t){var e=t.recenttracks.track[0].name,a=t.recenttracks.track[0].artist["#text"],n=t.recenttracks.track[0].album["#text"];document.getElementById("nowplayingsong").innerHTML='<i class="fas fa-music fa-spin"></i> Now playing : <b>'+e+"</b> by : <b>"+a+"</b> from the Album : <b>"+n+"</b>"})}google.charts.load("current",{packages:["corechart"]}),google.charts.load("current",{packages:["gauge"]}),google.charts.load("current",{packages:["gauge"]});