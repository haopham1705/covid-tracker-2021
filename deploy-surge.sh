#build react app with production mode
npm run build

#move to build folder
cd build

#clone index.html into "200.html"
cp index.html 200.html

#start deploying via surge', deploy current folder to this domain
surge . covid19-tracker-haopham.surge.sh