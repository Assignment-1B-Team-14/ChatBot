FROM adoptopenjdk:8u252-b09-jre-hotspot

RUN \
# update
apt-get update ; \
# install curl
apt-get install curl git --yes ; \
# get install script and pass it to execute:
curl -sL https://deb.nodesource.com/setup_12.x | bash ; \
# and install node
apt-get install nodejs --yes ; \
# confirm that it was successful
node -v ; \
# npm installs automatically
npm -v ; \
# Clone GIT Repo
git clone https://github.com/Assignment-1B-Team-14/ChatBot.git ; \
# Install website
cd ChatBot/code/frontend/web ; \
npm install

ADD ./code/backend/target/main-0.0.2.jar main.jar
COPY ./code/backend/src/main/resources/bots bots

EXPOSE 3000:80 14000:14000

CMD \
java "-DBOT_PATH=./bots" -jar main.jar & \
MYIP=$(hostname -I | awk '{print $1}') && \
FIND='super-bot.pizza' && \
cd ChatBot/code/frontend/web && \
sed -i "s/${FIND}/${MYIP}/g" src/App.js && \
npm start