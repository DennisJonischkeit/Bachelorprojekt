# !/usr/bin/python
# -*- coding: utf-8 -*-
import json
import random

import datetime

import paho.mqtt.client as mqtt
import time

import influxdb_client
from influxdb_client.client.write_api import SYNCHRONOUS


# MQTT broker config
TOPIC = "cesari/home/djonisch/929426"
BROKER_ADDRESS = "broker.hivemq.com"
PORT = 1883


# toogle safe to database
TOGGLE = False


# InfluxDB config
BUCKET = "slurm_publisher"
ORG = "msqc"
TOKEN = "AFaixQuROJwHKKqoeCluDM4rOSqKi5ZDQ4v9EvMcyRO0AKkS_f3szuA3kAonpPdOdtZX8qDNjbIY1SGEoSz27w=="
URL="http://localhost:8086"

# interval and limit
INTERVALL = 5
LIMIT = 120

def on_message(client, userdata, message):
    msg = str(message.payload.decode("utf-8"))
    print("message received: ", msg)
    print("message topic: ", message.topic)


def on_connect(client, userdata, flags, rc):
    print("Connected to MQTT Broker: " + BROKER_ADDRESS)
    client.subscribe(TOPIC)


def publish_data(interval, toggle, limit):
    count = 0
    while True:
        time.sleep(interval)
        dic = dic_maker()
        msg =json.dumps(dic)
        client.publish(TOPIC, msg, qos=1)
        if toggle:
            store_object(dic, BUCKET, ORG)
        client.loop()
        count += 1
        if count == limit:
            break




def dic_maker():
    header = ['job_id', 'user', 'jobname', 'allocnodes', 'jobid', 'avecpu', 'avecpufreq', 'avediskread',
              'avediskwrite', 'avepages',
              'averss', 'avevmsize', 'consumedenergy', 'maxdiskread', 'maxdiskreadnode', 'maxdiskreadtask',
              'maxdiskwrite', 'maxdiskwritenode',
              'maxdiskwritetask', 'maxpages', 'maxpagesnode', 'maxpagestask', 'maxrss', 'maxrssnode', 'maxrsstask',
              'maxvmsize',
              'maxvmsizenode', 'maxvmsizetask', 'mincpu', 'mincpunode', 'mincputask', 'ntasks', "timestamp"]

    random_avediskread = str(random.randint(5500000,5700000))
    #random_avediskread = str(random.randint(15000, 18000))
    random_avediskwrite = str(random.randint(9000,10000))

    random_avecpufreq = str(random.randint(20000,22000))

    random_avevmsize = str(random.randint(395000000,398000000))

    random_consumedenergy = str(random.randint(3000000,5000000))

    random_avecpu = "0"+str(random.randint(3,4))+":"+str(random.randint(10,59))+".000"

    now = datetime.datetime.now()
    timestamp = now.strftime('%Y-%m-%dT%H:%M:%S.000Z')

    output_str = "929426|djonisch|iorTest3.sh|2|929426.0|"+random_avecpu+"|"+random_avecpufreq+"K|"+random_avediskread+"|"+random_avediskwrite+"|0|141979648|"+random_avevmsize+"|"+random_consumedenergy+"|5787133|node25-003|0|10445|node25-003|0|0|node25-003|0|141979648|node25-003|0|398618624|node25-003|0|02:49.000|node25-003|0|1|"+timestamp
    dic = {}
    output_list = output_str.split('|')
    for i in range(len(header)):
        dic[header[i]] = output_list[i]
    print(dic)
    return dic


def store_object(dic, bucket, org):
    measurement_name = dic["user"]

    point = influxdb_client.Point(measurement_name).tag("jobid", dic["jobid"])
    for key, value in dic.items():
        point.field(key, value)

    write_api = db_client.write_api(write_options=SYNCHRONOUS)
    write_api.write(bucket=bucket, org=org, record=point)



if __name__ == "__main__":

    db_client = influxdb_client.InfluxDBClient(
        url=URL,
        token=TOKEN,
        org=ORG
    )

    client = mqtt.Client()
    client.on_connect = on_connect
    client.connect(BROKER_ADDRESS, PORT)
    publish_data(INTERVALL, TOGGLE, LIMIT)