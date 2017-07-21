const PORT = 3484;									//Đặt địa chỉ Port được mở ra để tạo ra chương trình mạng Socket Server
 
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(PORT);

app.get('/', function (req, res) {
  res.end("Hello World")
});

var ip = require('ip');
									// Cho socket server (chương trình mạng) lắng nghe ở port 3484
console.log("Server nodejs chay tai dia chi: " + ip.address() + ":" + PORT)
 
//giải nén chuỗi JSON thành các OBJECT
function ParseJson(jsondata) {
    try {
        return JSON.parse(jsondata);
    } catch (error) {
        return null;
    }
}
 
 
//Khi có mệt kết nối được tạo giữa Socket Client và Socket Server
io.on('connection', function(socket) {	//'connection' (1) này khác gì với 'connection' (2)
	//hàm console.log giống như hàm Serial.println trên Arduino
    console.log("Connected"); //In ra màn hình console là đã có một Socket Client kết nối thành công.
	
	//Gửi đi lệnh 'welcome' với một tham số là một biến JSON. Trong biến JSON này có một tham số và tham số đó tên là message. Kiểu dữ liệu của tham số là một chuối.
    socket.emit('welcome', {
        message: 'Connected !!!!'
    });
	
	//khi lắng nghe được lệnh "atime" với một tham số, và chúng ta đặt tên tham số đó là data. Mình thích thì mình đặt thôi
    socket.on('transmit', function(data) {
        console.log("Transmit data", data)
        console.log(data);
		socket.broadcast.to("receiver").emit('FROM TRANSMITTER', data);
    });
	
	socket.on('join', function(data) {
		console.log("Join to ROOM", data)
		socket.join(data.id)
	})
	
});