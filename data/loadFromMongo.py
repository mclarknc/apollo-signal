#!/usr/bin/env python3

from pymongo import MongoClient
import psycopg2 as pg
from psycopg2.extensions import AsIs
import json
from datetime import datetime

reset = False
mongo = MongoClient()['AirControl']

conn = pg.connect(user='aircontrol', password='fib40nam', database='aircontrol')
cur = conn.cursor()

now = datetime.utcnow()

if reset:
    qs=('delete from devices')
    cur.execute(qs)
    qs=('delete from essids')
    cur.execute(qs)
    qs=('delete from hostnames')
    cur.execute(qs)
    qs=('delete from ipaddrs')
    cur.execute(qs)
    qs=('delete from netmodes')
    cur.execute(qs)
    qs=('delete from products')
    cur.execute(qs)            
    qs=('delete from versions')
    cur.execute(qs)
    qs=('delete from wlanopmodes')
    cur.execute(qs)              

mdata = mongo.AC.find().limit(100)
for doc in mdata:
    qs = "select id from essids where essid='{}'".format(doc['essid'])
    result = cur.execute(qs)
    rows = cur.fetchall()
    if len(rows) == 0:
        cols = AsIs('essid, "createdAt", "updatedAt"')
        qs = "insert into essids ({}) values ('{}', '{}', '{}')".format(cols, doc['essid'], now, now)
        cur.execute(qs)
        print(qs)
        essidId = cur.fetchone()[0]
    else:
        essidId = rows[0][0]

    qs = "select id from hostnames where hostname='{}'".format(doc['hostname'])
    result = cur.execute(qs)
    rows = cur.fetchall()
    if len(rows) == 0:
        qs = "insert into essids (hostname, createdAt, updatedAt) values ({}, '{}', '{}')".format(doc['hostname'], now, now)
        cur.execute(qs)
        hostnameId = cur.fetchone()[0]
    else:
        hostnameId = rows[0][0]

    qs = "select id from ipaddrs where ipaddr='{}'".format(doc['ipaddr'])
    result = cur.execute(qs)
    rows = cur.fetchall()
    if len(rows) == 0:
        qs = "insert into ipaddrs (ipaddr, createdAt, updatedAt) values ({}, '{}', '{}')".format(doc['ipaddr'], now, now)
        cur.execute(qs)
        ipaddrId = cur.fetchone()[0]
    else:
        ipaddrId = rows[0][0]

    qs = "select id from netmodes where netmode='{}'".format(doc['netmode'])
    result = cur.execute(qs)
    rows = cur.fetchall()
    if len(rows) == 0:
        qs = "insert into netmodes (netmode, createdAt, updatedAt) values ({}, '{}', '{}')".format(doc['netmode'], now, now)
        cur.execute(qs)
        netmodeId = cur.fetchone()[0]
    else:
        netmodeId = rows[0][0]

    qs = "select id from products where product='{}'".format(doc['product'])
    result = cur.execute(qs)
    rows = cur.fetchall()
    if len(rows) == 0:
        qs = "insert into products (product, createdAt, updatedAt) values ({}, '{}', '{}')".format(doc['product'], now, now)
        cur.execute(qs)
        productId = cur.fetchone()[0]
    else:
        productId = rows[0][0]

    qs = "select id from versions where version='{}' and shortversion='{}'".format(doc['version'], doc['shortVersion'])
    result = cur.execute(qs)
    rows = cur.fetchall()
    if len(rows) == 0:
        qs = "insert into versions (version, shortVersion, createdAt, updatedAt) values ({}, '{}', '{}')".format(doc['version'], doc['shortVersion'], now, now)
        cur.execute(qs)
        versionId = cur.fetchone()[0]
    else:
        versionId = rows[0][0]                
        
    qs = "select id from wlanopmodes where wlanopmode='{}'".format(doc['wlanOpMode'])
    result = cur.execute(qs)
    rows = cur.fetchall()
    if len(rows) == 0:
        qs = "insert into wlanopmodes (wlanopmode, createdAt, updatedAt) values ({}, '{}', '{}')".format(doc['wlanOpMode'], now, now)
        cur.execute(qs)
        wlanopmodeId = cur.fetchone()[0]
    else:
        wlanopmodeId = rows[0][0]
        
    print(essidId, hostnameId, ipaddrId, netmodeId, versionId, wlanopmodeId)
