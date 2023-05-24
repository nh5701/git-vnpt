var fs = require('fs');
const path = require('path');
var mqtt = require('mqtt');
const os = require('os');

const networkInterfaces = os.networkInterfaces();
const ip = networkInterfaces['wlp0s20f3'][0].address; // replace 'eth0' with your network interface name
console.log(ip);

const options = {
  host: String(ip),
  port: 1883,
};
const client = mqtt.connect(options);
client.setMaxListeners(20);

const topicSub = 'request';
const topicPub = 'data';
const topicStatus = 'status';

const folder = "database";
var msg;
let a = 0;

function listFiles(dir) {
  const files = fs.readdirSync(dir);
  const fileList = [];
  for (const file of files) {
    const filePath = file;
    fileList.push(filePath);
  }
  return fileList;
}

async function main() {
  
  const files = listFiles(folder);
  for (const file of files) {
    client.publish("status", "&&&---SEND Folder: " + file +"---&&&");
    await waitForOKMessage(file);
    console.log("#####  DONE File! #####");
    client.publish("status", "#####---DONE File: " + file +"---#####");
  }
  console.log("@@@+++DONE Folder!+++@@@");
    client.publish("status", "#####---@@@+++DONE Folder!+++@@@---#####");

}

client.on('connect', function () {
  // Subscribe chủ đề 'myTopic'
  client.subscribe(topicSub, function (err) {
    if (err) {
      console.log('Không thể subscribe chủ đề', err)
    } else {
      console.log('Đã subscribe chủ đề!' + topicSub)
    }
  });
})

function waitForOKMessage(dataFile) {
  let i = -1;
  let tem = 0;
  return new Promise((resolve, reject) => {
    (async () => {
      await funClientOn();
      console.log('Next command after myFunction'); 
      console.log("***&&&&&&&^^^^A ngoai: " + a + "; i: " + i + " tem: " + tem);
    if (a == 1) {
      i = -1;
      a = 0;
      tem = 0;
      resolve("Done");
    }
    })();

  });

  async function funClientOn() {
    return new Promise((resolve, reject) => {
    client.on('message', async function messageOK(topic, message) {
      // Xử lý dữ liệu
      msg = message.toString();
      console.log('Đã nhận được dữ liệu từ chủ đề', topic, ':', msg)
      if (msg === 'OK') {
        i++;
        await funReadFile(dataFile, a, tem, i);
        a = 1;
        client.removeListener("message", messageOK);
        resolve("done file!");
      }
    });
    })
  }

}

function funReadFile(dataFile, a, tem, i) {
  return new Promise((resolve, reject) => {
    fs.readFile(`${folder}/${dataFile}`, 'utf8', (err, data) => {
      if (err) throw err;
      const jsonData = JSON.parse(data);
      tem = Number(jsonData.map_code.length);
      if (i == tem) {
        client.publish("status", "$$$ DONE file: " + jsonData.model +"  $$$");
        console.log("$$$  DONE file: " + jsonData.model + "  $$$");
        resolve("DONE");
      }
      else {
        console.log("HANG: " + jsonData.brand);
        console.log("MODEL: " + jsonData.model);
        // console.log("KEY: " + jsonData.map_code[i].name);
        console.log("Gui code key so: " + String(i));
        const element = jsonData.map_code[i].code.toString();
        // console.log(element);
        client.publish('data', element);//local
        console.log("++");
        console.log(tem);
      }
    });
  });
}

main();