#!/bin/bash
set -e

if [ -f /dock_api/tmp/pids/server.pid ]; then
  rm -f /dock_api/tmp/pids/server.pid
fi

exec "$@"
