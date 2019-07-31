rm -rf  ./doc
npm run build
git add -u
git add -A
git commit -m "deploy"
git push origin master

