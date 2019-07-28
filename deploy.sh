npm run build
rm -rf  ../billiard-tool-deploy/static
cp -p  dist/*.* ../billiard-tool-deploy
cp -rp dist/*   ../billiard-tool-deploy
cd ../billiard-tool-deploy
git add -u
git add -A
git commit -m "deploy"
git push origin master
cd -
