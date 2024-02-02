# move all files of template-root to root directory of this project
mv -v ./.github/template-root/* ./
mkdir .github/workflows
mv -v .github/template-root/.github/workflows/continuous-deployment.yml .github/workflows/continuous-deployment.yml

# remove content of template-root
rm -f -r ./.github/template-root
rm -f ./setup.sh

# commit the changes
git add .
git commit -m "execute setup script"
git push
