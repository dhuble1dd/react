import React, {useState} from "react";
import MyButton from "./UI/button/myButton";
import MyInput from "./UI/input/Myinput";

const PostForm = ({create}) => {
    const [post, setPost] = useState({title: '', body: '',});

    const addNewPost = (e) => {
        e.preventDefault();
        const newPost = {
            ...post, id: Date.now(),
        }
        create(newPost);
        setPost({title: '', body: '',});
    }

    return(
        <form>
           
                <MyInput 
                    value={post.title}
                    onChange={e => setPost({...post, title: e.target.value})}
                    type="text" 
                    placeholder="Название поста" 
                />
                <MyInput
                    //ref={bodyInputRef}
                    value={post.body}
                    onChange={e => setPost({...post, body: e.target.value})}
                    type="text" 
                    placeholder="Описание поста" 
                />
                <MyButton onClick={addNewPost}>Создать пост</MyButton>
            </form>
    );
};

export default PostForm;