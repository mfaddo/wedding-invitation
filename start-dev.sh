#!/bin/bash
PORT=${PORT:-4200}
npx ng serve --port $PORT --host 0.0.0.0
