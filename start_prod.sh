#! /bin/bash

echo PreBuild? -y,n-

read prebuild

if [ "$prebuild" = "y" ]; then
  docker-compose -f docker-compose.yml build
fi
docker stack deploy -c docker-compose.yml patent_pro --with-registry-auth


