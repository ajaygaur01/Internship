import { useState } from "react";
import axios from "axios";

const CreatePost = () => {
    const [formData, setFormData] = useState({
        author: "",
        topic: "",
        description: "",
    });
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append("author", formData.author);
        formDataToSend.append("topic", formData.topic);
        formDataToSend.append("description", formData.description);
        formDataToSend.append("photo", image); // The key must match the `upload.single("photo")` in the backend
    
        try {
            const response = await axios.post(
                "http://localhost:8000/post/create",
                formDataToSend,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            console.log(response.data); // Check the response
            setMessage("Post created successfully!");
        } catch (error) {
            console.error("Error creating post:", error);
            setMessage("Failed to create the post. Please try again.");
        }
    };
    

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Create a New Post</h1>
                {message && (
                    <div className="mb-4 p-4 rounded bg-green-100 text-green-700">{message}</div>
                )}
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    {/* Author */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Author Name
                        </label>
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                            required
                        />
                    </div>

                    {/* Topic */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Topic
                        </label>
                        <input
                            type="text"
                            name="topic"
                            value={formData.topic}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                            required
                        />
                    </div>

                    {/* Image */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Upload Image
                        </label>
                        <input
                            type="file"
                            name="photo"
                            onChange={handleImageChange}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="5"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                            required
                        ></textarea>
                    </div>

                    {/* Submit */}
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                        >
                            Create Post
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;
