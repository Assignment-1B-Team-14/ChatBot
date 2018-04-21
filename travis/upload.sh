##### PREPARE #####

sudo chmod 777 -R $HOME

##### Create Output Folders #####
cd $HOME
mkdir builds/Web-Page
mkdir builds/Android-App
mkdir builds/iOS-App
mkdir builds/Backend-Server

##### Copy Files #####

  ### Android-App ###
  cp -fr $TRAVIS_BUILD_DIR/code/frontend/mobile/android/app/build/outputs/apk/ $HOME/builds/Android-App

  ### Web-Page ###
  cp -fr $TRAVIS_BUILD_DIR/code/frontend/web/build/ $HOME/builds/Web-Page

  ### iOS-App ###
  touch $HOME/builds/iOS-App/note.txt
  echo "No iOS App Present!!!" > $HOME/builds/iOS-App/note.txt

  ### Backend-Server ###
  cp -fr $TRAVIS_BUILD_DIR/code/backend/build/ $HOME/builds/Backend-Server

##### Setup Git #####
cd $HOME
git config --global user.email "florian.widder@live.de"
git config --global user.name "Florian Widder"

##### Clone Master Branch ######
git clone --quiet --branch builds https://fwidder:$OAUTH_GITHUB@github.com/Assignment-1B-Team-14/ChatBot $HOME/master

##### Copy Files #####
mv -f $HOME/builds $HOME/master/build

##### Upload to Git #####
cd $HOME/master/
git add -f ./build/*
git commit -m "Travis build $TRAVIS_BUILD_NUMBER pushed. [skip ci]"
git push origin builds:builds -fq

echo "Done!"
