# git-vnpt

#Set up MQTT
    Install mosquitto
    run mosquitto
        mosquitto -c myconfig.conf

Step 1:

Server:
        node server.js
        
MQTT:
        mosquitto_pub -h localhost -p 1883 -t request -m "OK"

# SERVER:
File sevre.js -> ghi file status:

File tool_demo.js -> duyet doc file database: