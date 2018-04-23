##### PREPARE #####
if [ "$TRAVIS_PULL_REQUEST" = "true" ]; then exit; fi

if [ "$TRAVIS_BRANCH" != "master" ]; then exit; fi
sudo chmod 777 -R $HOME

##### Create Output Folders #####
cd $HOME
case $TYPE in
	ANDROID)
    mkdir builds/Android-App
		;;
	IOS)
    mkdir builds/iOS-App
		;;
	MOBILE_SIMPLE)
    mkdir builds/Mobile-Simple
		;;
	WEB)
    mkdir builds/Web-Page
		;;
	BACKEND)
    mkdir builds/Backend-Server
		;;
	*)
		echo "ERROR Unkown Type $TYPE"
		;;
esac

##### Copy Files #####
case $TYPE in
	ANDROID)
    cp -fr $TRAVIS_BUILD_DIR/code/frontend/mobile/android/app/build/outputs/apk/* $HOME/builds/Android-App
		;;
	WEB)
    cp -fr $TRAVIS_BUILD_DIR/code/frontend/web/build/* $HOME/builds/Web-Page/
		;;
	IOS)
    touch $HOME/builds/iOS-App/note.txt
    echo "No iOS App Present!!!" > $HOME/builds/iOS-App/note.txt
		;;
	MOBILE_SIMPLE)
    touch $HOME/builds/Mobile-Simple/note.txt
    echo "Expo Link gets live deployed to Expo.io (https://expo.io/@fwidder/chatbot-expo-app)" > $HOME/builds/Mobile-Simple/note.txt
		;;
	BACKEND)
    cp -fr $TRAVIS_BUILD_DIR/code/backend/target/*.jar $HOME/builds/Backend-Server
		;;
	*)
		echo "ERROR Unkown Type $TYPE"
		;;
esac

##### Setup Git #####
cd $HOME
git config --global user.email "florian.widder@live.de"
git config --global user.name "Florian Widder"

##### Clone Master Branch ######
git clone --quiet --branch builds https://fwidder:$OAUTH_GITHUB@github.com/Assignment-1B-Team-14/ChatBot $HOME/master
case $TYPE in
	ANDROID)
		rm -rf $HOME/master/build/Android-App
		;;
	WEB)
		rm -rf $HOME/master/build/Web-Page
		;;
	IOS)
		rm -rf $HOME/master/build/iOS-App
		;;
	MOBILE_SIMPLE)
		rm -rf $HOME/master/build/Mobile-Simple
		;;
	BACKEND)
		rm -rf $HOME/master/build/Backend-Server
		;;
	*)
		echo "ERROR Unkown Type $TYPE"
		;;
esac

##### Copy Files #####
mkdir $HOME/master/build
mv -f $HOME/builds/* $HOME/master/build

##### Upload to Git #####
cd $HOME/master/

git add -f ./build/*
git commit -m "Travis build $TRAVIS_BUILD_NUMBER pushed. [skip ci]"
git push origin builds:builds -fq

echo "Done!"
