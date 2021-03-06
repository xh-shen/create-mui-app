###
 # @Author: shen
 # @Date: 2021-01-11 22:24:02
 # @LastEditors: shen
 # @LastEditTime: 2021-01-11 22:24:29
 # @Description: 
### 
set -e

rm -rf ./build

./node_modules/.bin/tsc

mv ./build/src/* ./build
rm -rf ./build/src
cp README.md package.json LICENSE ./build

old_registry=$(npm config get registry)
npm config set registry https://registry.npmjs.org
set +e
whoami=$(npm whoami 2>/dev/null)
set -e

if [ -z "$whoami" ]
then
   echo "login plz..."
   npm login
fi
echo "I am: $(npm whoami)"

sleep 1
echo "Begin publish..."
npm publish ./build/ --access=public "$@"

npm config set registry ${old_registry}