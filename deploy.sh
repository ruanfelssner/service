#!/bin/bash
sudo aa-remove-unknown
git pull
docker-compose down
docker-compose up -d