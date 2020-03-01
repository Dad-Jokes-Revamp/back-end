
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('jokes')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('jokes').insert([
        {
          "user_id": "2",
          "joke_title": "joke1",
          "joke_question": "What did the drummer call his twin daughters?",
          "joke_answer": "Anna one, Anna two!"
        },
        {
          "user_id": "2",
          "joke_title": "joke2",
          "joke_question": "How did Darth Vader know what Luke got him for Christmas?",
          "joke_answer": "He felt his presents!"
        },
        {
          "user_id": "2",
          "joke_title": "joke3",
          "joke_question": "Did you hear about the chameleon who couldn't change color?",
          "joke_answer": "He had a reptile dysfunction."
        },
        {
          "user_id": "2",
          "joke_title": "joke4",
          "joke_question": "I wanted to go on a diet,",
          "joke_answer": "but I feel like I have way too much on my plate right now."
        },
        {
          "user_id": "2",
          "joke_title": "joke5",
          "joke_question": "Want to hear a joke about construction?",
          "joke_answer": "I'm still working on it."
        },
        {
          "user_id": "2",
          "joke_title": "joke6",
          "joke_question": "What’s Forrest Gump’s password?",
          "joke_answer": "1forrest1"
        },
        {
          "user_id": "2",
          "joke_title": "joke7",
          "joke_question": "What sound does a witches car make?",
          "joke_answer": "Broom Broom"
        },
        {
          "user_id": "2",
          "joke_title": "joke8",
          "joke_question": "To whoever stole my copy of Microsoft Office, I will find you.",
          "joke_answer": "You have my Word!"
        },
      ]);
    });
};
