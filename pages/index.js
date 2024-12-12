"use client";

import {
  Box,
  Button,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
const questions = [
  {
    id: 1,
    question: "Someone cuts you off in traffic. You:",
    options: [
      { text: "Blow them a kiss.", score: 0 },
      { text: "Sigh like a disappointed parent.", score: 2 },
      { text: "Yell 'Your mom’s a great driver!'", score: 5 },
    ],
  },
  {
    id: 2,
    question: "Your Wi-Fi stops working during a game. What’s your next move?",
    options: [
      { text: "Wait patiently and meditate.", score: 0 },
      { text: "Restart the router while muttering curses.", score: 3 },
      { text: "Write a breakup letter to your ISP.", score: 5 },
    ],
  },
  {
    id: 3,
    question: "You see someone littering. How do you react?",
    options: [
      { text: "Pick it up yourself.", score: 0 },
      { text: "Give them the stink eye.", score: 2 },
      { text: "Yell 'Congrats on being trash royalty!'", score: 5 },
    ],
  },
  {
    id: 4,
    question: "Someone posts an opinion you hate. You:",
    options: [
      { text: "Scroll on like an evolved human.", score: 0 },
      { text: "Drop a clown emoji and leave.", score: 3 },
      { text: "Photoshop them into a meme war.", score: 5 },
    ],
  },
  {
    id: 5,
    question: "How do you handle trolls?",
    options: [
      { text: "Block and forget.", score: 0 },
      { text: "Hit them with a 'cool story, bro.'", score: 2 },
      { text: "Hack their account and post cringe.", score: 5 },
    ],
  },
  {
    id: 6,
    question: "Your friend flakes on plans. You:",
    options: [
      { text: "Say, 'All good, mate,' and vibe alone.", score: 0 },
      { text: "Send a passive-aggressive 'K.'", score: 3 },
      {
        text: "Post an Insta story with the caption 'Some people, smh.'",
        score: 5,
      },
    ],
  },
  {
    id: 7,
    question: "How often do you roast your friends?",
    options: [
      { text: "Only during toasts at weddings.", score: 0 },
      { text: "When they ask for it.", score: 3 },
      { text: "Every time they breathe.", score: 5 },
    ],
  },
  {
    id: 8,
    question: "What’s your go-to insult?",
    options: [
      { text: "'Bless your heart.'", score: 0 },
      { text: "'Your brain runs on Windows Vista.'", score: 3 },
      { text: "'You bring down group projects by existing.'", score: 5 },
    ],
  },
  {
    id: 9,
    question: "Your idea of a good prank?",
    options: [
      { text: "Swapping sugar for salt.", score: 0 },
      { text: "Texting 'We need to talk' and ghosting.", score: 3 },
      { text: "Convincing someone they’re adopted.", score: 5 },
    ],
  },
  {
    id: 10,
    question: "You’re angry. How do you vent?",
    options: [
      { text: "Write poetry.", score: 0 },
      { text: "Start fake arguments in Reddit threads.", score: 3 },
      { text: "Yell at your microwave for not understanding you.", score: 5 },
    ],
  },
  {
    id: 11,
    question: "Someone says trash about you behind your back. You:",
    options: [
      { text: "Let karma handle it.", score: 0 },
      { text: "Start a group chat roasting them.", score: 3 },
      { text: "Pull up receipts and go full FBI.", score: 5 },
    ],
  },
  {
    id: 12,
    question: "What’s your relationship with caps lock?",
    options: [
      { text: "Used sparingly, like fine wine.", score: 0 },
      { text: "FOR SPECIAL OCCASIONS ONLY.", score: 3 },
      { text: "YOU MEAN NORMAL SPEAKING MODE?", score: 5 },
    ],
  },
  {
    id: 13,
    question: "What’s your favorite way to argue?",
    options: [
      { text: "Calm discussion over tea.", score: 0 },
      { text: "Passive-aggressive memes.", score: 3 },
      { text: "Shouting 'I’m right!' until they give up.", score: 5 },
    ],
  },
  {
    id: 14,
    question: "Your sibling eats the last piece of pizza. You:",
    options: [
      { text: "Smile and order another.", score: 0 },
      { text: "Demand compensation immediately.", score: 3 },
      {
        text: "Put a 'Do Not Eat' note on everything in the fridge.",
        score: 5,
      },
    ],
  },
  {
    id: 15,
    question: "Your teammate takes credit for your work. You:",
    options: [
      { text: "Let it slide, karma will catch them.", score: 0 },
      { text: "Subtly remind everyone of your contribution.", score: 3 },
      { text: "Plan a PowerPoint exposing their lies.", score: 5 },
    ],
  },
  {
    id: 16,
    question: "How do you react to bad customer service?",
    options: [
      { text: "Thank them anyway and move on.", score: 0 },
      { text: "Leave a three-star review.", score: 3 },
      { text: "Write a detailed rant on every platform available.", score: 5 },
    ],
  },
  {
    id: 17,
    question: "Your favorite way to dominate in a debate?",
    options: [
      { text: "Present well-researched facts.", score: 0 },
      { text: "Use witty comebacks.", score: 3 },
      { text: "Interrupt them until they give up.", score: 5 },
    ],
  },
  {
    id: 18,
    question: "How do you handle losing a game?",
    options: [
      { text: "Congratulate the winner.", score: 0 },
      { text: "Demand a rematch immediately.", score: 3 },
      { text: "Accuse them of hacking.", score: 5 },
    ],
  },
  {
    id: 19,
    question: "How often do you make sarcastic remarks?",
    options: [
      { text: "Only when necessary.", score: 0 },
      { text: "At least once a day.", score: 3 },
      { text: "Is there any other way to talk?", score: 5 },
    ],
  },
  {
    id: 20,
    question: "What’s your reaction to slow walkers?",
    options: [
      { text: "Patiently walk behind them.", score: 0 },
      { text: "Overtake them with an annoyed look.", score: 3 },
      { text: "Mumble 'Nice stroll, grandpa' as you pass.", score: 5 },
    ],
  },
  {
    id: 21,
    question: "You hear a baby crying on a plane. You:",
    options: [
      { text: "Offer to help the parents.", score: 0 },
      { text: "Put on noise-canceling headphones.", score: 3 },
      { text: "Complain loudly to the flight attendant.", score: 5 },
    ],
  },
];

const Home = () => {
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [aiRemark, setAiRemark] = useState("");

  const handleNext = () => {
    const selectedAnswer = answers[currentQuestion];
    const currentScore = questions[currentQuestion]?.options.find(
      (opt) => opt.text === selectedAnswer
    )?.score;

    setScore(score + (currentScore || 0));
    setCurrentQuestion(currentQuestion + 1);
  };

  const handleAnswerChange = (value) => {
    setAnswers({ ...answers, [currentQuestion]: value });
  };

  const genAI = new GoogleGenerativeAI(
    "AIzaSyCV5D1rcZ3EN9sa0l7elScHMnawyAmEiUM"
  );
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const handleGetAiRemark = async () => {
    const prompt = `User answered the following questions: \n${questions
      .map(
        (q, index) =>
          `Question: ${q.question}\nAnswer: ${answers[index] || "No answer"}\n`
      )
      .join("\n")}\nProvide a personalized remark based on these answers.`;

    try {
      const response = await model.generateContent(prompt);

      setAiRemark(response.response.text());
    } catch (error) {
      console.error("Error fetching remark:", error);
      setAiRemark(`Error connecting to AI, Man I probably have burnt my limit AI API uses, you can still go ahead and 
        paste this given propmt to any AI chat bots of your choice "${prompt}"
        `);
    }
  };

  return (
    <Box
      bg="black"
      color="white"
      minH="100vh"
      p={8}
      display="flex"
      justifyContent="center"
      alignItems="center"
      fontFamily="'Poppins', sans-serif"
    >
      <VStack
        w="100%"
        maxW="600px"
        p={8}
        borderRadius="lg"
        bg={useColorModeValue("gray.800", "gray.700")}
        boxShadow="dark-lg"
      >
        <Text>
          {currentQuestion} out of {questions.length}
        </Text>
        {currentQuestion < questions.length ? (
          <>
            <Text
              fontSize="2xl"
              fontWeight="bold"
              mb={4}
              textAlign="center"
              _hover={{ color: "red.400" }}
            >
              {questions[currentQuestion].question}
            </Text>
            <RadioGroup
              onChange={handleAnswerChange}
              value={answers[currentQuestion] || ""}
            >
              <Stack direction="column" spacing={4}>
                {questions[currentQuestion].options.map((option, index) => (
                  <Radio
                    key={index}
                    value={option.text}
                    _checked={{
                      bg: "red.500",
                      color: "white",
                      borderColor: "red.500",
                    }}
                    _hover={{ bg: "red.700" }}
                  >
                    {option.text}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
            <Button
              mt={8}
              w="full"
              bg="red.500"
              color="white"
              _hover={{ bg: "red.700", transform: "scale(1.05)" }}
              onClick={handleNext}
              isDisabled={!answers[currentQuestion]}
            >
              Next
            </Button>
          </>
        ) : (
          <Box textAlign="center">
            <Text fontSize="3xl" fontWeight="bold" mb={4}>
              Your Total Toxicity Score: {score} / 100
            </Text>
            <VStack justify={"center"} alignItems={"center"} width={"100%"}>
              <Button
                bg="red.500"
                color="white"
                _hover={{ bg: "red.700", transform: "scale(1.05)" }}
                onClick={() => {
                  setAnswers({});
                  setCurrentQuestion(0);
                  setScore(0);
                  setAiRemark(""); // Reset AI remark
                }}
              >
                Retake Quiz
              </Button>
              <Button
                bg="purple.500"
                color="white"
                _hover={{ bg: "purple.700", transform: "scale(1.05)" }}
                mt={4}
                onClick={handleGetAiRemark}
              >
                Let AI give you a review
              </Button>
            </VStack>
            {aiRemark && (
              <Box mt={4} p={4} bg="gray.700" borderRadius="md" boxShadow="lg">
                <Text fontSize="lg" fontWeight="bold">
                  AI Remark:
                </Text>
                <Text>{aiRemark}</Text>
              </Box>
            )}
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default Home;
