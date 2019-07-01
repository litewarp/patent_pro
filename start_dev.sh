#! /bin/bash

# option to pre-build dev images
echo PreBuild? -y,n-

read prebuild

if [ "$prebuild" = "y" ]; then
  echo Which Image? Enter for All -opt: app, api-
  read build
  docker-compose -f docker-compose.dev.yml build $build
fi

docker stack deploy -c docker-compose.dev.yml patent_pro


