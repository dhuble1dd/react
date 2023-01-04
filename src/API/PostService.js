import axios from "axios";


const controller = new AbortController();



export default class PostService {
    static async getAll(limit = 10, page = 1) {
        console.log('getting with page ', page)
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
                _limit: limit,
                _page: page,
            },
            signal: controller.signal
        });
        return response;
    }
}