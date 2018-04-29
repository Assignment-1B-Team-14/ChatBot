package com.team14.backend.testIt;

import org.alicebot.ab.Chat;
import org.alicebot.ab.History;
import org.alicebot.ab.MagicBooleans;
import org.alicebot.ab.MagicStrings;
import org.alicebot.ab.utils.IOUtils;

import com.team14.backend.bot.ChatBotFactory;

public class botest {
	public static void main(String... strings) {
		Chat chatSession = ChatBotFactory.getChat();
		String textLine = "";

		while (true) {
			System.out.print("Human : ");
			textLine = IOUtils.readInputTextLine();
			if ((textLine == null) || (textLine.length() < 1)) {
				textLine = MagicStrings.null_input;
			}
			if (textLine.equals("q")) {
				System.exit(0);
			} else if (textLine.equals("wq")) {

			} else {
				String request = textLine;
				if (MagicBooleans.trace_mode) {
					System.out.println("STATE=" + request + ":THAT=" + ((History) chatSession.thatHistory.get(0)).get(0)
							+ ":TOPIC=" + chatSession.predicates.get("topic"));
				}
				String response = chatSession.multisentenceRespond(request);
				while (response.contains("&lt;")) {
					response = response.replace("&lt;", "<");
				}
				while (response.contains("&gt;")) {
					response = response.replace("&gt;", ">");
				}
				System.out.println("Robot : " + response);
			}
		}
	}
}
