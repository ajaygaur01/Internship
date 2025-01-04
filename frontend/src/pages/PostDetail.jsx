import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const PostDetail = () => {
    const { id } = useParams(); 
    const [post, setPost] = useState(null);

    const fetchPost = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/post/${id}`);
            setPost(response.data);
        } catch (error) {
            console.error("Error fetching post details:", error);
        }
    };

    useEffect(() => {
        fetchPost();
    }, );

    if (!post) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-lg font-medium text-gray-700">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto py-12 px-6">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    {/* Image Section */}
                    <div className="h-96">
                        <img
                            src={`http://localhost:8000/images/${post.photo}`}
                            alt={post.topic}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Content Section */}
                    <div className="p-8">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.topic}</h1>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            {post.description}
                        </p>
                    </div>
                </div>

                {/* Additional Info or Buttons */}
                <div className="mt-8 flex justify-end">
                    <button
                        onClick={() => window.history.back()}
                        className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostDetail;
