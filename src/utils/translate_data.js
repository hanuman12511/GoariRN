import axios from 'axios';
export const translate_data = () => {
  const options = {
    method: 'POST',
    url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
    params: {
      'api-version': '3.0',
      to: '<REQUIRED>',
      textType: 'plain',
      profanityAction: 'NoAction',
    },
    headers: {
      'content-type': 'application/json',
      'x-rapidapi-host': 'microsoft-translator-text.p.rapidapi.com',
      'x-rapidapi-key': '9ef3ead71cmshfe7cdb82c5e7ad3p1caf52jsnc15f33645499',
    },
    data: [
      {
        Text: 'I would really like to drive your car around the block a few times.',
      },
    ],
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
};
