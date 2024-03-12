from flask import Flask
from pyspark import SparkSession
import os

ssh_password = os.environ.get('SSH_PASSWORD')
spark = SparkSession.builder \
    .appName("mambaout") \
    .config("spark.sql.warehouse.dir", "hdfs://user/hive/warehouse") \
    .config("hive.metastore.uris", "thrift://172.16.0.195:9083") \
    .enableHiveSupport() \
    .getOrCreate()
spark.sql("show tables").show()

