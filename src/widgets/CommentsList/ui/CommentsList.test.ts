import { getComments } from '../tests/api';


describe('Комменты', () => {
  test('проверка кол-во комментов', () => {
    return getComments().then(data => {
      expect(data?.length).toBe(30);
    });
  });
});
