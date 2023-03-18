// const { model } = require("mongoose");
// const { Configuration, OpenAIApi } = require("openai");

// const config = new Configuration({
// 	apiKey: "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",
// });

// const openai = new OpenAIApi(config);

// const runPrompt = async () => {
// 	const prompt = `
//         Good morning. Return response in the following parsable JSON format:

//         {
//             "Q": "question",
//             "A": "answer"
//         }

//     `;

// 	const response = await openai.createCompletion({
// 		model: "text-davinci-003",
// 		prompt: prompt,
// 		max_tokens: 1024,
// 		temperature: 1,
// 	});

// 	const parsableJSONresponse = response.data.choices[0].text;
// 	const parsedResponse = JSON.parse(parsableJSONresponse);

// 	console.log("Question: ", parsedResponse.Q);
// 	console.log("Answer: ", parsedResponse.A);
// };

// module.exports = runPrompt()
