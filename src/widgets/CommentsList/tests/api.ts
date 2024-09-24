import 'isomorphic-fetch';

export const getComments = async () => {
  try {
    const response = await fetch('https://dummyjson.com/comments');
    const responseJson = await response.json();
    return responseJson.comments;
  } catch (e) {
    console.log(e);
    throw new Error('Ошибка');
  }
};
