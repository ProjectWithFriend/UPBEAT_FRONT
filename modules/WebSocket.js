import {over} from "stompjs";
import SockJS from "sockjs-client";

let stompClient = null;

export const connect = () =>{
    const socket = new SockJS('http://localhost:8080/ws');
    stompClient = over(socket);
    stompClient.connect({}, () =>{
        console.log("Connected");
    }, (error) =>{
        console.log(error);
    });
}

export const subscribe = (topic, callback) =>{
    stompClient.subscribe(topic, (data) =>{
        callback(JSON.parse(data.body));
    })
};

export const send = (topic,data) =>{
    stompClient.send(topic,{},JSON.stringify(data));
}

export const disconnect = () =>{
    if(stompClient !== null){
        stompClient.disconnect();
    }
}