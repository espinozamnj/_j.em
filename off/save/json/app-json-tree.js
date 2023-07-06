var jsonObj = {};
var jsonViewer = new JSONViewer();
document.querySelector("#json").appendChild(jsonViewer.getContainer());

var textarea = document.querySelector("textarea");
textarea.value = JSON.stringify([{"_id":"60b16f4ced751bd2a438bb19","index":0,"guid":"fe0d225f-1d04-42c3-aa2c-d65882a11804","isActive":false,"balance":"$2,956.97","picture":"http://placehold.it/32x32","age":32,"eyeColor":"green","name":{"first":"Stafford","last":"Suarez"},"company":"XINWARE","email":"stafford.suarez@xinware.us","phone":"+1 (838) 424-3095","address":"557 Holmes Lane, Cedarville, Nebraska, 6878","about":"Aute eiusmod pariatur fugiat esse commodo officia consequat fugiat ea proident. Ullamco velit sunt minim consequat consectetur sint culpa laboris ea. Sit exercitation aute nisi ea pariatur elit irure tempor elit.","registered":"Wednesday, May 6, 2020 2:37 PM","latitude":"-31.436675","longitude":"-160.528256","tags":["ipsum","non","pariatur","non","laboris"],"range":[0,1,2,3,4,5,6,7,8,9],"friends":[{"id":0,"name":"Donovan Morin"},{"id":1,"name":"Elba Mccray"},{"id":2,"name":"Schultz Stout"}],"greeting":"Hello, Stafford! You have 9 unread messages.","favoriteFruit":"banana"},{"_id":"60b16f4c6c814b9b106b48b9","index":1,"guid":"789a00c0-e64f-4d12-af5d-67601423c4d4","isActive":true,"balance":"$2,732.99","picture":"http://placehold.it/32x32","age":20,"eyeColor":"brown","name":{"first":"Anne","last":"Wall"},"company":"ZEPITOPE","email":"anne.wall@zepitope.biz","phone":"+1 (955) 581-3607","address":"801 Vandervoort Place, Bergoo, New Mexico, 5521","about":"Anim proident ullamco eu exercitation in consectetur quis dolore sit irure. Excepteur reprehenderit officia pariatur anim enim pariatur consequat sunt velit. Ea aute deserunt ad culpa culpa laborum et sint. Occaecat magna sunt aute dolor dolore non laborum reprehenderit non adipisicing. Laborum ipsum dolor enim aute culpa deserunt voluptate proident ex cupidatat laborum laboris commodo.","registered":"Thursday, September 4, 2014 6:17 AM","latitude":"-15.203459","longitude":"119.843911","tags":["incididunt","voluptate","dolor","duis","occaecat"],"range":[0,1,2,3,4,5,6,7,8,9],"friends":[{"id":0,"name":"Lott Franco"},{"id":1,"name":"Robyn Carey"},{"id":2,"name":"Fields Frost"}],"greeting":"Hello, Anne! You have 9 unread messages.","favoriteFruit":"strawberry"},{"_id":"60b16f4ce56eefa57c1e81d3","index":2,"guid":"88fe8e58-23c8-4965-be7a-eef2bc94e59c","isActive":false,"balance":"$1,907.65","picture":"http://placehold.it/32x32","age":34,"eyeColor":"brown","name":{"first":"Ora","last":"Jacobson"},"company":"PRISMATIC","email":"ora.jacobson@prismatic.me","phone":"+1 (876) 557-2980","address":"924 Monroe Street, Jacksonburg, Vermont, 2874","about":"Irure consequat et incididunt voluptate ex exercitation. Ad anim reprehenderit esse enim eu velit adipisicing voluptate. Pariatur veniam aliquip elit elit commodo sint sint. Ut laborum cupidatat veniam non aliqua proident anim duis minim laborum ad ipsum in ea. Sunt elit Lorem aliqua sit sunt ut do magna adipisicing est irure. Sint ex deserunt fugiat aute occaecat ea dolore. Consequat ad minim minim minim eu commodo laboris do voluptate.","registered":"Thursday, August 1, 2019 10:43 AM","latitude":"1.444203","longitude":"62.34248","tags":["minim","in","deserunt","et","in"],"range":[0,1,2,3,4,5,6,7,8,9],"friends":[{"id":0,"name":"Chase Huber"},{"id":1,"name":"Simpson Kline"},{"id":2,"name":"Maritza Spence"}],"greeting":"Hello, Ora! You have 10 unread messages.","favoriteFruit":"strawberry"},{"_id":"60b16f4c496fcd48feb992af","index":3,"guid":"3ebabc91-7c0a-4b1d-8fb6-f9727eb1d8df","isActive":true,"balance":"$3,922.01","picture":"http://placehold.it/32x32","age":37,"eyeColor":"brown","name":{"first":"Mooney","last":"Peters"},"company":"PRINTSPAN","email":"mooney.peters@printspan.info","phone":"+1 (879) 485-3046","address":"567 Gerry Street, Reno, Texas, 377","about":"Do amet culpa nisi nostrud Lorem fugiat commodo. Ut non do mollit ipsum officia ut in excepteur eiusmod commodo in officia Lorem non. Ipsum magna laborum sit excepteur ullamco proident. Quis enim aute ullamco velit duis labore sint ullamco.","registered":"Friday, July 1, 2016 2:53 PM","latitude":"-25.389467","longitude":"-12.839947","tags":["consectetur","ad","consectetur","aliqua","ipsum"],"range":[0,1,2,3,4,5,6,7,8,9],"friends":[{"id":0,"name":"Rosanne Taylor"},{"id":1,"name":"Krista Rojas"},{"id":2,"name":"Joanna Silva"}],"greeting":"Hello, Mooney! You have 10 unread messages.","favoriteFruit":"strawberry"},{"_id":"60b16f4cd6c5cef020b0d8af","index":4,"guid":"e3f2f022-e355-49a1-80a6-29a8ae4569a3","isActive":false,"balance":"$1,355.63","picture":"http://placehold.it/32x32","age":33,"eyeColor":"blue","name":{"first":"Winnie","last":"Velazquez"},"company":"ENORMO","email":"winnie.velazquez@enormo.name","phone":"+1 (914) 494-2650","address":"133 Jefferson Street, Matheny, Delaware, 5229","about":"Nisi irure eu in pariatur aliqua eiusmod nisi consequat mollit dolore. Aliqua anim incididunt esse minim labore in. Occaecat amet eiusmod irure officia irure id mollit duis.","registered":"Wednesday, February 17, 2021 12:47 AM","latitude":"3.566847","longitude":"-19.39078","tags":["deserunt","veniam","laborum","ut","incididunt"],"range":[0,1,2,3,4,5,6,7,8,9],"friends":[{"id":0,"name":"Santos Church"},{"id":1,"name":"Adeline Nixon"},{"id":2,"name":"Bird Lowe"}],"greeting":"Hello, Winnie! You have 9 unread messages.","favoriteFruit":"strawberry"},{"_id":"60b16f4c1a7110021d572a12","index":5,"guid":"11264789-59eb-40ab-bfc8-3b1d85247043","isActive":true,"balance":"$2,768.52","picture":"http://placehold.it/32x32","age":28,"eyeColor":"blue","name":{"first":"Washington","last":"Moss"},"company":"XELEGYL","email":"washington.moss@xelegyl.io","phone":"+1 (983) 410-3088","address":"764 Veranda Place, Neibert, South Dakota, 7587","about":"Enim officia ex ipsum irure officia excepteur mollit aliquip incididunt sunt quis. Esse dolore mollit minim commodo nulla quis irure tempor cillum. Consectetur exercitation ea fugiat amet dolore duis laborum dolore duis exercitation exercitation aliquip. Id amet veniam enim ut ea cillum. Aliqua aliquip pariatur adipisicing nostrud voluptate. Pariatur tempor est magna aute laborum ad elit aute aliqua. Enim est ad ex quis occaecat Lorem esse excepteur qui fugiat Lorem.","registered":"Friday, May 4, 2018 2:28 PM","latitude":"25.234894","longitude":"126.146617","tags":["magna","nulla","eiusmod","cillum","culpa"],"range":[0,1,2,3,4,5,6,7,8,9],"friends":[{"id":0,"name":"Lakeisha Holt"},{"id":1,"name":"Lawson Evans"},{"id":2,"name":"Pacheco Haley"}],"greeting":"Hello, Washington! You have 6 unread messages.","favoriteFruit":"banana"},{"_id":"60b16f4c1dbe99516a902759","index":6,"guid":"894ff297-bd8b-4485-8757-c08f84a5a600","isActive":true,"balance":"$3,275.37","picture":"http://placehold.it/32x32","age":31,"eyeColor":"green","name":{"first":"Vargas","last":"Schneider"},"company":"QIMONK","email":"vargas.schneider@qimonk.tv","phone":"+1 (912) 523-3062","address":"854 Aberdeen Street, Lloyd, Virgin Islands, 7030","about":"Est proident ullamco ullamco aute. Duis dolor anim commodo aliquip sunt ea. In commodo commodo non labore nostrud tempor in cillum cupidatat duis.","registered":"Wednesday, March 7, 2018 6:09 AM","latitude":"-29.90751","longitude":"178.881342","tags":["consectetur","nisi","laboris","commodo","consectetur"],"range":[0,1,2,3,4,5,6,7,8,9],"friends":[{"id":0,"name":"Carey Mcknight"},{"id":1,"name":"Walter Watson"},{"id":2,"name":"Burke Wilson"}],"greeting":"Hello, Vargas! You have 8 unread messages.","favoriteFruit":"strawberry"}]);

// textarea value to JSON object
var setJSON = function () {
  try {
    var value = textarea.value;
    jsonObj = JSON.parse(value);
  }
  catch (err) {
    alert(err);
  }
};

// load default value
setJSON();

var loadJsonBtn = document.querySelector("button.load-json");
var collapseBtn = document.querySelector("button.collapse");
var expandBtn = document.querySelector("button.expand");
var resetBtn = document.querySelector("button.reset");

loadJsonBtn.addEventListener("click", function () {
  setJSON()
  jsonViewer.showJSON(jsonObj)
})

collapseBtn.addEventListener("click", function () {
  jsonViewer.showJSON(jsonObj, null, 1)
})

expandBtn.addEventListener("click", function () {
  setJSON()
  jsonViewer.showJSON(jsonObj)
})

resetBtn.addEventListener("click", function () {
  document.getElementById("msg").value = ""
})
var json_separator_str = [">", "<"]