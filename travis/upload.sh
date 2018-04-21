#!/usr/bin/env bash

sudo chmod 777 -R $HOME

dir -alh

##### Create Output Folders #####
cd $HOME
mkdir build
mkdir build/Web-Page
mkdir build/Android-App
mkdir build/iOS-App
mkdir build/Backend-Server

##### Copy Files #####

  ### Android-App ###
  cp -fr code/frontend/mobile/android/app/build/outputs/apk/ build/Android-App

  ### Web-Page ###
  cp -fr code/frontend/web/build/ build/Web-Page

  ### iOS-App ###
  touch build/iOS-App/note.txt
  echo "No iOS App Present!!!" > build/iOS-App/note.txt

  ### Backend-Server ###
  cp -fr code/backend/build/ /build/Backend-Server

##### Set File Permissions #####
chmod 777 -R build

##### Setup Git #####
cd $HOME
git config --global user.email "florian.widder@live.de"
git config --global user.name "Florian Widder"

##### Clone Master Branch #####
git clone --quiet --branch master https://fwidder:$OAUTH_GITHUB@github.com/Assignment-1B-Team-14/ChatBot master

##### Copy Files #####
cd master
cp -rf $HOME/build /build

cd /build
dir -ahl
cd ..

##### Upload to Git #####
cd /build
git add -f .
cd ..
#xxxgit remote rm origin
#xxxgit remote add origin https://fwidder:$OAUTH_GITHUB@github.com/Assignment-1B-Team-14/ChatBot
#xxxgit commit -m "Travis build $TRAVIS_BUILD_NUMBER pushed. [skip ci]"
#xxxgit push origin master -fq

echo "Done!"
