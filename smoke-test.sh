# exit on any errors in commands below
# https://stackoverflow.com/questions/90418/exit-shell-script-based-on-process-exit-code
set -e
node ./bin/openedx jest --coverage plugins
cd cli/test-app
npm install
npm run lint
npm run test
npm run build
cd ../../
