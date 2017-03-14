#!/bin/bash
while IFS='' read -r line || [[ -n "$line" ]]; do
    node --max_old_space_size=5000 loadFromMongo.js $line
done < "$1"
