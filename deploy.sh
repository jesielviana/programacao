MESSAGE=$1

rm -rf public/* !.git
npm run build                                
cd public
git add --all
git commit -m "$MESSAGE"
git push origin gh-pages