const mqtt = require('mqtt')
const fs = require('fs');
const path = require('path');

// const host = 'broker.emqx.io'
const host = '192.168.88.173'
const port = '1883'
// const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const folderPath = './data_folder'; // Đường dẫn của thư mục mới
const filePath = path.join(folderPath, 'data.txt'); // Đường dẫn của tệp tin mới

// Kiểm tra và tạo thư mục nếu chưa tồn tại
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
  console.log('Folder created:', folderPath);
}

const connectUrl = `mqtt://${host}:${port}`
const client = mqtt.connect(connectUrl)
const topic = 'mqtt'

client.on('connect', () => {
  console.log('Connected')
  client.subscribe([topic], () => {
    console.log(`Subscribe to topic '${topic}'`)
  })
})

client.on('message', async function messageOK(topic, payload) {
  console.log('Received Message:', topic, payload.toString())
  const data = payload.toString();
  console.log('Received message:', data);

  await writeFile(data);

  console.log("DONE!");
})

function writeFile(data) {
  return new Promise((resolve, reject) => {

    // Kiểm tra và tạo tệp tin nếu chưa tồn tại
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '');
      console.log('File created:', filePath);
    }

    // Ghi dữ liệu vào tệp tin
    fs.appendFileSync(filePath, data + '\n');
    console.log('Data written to file:', filePath);
    resolve("done");
  });
}
