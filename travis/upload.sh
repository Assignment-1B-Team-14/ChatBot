##### PREPARE #####

sudo chmod 777 -R $HOME

##### Create Output Folders #####
cd $HOME
mkdir build
mkdir build/Web-Page
mkdir build/Android-App
mkdir build/iOS-App
mkdir build/Backend-Server

##### Copy Files #####

  ### Android-App ###
  cp -fr $TRAVIS_BUILD_DIR/code/frontend/mobile/android/app/build/outputs/apk/ $HOME/build/Android-App

  ### Web-Page ###
  cp -fr $TRAVIS_BUILD_DIR/code/frontend/web/build/ $HOME/build/Web-Page

  ### iOS-App ###
  touch $HOME/build/iOS-App/note.txt
  echo "No iOS App Present!!!" > $HOME/build/iOS-App/note.txt

  ### Backend-Server ###
  cp -fr $TRAVIS_BUILD_DIR/code/backend/build/ $HOME/build/Backend-Server

##### Setup Git #####
cd $HOME
git config --global user.email "florian.widder@live.de"
git config --global user.name "Florian Widder"

##### Clone Master Branch ######
cd $HOME
git clone --quiet --branch master https://fwidder:$OAUTH_GITHUB@github.com/Assignment-1B-Team-14/ChatBot master
echo 1
dir

##### Copy Files #####
cd $HOME/build
echo 2
dir
mv -f $HOME/build $HOME/master/build
echo 3
dir

##### Upload to Git #####
cd $HOME/master/
echo 4
dir
git add -f ./build/*
git commit -m "Travis build $TRAVIS_BUILD_NUMBER pushed. [skip ci]"
git push origin builds -fq

echo "Done!"
