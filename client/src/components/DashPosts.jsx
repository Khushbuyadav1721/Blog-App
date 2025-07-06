import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashPosts() {
  const { currentUser } = useSelector((state) => state.user);
  const [allPosts, setAllPosts] = useState([]); // store full list
  const [userPosts, setUserPosts] = useState([]); // visible posts
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete, setPostIdToDelete] = useState('');

  useEffect(() => {
    const mockPosts = [
      {
        _id: '1',
        updatedAt: new Date(),
        slug: 'getting-started-tailwind-css-vite',
        image: '/postimage.png',
        title: 'Elevate Your Resume with Impressive JavaScript Projects (updated)',
        category: 'javascript',
        content: `
        <p>As a JavaScript developer, showcasing practical projects on your resume is a powerful way to demonstrate your skills and leave a lasting impression on potential employers.</p>

      <p><strong>1. Personal Portfolio Website</strong><br/>
      Create a stunning personal portfolio website that serves as a digital resume. Showcase your skills, projects, and experience with an interactive and visually appealing design. Use technologies like HTML, CSS, and JavaScript to make it dynamic and engaging.</p>

      <p><strong>2. Interactive Resume/CV</strong><br/>
      Transform your traditional resume into an interactive web page. Implement features like animations, dynamic content, and smooth transitions using JavaScript. This project not only showcases your coding skills but also adds a unique touch to your resume.</p>

      <p><strong>3. Weather App</strong><br/>
      Develop a weather application that fetches real-time weather data from an API. Allow users to input locations and receive detailed weather information. Focus on creating a user-friendly interface and handling asynchronous JavaScript.</p>

      <p><strong>4. Expense Tracker</strong><br/>
      Build an expense tracker that helps users manage their finances. Implement features like expense categorization, budget tracking, and insightful data visualization. Showcase your ability to work with data and create practical applications.</p>

      <p><strong>5. To-Do List with Local Storage</strong><br/>
      Enhance a basic to-do list application by adding local storage functionality. Ensure that users' to-do items persist even after they close the browser. This project demonstrates your understanding of web storage and user experience.</p>

      <p><strong>6. GitHub Profile Viewer</strong><br/>
      Create a web application that retrieves and displays GitHub profile information and repositories using the GitHub API. Showcase your ability to work with external APIs, handle data, and present it in a meaningful way.</p>

      <p><strong>7. Interactive Quiz Game</strong><br/>
      Develop an engaging quiz game with dynamic questions, a timer, and score tracking. Use JavaScript to create an interactive and enjoyable learning experience. Highlight your skills in user interaction and game logic.</p>

      <p><strong>8. Real-Time Chat Application</strong><br/>
      Build a real-time chat application using technologies like WebSocket or Socket.io. Implement features such as user authentication, message encryption, and different chat rooms. Showcase your expertise in real-time communication.</p>

      <p><strong>9. E-commerce Product Page</strong><br/>
      Create a visually appealing product page for an e-commerce website. Focus on designing an intuitive user interface with features like product descriptions, images, and a shopping cart. This project demonstrates your front-end development skills.</p>

      <p><strong>10. Data Visualization Dashboard</strong><br/>
      Develop a dashboard that visualizes data using libraries like D3.js or Chart.js. Showcase your ability to transform complex data into meaningful visualizations. This project highlights your skills in data analysis and visualization.</p>

      <p>When including these projects on your resume, provide concise descriptions of each project, emphasizing the technologies used, challenges overcome, and any notable results or impact.</p>

      <p>Tailor your project descriptions to align with the skills and experiences sought by prospective employers. These JavaScript projects will not only enrich your portfolio but also demonstrate your proficiency in web development, making your resume stand out in the competitive job market.</p>

      <p><strong>Happy coding!</strong></p>
    `
      },
      {
        _id: '10',
        updatedAt: new Date(),
        slug: 'getting-started-tailwind-css-vite-2',
        image: '/postimage.png',
        title: 'Getting Started with Tailwind CSS and Vite: A Step-by-Step Guide',
        category: 'reactjs',
      },
      {
        _id: '2',
        updatedAt: new Date(),
        slug: 'installing-reactjs-vite',
        image: '/postimage.png',
        title: 'Installing React.js with Vite and Tailwind CSS: A Quick and Efficient Guide',
        category: 'reactjs',
      },
      {
        _id: '3',
        updatedAt: new Date(),
        slug: 'mock-post-3',
        image: '/postimage.png',
        title: 'Installing Next.js with Tailwind CSS: A Seamless Integration Guide',
        category: 'nextjs',
      },
      {
        _id: '4',
        updatedAt: new Date(),
        slug: 'mock-post-4',
        image: '/postimage.png',
        title: 'Navigating the Contrasts Between React.js and Next.js',
        category: 'reactjs',
      },
      {
        _id: '5',
        updatedAt: new Date(),
        slug: 'mock-post-5',
        image: '/postimage.png',
        title: 'Unveiling the Benefits of utilizing Tailwind CSS in Next.js Projects',
        category: 'reactjs',
      },
      {
        _id: '6',
        updatedAt: new Date(),
        slug: 'mock-post-6',
        image: '/postimage.png',
        title: 'Intergrating Redux Toolkit into a MERN Stack Project:A step-by-step Guide',
        category: 'reactjs',
      },
      {
        _id: '7',
        updatedAt: new Date(),
        slug: 'mock-post-7',
        image: '/postimage.png',
        title: 'Building a Next js App with Tailwind CSS and TypeScript: A comprenhesive Guide',
        category: 'reactjs',
      },
      {
        _id: '8',
        updatedAt: new Date(),
        slug: 'mock-post-8',
        image: '/postimage.png',
        title: 'Creating a ,MERN Stack Apllication with Tailwind CSS and TypeScript: A Step-by-Step Guuide',
        category: 'reactjs',
      },
      {
        _id: '9',
        updatedAt: new Date(),
        slug: 'mock-post-9',
        image: '/postimage.png',
        title: 'Integrating Tailwind CSS with Flowbite in your React Project: A Step-by-Step Guide',
        category: 'reactjs',
      },
    ];
    localStorage.setItem('posts', JSON.stringify(mockPosts));
    setAllPosts(mockPosts);
    setUserPosts(mockPosts.slice(0, 5)); // initially show first 5
    setShowMore(mockPosts.length > 5);
  }, []);

  const handleShowMore = () => {
    setUserPosts(allPosts); // show all
    setShowMore(false); // hide button
  };

  const handleDeletePost = () => {
    setShowModal(false);
    setUserPosts((prev) => prev.filter((post) => post._id !== postIdToDelete));
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-slate-100 dark:scrollbar-thumb-slate-500 dark:scrollbar-track-slate-700">
            <Table hoverable className="w-full shadow-md">
              <Table.Head className="text-sm">
                <Table.HeadCell className="w-[120px]">Date updated</Table.HeadCell>
                <Table.HeadCell className="w-[140px]">Post image</Table.HeadCell>
                <Table.HeadCell className="w-[450px]">Post title</Table.HeadCell>
                <Table.HeadCell className="w-[120px]">Category</Table.HeadCell>
                <Table.HeadCell className="w-[80px]">Delete</Table.HeadCell>
                <Table.HeadCell className="w-[80px]">
                  <span>Edit</span>
                </Table.HeadCell>
              </Table.Head>
              {userPosts.map((post) => (
                <Table.Body key={post._id} className="divide-y">
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                    <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                    <Table.Cell>
                      <Link to={`/post/${post.slug}`}>
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-16 h-10 object-cover bg-gray-500 rounded"
                        />
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        className="font-medium text-gray-900 dark:text-white break-words"
                        to={`/post/${post.slug}`}
                      >
                        {post.title}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>{post.category}</Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          setShowModal(true);
                          setPostIdToDelete(post._id);
                        }}
                        className="font-medium text-red-500 hover:underline cursor-pointer"
                      >
                        Delete
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <Link
                        className="text-teal-500 hover:underline"
                        to={`/update-post/${post._id}`}
                      >
                        <span>Edit</span>
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
            </Table>
          </div>

          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-teal-500 self-center text-sm py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no posts yet!</p>
      )}

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this post?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeletePost}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
