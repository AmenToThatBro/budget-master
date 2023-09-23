import Bloglist from './blogList';
import useFetch from './useFetch';

const Home = () => {

    const {data: blogs, isPending, error} = useFetch('http://localhost:8000/blogs');

    // renders the page using jsx language
    return (
        <div className="home">
            {error && <div>{ error } </div>}
            { isPending && <div>Loading...</div> }
            {blogs && <Bloglist blogs={blogs} title="All Blogs" />}
        </div>
      );
}
 
export default Home;