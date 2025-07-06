import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";

export default function PostPage() {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = () => {
      try {
        setLoading(true);
        const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
        const foundPost = storedPosts.find((p) => p.slug === postSlug);
        if (!foundPost) {
          setError(true);
          setLoading(false);
          return;
        }
        setPost(foundPost);
        setError(false);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPost();
  }, [postSlug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
      <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">
        Elevate Your Resume with Impressive JavaScript Projects (updated)
      </h1>

      <Link to="/search?category=javascript" className="self-center mt-5">
        <Button color="gray" pill size="xs">
          javascript
        </Button>
      </Link>

      <img
        src="/postimage.png"
        alt="post"
        className="mt-10 p-3 max-h-[600px] w-full object-cover"
      />

      <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-sm text-gray-600">
        <span>{new Date(post?.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {Math.ceil(post?.content.length / 1000)} mins read
        </span>
      </div>

      <div
         className="p-3 max-w-2xl mx-auto w-full post-content space-y-6"
         dangerouslySetInnerHTML={{ __html: post?.content }}
      ></div>

    </main>
  );
}
