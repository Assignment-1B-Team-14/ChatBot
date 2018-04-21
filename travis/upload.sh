#!/usr/bin/env bash

dir -alh

##### Create Output Folders #####
mkdir $HOME/build
mkdir $Home/build/Web-Page
mkdir $Home/build/Android-App
mkdir $Home/build/iOS-App
mkdir $Home/build/Backend-Server

##### Copy Files #####

  ### Android-App ###
  cp -fr code/frontend/mobile/android/app/build/outputs/apk/ $HOME/build/Android-App

  ### Web-Page ###
  cp -fr code/frontend/web/build/ $HOME/build/Web-Page

  ### iOS-App ###
  touch $HOME/build/iOS-App/note.txt
  echo "No iOS App Present!!!" > $HOME/build/iOS-App/note.txt

  ### Backend-Server ###
  cp -fr code/backend/build/ $HOME/build/Backend-Server

##### Set File Permissions #####
chmod -r 444 $HOME/build

##### Setup Git #####
cd $HOME
#xxxgit config --global user.email "florian.widder@live.de"
#xxxgit config --global user.name "Florian Widder"

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
