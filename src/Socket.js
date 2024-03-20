import socketIO from "socket.io-client";
import Cookies from "js-cookie";

const token = Cookies.get("userToken")
// const socket = socketIO.connect("http://localhost:4000/");
const socket = socketIO.connect(`http://localhost:4000/` );

export default socket;
            