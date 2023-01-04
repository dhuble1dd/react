import React, { useRef, useState, useMemo, useEffect } from "react";
import ClassCounter from "./components/classCounter";
import Counter from "./components/counter";
import './styles/app.css';
import PostItem from "./components/postItem";
import PostList from "./components/postList";
import MyButton from "./components/UI/button/myButton";
import MyInput from "./components/UI/input/Myinput";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import { usePosts } from "./hooks/usePosts";
import axios from "axios";
import PostService from "./API/PostService";
import Loader from "./components/UI/loader/loader";
import { useFetching } from "./hooks/useFetching";
import { getPageCount, getPagesArray } from "./utils/page";
import Pagination from "./components/UI/pagination/pagination";
import { useLoaderData, useNavigate, useParams} from "react-router-dom";


function App() {
    const [posts, setPosts] = useState([
        //{ id: 1, title: 'ааа', body: 'йуцй' },
        //{ id: 2, title: 'ббб 2', body: 'выфвц' },
        //{ id: 3, title: 'ииии 3', body: 'фыв' },
    ])

    const params = useParams();
    
    const page = params?.page ?? 1;

    const navigate = useNavigate();
    const [filter, setFilter] = useState({ sort: '', query: '' });
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    //const [page, setPage] = useState(1);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    

    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        setPosts(response.data);
        const totalCount = (response.headers['x-total-count'])
        setTotalPages(getPageCount(totalCount, limit))
    })

    useEffect(() => {
        fetchPosts();

        return ()=>controller.abort()
    }, [page])

    const createPost = (newPost) => {
        setPosts([...posts, newPost,]);
        setModal(false);
    };

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    };

    const changePage = (page) => {
        console.log(`/${page}`)
        navigate(`/${page}`)    
    };

    return (
        <div className="App">
            <button onClick={fetchPosts}>Get Posts</button>
            <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
                Создать пользователя
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>
            <hr style={{ margin: '15px' }} />
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            {postError &&
                <h1>Произошла ошибка ${postError}</h1>
            }
            {isPostsLoading
                ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}><Loader /></div>
                : <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Посты про JS'} />

            }
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />
        </div>
    );
}

export default App;
