const axios = require('axios').default;
const KEY = '27696638-26ff957efade4726366145eb0';
const URL = 'https://pixabay.com/api/';

export default class Server {
  constructor() {
    this.name = '';
    this.page = 1;
    this.total = 0;
  }
  async serverData() {
    const serverDataURL = `${URL}?key=${KEY}&q=${this.name}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=12`;
    try {
      const server = await axios.get(serverDataURL);
      const data = await server.data;
      this.total = await data.totalHits;
      return data;
    } catch (error) {}
  }
}
